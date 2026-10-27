/** Logo orisinal Main Tumbuh: gajah kecil di atas tiga balok mainan. */
export default function Logo({ size = 56, title = 'Logo Main Tumbuh' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={title} className="logo">
      {/* Tiga balok mainan */}
      <rect x="3" y="44" width="18" height="17" rx="3" fill="#ff7a59" />
      <rect x="23" y="44" width="18" height="17" rx="3" fill="#f5b700" />
      <rect x="43" y="44" width="18" height="17" rx="3" fill="#2f9be0" />
      <circle cx="12" cy="52.5" r="3" fill="#fff" opacity="0.85" />
      <path d="M29 56 L32 49 L35 56 Z" fill="#fff" opacity="0.85" />
      <rect x="49" y="49.5" width="6" height="6" rx="1" fill="#fff" opacity="0.85" />
      {/* Gajah */}
      <ellipse cx="34" cy="33" rx="15" ry="10.5" fill="#a98bdf" />
      <rect x="23" y="36" width="6" height="8.5" rx="2.5" fill="#a98bdf" />
      <rect x="38" y="36" width="6" height="8.5" rx="2.5" fill="#a98bdf" />
      <path d="M48 30 q5 -1 4.5 4" stroke="#a98bdf" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="21" cy="24" r="10" fill="#b79cea" />
      <ellipse cx="25" cy="22" rx="6" ry="7.5" fill="#f7a8c9" stroke="#b79cea" strokeWidth="2" />
      <path d="M13.5 27 q-4 6 -1 11 q1.5 2 3 0.5" stroke="#b79cea" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="17.5" cy="21" r="1.8" fill="#2b2140" />
      <circle cx="17" cy="20.4" r="0.6" fill="#fff" />
      <circle cx="15" cy="25.5" r="1.6" fill="#ff9fb6" opacity="0.8" />
    </svg>
  );
}
