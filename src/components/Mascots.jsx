// Karakter hewan orisinal Main Tumbuh, satu per domain.
// Animasi diatur di Mascots.css dan otomatis berhenti bila pengguna memilih gerak dikurangi.
import './Mascots.css';

function Kanguru() {
  return (
    <g className="m-kanguru">
      <path className="m-kanguru__tail" d="M30 70 Q12 74 8 90 Q20 82 34 78 Z" fill="#e8673f" />
      <ellipse cx="44" cy="66" rx="18" ry="20" fill="#ff8a63" />
      <ellipse cx="46" cy="70" rx="9" ry="10" fill="#ffd2bf" />
      <path d="M40 74 q6 5 12 0" stroke="#e8673f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="38" cy="88" rx="11" ry="4.5" fill="#e8673f" />
      <ellipse cx="54" cy="88" rx="9" ry="4" fill="#e8673f" />
      <path d="M56 58 q8 4 6 12" stroke="#ff8a63" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g className="m-kanguru__head">
        <ellipse className="m-ear" cx="52" cy="22" rx="5" ry="12" fill="#ff8a63" transform="rotate(-12 52 22)" />
        <ellipse cx="52" cy="23" rx="2.4" ry="8" fill="#ffc1a8" transform="rotate(-12 52 23)" />
        <ellipse className="m-ear" cx="64" cy="22" rx="5" ry="12" fill="#ff8a63" transform="rotate(14 64 22)" />
        <ellipse cx="64" cy="23" rx="2.4" ry="8" fill="#ffc1a8" transform="rotate(14 64 23)" />
        <ellipse cx="58" cy="40" rx="14" ry="12" fill="#ff8a63" />
        <ellipse cx="66" cy="45" rx="8" ry="6" fill="#ffd2bf" />
        <circle cx="71" cy="43" r="2" fill="#2b2140" />
        <g className="m-blink">
          <circle cx="56" cy="37" r="2.6" fill="#2b2140" />
          <circle cx="55.2" cy="36.2" r="0.9" fill="#fff" />
        </g>
        <circle cx="53" cy="44" r="2.4" fill="#ff6f91" opacity="0.6" />
      </g>
    </g>
  );
}

function Lebah() {
  return (
    <g className="m-lebah">
      <g className="m-lebah__body">
        <ellipse className="m-wing m-wing--l" cx="40" cy="36" rx="11" ry="15" fill="#dff3ff" stroke="#9fd3f5" strokeWidth="2" />
        <ellipse className="m-wing m-wing--r" cx="58" cy="34" rx="11" ry="15" fill="#dff3ff" stroke="#9fd3f5" strokeWidth="2" />
        <path d="M78 60 l10 3 l-10 4 Z" fill="#2b2140" />
        <ellipse cx="52" cy="62" rx="27" ry="20" fill="#ffc928" />
        <path d="M50 43 q-6 19 0 38" stroke="#2b2140" strokeWidth="7" fill="none" />
        <path d="M64 46 q-5 16 0 32" stroke="#2b2140" strokeWidth="6" fill="none" />
        <circle cx="32" cy="60" r="15" fill="#ffd84d" />
        <path d="M27 46 q-4 -10 -10 -12" stroke="#2b2140" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="16" cy="33" r="3" fill="#2b2140" />
        <path d="M34 46 q2 -10 8 -13" stroke="#2b2140" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="43" cy="32" r="3" fill="#2b2140" />
        <g className="m-blink">
          <circle cx="27" cy="58" r="2.6" fill="#2b2140" />
          <circle cx="36" cy="58" r="2.6" fill="#2b2140" />
        </g>
        <path d="M27 65 q4.5 4 9 0" stroke="#2b2140" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="23" cy="64" r="2.4" fill="#ff8a63" opacity="0.6" />
        <circle cx="40" cy="64" r="2.4" fill="#ff8a63" opacity="0.6" />
      </g>
    </g>
  );
}

function Beo() {
  return (
    <g className="m-beo">
      <path d="M44 74 l-8 20 l8 -4 l4 6 l3 -20 Z" fill="#2f9be0" />
      <path d="M48 76 l2 20 l5 -6" fill="#ffc928" />
      <ellipse cx="50" cy="60" rx="18" ry="22" fill="#3fb3f0" />
      <ellipse cx="53" cy="66" rx="10" ry="13" fill="#bfe6ff" />
      <path className="m-beo__wing" d="M36 54 q-10 14 2 26 q8 -10 6 -24 Z" fill="#2f9be0" />
      <path d="M44 84 v6 M56 84 v6" stroke="#ff8a63" strokeWidth="3" strokeLinecap="round" />
      <g className="m-beo__head">
        <path d="M44 20 q2 -10 8 -12 q-2 6 2 10 Z" fill="#e45c96" />
        <circle cx="52" cy="32" r="15" fill="#3fb3f0" />
        <path d="M60 30 q14 0 12 12 q-6 -4 -10 -2 Z" fill="#ffb12b" />
        <path d="M62 40 q4 2 8 0" stroke="#e58e00" strokeWidth="1.6" fill="none" />
        <circle cx="56" cy="29" r="5" fill="#fff" />
        <g className="m-blink">
          <circle cx="57" cy="29" r="2.6" fill="#2b2140" />
          <circle cx="57.8" cy="28.2" r="0.8" fill="#fff" />
        </g>
        <circle cx="47" cy="36" r="2.4" fill="#ff6f91" opacity="0.6" />
      </g>
    </g>
  );
}

