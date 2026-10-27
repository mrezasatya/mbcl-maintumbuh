import { useEffect, useRef, useState } from 'react';
import { createMusicBox } from '../audio/musicBox.js';

/** Tombol putar/hentikan musik instrumental. Musik tidak pernah berbunyi otomatis. */
export default function MusicToggle() {
  const boxRef = useRef(null);
  const [supported, setSupported] = useState(true);
  const [playing, setPlaying] = useState(false);
  const resumeOnShow = useRef(false);

  useEffect(() => {
    boxRef.current = createMusicBox();
    if (!boxRef.current) setSupported(false);

    // Hentikan saat tab disembunyikan agar tidak berbunyi di latar belakang.
    function onVisibility() {
      const box = boxRef.current;
      if (!box) return;
      if (document.hidden && box.playing) {
        resumeOnShow.current = true;
        box.stop();
      } else if (!document.hidden && resumeOnShow.current) {
        resumeOnShow.current = false;
        box.start();
      }
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      boxRef.current?.stop();
    };
  }, []);

  if (!supported) return null;

  async function toggle() {
    const box = boxRef.current;
    if (box.playing) {
      box.stop();
      setPlaying(false);
    } else {
      try {
        await box.start();
        setPlaying(true);
      } catch {
        setSupported(false);
      }
    }
  }

  return (
    <button
      type="button"
      className={`music-toggle${playing ? ' is-playing' : ''}`}
      aria-pressed={playing}
      onClick={toggle}
    >
      <span className="music-toggle__icon" aria-hidden="true">
        {playing ? '⏸' : '♪'}
      </span>
      <span className="music-toggle__label">{playing ? 'Hentikan musik' : 'Putar musik'}</span>
    </button>
  );
}
