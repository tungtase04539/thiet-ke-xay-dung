'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Hiện preloader 2.5s rồi fade out
    const t = setTimeout(() => setFadeOut(true), 2500)
    const t2 = setTimeout(() => setShow(false), 3200)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0F] transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`
      }} />

      <div className="flex flex-col items-center gap-6">
        {/* Logo hexagon — SVG animated */}
        <div className="preloader-logo">
          <svg width="72" height="72" viewBox="0 0 28 28" fill="none">
            <polygon
              points="14,1 27,8 27,20 14,27 1,20 1,8"
              stroke="#C9A84C"
              strokeWidth="1"
              fill="none"
              className="preloader-hex"
            />
            <polygon
              points="14,6 22,10.5 22,17.5 14,22 6,17.5 6,10.5"
              stroke="#C9A84C"
              strokeWidth="0.5"
              fill="rgba(201,168,76,0.05)"
              className="preloader-hex-inner"
            />
            <line x1="14" y1="1" x2="14" y2="27" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
            <line x1="1" y1="8" x2="27" y2="20" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
            <line x1="27" y1="8" x2="1" y2="20" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
          </svg>
        </div>

        {/* Brand name */}
        <div className="text-center preloader-text">
          <div className="font-display text-3xl tracking-[0.35em] text-[#F5F0E8] font-semibold leading-none">
            ATELIER
          </div>
          <div className="text-[10px] tracking-[0.5em] text-[#9A9488] mt-2 uppercase">
            Interior Design
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-32 h-px bg-[#1E1E2A] rounded-full overflow-hidden mt-4">
          <div className="preloader-bar h-full bg-gradient-to-r from-[#9A7A30] via-[#C9A84C] to-[#F0D484]" />
        </div>
      </div>

      <style jsx>{`
        .preloader-logo {
          animation: preloaderReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: scale(0.7);
        }
        .preloader-text {
          animation: preloaderReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          opacity: 0;
          transform: translateY(12px);
        }
        .preloader-hex {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: preloaderDraw 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
        }
        .preloader-hex-inner {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: preloaderDraw 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
        }
        .preloader-bar {
          animation: preloaderProgress 2.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
          width: 0%;
        }
        @keyframes preloaderReveal {
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes preloaderDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes preloaderProgress {
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
