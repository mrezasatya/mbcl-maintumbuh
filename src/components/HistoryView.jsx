import { useState } from 'react';
import { DOMAINS, DOMAIN_IDS } from '../logic/config.js';
import { formatDate, summarize } from '../logic/history.js';
import { Mascot } from './Mascots.jsx';

/** Laman riwayat kegiatan yang sudah diselesaikan. */
export default function HistoryView({ entries, storageOk, onRemove, onClearAll, onGoToPlan }) {
  const [confirming, setConfirming] = useState(false);
  const { total, activeDays, perDomain, groups } = summarize(entries);
  const max = Math.max(1, ...Object.values(perDomain));

  return (
    <section className="history" aria-labelledby="history-title">
      <div className="history__head">
        <h1 id="history-title" tabIndex={-1}>Riwayat bermain si kecil</h1>
        <p>
          Setiap kegiatan yang Ayah/Bunda tandai "sudah dilakukan" tercatat di sini. Lihat lagi sudah sejauh mana
          kalian bermain bersama.
        </p>
        <p className="history__privacy">
          <span aria-hidden="true">🔒</span> Riwayat ini hanya tersimpan di hp atau laptop ini. Tidak dikirim ke
          mana pun, dan bisa dihapus kapan saja.
        </p>
        {!storageOk && (
          <p className="history__warn" role="alert">
            Browser ini tidak mengizinkan penyimpanan (misalnya mode penyamaran). Riwayat tetap tampil selama
            halaman terbuka, tetapi akan hilang saat halaman ditutup.
          </p>
        )}
      </div>

      {total === 0 ? (
        <div className="history__empty">
          <div className="history__empty-art" aria-hidden="true">
            <Mascot domain="sosem" size={96} />
          </div>
          <h2>Belum ada kegiatan yang ditandai</h2>
          <p>
            Setelah bermain, tekan tombol <strong>Tandai sudah dilakukan</strong> di kartu kegiatan. Riwayatnya akan
            muncul di sini.
          </p>
          <button type="button" className="btn btn--primary" onClick={onGoToPlan}>
            Lihat rencana bermain
          </button>
        </div>
      ) : (
        <>
          <div className="history__stats">
            <div className="stat">
              <span className="stat__num">{total}</span>
              <span className="stat__label">kegiatan selesai</span>
            </div>
            <div className="stat">
              <span className="stat__num">{activeDays}</span>
              <span className="stat__label">hari bermain</span>
            </div>
          </div>

          <div className="history__domains">
            <h2>Sebaran per kemampuan</h2>
            <ul className="domain-bars">
              {DOMAIN_IDS.map((d) => {
                const dm = DOMAINS[d];
                return (
                  <li key={d} style={{ '--accent': dm.warna, '--accent-soft': dm.lembut }}>
                    <span className="domain-bars__label">
                      <span aria-hidden="true">{dm.emoji}</span> {dm.nama}
                    </span>
                    <span className="domain-bars__track" aria-hidden="true">
                      <span className="domain-bars__fill" style={{ width: `${(perDomain[d] / max) * 100}%` }} />
                    </span>
                    <span className="domain-bars__count">{perDomain[d]}</span>
                  </li>
                );
              })}
            </ul>
            <p className="history__note">
              Tidak harus seimbang. Ikuti minat si kecil, dan sesekali coba kemampuan yang masih jarang dimainkan.
            </p>
          </div>

          <div className="history__list">
            <h2>Catatan per hari</h2>
            {groups.map((g) => (
              <section key={g.date} className="history-day" aria-label={formatDate(g.date)}>
                <h3>{formatDate(g.date)}</h3>
                <ul>
                  {g.items.map((e) => {
                    const dm = DOMAINS[e.domain];
                    return (
                      <li key={e.id} className="history-item" style={{ '--accent': dm.warna, '--accent-soft': dm.lembut }}>
                        <span className="history-item__mascot" aria-hidden="true">
                          <Mascot domain={e.domain} size={40} />
                        </span>
                        <span className="history-item__text">
                          <strong>{e.judul}</strong>
                          <span>{dm.nama}</span>
                        </span>
                        <button
                          type="button"
                          className="history-item__remove"
                          onClick={() => onRemove(e.id)}
                          aria-label={`Hapus ${e.judul} dari riwayat ${formatDate(e.date)}`}
                        >
                          <span aria-hidden="true">✕</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <div className="history__danger">
            {confirming ? (
              <div className="confirm" role="group" aria-label="Konfirmasi hapus riwayat">
                <p>Yakin hapus semua riwayat? Catatan yang dihapus tidak bisa dikembalikan.</p>
                <div className="confirm__actions">
                  <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => {
                      onClearAll();
                      setConfirming(false);
                    }}
                  >
                    Ya, hapus semua
                  </button>
                  <button type="button" className="btn btn--ghost" onClick={() => setConfirming(false)}>
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" className="btn btn--ghost" onClick={() => setConfirming(true)}>
                <span aria-hidden="true">🗑️</span> Hapus semua riwayat
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
