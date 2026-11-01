// Ilustrasi langkah kegiatan: gambar sederhana orisinal (SVG) per konsep.
// Konsep dipilih oleh src/logic/stepArt.js berdasarkan teks langkah.

const C = {
  ink: '#2b2140',
  coral: '#ff7a59',
  sun: '#f5b700',
  sky: '#2f9be0',
  purple: '#8a63d2',
  pink: '#e45c96',
  mint: '#3fbf9a',
  skin: '#f4c7a1',
  hair: '#4a3426',
  pants: '#4b5d8a',
  paper: '#fffdf6',
  box: '#d9a066',
  boxDark: '#b47a45',
  wood: '#c98b55',
  water: '#8fd0f5',
  leaf: '#4caf6e',
  white: '#ffffff',
};
const S = { stroke: C.ink, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };

/** Anak kecil; (x, y) adalah titik kaki. */
function Kid({ x, y, shirt = C.coral, arms = 'down', scale = 1 }) {
  const armPath = {
    down: 'M-6 -19 l-5 9 M6 -19 l5 9',
    up: 'M-6 -19 l-6 -10 M6 -19 l6 -10',
    out: 'M-6 -18 l-11 -2 M6 -18 l11 -2',
    front: 'M-6 -18 l-2 9 M6 -18 l9 4',
  }[arms];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d={armPath} {...S} stroke={C.skin} strokeWidth="3.4" />
      <rect x="-5.5" y="-10" width="4.5" height="10" rx="2" fill={C.pants} />
      <rect x="1" y="-10" width="4.5" height="10" rx="2" fill={C.pants} />
      <rect x="-7" y="-23" width="14" height="15" rx="5" fill={shirt} />
      <circle cx="0" cy="-30" r="7.5" fill={C.skin} />
      <path d="M-7.5 -31 q1 -9 7.5 -8.5 q7 -0.5 7.5 8 q-4 -4 -7.5 -3.5 q-4 -0.5 -7.5 4" fill={C.hair} />
      <circle cx="-2.6" cy="-29.5" r="1.1" fill={C.ink} />
      <circle cx="2.6" cy="-29.5" r="1.1" fill={C.ink} />
      <path d="M-2 -26.5 q2 1.8 4 0" stroke={C.ink} strokeWidth="1.1" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** Orang tua; (x, y) adalah titik kaki. */
function Adult({ x, y, shirt = C.purple, arms = 'down', hijab = false }) {
  const armPath = {
    down: 'M-8 -36 l-6 14 M8 -36 l6 14',
    out: 'M-8 -35 l-14 2 M8 -35 l14 2',
    up: 'M-8 -36 l-8 -12 M8 -36 l8 -12',
    hold: 'M-8 -36 l-6 14 M8 -36 l12 10',
  }[arms];
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={armPath} {...S} stroke={C.skin} strokeWidth="4" />
      <rect x="-7" y="-20" width="6" height="20" rx="2.5" fill={C.pants} />
      <rect x="1" y="-20" width="6" height="20" rx="2.5" fill={C.pants} />
      <rect x="-9" y="-40" width="18" height="23" rx="6" fill={shirt} />
      <circle cx="0" cy="-48" r="8.5" fill={C.skin} />
      {hijab ? (
        <path d="M-10 -46 q0 -13 10 -13 q10 0 10 13 l2 8 q-12 4 -24 0 Z M-6.5 -47 q0 6 6.5 7 q6.5 -1 6.5 -7 q-3 -5 -6.5 -5 q-3.5 0 -6.5 5" fill={C.pink} fillRule="evenodd" />
      ) : (
        <path d="M-8.5 -49 q1 -9 8.5 -9 q8 0 8.5 9 q-4 -5 -8.5 -4 q-5 -1 -8.5 4" fill={C.hair} />
      )}
      <circle cx="-3" cy="-47.5" r="1.2" fill={C.ink} />
      <circle cx="3" cy="-47.5" r="1.2" fill={C.ink} />
      <path d="M-2.4 -44 q2.4 2 4.8 0" stroke={C.ink} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </g>
  );
}

