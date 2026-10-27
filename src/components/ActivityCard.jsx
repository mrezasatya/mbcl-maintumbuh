import { DOMAINS } from '../logic/config.js';
import { SAFETY_TAGS, generalSupervision } from '../logic/safety.js';

export default function ActivityCard({ activity, months, variant = 'utama', headingLevel = 3 }) {
  const domain = DOMAINS[activity.domain];
  const Heading = `h${headingLevel}`;
  const Sub = `h${Math.min(headingLevel + 1, 6)}`;
  const tags = activity.risiko.map((tag) => ({ tag, ...SAFETY_TAGS[tag] }));

  return (
    <article
      className={`activity-card activity-card--${variant}`}
      style={{ '--accent': domain.warna, '--accent-soft': domain.lembut }}
    >
      <header className="activity-card__header">
        <span className="activity-card__emoji" aria-hidden="true">{domain.emoji}</span>
        <div>
          {variant === 'utama' && <p className="activity-card__eyebrow">Kegiatan utama</p>}
          <Heading className="activity-card__title">{activity.judul}</Heading>
          <ul className="chips" aria-label="Keterangan kegiatan">
            <li className="chip chip--domain">{domain.nama}</li>
            <li className="chip">
              <span aria-hidden="true">⏱️</span> {activity.durasi} menit
            </li>
          </ul>
        </div>
      </header>

      <section className="activity-card__section">
        <Sub>Tujuan</Sub>
        <p>{activity.tujuan}</p>
      </section>

      <section className="activity-card__section">
        <Sub>Bahan</Sub>
        <ul className="bahan">
          {activity.bahan.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="activity-card__section">
        <Sub>Langkah</Sub>
        <ol className="langkah">
          {activity.langkah.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ol>
      </section>

      <section className="safety-box" aria-label="Catatan keselamatan">
        <Sub>
          <span aria-hidden="true">🛡️</span> Catatan keselamatan
        </Sub>
        <ul>
          <li>{generalSupervision(months)}</li>
          <li>{activity.keselamatan}</li>
        </ul>
        {tags.map((t) => (
          <div key={t.tag} className="safety-box__tag">
            <p className="safety-box__label">{t.label}</p>
            <dl>
              <dt>Risiko</dt>
              <dd>{t.risiko}</dd>
              <dt>Potensi dampak</dt>
              <dd>{t.potensi}</dd>
              <dt>Aturan</dt>
              <dd>{t.aturan}</dd>
            </dl>
          </div>
        ))}
      </section>
    </article>
  );
}
