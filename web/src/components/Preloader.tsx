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

    const t1 = setTimeout(() => setFadeOut(true), 2100)
    const t2 = setTimeout(() => setShow(false), 2700)
    return () => { clearInterval(timer); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!show) return null

  return (
    <div className={`pl-wrap ${fadeOut ? 'pl-out' : ''}`}>
      {/* Logo */}
      <div className={`pl-logo ${fadeOut ? 'pl-logo-burst' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="An Phước Design & Construction" width={180} height={180} className="pl-logo-img" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" width={180} height={180} className="pl-logo-img pl-glitch pl-g1" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" width={180} height={180} className="pl-logo-img pl-glitch pl-g2" />
      </div>

      {/* Light flash overlay — fires on outro */}
      <div className={`pl-flash ${fadeOut ? 'pl-flash-go' : ''}`} />

      {/* Horizontal light streaks — fires on outro */}
      <div className={`pl-streaks ${fadeOut ? 'pl-streaks-go' : ''}`}>
        <div className="pl-streak pl-streak-1" />
        <div className="pl-streak pl-streak-2" />
        <div className="pl-streak pl-streak-3" />
        <div className="pl-streak pl-streak-4" />
        <div className="pl-streak pl-streak-5" />
      </div>

      {/* Text */}
      <div className={`pl-text ${fadeOut ? 'pl-text-out' : ''}`}>
        <div className="pl-name">AN PHƯỚC DESIGN &amp; CONSTRUCTION</div>
        <div className="pl-sub">Thiết Kế &amp; Xây Dựng</div>
      </div>

      {/* Scanline */}
      <div className="pl-scanline" />

      {/* Progress bar */}
      <div className="pl-progress">
        <div className="pl-percent">{progress}%</div>
        <div className="pl-bar-track">
          <div className="pl-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <style jsx>{`
        .pl-wrap {
          position: fixed; inset: 0; z-index: 9999;
          background: #000;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          overflow: hidden;
        }
        .pl-out { animation: plOut 0.4s ease 0.25s both; }
        @keyframes plOut { to { opacity: 0; } }

        /* ─── Logo ─── */
        .pl-logo {
          position: relative; width: 180px; height: 180px;
          margin-bottom: 32px;
          animation: plLogoIn 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s both;
        }
        @keyframes plLogoIn {
          from { opacity: 0; transform: scale(0.8); filter: brightness(3); }
          to   { opacity: 1; transform: scale(1); filter: brightness(1); }
        }

        /* Outro: logo scales up + white-out + dissolves */
        .pl-logo-burst {
          animation: plLogoBurst 0.35s cubic-bezier(0.16, 1, 0.3, 1) both !important;
        }
        @keyframes plLogoBurst {
          0%   { transform: scale(1); filter: brightness(1); opacity: 1; }
          35%  { transform: scale(1.1); filter: brightness(1.3); opacity: 1; }
          100% { transform: scale(1.3); filter: brightness(1) blur(10px); opacity: 0; }
        }

        .pl-logo-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: contain;
        }

        /* ─── Glitch layers ─── */
        .pl-glitch {
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0;
        }
        .pl-g1 {
          animation: plGlitch1 2.5s ease-in-out infinite;
          filter: hue-rotate(-20deg) saturate(2);
        }
        @keyframes plGlitch1 {
          0%  { opacity: 0; transform: translate(0,0); }
          2%  { opacity: 0.9; transform: translate(6px, -3px); }
          4%  { opacity: 0; transform: translate(-4px, 2px); }
          6%  { opacity: 0.7; transform: translate(3px, 4px); }
          8%  { opacity: 0; }
          10% { opacity: 0.8; transform: translate(-5px, -2px); }
          12% { opacity: 0; }
          14%, 100% { opacity: 0; transform: translate(0,0); }
        }
        .pl-g2 {
          animation: plGlitch2 2.5s ease-in-out 0.1s infinite;
          filter: hue-rotate(160deg) saturate(1.5);
        }
        @keyframes plGlitch2 {
          0%  { opacity: 0; transform: translate(0,0); }
          3%  { opacity: 0.7; transform: translate(-4px, 3px); clip-path: inset(15% 0 45% 0); }
          5%  { opacity: 0; }
          7%  { opacity: 0.6; transform: translate(5px, -2px); clip-path: inset(55% 0 15% 0); }
          9%  { opacity: 0; }
          11% { opacity: 0.5; transform: translate(-3px, 1px); clip-path: inset(30% 0 30% 0); }
          13% { opacity: 0; }
          15%, 100% { opacity: 0; transform: translate(0,0); }
        }
        .pl-logo::after {
          content: '';
          position: absolute; inset: -10%;
          background: radial-gradient(ellipse, rgba(232,48,42,0.08) 0%, transparent 70%);
          animation: plGlow 2s ease-in-out infinite alternate;
        }
        @keyframes plGlow {
          from { opacity: 0.3; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1.05); }
        }

        /* ─── Light flash (outro) ─── */
        .pl-flash {
          position: absolute;
          top: calc(50% - 16px); left: 50%;
          width: 0; height: 0;
          border-radius: 50%;
          background: radial-gradient(circle, #fff 0%, rgba(255,255,255,0.5) 30%, transparent 70%);
          transform: translate(-50%, -50%);
          opacity: 0;
          pointer-events: none;
        }
        .pl-flash-go {
          animation: plFlashBurst 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes plFlashBurst {
          0%   { width: 10px; height: 10px; opacity: 0; }
          12%  { width: 200px; height: 200px; opacity: 1; }
          30%  { width: 500px; height: 80px; opacity: 0.7; }
          100% { width: 3000px; height: 2px; opacity: 0; }
        }

        /* ─── Horizontal light streaks (outro) ─── */
        .pl-streaks {
          position: absolute;
          top: calc(50% - 16px); left: 50%;
          transform: translate(-50%, -50%);
          width: 100%; height: 200px;
          pointer-events: none;
          opacity: 0;
        }
        .pl-streaks-go { opacity: 1; }

        .pl-streak {
          position: absolute;
          left: 50%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), rgba(255,255,255,0.4), transparent);
          border-radius: 2px;
          transform: translateX(-50%);
          opacity: 0;
        }
        .pl-streaks-go .pl-streak-1 {
          top: 42%; animation: plStreakLR 0.35s 0.02s cubic-bezier(0.22,1,0.36,1) both;
          height: 2px;
        }
        .pl-streaks-go .pl-streak-2 {
          top: 50%; animation: plStreakRL 0.3s 0.04s cubic-bezier(0.22,1,0.36,1) both;
          height: 1px;
        }
        .pl-streaks-go .pl-streak-3 {
          top: 54%; animation: plStreakLR 0.35s 0.01s cubic-bezier(0.22,1,0.36,1) both;
          height: 1px;
        }
        .pl-streaks-go .pl-streak-4 {
          top: 46%; animation: plStreakRL 0.3s 0.05s cubic-bezier(0.22,1,0.36,1) both;
          height: 1px;
        }
        .pl-streaks-go .pl-streak-5 {
          top: 58%; animation: plStreakLR 0.28s 0.06s cubic-bezier(0.22,1,0.36,1) both;
          height: 1px;
        }

        @keyframes plStreakLR {
          0%   { width: 6px; opacity: 0; transform: translateX(-50%); }
          15%  { width: 150px; opacity: 0.8; transform: translateX(-50%); }
          100% { width: 2000px; opacity: 0; transform: translateX(30%); }
        }
        @keyframes plStreakRL {
          0%   { width: 6px; opacity: 0; transform: translateX(-50%); }
          15%  { width: 150px; opacity: 0.8; transform: translateX(-50%); }
          100% { width: 2000px; opacity: 0; transform: translateX(-130%); }
        }

        /* ─── Scanline ─── */
        .pl-scanline {
          position: absolute; left: 0; right: 0;
          height: 2px;
          background: rgba(232,48,42,0.15);
          box-shadow: 0 0 8px rgba(232,48,42,0.3);
          animation: plScan 2.5s linear infinite;
        }
        @keyframes plScan { from { top: -2px; } to { top: 100%; } }

        /* ─── Text ─── */
        .pl-text {
          text-align: center;
          animation: plTextIn 0.5s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }
        @keyframes plTextIn {
          from { opacity: 0; transform: translateY(12px); letter-spacing: 0.8em; }
          to   { opacity: 1; transform: translateY(0); letter-spacing: 0.3em; }
        }
        .pl-text-out {
          animation: plTextOut 0.25s ease both !important;
        }
        @keyframes plTextOut {
          to { opacity: 0; filter: blur(3px); transform: scaleX(1.2); }
        }

        .pl-name {
          font-family: 'Space Grotesk', 'Inter', monospace;
          font-size: 14px; font-weight: 600;
          letter-spacing: 0.3em; color: #fff;
          text-transform: uppercase;
          animation: plFlicker 3s step-end infinite;
        }
        @keyframes plFlicker {
          0%  { opacity: 1; }
          3%  { opacity: 0.15; }
          4%  { opacity: 1; }
          6%  { opacity: 0.3; }
          7%  { opacity: 1; }
          9%  { opacity: 0.1; }
          10% { opacity: 1; }
          12%, 100% { opacity: 1; }
        }

        .pl-sub {
          font-family: 'Space Grotesk', 'Inter', monospace;
          font-size: 11px; letter-spacing: 0.22em;
          color: #888; text-transform: uppercase; margin-top: 8px;
        }

        /* ─── Progress ─── */
        .pl-progress {
          position: absolute; bottom: 0; left: 0; right: 0;
        }
        .pl-percent {
          text-align: right; padding: 0 28px 10px 0;
          font-family: 'Space Grotesk', monospace;
          font-size: 10px; color: rgba(255,255,255,0.3);
          letter-spacing: 0.05em;
        }
        .pl-bar-track { width: 100%; height: 2px; background: #111; }
        .pl-bar-fill {
          height: 100%; background: #E8302A;
          transition: width 0.06s linear;
          box-shadow: 0 0 12px rgba(232,48,42,0.6);
        }
      `}</style>
    </div>
  )
}
