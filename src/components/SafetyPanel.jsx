import { NEVER, SAFETY_TAGS, thresholdText } from '../logic/safety.js';

export default function SafetyPanel() {
  const entries = Object.entries(SAFETY_TAGS);
  const never = entries.filter(([, t]) => t.minMonths === NEVER);
  const later = entries.filter(([, t]) => t.minMonths !== NEVER).sort((a, b) => b[1].minMonths - a[1].minMonths);

  const renderItem = ([tag, t]) => (
    <li key={tag} className="rule">
      <p className="rule__head">
        <strong>{t.label}</strong> <span className="rule__badge">{thresholdText(t.minMonths)}</span>
      </p>
      <p className="rule__contoh">Contoh: {t.contoh}.</p>
      <dl>
        <dt>Risiko</dt>
        <dd>{t.risiko}</dd>
        <dt>Potensi dampak</dt>
        <dd>{t.potensi}</dd>
        <dt>Aturan</dt>
        <dd>{t.aturan}</dd>
      </dl>
    </li>
  );

  return (
    <section className="safety-panel" aria-labelledby="safety-title">
      <details>
        <summary>
          <h2 id="safety-title">
            <span aria-hidden="true">🛡️</span> Aturan keselamatan
          </h2>
          <span className="safety-panel__sub">Ketuk untuk melihat daftar lengkap</span>
        </summary>
        <div className="safety-panel__body">
          <p>
            Aturan di sini sengaja dibuat lebih ketat dari kebiasaan umum. Karena usia dihitung dari bulan dan
            tahun lahir saja, aplikasi memakai usia yang dikurangi 1 bulan saat menyaring kegiatan. Kegiatan
            berisiko disembunyikan sampai anak cukup usia, dan dewasa tetap wajib mendampingi.
          </p>
          <h3>Tidak pernah muncul</h3>
          <ul className="rules">{never.map(renderItem)}</ul>
          <h3>Muncul setelah usia tertentu</h3>
          <ul className="rules">{later.map(renderItem)}</ul>
        </div>
      </details>
    </section>
  );
}
