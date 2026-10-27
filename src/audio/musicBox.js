import { buildLoop } from '../logic/melody.js';

// Pemutar kotak musik berbasis Web Audio API: nada dibuat langsung di browser,
// tanpa berkas audio dan tanpa koneksi jaringan.

const LOOKAHEAD = 0.4; // detik penjadwalan ke depan
const TICK_MS = 120;
const VOLUME = 0.16;

export function createMusicBox() {
  const AudioCtx = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
  if (!AudioCtx) return null;

  const { events, length } = buildLoop();
  let ctx = null;
  let master = null;
  let timer = null;
  let loopStart = 0;
  let nextIndex = 0;
  let playing = false;

  function pluck(time, freq, dur, voice) {
    const isBass = voice === 'bas';
    const peak = isBass ? 0.35 : 0.5;
    const decay = Math.min(dur, isBass ? 2.4 : 1.4);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);
    gain.connect(master);

    const tone = ctx.createOscillator();
    tone.type = isBass ? 'sine' : 'triangle';
    tone.frequency.value = freq;
    tone.connect(gain);
    tone.start(time);
    tone.stop(time + decay + 0.05);

    if (!isBass) {
      // Dentingan halus satu oktaf di atas, khas kotak musik.
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.value = freq * 2;
      bellGain.gain.setValueAtTime(0.0001, time);
      bellGain.gain.exponentialRampToValueAtTime(0.12, time + 0.008);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);
      bell.connect(bellGain);
      bellGain.connect(master);
      bell.start(time);
      bell.stop(time + 0.55);
    }
  }

  function schedule() {
    const until = ctx.currentTime + LOOKAHEAD;
    for (;;) {
      if (nextIndex >= events.length) {
        nextIndex = 0;
        loopStart += length;
      }
      const e = events[nextIndex];
      const at = loopStart + e.time;
      if (at > until) break;
      if (at >= ctx.currentTime - 0.01) pluck(at, e.freq, e.dur, e.voice);
      nextIndex += 1;
    }
  }

  return {
    get playing() {
      return playing;
    },
    async start() {
      if (playing) return;
      if (!ctx) {
        ctx = new AudioCtx();
        master = ctx.createGain();
        const soften = ctx.createBiquadFilter();
        soften.type = 'lowpass';
        soften.frequency.value = 3200;
        master.connect(soften);
        soften.connect(ctx.destination);
      }
      if (ctx.state === 'suspended') await ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(VOLUME, ctx.currentTime + 1.2);
      loopStart = ctx.currentTime + 0.1;
      nextIndex = 0;
      playing = true;
      schedule();
      timer = setInterval(schedule, TICK_MS);
    },
    stop() {
      if (!playing) return;
      playing = false;
      clearInterval(timer);
      timer = null;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
      setTimeout(() => {
        if (!playing && ctx) ctx.suspend();
      }, 700);
    },
  };
}
