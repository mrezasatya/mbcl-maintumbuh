// Riwayat kegiatan yang sudah diselesaikan.
// Disimpan hanya di perangkat ini (localStorage), tanpa data lahir anak.
import { DOMAIN_IDS } from './config.js';

export const HISTORY_KEY = 'maintumbuh.riwayat.v1';
export const MAX_ENTRIES = 500;

/** Tanggal lokal dalam format YYYY-MM-DD. */
export function dateKey(now = new Date()) {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isValidEntry(e) {
  return (
    e && typeof e === 'object' &&
    typeof e.id === 'string' &&
    typeof e.activityId === 'string' &&
    typeof e.judul === 'string' &&
    DOMAIN_IDS.includes(e.domain) &&
    /^\d{4}-\d{2}-\d{2}$/.test(e.date)
  );
}

/** Membaca riwayat. Mengembalikan [] bila kosong, rusak, atau storage tidak bisa dipakai. */
export function loadHistory(storage) {
  try {
    const raw = storage?.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidEntry) : [];
  } catch {
    return [];
  }
}

/** Menyimpan riwayat. Mengembalikan true bila berhasil. */
export function saveHistory(storage, entries) {
  try {
    if (!storage) return false;
    if (entries.length === 0) storage.removeItem(HISTORY_KEY);
    else storage.setItem(HISTORY_KEY, JSON.stringify(entries));
    return true;
  } catch {
    return false;
  }
}

export function isDoneOn(entries, activityId, date) {
  return entries.some((e) => e.activityId === activityId && e.date === date);
}

/** Menandai kegiatan selesai pada tanggal tertentu (tidak dobel di tanggal yang sama). */
export function addEntry(entries, activity, date) {
  if (isDoneOn(entries, activity.id, date)) return entries;
  const entry = {
    id: `${date}_${activity.id}`,
    activityId: activity.id,
    judul: activity.judul,
    domain: activity.domain,
    date,
  };
  return [entry, ...entries].slice(0, MAX_ENTRIES);
}

export function removeEntry(entries, entryId) {
  return entries.filter((e) => e.id !== entryId);
}

export function removeActivityOn(entries, activityId, date) {
  return entries.filter((e) => !(e.activityId === activityId && e.date === date));
}

/** Ringkasan untuk laman Riwayat. */
export function summarize(entries) {
  const perDomain = Object.fromEntries(DOMAIN_IDS.map((d) => [d, 0]));
  const byDate = new Map();
  for (const e of entries) {
    perDomain[e.domain] += 1;
    if (!byDate.has(e.date)) byDate.set(e.date, []);
    byDate.get(e.date).push(e);
  }
  const groups = [...byDate.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([date, items]) => ({ date, items }));
  return { total: entries.length, activeDays: groups.length, perDomain, groups };
}

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

/** "Senin, 3 November 2026" dari "2026-11-03". */
export function formatDate(key) {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${HARI[date.getDay()]}, ${d} ${BULAN[m - 1]} ${y}`;
}