function BurungHantu() {
  return (
    <g className="m-hantu">
      <path d="M28 30 l4 -16 l10 12 Z" fill="#7650c4" />
      <path d="M72 30 l-4 -16 l-10 12 Z" fill="#7650c4" />
      <ellipse cx="50" cy="56" rx="28" ry="32" fill="#8a63d2" />
      <ellipse cx="50" cy="66" rx="17" ry="19" fill="#e6dcff" />
      <path d="M42 62 q3 3 6 0 M52 62 q3 3 6 0 M47 70 q3 3 6 0 M42 78 q3 3 6 0 M52 78 q3 3 6 0" stroke="#b9a5ea" strokeWidth="1.6" fill="none" />
      <path className="m-hantu__wing m-hantu__wing--l" d="M24 52 q-8 18 4 32 q6 -14 2 -30 Z" fill="#7650c4" />
      <path className="m-hantu__wing m-hantu__wing--r" d="M76 52 q8 18 -4 32 q-6 -14 -2 -30 Z" fill="#7650c4" />
      <circle cx="38" cy="40" r="11" fill="#fff" />
      <circle cx="62" cy="40" r="11" fill="#fff" />
      <g className="m-hantu__pupils">
        <circle cx="39" cy="41" r="5" fill="#2b2140" />
        <circle cx="63" cy="41" r="5" fill="#2b2140" />
        <circle cx="40.5" cy="39.5" r="1.6" fill="#fff" />
        <circle cx="64.5" cy="39.5" r="1.6" fill="#fff" />
      </g>
      <g className="m-hantu__lids">
        <ellipse cx="38" cy="40" rx="11.5" ry="11.5" fill="#8a63d2" />
        <ellipse cx="62" cy="40" rx="11.5" ry="11.5" fill="#8a63d2" />
      </g>
      <path d="M46 48 l4 7 l4 -7 Z" fill="#ffb12b" />
      <path d="M40 87 v5 M46 88 v5 M54 88 v5 M60 87 v5" stroke="#ffb12b" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Gajah() {
  return (
    <g className="m-gajah">
      <ellipse cx="58" cy="62" rx="24" ry="19" fill="#f59ac0" />
      <rect x="40" y="70" width="10" height="18" rx="4" fill="#f59ac0" />
      <rect x="64" y="70" width="10" height="18" rx="4" fill="#f59ac0" />
      <path d="M81 58 q8 0 8 10" stroke="#f59ac0" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g className="m-gajah__head">
        <circle cx="38" cy="44" r="17" fill="#f7a8c9" />
        <path className="m-gajah__trunk" d="M26 50 q-10 10 -6 20 q2 5 6 2" stroke="#f7a8c9" strokeWidth="8" fill="none" strokeLinecap="round" />
        <g className="m-gajah__ear">
          <ellipse cx="50" cy="42" rx="11" ry="14" fill="#ffc7dc" stroke="#f7a8c9" strokeWidth="3" />
        </g>
        <g className="m-blink">
          <circle cx="33" cy="40" r="2.8" fill="#2b2140" />
          <circle cx="32.2" cy="39.2" r="0.9" fill="#fff" />
        </g>
        <circle cx="31" cy="48" r="2.6" fill="#ff6f91" opacity="0.6" />
        <path d="M36 25 q4 -6 8 -2" stroke="#e45c96" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

const CHARACTERS = {
  kasar: { Comp: Kanguru, nama: 'Kanguru' },
  halus: { Comp: Lebah, nama: 'Lebah' },
  bahasa: { Comp: Beo, nama: 'Burung beo' },
  kognitif: { Comp: BurungHantu, nama: 'Burung hantu' },
  sosem: { Comp: Gajah, nama: 'Gajah' },
};

/** Satu karakter hewan. `domain` menentukan hewannya. Dekoratif kecuali diberi `label`. */
export function Mascot({ domain, size = 64, label, className = '' }) {
  const { Comp } = CHARACTERS[domain];
  return (
    <svg
      className={`mascot mascot--${domain} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
      focusable="false"
    >
      <Comp />
    </svg>
  );
}

/** Barisan lima karakter untuk bagian awal halaman. */
export function MascotParade() {
  return (
    <div className="parade" aria-hidden="true">
      {['kasar', 'halus', 'bahasa', 'kognitif', 'sosem'].map((d, i) => (
        <div key={d} className="parade__item" style={{ '--delay': `${i * 0.35}s` }}>
          <Mascot domain={d} size={76} />
          <span className="parade__shadow" />
        </div>
      ))}
    </div>
  );
}
