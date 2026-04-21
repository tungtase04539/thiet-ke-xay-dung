'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 1800
    const interval = 25
    const steps = duration / interval
    let current = 0
    const timer = setInterval(() => {
      current++
      const eased = 1 - Math.pow(1 - current / steps, 3)
      setProgress(Math.min(Math.round(eased * 100), 100))
      if (current >= steps) clearInterval(timer)
    }, interval)

    const t1 = setTimeout(() => setFadeOut(true), 2000)
    const t2 = setTimeout(() => setShow(false), 2900)
    return () => { clearInterval(timer); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!show) return null

  return (
    <div className={`pl-wrap ${fadeOut ? 'pl-out' : ''}`}>
      {/* Logo */}
      <div className="pl-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="An Phước Design & Construction" width={140} height={140} className="pl-logo-img" />
      </div>

      {/* Text */}
      <div className="pl-text">
        <div className="pl-name">AN PHƯỚC DESIGN &amp; CONSTRUCTION</div>
        <div className="pl-sub">Thiết Kế &amp; Xây Dựng</div>
      </div>

      {/* Progress bar */}
      <div className="pl-progress">
        <div className="pl-percent">{String(progress).padStart(2, '0')}</div>
        <div className="pl-bar-track">
          <div className="pl-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <style jsx>{`
        .pl-wrap {
          position: fixed; inset: 0; z-index: 9999;
          background: #0a0a0a;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          overflow: hidden;
          animation: plIn 0.6s ease both;
        }
        @keyframes plIn { from { opacity: 0; } to { opacity: 1; } }

        .pl-out { animation: plOut 0.9s cubic-bezier(0.4, 0, 0.2, 1) both; }
        @keyframes plOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }

        /* ─── Logo ─── */
        .pl-logo {
          position: relative; width: 140px; height: 140px;
          margin-bottom: 36px;
          opacity: 0;
          animation: plLogoIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
        }
        @keyframes plLogoIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pl-logo-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: contain;
          filter: drop-shadow(0 0 24px rgba(201, 168, 76, 0.12));
        }

        /* ─── Text ─── */
        .pl-text {
          text-align: center;
          opacity: 0;
          animation: plTextIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards;
        }
        @keyframes plTextIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pl-name {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 12px; font-weight: 500;
          letter-spacing: 0.38em; color: rgba(255,255,255,0.92);
          text-transform: uppercase;
        }
        .pl-sub {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 10px; letter-spacing: 0.28em;
          color: rgba(201, 168, 76, 0.65);
          text-transform: uppercase;
          margin-top: 10px;
        }

        /* ─── Progress ─── */
        .pl-progress {
          position: absolute;
          bottom: 48px; left: 0; right: 0;
          display: flex; flex-direction: column;
          align-items: center; gap: 10px;
          opacity: 0;
          animation: plTextIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.7s forwards;
        }
        .pl-bar-track {
          width: 160px; height: 1px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .pl-bar-fill {
          height: 100%;
          background: rgba(201, 168, 76, 0.85);
          transition: width 0.12s linear;
        }
        .pl-percent {
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.15em;
        }

        @media (prefers-reduced-motion: reduce) {
          .pl-wrap, .pl-logo, .pl-text, .pl-progress, .pl-out {
            animation-duration: 0.3s !important;
          }
        }
      `}</style>
    </div>
  )
}
