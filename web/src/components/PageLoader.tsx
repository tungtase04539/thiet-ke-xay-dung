'use client'

/**
 * PageLoader — mini ATELIER loading indicator
 * Dùng cho các trang khi đang fetch data
 */
export default function PageLoader() {
  return (
    <div className="h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="An Phước Design" className="h-12 w-auto animate-pulse" />
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
