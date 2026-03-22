'use client';

import { useEffect, useState } from 'react';

export default function PreloadScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2200; // total ms
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      // Ease-out curve: fast at first, slow at end
      const raw = current / steps;
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (current >= steps) {
        clearInterval(timer);
        // Start fade out
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setVisible(false), 700);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Logo */}
      <div
        style={{
          width: 160,
          height: 160,
          marginBottom: 32,
          animation: 'preload-logo-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        {/* Inline SVG — exact AD logo tracing */}
        <svg
          viewBox="0 0 500 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          {/*
            AD Monogram:
            - D  = large filled circle right side
            - A  = bold italic letter, left diagonal leg slants bottom-left
            - White cuts create the A letterform negative space inside the D
          */}

          {/* ── D shape: full filled circle ── */}
          <circle cx="295" cy="205" r="195" fill="#E8302A" />

          {/* ── White inner circle (D becomes ring) ── */}
          <circle cx="295" cy="205" r="118" fill="#000000" />

          {/* ── Restore red fill where A right-leg overlaps inner circle ── */}
          {/* A right leg inside the D: runs from top center down */}
          <polygon
            points="258,30 305,30 310,215 263,215"
            fill="#E8302A"
          />

          {/* ── A crossbar (white cutout, creates the horizontal bar of A) ── */}
          <rect x="185" y="215" width="140" height="28" fill="#000000" />

          {/* ── D bottom gap (white opening at bottom of D ring) ── */}
          {/* This is the open bottom of the D letterform */}
          <path
            d="M178,280 L178,420 Q295,470 412,380 L412,280 Z"
            fill="#000000"
          />
          {/* Clean up to match circle boundary */}
          <rect x="190" y="278" width="210" height="160" fill="#000000" />

          {/* ── A left diagonal leg — bold italic stroke ── */}
          {/* Goes from upper-right area diagonally down to lower-left */}
          <polygon
            points="255,20 308,20 125,460 72,460"
            fill="#E8302A"
          />

          {/* ── Restore A right leg (redrawn on top) ── */}
          <polygon
            points="258,20 308,20 314,220 262,220"
            fill="#E8302A"
          />

          {/* ── White crossbar over everything ── */}
          <rect x="178" y="218" width="148" height="25" fill="#000000" />

          {/* ── D bottom opening (arc gap at the bottom) ── */}
          <path
            d="M183,278 Q183,440 295,455 Q407,440 407,278 L370,278 Q370,410 295,422 Q220,410 220,278 Z"
            fill="#000000"
          />
        </svg>
      </div>

      {/* Company name */}
      <div
        style={{
          color: '#FFFFFF',
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: 8,
          animation: 'preload-text-in 1s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        ANTI THIẾT KẾ XÂY DỰNG
      </div>

      <div
        style={{
          color: '#555',
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: 60,
          animation: 'preload-text-in 1s 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        }}
      >
        Architecture &amp; Construction
      </div>

      {/* Progress bar + percentage */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 0 32px 0',
        }}
      >
        {/* Percentage */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: 32,
            marginBottom: 10,
            color: '#FFFFFF',
            fontFamily: "'Space Grotesk', 'Inter', sans-serif",
            fontSize: 11,
            letterSpacing: '0.05em',
            opacity: 0.6,
          }}
        >
          {progress}%
        </div>

        {/* Track */}
        <div
          style={{
            width: '100%',
            height: 2,
            background: '#1a1a1a',
          }}
        >
          {/* Fill */}
          <div
            style={{
              height: '100%',
              background: '#E8302A',
              width: `${progress}%`,
              transition: 'width 0.1s linear',
              boxShadow: '0 0 8px rgba(232,48,42,0.6)',
            }}
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap');

        @keyframes preload-logo-in {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes preload-text-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
