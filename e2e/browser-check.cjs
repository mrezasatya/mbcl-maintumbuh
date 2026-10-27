// Uji browser Main Tumbuh dengan Playwright.
// Pemakaian: jalankan `npm run build && npm run preview`, lalu
//   BASE_URL=http://localhost:4173 node e2e/browser-check.cjs
// Membutuhkan paket `playwright` beserta Chromium (npm i -D playwright && npx playwright install chromium).
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';
const SHOT_DIR = process.env.SHOT_DIR || path.join(__dirname, 'screenshots');
fs.mkdirSync(SHOT_DIR, { recursive: true });

const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

let failures = 0;
function check(cond, msg) {
  console.log(`${cond ? 'OK  ' : 'GAGAL'} ${msg}`);
  if (!cond) failures += 1;
}

function monthsAgo(n) {
  const d = new Date();
  const total = d.getFullYear() * 12 + d.getMonth() - n;
  return { month: (total % 12) + 1, year: Math.floor(total / 12) };
}

async function choose(page, { month, year }) {
  await page.getByLabel('Bulan lahir').selectOption(String(month));
  await page.getByLabel('Tahun lahir').selectOption(String(year));
  await page.getByRole('button', { name: 'Ayo, susun rencana 7 hari!' }).click();
}

async function noOverflow(page, width) {
  const r = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    iw: window.innerWidth,
  }));
  check(r.sw <= r.iw, `tanpa overflow horizontal di ${width}px (scrollWidth ${r.sw}, lebar ${r.iw})`);
}

