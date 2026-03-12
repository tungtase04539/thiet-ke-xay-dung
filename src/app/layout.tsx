import type { Metadata } from 'next'
import './globals.css'
import Preloader from '@/components/Preloader'

export const metadata: Metadata = {
  title: 'ATELIER - Thiết Kế & Thi Công Nội Thất Cao Cấp',
  description: 'ATELIER - Công ty thiết kế và thi công nội thất cao cấp tại Hà Nội. Chuyên căn hộ, penthouse, villa với phong cách Neo-Classic, Modern, Indochine.',
  keywords: 'thiết kế nội thất, thi công nội thất, nội thất cao cấp, Hà Nội, penthouse, villa',
  openGraph: {
    title: 'ATELIER - Thiết Kế Nội Thất Cao Cấp',
    description: 'Chúng tôi thiết kế những không gian kể câu chuyện của bạn.',
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
