import type { Metadata } from 'next'
import './globals.css'
import Preloader from '@/components/Preloader'

export const metadata: Metadata = {
  title: 'An Phước Design & Construction - Thiết Kế & Xây Dựng',
  description: 'An Phước Design & Construction - Công ty thiết kế kiến trúc và xây dựng trọn gói tại Hải Phòng. Chuyên nhà phố, biệt thự, nội thất hiện đại, tân cổ điển.',
  keywords: 'thiết kế kiến trúc, xây dựng trọn gói, nội thất, Hải Phòng, nhà phố, biệt thự, tân cổ điển',
  openGraph: {
    title: 'An Phước Design & Construction',
    description: 'Thiết kế kiến trúc & xây dựng trọn gói — Biến ý tưởng thành hiện thực.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="grain">
        <Preloader />
        {children}
      </body>
    </html>
  )
}
