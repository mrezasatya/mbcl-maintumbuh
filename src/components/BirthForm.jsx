import { forwardRef, useId } from 'react';
import { MONTH_NAMES } from '../logic/config.js';
import { formatAge, yearOptions } from '../logic/age.js';
import { MAX_MONTHS, MIN_MONTHS } from '../logic/config.js';

const BirthForm = forwardRef(function BirthForm({ month, year, onChange, onSubmit, error, now }, monthRef) {
  const id = useId();
  const errorId = `${id}-error`;
  const noteId = `${id}-note`;
  const years = yearOptions(now);
  const describedBy = error ? `${noteId} ${errorId}` : noteId;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="birth-form" onSubmit={handleSubmit} noValidate aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="birth-form__title">Kapan si kecil lahir?</h2>
      <p className="birth-form__sub">Pilih bulan dan tahunnya, ya. Tidak perlu tanggal.</p>
      <div className="birth-form__fields">
        <div className="field">
          <label htmlFor={`${id}-month`}>Bulan lahir</label>
          <select
            id={`${id}-month`}
            ref={monthRef}
            value={month}
            onChange={(e) => onChange({ month: e.target.value })}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
          >
            <option value="">Pilih bulan</option>
            {MONTH_NAMES.map((name, i) => (
              <option key={name} value={i + 1}>{name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${id}-year`}>Tahun lahir</label>
          <select
            id={`${id}-year`}
            value={year}
            onChange={(e) => onChange({ year: e.target.value })}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
          >
            <option value="">Pilih tahun</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
      <p id={noteId} className="birth-form__note">
        Main Tumbuh menemani anak usia {formatAge(MIN_MONTHS)} sampai {formatAge(MAX_MONTHS)}. Karena hanya
        memakai bulan dan tahun, perkiraan usianya bisa meleset sekitar 1 bulan, dan itu tidak apa-apa.
      </p>
      {error && (
        <div id={errorId} className="birth-form__error" role="alert">
          <span aria-hidden="true">🙈</span> {error}
        </div>
      )}
      <button type="submit" className="btn btn--primary btn--lg">Ayo, susun rencana 7 hari!</button>
    </form>
  );
});

export default BirthForm;
