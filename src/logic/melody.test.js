import { describe, expect, it } from 'vitest';
import { BASS, BEATS_PER_BAR, MELODY, buildLoop, noteToFreq } from './melody.js';

describe('melodi', () => {
  it('setiap birama berjumlah 3 ketukan', () => {
    for (const bar of MELODY) {
      expect(bar.reduce((s, [, beats]) => s + beats, 0)).toBe(BEATS_PER_BAR);
    }
  });

  it('bas tersedia untuk setiap birama', () => {
    expect(BASS).toHaveLength(MELODY.length);
  });

  it('nada hanya dari tangga nada pentatonik C (C D E G A)', () => {
    for (const bar of MELODY) for (const [note] of bar) expect(note[0]).toMatch(/[CDEGA]/);
  });

  it('frekuensi nada benar', () => {
    expect(noteToFreq('A4')).toBeCloseTo(440, 5);
    expect(noteToFreq('C4')).toBeCloseTo(261.63, 1);
  });

  it('satu putaran tersusun urut dan tidak melewati panjangnya', () => {
    const { events, length } = buildLoop();
    expect(events.length).toBeGreaterThan(MELODY.length);
    for (let i = 1; i < events.length; i += 1) expect(events[i].time).toBeGreaterThanOrEqual(events[i - 1].time);
    for (const e of events) {
      expect(e.time).toBeGreaterThanOrEqual(0);
      expect(e.time + e.dur).toBeLessThanOrEqual(length + 1e-9);
    }
  });
});
