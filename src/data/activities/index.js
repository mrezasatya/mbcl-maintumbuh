import { kasar } from './kasar.js';
import { halus } from './halus.js';
import { bahasa } from './bahasa.js';
import { kognitif } from './kognitif.js';
import { sosem } from './sosem.js';
import { kasarDetail } from './detail/kasar.js';
import { halusDetail } from './detail/halus.js';
import { bahasaDetail } from './detail/bahasa.js';
import { kognitifDetail } from './detail/kognitif.js';
import { sosemDetail } from './detail/sosem.js';

/** Penjelasan rinci (gambaran, manfaat, tips) per id kegiatan. */
export const DETAILS = { ...kasarDetail, ...halusDetail, ...bahasaDetail, ...kognitifDetail, ...sosemDetail };

/** Seluruh pustaka kegiatan Main Tumbuh, lengkap dengan penjelasan rinci. */
export const ACTIVITIES = [...kasar, ...halus, ...bahasa, ...kognitif, ...sosem].map((a) => ({
  ...a,
  ...DETAILS[a.id],
}));
