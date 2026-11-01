import { useEffect, useMemo, useRef, useState } from 'react';
import Logo from './components/Logo.jsx';
import BirthForm from './components/BirthForm.jsx';
import PlanView from './components/PlanView.jsx';
import HistoryView from './components/HistoryView.jsx';
import SafetyPanel from './components/SafetyPanel.jsx';
import Disclaimer from './components/Disclaimer.jsx';
import MusicToggle from './components/MusicToggle.jsx';
import { MascotParade } from './components/Mascots.jsx';
import { validateBirth } from './logic/age.js';
import { buildPlan, replaceDay } from './logic/planner.js';
import {
  addEntry, dateKey, isDoneOn, loadHistory, removeActivityOn, removeEntry, saveHistory,
} from './logic/history.js';
import { ACTIVITIES } from './data/activities/index.js';
import './App.css';

const HISTORY_HASH = '#riwayat';

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

function getStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function currentView() {
  return window.location.hash === HISTORY_HASH ? 'riwayat' : 'rencana';
}

export default function App() {
  const [view, setView] = useState(currentView);
  const [form, setForm] = useState({ month: '', year: '' });
  const [error, setError] = useState('');
  const [plan, setPlan] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [status, setStatus] = useState('');
  const [history, setHistory] = useState(() => loadHistory(getStorage()));
  const [storageOk, setStorageOk] = useState(true);
  // Menandai bahwa rencana baru saja dibuat sehingga halaman perlu digulir ke hasil.
  const [scrollToken, setScrollToken] = useState(0);
  const planHeadingRef = useRef(null);
  const monthRef = useRef(null);
  const now = new Date();
  const today = dateKey(now);

  useEffect(() => {
    // Hanya #riwayat dan hash kosong yang mengganti tampilan; tautan lain (#isi-utama, #catatan-penting)
    // hanya menggulir halaman.
    function onHash() {
      const h = window.location.hash;
      if (h === HISTORY_HASH) setView('riwayat');
      else if (h === '' || h === '#') setView('rencana');
    }
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (view === 'riwayat') document.getElementById('history-title')?.focus();
  }, [view]);

  useEffect(() => {
    if (!scrollToken || !planHeadingRef.current) return;
    planHeadingRef.current.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    planHeadingRef.current.focus({ preventScroll: true });
  }, [scrollToken]);

  const everDoneIds = useMemo(() => new Set(history.map((e) => e.activityId)), [history]);

  function updateHistory(next) {
    setHistory(next);
    setStorageOk(saveHistory(getStorage(), next));
  }

  function handleChange(patch) {
    setForm((f) => ({ ...f, ...patch }));
    if (error) setError('');
  }

  function handleSubmit() {
    const result = validateBirth(form.month, form.year, new Date());
    if (!result.ok) {
      setError(result.message);
      setPlan(null);
      return;
    }
    setError('');
    setPlan(buildPlan(result.months, ACTIVITIES));
    setActiveDay(0);
    setStatus('');
    setScrollToken((t) => t + 1);
  }

  function handleReshuffle() {
    setPlan((p) => buildPlan(p.months, ACTIVITIES));
    setActiveDay(0);
    setStatus('Rencana 7 hari sudah disusun ulang.');
  }

  function handleReplaceDay(index) {
    const next = replaceDay(plan, index, ACTIVITIES);
    if (!next) {
      setStatus(`Belum ada kegiatan lain yang cocok untuk Hari ${index + 1}.`);
      return;
    }
    setPlan(next);
    setStatus(`Kegiatan Hari ${index + 1} diganti menjadi ${next.days[index].utama.judul}. Hari lain tetap.`);
  }

  function handleToggleDone(activity) {
    if (isDoneOn(history, activity.id, today)) {
      updateHistory(removeActivityOn(history, activity.id, today));
      setStatus(`Tanda selesai untuk ${activity.judul} dibatalkan.`);
    } else {
      updateHistory(addEntry(history, activity, today));
      setStatus(`${activity.judul} tercatat di riwayat. Hebat!`);
    }
  }

  function handleChangeAge() {
    setPlan(null);
    const el = monthRef.current;
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    }
  }

  function goToPlan() {
    window.location.hash = '';
    setView('rencana');
    window.scrollTo(0, 0);
  }

  return (
    <>
      <a className="skip-link" href="#isi-utama">Lewati ke isi utama</a>
      <div className="bg-bubbles" aria-hidden="true" />

      <header className="site-header">
        <div className="container site-header__inner">
          <Logo size={52} />
          <div className="site-header__brand">
            <p className="brand">Main Tumbuh</p>
            <p className="tagline">Belajar sambil bermain, tumbuh bersama</p>
          </div>
          <nav className="main-nav" aria-label="Menu utama">
            <a
              href="#"
              className="main-nav__link"
              aria-current={view === 'rencana' ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                goToPlan();
              }}
            >
              <span aria-hidden="true">🗓️</span> Rencana
            </a>
            <a href={HISTORY_HASH} className="main-nav__link" aria-current={view === 'riwayat' ? 'page' : undefined}>
              <span aria-hidden="true">⭐</span> Riwayat
              {history.length > 0 && <span className="main-nav__count">{history.length}</span>}
            </a>
          </nav>
        </div>
      </header>

      <main id="isi-utama" tabIndex={-1}>
        {view === 'riwayat' ? (
          <div className="container">
            <HistoryView
              entries={history}
              storageOk={storageOk}
              onRemove={(id) => updateHistory(removeEntry(history, id))}
              onClearAll={() => updateHistory([])}
              onGoToPlan={goToPlan}
            />
          </div>
        ) : (
          <>
            <section className="hero">
              <div className="container hero__inner">
                <div className="hero__text">
                  <p className="hero__hello">Halo, Ayah dan Bunda!</p>
                  <h1>Yuk, bermain dan tumbuh bersama si kecil</h1>
                  <p className="hero__lead">
                    Bermain adalah cara si kecil belajar, dan Ayah/Bunda adalah teman bermain favoritnya. Ceritakan
                    kapan ia lahir, lalu kami siapkan tujuh hari kegiatan seru yang sederhana, aman, dan cukup
                    memakai barang yang ada di rumah.
                  </p>
                  <p className="hero__lead hero__lead--soft">
                    Tidak perlu mahal atau rumit. Cukup 10 sampai 20 menit sehari, penuh tawa dan pelukan.
                  </p>
                  <ul className="badges">
                    <li className="badge badge--coral"><span aria-hidden="true">💛</span> Gratis, tanpa daftar akun</li>
                    <li className="badge badge--sky"><span aria-hidden="true">🔒</span> Tanggal lahir tidak disimpan</li>
                    <li className="badge badge--mint"><span aria-hidden="true">🏠</span> Bahan dari rumah</li>
                  </ul>
                  <MascotParade />
                </div>
                <BirthForm
                  ref={monthRef}
                  month={form.month}
                  year={form.year}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  error={error}
                  now={now}
                />
              </div>
            </section>

            {plan && (
              <div className="container">
                <PlanView
                  ref={planHeadingRef}
                  plan={plan}
                  activeDay={activeDay}
                  onSelectDay={setActiveDay}
                  onReshuffle={handleReshuffle}
                  onChangeAge={handleChangeAge}
                  onReplaceDay={handleReplaceDay}
                  isDoneToday={(id) => isDoneOn(history, id, today)}
                  everDone={(id) => everDoneIds.has(id)}
                  onToggleDone={handleToggleDone}
                  status={status}
                />
              </div>
            )}

            <div className="container">
              <SafetyPanel />
            </div>
          </>
        )}

        <div className="container">
          <Disclaimer />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>
            <span aria-hidden="true">🦘🐝🦜🦉🐘</span>
          </p>
          <p>Main Tumbuh · panduan stimulasi berbasis titik perkembangan usia.</p>
          <p>Dibuat dengan sayang untuk keluarga Indonesia.</p>
        </div>
      </footer>
      <MusicToggle />
    </>
  );
}
