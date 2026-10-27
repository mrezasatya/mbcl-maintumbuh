import { forwardRef, useRef } from 'react';
import ActivityCard from './ActivityCard.jsx';
import { DOMAINS } from '../logic/config.js';
import { formatAge } from '../logic/age.js';

const PlanView = forwardRef(function PlanView({ plan, activeDay, onSelectDay, onReshuffle, onChangeAge }, headingRef) {
  const tabRefs = useRef([]);
  const { days, months, band, filters } = plan;
  const day = days[activeDay];
  const domain = DOMAINS[day.domain];

  function focusTab(index) {
    const i = (index + days.length) % days.length;
    onSelectDay(i);
    tabRefs.current[i]?.focus();
  }

  function onTabKeyDown(e, index) {
    const keys = {
      ArrowRight: () => focusTab(index + 1),
      ArrowDown: () => focusTab(index + 1),
      ArrowLeft: () => focusTab(index - 1),
      ArrowUp: () => focusTab(index - 1),
      Home: () => focusTab(0),
      End: () => focusTab(days.length - 1),
    };
    if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]();
    }
  }

  return (
    <section className="plan" aria-labelledby="plan-title">
      <div className="plan-summary">
        <h2 id="plan-title" ref={headingRef} tabIndex={-1}>
          Rencana 7 hari untuk si kecil
        </h2>
        <p className="plan-summary__age">
          Usia <strong>{formatAge(months)}</strong> ({months} bulan)
        </p>
        <p className="plan-summary__band">
          Titik acuan perkembangan: <strong>{band.label}</strong>
        </p>
        <div className="plan-summary__actions">
          <button type="button" className="btn btn--primary" onClick={onReshuffle}>
            <span aria-hidden="true">🔀</span> Susun ulang
          </button>
          <button type="button" className="btn btn--ghost" onClick={onChangeAge}>
            <span aria-hidden="true">🎂</span> Ganti usia
          </button>
        </div>
        <div className="filter-note">
          <p>
            <span aria-hidden="true">🛡️</span> <strong>Penyaring keselamatan aktif.</strong> Untuk usia ini,
            kegiatan dengan bahaya berikut disembunyikan:
          </p>
          <ul className="filter-note__list">
            {filters.map((f) => (
              <li key={f.tag}>{f.label}</li>
            ))}
          </ul>
          <p className="filter-note__link">
            <a href="#catatan-penting">Baca catatan penting di bagian bawah</a>
          </p>
        </div>
      </div>

      <div className="day-tabs" role="tablist" aria-label="Pilih hari">
        {days.map((d, i) => {
          const dm = DOMAINS[d.domain];
          const selected = i === activeDay;
          return (
            <button
              key={d.hari}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`tab-hari-${d.hari}`}
              aria-selected={selected}
              aria-controls={`panel-hari-${d.hari}`}
              tabIndex={selected ? 0 : -1}
              className={`day-tab${selected ? ' is-active' : ''}`}
              style={{ '--accent': dm.warna, '--accent-soft': dm.lembut }}
              onClick={() => onSelectDay(i)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
            >
              <span className="day-tab__day">Hari {d.hari}</span>
              <span className="day-tab__emoji" aria-hidden="true">{dm.emoji}</span>
              <span className="day-tab__domain">{dm.nama}</span>
            </button>
          );
        })}
      </div>

      <div
        className="day-panel"
        role="tabpanel"
        id={`panel-hari-${day.hari}`}
        aria-labelledby={`tab-hari-${day.hari}`}
        tabIndex={0}
      >
        <p className="day-panel__intro">
          <strong>Hari {day.hari}</strong> · fokus {domain.nama} <span aria-hidden="true">{domain.emoji}</span>
        </p>
        <ActivityCard activity={day.utama} months={months} variant="utama" headingLevel={3} />

        <details className="backup" style={{ '--accent': domain.warna, '--accent-soft': domain.lembut }}>
          <summary>
            <span aria-hidden="true">🎒</span> Kegiatan cadangan: {day.cadangan.judul}
          </summary>
          <p className="backup__hint">Pakai bila anak kurang tertarik atau bahan utama tidak tersedia.</p>
          <ActivityCard activity={day.cadangan} months={months} variant="cadangan" headingLevel={4} />
        </details>

        <nav className="day-nav" aria-label="Navigasi hari">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => onSelectDay(activeDay - 1)}
            disabled={activeDay === 0}
          >
            <span aria-hidden="true">←</span> Hari sebelumnya
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => onSelectDay(activeDay + 1)}
            disabled={activeDay === days.length - 1}
          >
            Hari berikutnya <span aria-hidden="true">→</span>
          </button>
        </nav>
      </div>
    </section>
  );
});

export default PlanView;
