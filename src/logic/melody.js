// Melodi kotak musik orisinal Main Tumbuh (ciptaan sendiri, bukan lagu yang sudah ada).
// Birama 3/4, tangga nada pentatonik C agar terdengar lembut dan tidak sumbang.

export const TEMPO_BPM = 84;
export const BEATS_PER_BAR = 3;

// [nada, ketukan] per birama; nada dalam notasi ilmiah (C4 = do tengah).
export const MELODY = [
  [['E4', 1], ['G4', 1], ['A4', 1]],
  [['G4', 2], ['E4', 1]],
  [['D4', 1], ['E4', 1], ['G4', 1]],
  [['C4', 3]],
  [['E4', 1], ['G4', 1], ['C5', 1]],
  [['A4', 2], ['G4', 1]],
  [['E4', 1], ['D4', 1], ['E4', 1]],
  [['D4', 3]],
  [['G4', 1], ['A4', 1], ['C5', 1]],
  [['D5', 2], ['C5', 1]],
  [['A4', 1], ['G4', 1], ['A4', 1]],
  [['G4', 3]],
  [['E4', 1], ['G4', 1], ['A4', 1]],
  [['G4', 1], ['E4', 1], ['D4', 1]],
  [['D4', 1], ['E4', 1], ['D4', 1]],
  [['C4', 3]],
];

// Nada bas di ketukan pertama setiap birama.
export const BASS = ['C3', 'A2', 'G2', 'C3', 'C3', 'F2', 'C3', 'G2', 'E2', 'G2', 'F2', 'C3', 'A2', 'C3', 'G2', 'C3'];

const SEMITONES = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

/** Frekuensi (Hz) dari nama nada, mis. 'A4' -> 440. */
export function noteToFreq(note) {
  const m = /^([A-G])(\d)$/.exec(note);
  if (!m) throw new Error(`Nada tidak dikenal: ${note}`);
  const midi = (Number(m[2]) + 1) * 12 + SEMITONES[m[1]];
  return 440 * 2 ** ((midi - 69) / 12);
}

/** Daftar peristiwa satu putaran: { time (detik), freq, dur (detik), voice }. */
export function buildLoop(bpm = TEMPO_BPM) {
  const beat = 60 / bpm;
  const events = [];
  MELODY.forEach((bar, b) => {
    const barStart = b * BEATS_PER_BAR * beat;
    let t = barStart;
    for (const [note, beats] of bar) {
      events.push({ time: t, freq: noteToFreq(note), dur: beats * beat, voice: 'melodi' });
      t += beats * beat;
    }
    events.push({ time: barStart, freq: noteToFreq(BASS[b]), dur: BEATS_PER_BAR * beat, voice: 'bas' });
  });
  events.sort((a, b) => a.time - b.time);
  return { events, length: MELODY.length * BEATS_PER_BAR * beat };
}
