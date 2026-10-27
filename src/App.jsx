import { useEffect, useRef, useState } from 'react';
import Logo from './components/Logo.jsx';
import BirthForm from './components/BirthForm.jsx';
import PlanView from './components/PlanView.jsx';
import SafetyPanel from './components/SafetyPanel.jsx';
import Disclaimer from './components/Disclaimer.jsx';
import MusicToggle from './components/MusicToggle.jsx';
import { MascotParade } from './components/Mascots.jsx';
import { validateBirth } from './logic/age.js';
import { buildPlan } from './logic/planner.js';
import { ACTIVITIES } from './data/activities/index.js';
import './App.css';

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export default function App() {
  const [form, setForm] = useState({ month: '', year: '' });
  const [error, setError] = useState('');
  const [plan, setPlan] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  // Menandai bahwa rencana baru saja dibuat sehingga halaman perlu digulir ke hasil.
  const [scrollToken, setScrollToken] = useState(0);
  const planHeadingRef = useRef(null);
  const monthRef = useRef(null);
  const now = new Date();

  useEffect(() => {
    if (!scrollToken || !planHeadingRef.current) return;
    planHeadingRef.current.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    planHeadingRef.current.focus({ preventScroll: true });
  }, [scrollToken]);

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
    setScrollToken((t) => t + 1);
  }

  function handleReshuffle() {
    setPlan((p) => buildPlan(p.months, ACTIVITIES));
    setActiveDay(0);
  }

  function handleChangeAge() {
    setPlan(null);
    const el = monthRef.current;
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    }
  }

  return (
    <>
      <a className="skip-link" href="#isi-utama">Lewati ke isi utama</a>
      <div className="bg-bubbles" aria-hidden="true" />

      <header className="site-header">
        <div className="container site-header__inner">
          <Logo size={52} />
          <div>
            <p className="brand">Main Tumbuh</p>
            <p className="tagline">Belajar sambil bermain, tumbuh bersama</p>
          </div>
        </div>
      </header>

      <main id="isi-utama" tabIndex={-1}>
        <section className="hero">
          <div className="container hero__inner">
            <div className="hero__text">
              <p className="hero__hello">Halo, Ayah dan Bunda!</p>
              <h1>Yuk, bermain dan tumbuh bersama si kecil</h1>
              <p className="hero__lead">
                Bermain adalah cara anak belajar, dan Anda adalah teman bermain terbaiknya. Ceritakan kapan si
                kecil lahir, lalu kami siapkan tujuh hari kegiatan seru yang sederhana, aman, dan cukup memakai
                barang yang ada di rumah.
              </p>
              <p className="hero__lead hero__lead--soft">
                Tidak perlu mahal atau rumit. Cukup 10 sampai 20 menit sehari, penuh tawa dan pelukan.
              </p>
              <ul className="badges">
                <li className="badge badge--coral"><span aria-hidden="true">💛</span> Gratis, tanpa daftar akun</li>
                <li className="badge badge--sky"><span aria-hidden="true">🔒</span> Data anak tidak disimpan</li>
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
            />
          </div>
        )}

        <div className="container">
          <SafetyPanel />
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
