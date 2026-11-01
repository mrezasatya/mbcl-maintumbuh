import { describe, expect, it } from 'vitest';
import {
  HISTORY_KEY, MAX_ENTRIES, addEntry, dateKey, formatDate, isDoneOn, loadHistory,
  removeActivityOn, removeEntry, saveHistory, summarize,
} from './history.js';

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
    removeItem: (k) => { delete data[k]; },
    data,
  };
}

const brokenStorage = {
  getItem() { throw new Error('diblokir'); },
  setItem() { throw new Error('diblokir'); },
  removeItem() { throw new Error('diblokir'); },
};

const act = (id, domain = 'kasar') => ({ id, judul: `Kegiatan ${id}`, domain });

describe('riwayat', () => {
  it('dateKey memakai tanggal lokal', () => {
    expect(dateKey(new Date(2026, 0, 5))).toBe('2026-01-05');
  });

  it('menambah tanpa dobel di tanggal yang sama', () => {
    let h = addEntry([], act('kasar-01'), '2026-11-01');
    h = addEntry(h, act('kasar-01'), '2026-11-01');
    expect(h).toHaveLength(1);
    h = addEntry(h, act('kasar-01'), '2026-11-02');
    expect(h).toHaveLength(2);
    expect(isDoneOn(h, 'kasar-01', '2026-11-02')).toBe(true);
  });

  it('menghapus satu catatan atau satu kegiatan di satu tanggal', () => {
    let h = addEntry([], act('a-1'), '2026-11-01');
    h = addEntry(h, act('a-2'), '2026-11-01');
    expect(removeEntry(h, h[0].id)).toHaveLength(1);
    expect(removeActivityOn(h, 'a-1', '2026-11-01').map((e) => e.activityId)).toEqual(['a-2']);
  });

  it('membatasi jumlah catatan', () => {
    let h = [];
    for (let i = 0; i < MAX_ENTRIES + 20; i += 1) h = addEntry(h, act(`k-${i}`), '2026-11-01');
    expect(h).toHaveLength(MAX_ENTRIES);
  });

  it('menyimpan dan membaca kembali', () => {
    const s = memoryStorage();
    const h = addEntry([], act('bahasa-01', 'bahasa'), '2026-11-01');
    expect(saveHistory(s, h)).toBe(true);
    expect(loadHistory(s)).toEqual(h);
    expect(saveHistory(s, [])).toBe(true);
    expect(HISTORY_KEY in s.data).toBe(false);
  });

  it('aman bila data rusak atau storage diblokir', () => {
    expect(loadHistory(memoryStorage({ [HISTORY_KEY]: '{rusak' }))).toEqual([]);
    expect(loadHistory(memoryStorage({ [HISTORY_KEY]: '[{"id":1}]' }))).toEqual([]);
    expect(loadHistory(brokenStorage)).toEqual([]);
    expect(saveHistory(brokenStorage, [])).toBe(false);
    expect(loadHistory(undefined)).toEqual([]);
  });

  it('ringkasan per domain dan per tanggal (terbaru dulu)', () => {
    let h = addEntry([], act('kasar-01'), '2026-11-01');
    h = addEntry(h, act('bahasa-01', 'bahasa'), '2026-11-03');
    h = addEntry(h, act('bahasa-02', 'bahasa'), '2026-11-03');
    const s = summarize(h);
    expect(s.total).toBe(3);
    expect(s.activeDays).toBe(2);
    expect(s.perDomain.bahasa).toBe(2);
    expect(s.groups[0].date).toBe('2026-11-03');
  });

  it('format tanggal Indonesia', () => {
    expect(formatDate('2026-11-02')).toBe('Senin, 2 November 2026');
  });
});
