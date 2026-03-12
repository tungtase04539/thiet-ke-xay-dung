'use client'

/**
 * PageLoader — mini ATELIER loading indicator
 * Dùng cho các trang khi đang fetch data
 */
export default function PageLoader() {
  return (
    <div className="h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* Mini hex logo */}
        <svg width="44" height="44" viewBox="0 0 28 28" fill="none" className="animate-pulse">
          <polygon
            points="14,1 27,8 27,20 14,27 1,20 1,8"
            stroke="#C9A84C"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="14,6 22,10.5 22,17.5 14,22 6,17.5 6,10.5"
            stroke="#C9A84C"
            strokeWidth="0.5"
            fill="rgba(201,168,76,0.05)"
          />
          <line x1="14" y1="1" x2="14" y2="27" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
          <line x1="1" y1="8" x2="27" y2="20" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
          <line x1="27" y1="8" x2="1" y2="20" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
        </svg>
        <div className="text-[11px] tracking-[0.35em] text-[#9A9488] uppercase">
          Đang tải...
        </div>
        {/* Mini progress bar */}
        <div className="w-20 h-px bg-[#1E1E2A] rounded-full overflow-hidden">
          <div className="h-full bg-[#C9A84C] animate-[shimmer_1.5s_ease-in-out_infinite]"
            style={{ width: '40%' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}