const Floor = () => <path d="M6 88 H94" {...S} stroke="#d9cdb8" />;
const Heart = ({ x, y, s = 1, fill = C.pink }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 4 C-7 -2 -5 -8 0 -5 C5 -8 7 -2 0 4 Z" fill={fill} />
);
const Note = ({ x, y, fill = C.purple }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M0 0 V-12 l8 -2 V-2" {...S} stroke={fill} fill="none" />
    <ellipse cx="-2" cy="0" rx="3" ry="2.3" fill={fill} />
    <ellipse cx="6" cy="-2" rx="3" ry="2.3" fill={fill} />
  </g>
);
const Ball = ({ x, y, r = 9, c1 = C.coral, c2 = C.sun }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={c1} {...S} />
    <path d={`M${x - r} ${y} q${r} ${-r * 0.7} ${r * 2} 0`} stroke={c2} strokeWidth={r * 0.35} fill="none" />
  </g>
);
const Box = ({ x, y, w = 34, h = 24, open = true }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="2" fill={C.box} {...S} />
    {open && <path d={`M${x} ${y} l-6 -7 M${x + w} ${y} l6 -7`} {...S} />}
    <path d={`M${x + w / 2 - 5} ${y + 5} h10`} stroke={C.boxDark} strokeWidth="2" strokeLinecap="round" />
  </g>
);
const Bubble = ({ x, y, w = 30, h = 18, fill = C.white, children }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} {...S} />
    <path d={`M${x + 8} ${y + h} l-3 7 l9 -7`} fill={fill} {...S} />
    {children}
  </g>
);

