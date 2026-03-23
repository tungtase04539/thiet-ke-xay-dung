'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2600
    const interval = 30
    const steps = duration / interval
    let current = 0
    const timer = setInterval(() => {
      current++
      const eased = 1 - Math.pow(1 - current / steps, 3)
      setProgress(Math.min(Math.round(eased * 100), 100))
      if (current >= steps) clearInterval(timer)
    }, interval)

    const t1 = setTimeout(() => setFadeOut(true), 3000)
    const t2 = setTimeout(() => setShow(false), 3700)
    return () => { clearInterval(timer); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!show) return null

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black ${fadeOut ? 'pl-out' : ''}`}>

      {/* Logo wrapper: SVG strokes draw first, then PNG fades in */}
      <div className="pl-logo-wrap mb-8">

        {/* Layer 1: animated SVG strokes (draw effect) */}
        <svg className="pl-strokes" viewBox="0 0 240 240" width="240" height="240" xmlns="http://www.w3.org/2000/svg">
          {/* Stroke 1: A left diagonal leg — draws from top to bottom-left */}
          <line
            className="pl-s1"
            x1="131" y1="8"
            x2="24" y2="230"
            stroke="#E8302A" strokeWidth="50" strokeLinecap="round"
          />
          {/* Stroke 2: D outer circle arc — draws clockwise from top */}
          <circle
            className="pl-s2"
            cx="149" cy="106" r="83"
            fill="none" stroke="#E8302A" strokeWidth="44"
            strokeLinecap="round" strokeDasharray="521" strokeDashoffset="521"
          />
          {/* Stroke 3: A crossbar (dark, drawn last as accent) */}
          <line
            className="pl-s3"
            x1="94" y1="136"
            x2="176" y2="136"
            stroke="#0a0a0a" strokeWidth="20" strokeLinecap="butt"
          />
        </svg>

        {/* Layer 2: actual PNG logo — fades in after strokes are drawn */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="pl-img"
          src="/logo.png"
          alt="An Phước Design & Construction"
          width={240}
          height={240}
          style={{ position: 'absolute', inset: 0, objectFit: 'contain' }}
        />
      </div>

      {/* Text */}
      <div className="pl-text text-center">
        <div className="pl-name">AN PHƯỚC DESIGN &amp; CONSTRUCTION</div>
        <div className="pl-sub">Thiết Kế &amp; Xây Dựng</div>
      </div>

      {/* Decorative line */}
      <div className="pl-line" />

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="pl-percent">{progress}%</div>
        <div style={{ width: '100%', height: 2, background: '#111' }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: '#E8302A', transition: 'width 0.06s linear',
            boxShadow: '0 0 12px rgba(232,48,42,0.6)',
          }} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap');

        /* Page fade out */
        .pl-out { animation: plOut 0.7s ease both; }
        @keyframes plOut { to { opacity: 0; } }

        /* Logo wrapper */
        .pl-logo-wrap { position: relative; width: 240px; height: 240px; }

        /* ─── SVG Strokes Layer ─── */
        .pl-strokes { position: absolute; inset: 0; z-index: 2; }

        /* After all strokes drawn, fade out SVG reveal PNG */
        .pl-strokes { animation: plStrokesOut 0.5s ease 1.5s both; }
        @keyframes plStrokesOut { to { opacity: 0; } }

        /* Stroke 1: A left leg — length ≈ 247 */
        .pl-s1 {
          stroke-dasharray: 247;
          stroke-dashoffset: 247;
          animation: plDraw 0.7s cubic-bezier(0.33, 1, 0.68, 1) 0.1s both;
        }

        /* Stroke 2: D circle — circumference 2π×83 ≈ 521, starts from top (rotate -90°) */
        .pl-s2 {
          transform-box: fill-box;
          transform-origin: center;
          transform: rotate(-90deg);
          animation: plDrawD 0.95s cubic-bezier(0.33, 1, 0.68, 1) 0.4s both;
        }
        @keyframes plDrawD { to { stroke-dashoffset: 0; } }

        /* Stroke 3: crossbar accent — length ≈ 82 */
        .pl-s3 {
          stroke-dasharray: 82;
          stroke-dashoffset: 82;
          animation: plDraw 0.25s ease 0.82s both;
        }

        @keyframes plDraw { to { stroke-dashoffset: 0; } }

        /* ─── PNG Layer ─── */
        .pl-img { animation: plImgIn 0.55s ease 1.3s both; }
        @keyframes plImgIn { from { opacity: 0; } to { opacity: 1; } }

        /* ─── Text ─── */
        .pl-text { animation: plFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.5s both; }
        @keyframes plFadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }

        .pl-name {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.3em; color: #fff; text-transform: uppercase;
        }
        .pl-sub {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 9px; letter-spacing: 0.22em;
          color: #555; text-transform: uppercase; margin-top: 6px;
        }

        /* ─── Decorative line ─── */
        .pl-line {
          height: 1px; width: 0; margin-top: 18px;
          background: linear-gradient(90deg, transparent, #E8302A, transparent);
          animation: plLine 0.8s cubic-bezier(0.16,1,0.3,1) 1.7s both;
        }
        @keyframes plLine { from { width:0; opacity:0; } to { width:140px; opacity:1; } }

        .pl-percent {
          text-align: right; padding-right: 28px; padding-bottom: 10px;
          font-family: monospace; font-size: 10px; color: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  )
}