(async () => {
  const browser = await chromium.launch();
  const consoleErrors = [];

  for (const width of [360, 390, 1280]) {
    const context = await browser.newContext({
      viewport: { width, height: width < 800 ? 800 : 900 },
      locale: 'id-ID',
      deviceScaleFactor: width < 800 ? 2 : 1,
    });
    const page = await context.newPage();
    page.on('console', (m) => m.type() === 'error' && consoleErrors.push(`${width}px: ${m.text()}`));
    page.on('pageerror', (e) => consoleErrors.push(`${width}px: ${e.message}`));
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const storageUsed = await page.evaluate(() => localStorage.length + sessionStorage.length);
    check(storageUsed === 0, `${width}px: tidak ada data tersimpan di storage`);
    check((await page.getAttribute('html', 'lang')) === 'id', `${width}px: lang="id"`);
    check((await page.locator('text=/cetak|pdf/i').count()) === 0, `${width}px: tidak ada tombol cetak/PDF`);
    check(
      (await page.locator('text=/Cambridge|Montessori|\\bIB\\b|kurikulum internasional/i').count()) === 0,
      `${width}px: tidak ada label kurikulum di UI`,
    );
    check((await page.locator('.parade .mascot').count()) === 5, `${width}px: lima karakter hewan tampil`);
    const music = page.locator('.music-toggle');
    check((await music.getAttribute('aria-pressed')) === 'false', `${width}px: musik tidak berbunyi otomatis`);
    await noOverflow(page, width);
    await page.screenshot({ path: path.join(SHOT_DIR, `awal-${width}.png`), fullPage: true });

    if (width === 390) {
      // Alur galat
      await page.getByRole('button', { name: 'Ayo, susun rencana 7 hari!' }).click();
      check(/pilih dulu bulan dan tahun/i.test(await page.getByRole('alert').innerText()), 'galat kosong');

      const now = new Date();
      if (now.getMonth() < 11) {
        await choose(page, { month: now.getMonth() + 2, year: now.getFullYear() });
        check(/belum datang/i.test(await page.getByRole('alert').innerText()), 'galat masa depan');
      }

      await choose(page, monthsAgo(6));
      const young = await page.getByRole('alert').innerText();
      check(/0 tahun 6 bulan/.test(young) && /posyandu/.test(young), 'galat terlalu muda menyebut usia dan saran');

      await choose(page, { month: 1, year: now.getFullYear() - 10 });
      check(/menemani anak usia 1 tahun 0 bulan sampai 6 tahun 11 bulan/.test(await page.getByRole('alert').innerText()), 'galat terlalu tua');
      await page.screenshot({ path: path.join(SHOT_DIR, `galat-${width}.png`) });
    }

    // Alur sukses: 27 bulan
    await choose(page, monthsAgo(27));
    await page.getByRole('heading', { name: 'Hore, rencana 7 hari sudah siap!' }).waitFor();
    check(await page.getByText('2 tahun 3 bulan').first().isVisible(), `${width}px: ringkasan usia "2 tahun 3 bulan"`);
    check(await page.getByText('(27 bulan)').isVisible(), `${width}px: usia dalam bulan`);
    check((await page.getByRole('tab').count()) === 7, `${width}px: 7 tab hari`);
    check(await page.getByText('Penyaring keselamatan aktif.').isVisible(), `${width}px: penyaring keselamatan tampil`);
    check(await page.getByRole('link', { name: 'Baca catatan penting di bagian bawah' }).isVisible(), `${width}px: tautan catatan penting`);
    await page.waitForFunction(() => {
      const top = document.getElementById('plan-title')?.getBoundingClientRect().top;
      return top !== undefined && top < 200;
    }, null, { timeout: 3000 }).catch(() => {});
    const headingTop = await page.getByRole('heading', { name: 'Hore, rencana 7 hari sudah siap!' }).evaluate((el) => el.getBoundingClientRect().top);
    check(headingTop < 200, `${width}px: halaman digulir ke hasil (top ${Math.round(headingTop)})`);
    await noOverflow(page, width);
    await page.screenshot({ path: path.join(SHOT_DIR, `rencana-${width}.png`), fullPage: true });

    if (width === 1280) {
      // Tab dengan keyboard
      const tabs = page.getByRole('tab');
      await tabs.nth(0).focus();
      await page.keyboard.press('ArrowRight');
      check((await tabs.nth(1).getAttribute('aria-selected')) === 'true', 'panah kanan memilih Hari 2');
      check(await tabs.nth(1).evaluate((el) => el === document.activeElement), 'fokus pindah ke Hari 2');
      await page.keyboard.press('End');
      check((await tabs.nth(6).getAttribute('aria-selected')) === 'true', 'End memilih Hari 7');
      await page.keyboard.press('ArrowRight');
      check((await tabs.nth(0).getAttribute('aria-selected')) === 'true', 'panah kanan dari Hari 7 kembali ke Hari 1');
      await page.keyboard.press('ArrowLeft');
      check((await tabs.nth(6).getAttribute('aria-selected')) === 'true', 'panah kiri dari Hari 1 ke Hari 7');
      await page.keyboard.press('Home');
      check((await tabs.nth(0).getAttribute('aria-selected')) === 'true', 'Home memilih Hari 1');
      check(await page.getByRole('tabpanel').isVisible(), 'panel tab tampil');

      // Kegiatan cadangan
      await page.locator('details.backup > summary').click();
      check((await page.locator('details.backup .activity-card--cadangan').count()) === 1, 'kegiatan cadangan terbuka');

      // Hari berikutnya
      await page.getByRole('button', { name: /Hari berikutnya/ }).click();
      check((await tabs.nth(1).getAttribute('aria-selected')) === 'true', 'tombol Hari berikutnya');

      // Susun ulang
      const signature = async () => (await page.locator('.day-tab__domain').allInnerTexts()).join('|') +
        (await page.locator('.activity-card--utama .activity-card__title').innerText());
      const seen = new Set([await signature()]);
      for (let i = 0; i < 6; i += 1) {
        await page.getByRole('button', { name: 'Susun ulang' }).click();
        seen.add(await signature());
      }
      check(seen.size > 1, `Susun ulang menghasilkan rencana berbeda (${seen.size} variasi)`);

      // Panel aturan keselamatan
      await page.getByText('Aturan keselamatan', { exact: false }).first().click();
      check(await page.getByRole('heading', { name: 'Tidak pernah muncul' }).isVisible(), 'panel aturan terbuka');
      await page.screenshot({ path: path.join(SHOT_DIR, `aturan-${width}.png`), fullPage: true });

      // Musik
      const music = page.locator('.music-toggle');
      await music.click();
      await page.waitForTimeout(300);
      check((await music.getAttribute('aria-pressed')) === 'true', 'tombol musik memutar');
      check(/Hentikan musik/.test(await music.innerText()), 'label berubah menjadi Hentikan musik');
      await music.click();
      check((await music.getAttribute('aria-pressed')) === 'false', 'tombol musik menghentikan');

      // Kartu rinci
      for (const t of ['Gambaran kegiatan', 'Kenapa ini penting?', 'Siapkan bahan', 'Ayo mulai', 'Tips & variasi']) {
        check(await page.locator('.activity-card--utama').getByRole('heading', { name: t }).isVisible(), `kartu memuat bagian "${t}"`);
      }

      // Ganti usia
      await page.getByRole('button', { name: 'Ganti usia' }).click();
      check((await page.getByRole('tab').count()) === 0, 'Ganti usia menutup rencana');
      check(await page.getByLabel('Bulan lahir').evaluate((el) => el === document.activeElement), 'Ganti usia memfokuskan form');
    }

    if (width === 360) {
      await page.locator('details.backup > summary').click();
      await page.getByRole('tab').nth(6).click();
      await noOverflow(page, width);
      await page.screenshot({ path: path.join(SHOT_DIR, `hari7-${width}.png`), fullPage: true });
    }

    // Usia 5 tahun ke atas memakai titik 5 tahun
    await choose(page, monthsAgo(70));
    check(await page.getByText('titik perkembangan 5 tahun').isVisible(), `${width}px: usia 70 bulan memakai titik 5 tahun`);
    await noOverflow(page, width);

    await context.close();
  }

  check(consoleErrors.length === 0, `tidak ada error console${consoleErrors.length ? ': ' + consoleErrors.join('; ') : ''}`);
  await browser.close();
  console.log(failures ? `\n${failures} pemeriksaan gagal` : '\nSemua pemeriksaan browser lulus');
  process.exit(failures ? 1 : 0);
})();
