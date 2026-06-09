import PortfolioPageClient from './PortfolioPageClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dự Án Thiết Kế & Xây Dựng | An Phước Design',
  description: 'Khám phá danh mục các dự án thiết kế kiến trúc, biệt thự, nhà phố, nội thất và xây dựng trọn gói nổi bật của An Phước Design tại Hải Phòng.',
  keywords: 'dự án kiến trúc, nhà phố Hải Phòng, biệt thự Hải Phòng, thiết kế nội thất, xây dựng trọn gói',
  openGraph: {
    title: 'Dự Án Thiết Kế & Xây Dựng | An Phước Design',
    description: 'Danh mục các công trình thiết kế thi công nổi bật của An Phước Design. Cam kết chất lượng, tiến độ và thẩm mỹ.',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return <PortfolioPageClient />
}
