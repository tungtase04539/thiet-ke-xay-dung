'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2400
    const interval = 30
    const steps = duration / interval
    let current = 0
    const timer = setInterval(() => {
      current++
      const eased = 1 - Math.pow(1 - current / steps, 3)
      setProgress(Math.min(Math.round(eased * 100), 100))
      if (current >= steps) clearInterval(timer)
    }, interval)

    const t1 = setTimeout(() => setFadeOut(true), 2800)
    const t2 = setTimeout(() => setShow(false), 3500)
    return () => { clearInterval(timer); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Logo — PNG với nền trong suốt */}
      <div className="preloader-logo mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="An Phước Design & Construction"
          width={220}
          height={220}
          style={{ objectFit: 'contain', display: 'block' }}
        />
      </div>

      {/* Company name */}
      <div className="preloader-text text-center">
        <div style={{
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.28em',
          color: '#FFFFFF',
          textTransform: 'uppercase',
        }}>
          AN PHƯỚC DESIGN &amp; CONSTRUCTION
        </div>
        <div style={{
          fontFamily: "'Space Grotesk', 'Inter', sans-serif",
          fontSize: 9,
          letterSpacing: '0.2em',
          color: '#444',
          textTransform: 'uppercase',
          marginTop: 6,
        }}>
          Thiết Kế &amp; Xây Dựng
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div style={{
          textAlign: 'right',
          paddingRight: 28,
          paddingBottom: 10,
          fontFamily: 'monospace',
          fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
        }}>
          {progress}%
        </div>
        <div style={{ width: '100%', height: 2, background: '#111' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: '#E8302A',
            transition: 'width 0.06s linear',
            boxShadow: '0 0 8px rgba(232,48,42,0.4)',
          }} />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap');
        .preloader-logo { animation: plScale 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .preloader-text { animation: plFade 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        @keyframes plScale { from { opacity:1; transform:scale(0.88); } to { opacity:1; transform:scale(1); } }
        @keyframes plFade  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  )
}
