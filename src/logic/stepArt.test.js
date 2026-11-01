import { describe, expect, it } from 'vitest';
import { FALLBACK, STEP_RULES, matchConcept, stepConcept, stepConcepts } from './stepArt.js';
import { ART_CONCEPTS } from '../components/StepArt.jsx';
import { ACTIVITIES } from '../data/activities/index.js';

describe('ilustrasi langkah', () => {
  it('setiap konsep di aturan punya gambar', () => {
    const needed = new Set([...STEP_RULES.map(([c]) => c), FALLBACK]);
    for (const c of needed) expect(ART_CONCEPTS, c).toContain(c);
  });

  it('setiap langkah di pustaka mendapat ilustrasi yang ada', () => {
    for (const a of ACTIVITIES) {
      for (const l of a.langkah) expect(ART_CONCEPTS).toContain(stepConcept(l, a));
    }
  });

  it('sebagian besar langkah memakai ilustrasi spesifik, bukan cadangan umum', () => {
    let generic = 0;
    let total = 0;
    for (const a of ACTIVITIES) {
      for (const l of a.langkah) {
        total += 1;
        if (stepConcept(l, a) === FALLBACK) generic += 1;
      }
    }
    expect(generic / total).toBeLessThan(0.05);
  });

  it('gambar berulang berturut-turut dikurangi', () => {
    let before = 0;
    let after = 0;
    for (const a of ACTIVITIES) {
      const single = a.langkah.map((l) => stepConcept(l, a));
      const multi = stepConcepts(a);
      expect(multi).toHaveLength(a.langkah.length);
      for (const c of multi) expect(ART_CONCEPTS).toContain(c);
      for (let i = 1; i < single.length; i += 1) {
        if (single[i] === single[i - 1]) before += 1;
        if (multi[i] === multi[i - 1]) after += 1;
      }
    }
    expect(after).toBeLessThan(before);
  });

  it('contoh pemetaan', () => {
    expect(matchConcept('Gelindingkan bola pelan ke arah si kecil.')).toBe('bola');
    expect(matchConcept('Pilih tujuan dekat, misalnya dari kamar ke dapur.')).not.toBe('dapur');
    expect(matchConcept('Tunjukkan cara memegang gunting: ibu jari di atas.')).toBe('gunting');
  });
});