const SCENES = {
  bersama: () => (
    <>
      <Floor />
      <Adult x={38} y={88} arms="hold" hijab />
      <Kid x={64} y={88} shirt={C.sun} arms="up" />
      <Heart x={52} y={24} s={1.6} />
    </>
  ),
  rumah: () => (
    <>
      <path d="M22 50 L50 26 L78 50" fill={C.coral} {...S} />
      <rect x="28" y="48" width="44" height="38" fill={C.paper} {...S} />
      <rect x="44" y="62" width="12" height="24" rx="2" fill={C.wood} {...S} />
      <rect x="32" y="56" width="9" height="9" fill={C.water} {...S} />
      <rect x="59" y="56" width="9" height="9" fill={C.water} {...S} />
      <Kid x={84} y={88} shirt={C.mint} scale={0.7} arms="front" />
    </>
  ),
  terowongan: () => (
    <>
      <Floor />
      <path d="M14 86 V52 L60 44 V80 Z" fill={C.box} {...S} />
      <path d="M60 44 L84 52 V88 L60 80 Z" fill={C.boxDark} {...S} />
      <ellipse cx="72" cy="70" rx="7" ry="12" fill="#5a3b21" />
      <circle cx="72" cy="66" r="6" fill={C.skin} />
      <path d="M66 65 q1 -7 6 -7 q5 0 6 7" fill={C.hair} />
      <circle cx="70" cy="66" r="0.9" fill={C.ink} />
      <circle cx="74" cy="66" r="0.9" fill={C.ink} />
      <path d="M8 40 q6 -8 12 0" stroke={C.sun} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
  gerbang: () => (
    <>
      <Floor />
      <Adult x={24} y={88} arms="up" shirt={C.sky} />
      <Adult x={76} y={88} arms="up" shirt={C.purple} hijab />
      <path d="M32 40 q18 -14 36 0" {...S} stroke={C.skin} strokeWidth="4" fill="none" />
      <Kid x={44} y={88} shirt={C.sun} arms="front" scale={0.85} />
      <Kid x={58} y={88} shirt={C.coral} arms="front" scale={0.85} />
    </>
  ),
  engklek: () => (
    <>
      <path d="M30 88 l6 -14 h28 l6 14 Z M36 74 l3 -12 h22 l3 12 M39 62 l2 -10 h18 l2 10 M50 74 v14 M50 52 v10" fill={C.paper} {...S} />
      <path d="M41 52 l2 -10 h14 l2 10" fill={C.sun} {...S} />
      <ellipse cx="57" cy="81" rx="5" ry="3" fill={C.coral} {...S} />
      <Kid x={22} y={70} shirt={C.mint} arms="up" scale={0.75} />
    </>
  ),
  gunting: () => (
    <>
      <rect x="14" y="22" width="60" height="62" rx="4" fill={C.paper} {...S} />
      <path d="M22 56 H66" stroke={C.ink} strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="68" cy="72" r="7" fill="none" {...S} stroke={C.sky} strokeWidth="3.5" />
      <circle cx="82" cy="64" r="7" fill="none" {...S} stroke={C.sky} strokeWidth="3.5" />
      <path d="M72 67 L50 54 M77 60 L52 52" {...S} stroke="#9aa5b1" strokeWidth="3.5" />
    </>
  ),
  tali: () => (
    <>
      <Floor />
      <path d="M10 72 q10 -14 20 0 t20 0 t20 0 t20 0" fill="none" stroke={C.coral} strokeWidth="4" strokeLinecap="round" />
      {[24, 40, 56, 72].map((x, i) => (
        <rect key={x} x={x - 4} y={64 - (i % 2) * 6} width="8" height="6" rx="2" fill={[C.sun, C.sky, C.mint, C.pink][i]} {...S} strokeWidth="1.6" />
      ))}
      <Kid x={50} y={52} shirt={C.purple} arms="up" scale={0.8} />
    </>
  ),
  tulis: () => (
    <>
      <rect x="12" y="20" width="62" height="64" rx="4" fill={C.paper} {...S} />
      <path d="M20 66 H66" stroke="#e3d9c6" strokeWidth="1.5" />
      <text x="20" y="62" fontFamily="Baloo 2, sans-serif" fontWeight="800" fontSize="26" fill="#d9ccf5" letterSpacing="2">ABC</text>
      <path d="M22 62 l6 -18 l6 18 M24.5 55 h7" fill="none" stroke={C.purple} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 82 L86 40 L92 44 L64 86 L56 88 Z" fill={C.sun} {...S} />
      <path d="M86 40 l6 4" {...S} stroke={C.pink} strokeWidth="4" />
    </>
  ),
  adonan: () => (
    <>
      <ellipse cx="50" cy="82" rx="40" ry="6" fill="#efe4d0" />
      <path d="M18 78 q-2 -16 14 -18 q14 -2 16 12 q2 8 -8 8 Z" fill="#f7e1b5" {...S} />
      <path d="M52 76 q8 -8 16 0 t16 0" fill="none" stroke="#f0c987" strokeWidth="7" strokeLinecap="round" />
      <rect x="60" y="40" width="18" height="22" rx="3" fill={C.water} {...S} opacity="0.9" />
      <path d="M28 52 q2 -8 8 -6" {...S} stroke={C.skin} strokeWidth="5" fill="none" />
    </>
  ),
  jepitan: () => (
    <>
      <circle cx="50" cy="54" r="22" fill={C.box} {...S} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x = 50 + Math.cos(a) * 26;
        const y = 54 + Math.sin(a) * 26;
        return (
          <rect key={i} x={x - 3} y={y - 8} width="6" height="16" rx="2" fill={[C.coral, C.sky, C.sun, C.mint][i % 4]} {...S} strokeWidth="1.5" transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`} />
        );
      })}
      <circle cx="44" cy="50" r="2" fill={C.ink} />
      <circle cx="56" cy="50" r="2" fill={C.ink} />
      <path d="M44 60 q6 5 12 0" {...S} fill="none" />
    </>
  ),
  cat: () => (
    <>
      <rect x="10" y="26" width="64" height="58" rx="4" fill={C.paper} {...S} />
      {[[24, 44, C.coral], [44, 52, C.sky], [30, 68, C.sun], [56, 70, C.mint], [60, 38, C.pink]].map(([x, y, f]) => (
        <rect key={`${x}-${y}`} x={x - 7} y={y - 6} width="14" height="12" rx="3" fill={f} />
      ))}
      <rect x="64" y="10" width="26" height="18" rx="4" fill={C.sun} {...S} transform="rotate(20 77 19)" />
      <path d="M66 22 l-6 10" {...S} stroke={C.skin} strokeWidth="5" />
    </>
  ),
  pisang: () => (
    <>
      <path d="M26 74 q20 14 46 -8 q6 -6 2 -10 q-22 22 -48 10 Z" fill="#ffe27a" {...S} />
      <path d="M58 54 q-6 -14 4 -22 M62 56 q4 -16 16 -14 M66 58 q12 -6 18 4" fill="none" {...S} stroke="#e8b923" strokeWidth="5" />
      <path d="M74 50 q3 -2 6 0" {...S} />
      <Heart x={24} y={40} s={1.2} fill={C.coral} />
    </>
  ),
  dokter: () => (
    <>
      <circle cx="42" cy="44" r="16" fill={C.wood} {...S} />
      <circle cx="30" cy="30" r="6" fill={C.wood} {...S} />
      <circle cx="54" cy="30" r="6" fill={C.wood} {...S} />
      <ellipse cx="42" cy="72" rx="18" ry="16" fill={C.wood} {...S} />
      <circle cx="36" cy="42" r="1.8" fill={C.ink} />
      <circle cx="48" cy="42" r="1.8" fill={C.ink} />
      <path d="M38 50 q4 3 8 0" {...S} fill="none" />
      <rect x="28" y="64" width="28" height="7" rx="2" fill={C.white} {...S} strokeWidth="1.6" />
      <path d="M72 30 v16 q0 10 -10 12" fill="none" {...S} stroke={C.sky} strokeWidth="3" />
      <circle cx="62" cy="60" r="5" fill={C.sky} {...S} />
      <path d="M80 20 v10 M75 25 h10" {...S} stroke={C.coral} strokeWidth="4" />
    </>
  ),
  warung: () => (
    <>
      <path d="M14 34 h72 l-6 12 h-60 Z" fill={C.coral} {...S} />
      <path d="M26 34 l-2 12 M38 34 l-1 12 M50 34 v12 M62 34 l1 12 M74 34 l2 12" stroke={C.white} strokeWidth="4" />
      <rect x="20" y="46" width="60" height="40" fill={C.paper} {...S} />
      <rect x="26" y="56" width="12" height="16" rx="1" fill={C.sky} {...S} strokeWidth="1.6" />
      <rect x="42" y="60" width="10" height="12" rx="1" fill={C.sun} {...S} strokeWidth="1.6" />
      <rect x="56" y="54" width="14" height="18" rx="1" fill={C.mint} {...S} strokeWidth="1.6" />
      <path d="M20 72 h60" {...S} />
    </>
  ),
  dapur: () => (
    <>
      <ellipse cx="50" cy="86" rx="36" ry="5" fill="#efe4d0" />
      <path d="M24 56 h52 v16 q0 12 -12 12 h-28 q-12 0 -12 -12 Z" fill={C.sky} {...S} />
      <path d="M18 56 h64" {...S} strokeWidth="3" />
      <path d="M40 44 q4 -12 10 -4 q4 -10 10 2" fill={C.leaf} {...S} />
      <path d="M70 30 l-8 30" {...S} stroke={C.wood} strokeWidth="4" />
    </>
  ),
  telepon: () => (
    <>
      <path d="M22 40 h18 l-3 30 h-12 Z" fill={C.sun} {...S} />
      <path d="M60 40 h18 l-3 30 h-12 Z" fill={C.mint} {...S} />
      <path d="M31 40 q19 -20 38 0" fill="none" stroke={C.coral} strokeWidth="2" strokeDasharray="3 3" />
      <path d="M14 30 q-5 6 0 12 M84 30 q5 6 0 12" fill="none" {...S} stroke={C.purple} />
      <Bubble x={38} y={10} w={24} h={14}><text x="50" y="21" textAnchor="middle" fontSize="9" fontWeight="800" fill={C.ink} fontFamily="Nunito, sans-serif">Halo</text></Bubble>
    </>
  ),
  foto: () => (
    <>
      <rect x="16" y="22" width="68" height="56" rx="4" fill={C.white} {...S} />
      <rect x="22" y="28" width="56" height="40" fill="#dff1ff" />
      <path d="M22 68 l16 -18 l10 10 l10 -8 l20 16 Z" fill={C.leaf} />
      <circle cx="66" cy="38" r="5" fill={C.sun} />
      <circle cx="38" cy="44" r="5" fill={C.skin} {...S} strokeWidth="1.4" />
      <circle cx="48" cy="46" r="4" fill={C.skin} {...S} strokeWidth="1.4" />
    </>
  ),
  cermin: () => (
    <>
      <ellipse cx="50" cy="48" rx="26" ry="32" fill="#dff1ff" {...S} strokeWidth="4" stroke={C.wood} />
      <path d="M34 32 l8 -8 M30 42 l14 -14" stroke={C.white} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="52" r="12" fill={C.skin} />
      <circle cx="46" cy="50" r="1.5" fill={C.ink} />
      <circle cx="54" cy="50" r="1.5" fill={C.ink} />
      <path d="M45 56 q5 5 10 0" {...S} fill="none" />
      <path d="M38 88 h24" {...S} stroke={C.wood} strokeWidth="5" />
    </>
  ),
  wajah: () => (
    <>
      {[
        [26, 40, C.sun, 'M20 46 q6 6 12 0'],
        [74, 40, C.sky, 'M68 50 q6 -6 12 0'],
        [50, 70, C.coral, 'M44 76 h12'],
      ].map(([x, y, f, mouth]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="15" fill={f} {...S} />
          <circle cx={x - 5} cy={y - 3} r="1.8" fill={C.ink} />
          <circle cx={x + 5} cy={y - 3} r="1.8" fill={C.ink} />
          <path d={mouth} {...S} fill="none" />
        </g>
      ))}
      <path d="M43 60 l5 3 M57 60 l-5 3" {...S} />
    </>
  ),
  tanaman: () => (
    <>
      <path d="M30 62 h32 l-4 24 h-24 Z" fill={C.coral} {...S} />
      <path d="M46 62 V34" {...S} stroke={C.leaf} strokeWidth="3" />
      <path d="M46 46 q-16 -2 -16 -14 q14 0 16 14 M46 40 q14 -4 16 -16 q-16 2 -16 16" fill={C.leaf} {...S} />
      <path d="M68 30 h16 l4 -6 M68 30 v14 h14 V30" fill={C.sky} {...S} />
      <path d="M66 50 v4 M62 54 v4 M70 54 v4" stroke={C.water} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  air: () => (
    <>
      <path d="M16 60 h68 l-6 24 h-56 Z" fill={C.sky} {...S} />
      <path d="M20 66 q8 -5 15 0 t15 0 t15 0 t15 0" fill="none" stroke={C.white} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M44 34 h16 v10 q0 6 -8 6 q-8 0 -8 -6 Z M60 38 q8 0 6 8" fill={C.mint} {...S} />
      <path d="M44 38 l-8 -4" {...S} />
      <path d="M36 42 v6 M33 50 v4" stroke={C.water} strokeWidth="3" strokeLinecap="round" />
      <circle cx="68" cy="70" r="4" fill={C.sun} {...S} strokeWidth="1.5" />
    </>
  ),
  pakaian: () => (
    <>
      <path d="M30 22 l-16 12 l8 12 l8 -5 v40 h40 v-40 l8 5 l8 -12 l-16 -12 q-10 8 -20 0 Z" fill={C.sky} {...S} />
      <path d="M50 30 V80" {...S} stroke="#1f6fa6" />
      {[40, 52, 64].map((y) => (
        <circle key={y} cx="56" cy={y} r="2.6" fill={C.sun} {...S} strokeWidth="1.2" />
      ))}
    </>
  ),
  dadu: () => (
    <>
      <path d="M14 80 q20 -30 40 -10 t36 -30" fill="none" stroke="#d9cdb8" strokeWidth="9" strokeLinecap="round" />
      <path d="M14 80 q20 -30 40 -10 t36 -30" fill="none" stroke={C.white} strokeWidth="2" strokeDasharray="4 6" />
      <rect x="30" y="20" width="26" height="26" rx="6" fill={C.white} {...S} />
      <circle cx="37" cy="27" r="2.4" fill={C.ink} />
      <circle cx="43" cy="33" r="2.4" fill={C.ink} />
      <circle cx="49" cy="39" r="2.4" fill={C.ink} />
      <circle cx="84" cy="40" r="5" fill={C.coral} {...S} />
    </>
  ),
  kartu: () => (
    <>
      <rect x="12" y="30" width="24" height="34" rx="4" fill={C.purple} {...S} />
      <path d="M18 40 l12 14 M30 40 l-12 14" stroke="#b9a5ea" strokeWidth="2" />
      <rect x="40" y="30" width="24" height="34" rx="4" fill={C.white} {...S} />
      <circle cx="52" cy="47" r="7" fill={C.sun} />
      <rect x="68" y="30" width="24" height="34" rx="4" fill={C.white} {...S} />
      <circle cx="80" cy="47" r="7" fill={C.sun} />
      <path d="M56 74 l4 4 l8 -8" {...S} stroke={C.mint} strokeWidth="3" fill="none" />
    </>
  ),
  pola: () => (
    <>
      {[C.coral, C.sky, C.coral, C.sky].map((f, i) => (
        <circle key={i} cx={16 + i * 18} cy="52" r="7.5" fill={f} {...S} />
      ))}
      <circle cx="88" cy="52" r="7.5" fill={C.white} {...S} strokeDasharray="3 3" />
      <text x="88" y="56" textAnchor="middle" fontSize="11" fontWeight="800" fill={C.ink} fontFamily="Nunito, sans-serif">?</text>
    </>
  ),
  hitung: () => (
    <>
      <path d="M36 86 v-30 q0 -6 5 -6 v-14 q0 -5 4 -5 q4 0 4 5 v-6 q0 -5 4 -5 q4 0 4 5 v4 q0 -5 4 -5 q4 0 4 5 v26 q0 20 -14 26 Z" fill={C.skin} {...S} />
      <text x="14" y="36" fontSize="18" fontWeight="800" fill={C.coral} fontFamily="Baloo 2, sans-serif">1</text>
      <text x="76" y="30" fontSize="18" fontWeight="800" fill={C.sky} fontFamily="Baloo 2, sans-serif">2</text>
      <text x="78" y="62" fontSize="18" fontWeight="800" fill={C.mint} fontFamily="Baloo 2, sans-serif">3</text>
    </>
  ),
  matahari: () => (
    <>
      <circle cx="76" cy="22" r="10" fill={C.sun} {...S} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i / 8) * Math.PI * 2;
        return <path key={i} d={`M${76 + Math.cos(a) * 14} ${22 + Math.sin(a) * 14} L${76 + Math.cos(a) * 19} ${22 + Math.sin(a) * 19}`} {...S} stroke={C.sun} strokeWidth="2.5" />;
      })}
      <Floor />
      <path d="M38 88 L10 96 L4 92 L30 86 Z" fill="rgba(43,33,64,0.25)" />
      <Kid x={38} y={88} shirt={C.mint} arms="out" />
    </>
  ),
  bunyi: () => (
    <>
      <ellipse cx="38" cy="56" rx="22" ry="7" fill="#c7ced6" {...S} />
      <path d="M30 50 h16" {...S} strokeWidth="4" />
      <path d="M58 30 l12 14" {...S} stroke={C.wood} strokeWidth="5" />
      <path d="M68 52 q6 6 0 12 M74 46 q11 12 0 24 M80 40 q16 18 0 36" fill="none" {...S} stroke={C.purple} />
      <Note x={18} y={30} fill={C.sky} />
    </>
  ),
  bola: () => (
    <>
      <Floor />
      <Ball x={56} y={52} r={16} />
      <path d="M20 40 h14 M16 52 h16 M20 64 h14" {...S} stroke="#d9cdb8" strokeWidth="3" />
      <ellipse cx="56" cy="86" rx="12" ry="2.5" fill="rgba(43,33,64,0.15)" />
    </>
  ),
  botol: () => (
    <>
      <Floor />
      {[30, 50, 70].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 6} 86 v-28 q0 -6 4 -8 v-8 h4 v8 q4 2 4 8 v28 Z`} fill={[C.water, C.mint, C.water][i]} {...S} />
          <rect x={x - 2.5} y="38" width="5" height="5" rx="1" fill={C.coral} {...S} strokeWidth="1.4" />
        </g>
      ))}
      <Ball x={14} y={80} r={7} c1={C.sun} c2={C.coral} />
    </>
  ),
  gelas: () => (
    <>
      <Floor />
      {[
        [32, 88], [50, 88], [68, 88], [41, 64], [59, 64], [50, 40],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x - 8} ${y} l2 -22 h12 l2 22 Z`} fill={[C.coral, C.sun, C.sky, C.mint, C.pink, C.purple][i]} {...S} />
      ))}
    </>
  ),
  mangkuk: () => (
    <>
      <path d="M14 56 h40 q0 24 -20 24 q-20 0 -20 -24 Z" fill={C.sky} {...S} />
      <circle cx="28" cy="52" r="5" fill={C.paper} {...S} strokeWidth="1.5" />
      <circle cx="40" cy="50" r="5" fill={C.paper} {...S} strokeWidth="1.5" />
      <path d="M56 70 h28 q0 14 -14 14 q-14 0 -14 -14 Z" fill={C.mint} {...S} />
      <ellipse cx="72" cy="36" rx="8" ry="5" fill="#c7ced6" {...S} />
      <path d="M66 40 l-14 14" {...S} stroke="#9aa5b1" strokeWidth="3.5" />
    </>
  ),
  boneka: () => (
    <>
      <circle cx="34" cy="26" r="7" fill={C.wood} {...S} />
      <circle cx="66" cy="26" r="7" fill={C.wood} {...S} />
      <circle cx="50" cy="38" r="17" fill={C.wood} {...S} />
      <ellipse cx="50" cy="44" rx="7" ry="5" fill="#f2d3b0" />
      <circle cx="44" cy="35" r="2" fill={C.ink} />
      <circle cx="56" cy="35" r="2" fill={C.ink} />
      <circle cx="50" cy="42" r="2" fill={C.ink} />
      <ellipse cx="50" cy="72" rx="20" ry="16" fill={C.wood} {...S} />
      <ellipse cx="50" cy="74" rx="10" ry="9" fill="#f2d3b0" />
      <Heart x={50} y={74} s={0.9} />
    </>
  ),
  bantal: () => (
    <>
      <rect x="8" y="70" width="84" height="16" rx="6" fill={C.purple} {...S} />
      <path d="M14 70 q-4 -14 10 -16 h18 q14 2 10 16 Z" fill={C.paper} {...S} />
      <path d="M52 70 q-4 -14 10 -16 h18 q14 2 10 16 Z" fill={C.sun} {...S} />
      <Kid x={74} y={52} shirt={C.coral} arms="out" scale={0.7} />
    </>
  ),
  undakan: () => (
    <>
      <rect x="6" y="80" width="88" height="8" rx="3" fill={C.mint} {...S} />
      <rect x="38" y="62" width="40" height="18" rx="2" fill={C.wood} {...S} />
      <Adult x={20} y={80} arms="hold" />
      <Kid x={52} y={62} shirt={C.coral} arms="out" scale={0.85} />
    </>
  ),
  garis: () => (
    <>
      <path d="M6 82 L94 82" stroke={C.sun} strokeWidth="6" strokeLinecap="round" />
      <Kid x={50} y={82} shirt={C.sky} arms="out" />
    </>
  ),
  lompat: () => (
    <>
      <Floor />
      <path d="M50 88 v-6" stroke={C.sun} strokeWidth="6" />
      <Kid x={50} y={66} shirt={C.coral} arms="up" />
      <path d="M26 82 q8 -24 24 -26 q16 2 24 26" fill="none" stroke="#d9cdb8" strokeWidth="2.2" strokeDasharray="3 4" />
    </>
  ),
  lari: () => (
    <>
      <Floor />
      {[20, 46, 72].map((x) => (
        <ellipse key={x} cx={x} cy="86" rx="7" ry="3" fill={C.coral} {...S} strokeWidth="1.5" />
      ))}
      <Kid x={58} y={84} shirt={C.mint} arms="out" />
      <path d="M30 56 h12 M26 64 h14 M30 72 h10" {...S} stroke="#d9cdb8" strokeWidth="2.5" />
    </>
  ),
  menari: () => (
    <>
      <Floor />
      <Kid x={50} y={88} shirt={C.pink} arms="up" />
      <Note x={20} y={40} fill={C.purple} />
      <Note x={74} y={30} fill={C.sky} />
      <path d="M34 70 q-6 -4 -4 -10 M66 70 q6 -4 4 -10" fill="none" {...S} stroke="#d9cdb8" />
    </>
  ),
  lagu: () => (
    <>
      <circle cx="40" cy="54" r="22" fill={C.skin} />
      <path d="M18 52 q2 -26 22 -24 q20 -2 22 22 q-12 -10 -22 -8 q-12 -2 -22 10" fill={C.hair} />
      <circle cx="32" cy="52" r="2" fill={C.ink} />
      <circle cx="48" cy="52" r="2" fill={C.ink} />
      <ellipse cx="40" cy="64" rx="5" ry="6" fill={C.coral} {...S} />
      <Note x={70} y={40} fill={C.purple} />
      <Note x={78} y={70} fill={C.sky} />
    </>
  ),
  tepuk: () => (
    <>
      <path d="M30 76 q-4 -20 6 -34 q6 -6 10 2 l4 24 Z" fill={C.skin} {...S} transform="rotate(-12 40 60)" />
      <path d="M70 76 q4 -20 -6 -34 q-6 -6 -10 2 l-4 24 Z" fill={C.skin} {...S} transform="rotate(12 60 60)" />
      <path d="M50 24 v-8 M36 28 l-5 -6 M64 28 l5 -6" {...S} stroke={C.sun} strokeWidth="3" />
    </>
  ),
  tarik: () => (
    <>
      <Floor />
      <Adult x={20} y={88} arms="out" />
      <Kid x={80} y={88} shirt={C.sun} arms="out" />
      <path d="M34 54 q16 6 34 14" fill="none" stroke={C.sky} strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  kain: () => (
    <>
      <circle cx="50" cy="52" r="24" fill={C.skin} />
      <path d="M26 48 q2 -26 24 -26 q22 0 24 24 q-12 -10 -24 -8 q-12 -2 -24 10" fill={C.hair} />
      <circle cx="58" cy="52" r="2.4" fill={C.ink} />
      <path d="M50 64 q6 4 12 0" {...S} fill="none" />
      <path d="M18 30 q14 6 30 0 l4 54 q-18 6 -30 -2 Z" fill={C.pink} {...S} />
      <path d="M24 40 q10 4 22 0 M26 56 q10 4 22 0" stroke="#f7a8c9" strokeWidth="2" fill="none" />
    </>
  ),
  buku: () => (
    <>
      <path d="M50 30 q-18 -8 -38 0 v50 q20 -8 38 0 Z" fill={C.paper} {...S} />
      <path d="M50 30 q18 -8 38 0 v50 q-20 -8 -38 0 Z" fill={C.paper} {...S} />
      <circle cx="30" cy="50" r="8" fill={C.sun} />
      <path d="M58 44 h22 M58 52 h22 M58 60 h16" stroke="#c9bfae" strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  peluk: () => (
    <>
      <Floor />
      <Adult x={44} y={88} arms="out" hijab />
      <Kid x={56} y={88} shirt={C.sun} arms="up" scale={0.9} />
      <Heart x={76} y={26} s={1.5} />
      <Heart x={22} y={36} s={1} fill={C.coral} />
    </>
  ),
  tidur: () => (
    <>
      <rect x="8" y="70" width="84" height="14" rx="6" fill={C.sky} {...S} />
      <ellipse cx="54" cy="64" rx="26" ry="8" fill={C.coral} {...S} />
      <circle cx="22" cy="62" r="9" fill={C.skin} {...S} />
      <path d="M17 62 q2 2 4 0 M24 62 q2 2 4 0" {...S} strokeWidth="1.4" fill="none" />
      <circle cx="54" cy="52" r="6" fill={C.wood} {...S} />
      <text x="70" y="36" fontSize="14" fontWeight="800" fill={C.purple} fontFamily="Baloo 2, sans-serif">z</text>
      <text x="80" y="26" fontSize="10" fontWeight="800" fill={C.purple} fontFamily="Baloo 2, sans-serif">z</text>
    </>
  ),
  krayon: () => (
    <>
      <rect x="10" y="24" width="60" height="58" rx="4" fill={C.paper} {...S} />
      <path d="M18 64 q8 -20 16 -6 t16 -10 t12 4" fill="none" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="38" r="7" fill="none" stroke={C.sky} strokeWidth="3" />
      {[C.coral, C.sky, C.sun].map((f, i) => (
        <g key={i} transform={`rotate(-30 ${78 + i * 6} ${50 + i * 10})`}>
          <rect x={72 + i * 6} y={40 + i * 10} width="8" height="26" rx="2" fill={f} {...S} strokeWidth="1.6" />
          <path d={`M${72 + i * 6} ${40 + i * 10} l4 -7 l4 7`} fill={f} {...S} strokeWidth="1.6" />
        </g>
      ))}
    </>
  ),
  kertas: () => (
    <>
      <path d="M14 26 h34 l-4 10 l5 8 l-6 10 l4 10 l-4 10 h-29 Z" fill={C.paper} {...S} />
      <path d="M56 30 l12 -6 l12 6 l-12 6 Z M56 44 l12 -6 l12 6 l-12 6 Z M56 58 l12 -6 l12 6 l-12 6 Z" fill={C.sun} {...S} strokeWidth="1.6" />
      <path d="M68 70 v14" {...S} stroke={C.wood} strokeWidth="3" />
      <rect x="20" y="34" width="8" height="6" fill={C.sky} transform="rotate(-10 24 37)" />
      <rect x="26" y="58" width="8" height="6" fill={C.pink} transform="rotate(14 30 61)" />
    </>
  ),
  keranjang: () => (
    <>
      <path d="M18 50 h64 l-6 34 h-52 Z" fill={C.wood} {...S} />
      <path d="M26 50 l3 34 M38 50 l1 34 M50 50 v34 M62 50 l-1 34 M74 50 l-3 34 M20 64 h60" stroke="#a96f3e" strokeWidth="1.8" />
      <Ball x={36} y={44} r={8} />
      <circle cx="60" cy="40" r="9" fill={C.wood} {...S} />
      <circle cx="54" cy="32" r="3.5" fill={C.wood} {...S} strokeWidth="1.5" />
      <circle cx="66" cy="32" r="3.5" fill={C.wood} {...S} strokeWidth="1.5" />
    </>
  ),
  kardus: () => (
    <>
      <Box x={30} y={50} w={40} h={32} />
      <circle cx="50" cy="44" r="8" fill={C.sky} {...S} />
      <path d="M46 42 h0 M54 42 h0" {...S} strokeWidth="3" />
      <text x="76" y="40" fontSize="18" fontWeight="800" fill={C.purple} fontFamily="Baloo 2, sans-serif">?</text>
    </>
  ),
  hewan: () => (
    <>
      <path d="M22 44 l4 -16 l10 10 h12 l10 -10 l4 16 q4 24 -20 26 q-24 -2 -20 -26 Z" fill={C.sun} {...S} />
      <circle cx="35" cy="48" r="2" fill={C.ink} />
      <circle cx="51" cy="48" r="2" fill={C.ink} />
      <path d="M40 56 l3 2 l3 -2 M30 56 h-10 M56 56 h10" {...S} strokeWidth="1.5" fill="none" />
      <ellipse cx="78" cy="70" rx="10" ry="8" fill={C.sky} {...S} />
      <circle cx="84" cy="60" r="6" fill={C.sky} {...S} />
      <path d="M89 60 l6 2 l-6 2" fill={C.coral} {...S} strokeWidth="1.4" />
      <circle cx="85" cy="58" r="1.2" fill={C.ink} />
    </>
  ),
  raba: () => (
    <>
      <Box x={22} y={44} w={56} h={40} open={false} />
      <ellipse cx="50" cy="60" rx="10" ry="7" fill="#5a3b21" />
      <path d="M50 30 v24" {...S} stroke={C.skin} strokeWidth="8" />
      <text x="72" y="32" fontSize="20" fontWeight="800" fill={C.purple} fontFamily="Baloo 2, sans-serif">?</text>
    </>
  ),
  jalan: () => (
    <>
      {[[18, 80], [30, 70], [42, 78], [54, 66], [66, 74], [78, 62]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="6" fill={i % 2 ? C.sky : C.coral} />
      ))}
      <Kid x={80} y={52} shirt={C.mint} arms="out" scale={0.8} />
    </>
  ),
  bicara: () => (
    <>
      <Bubble x={10} y={18} w={44} h={24} fill={C.sun}>
        <path d="M18 28 h28 M18 34 h18" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
      </Bubble>
      <g transform="translate(100 0) scale(-1 1)">
        <Bubble x={10} y={52} w={44} h={24} fill={C.sky}>
          <path d="M18 62 h28 M18 68 h20" stroke={C.white} strokeWidth="2" strokeLinecap="round" />
        </Bubble>
      </g>
    </>
  ),
};

export const ART_CONCEPTS = Object.keys(SCENES);

/** Ilustrasi dekoratif untuk satu langkah. Teks langkah di sebelahnya sudah menjelaskan isinya. */
export default function StepArt({ concept }) {
  const Scene = SCENES[concept] || SCENES.bersama;
  return (
    <svg className="step-art" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <Scene />
    </svg>
  );
}
