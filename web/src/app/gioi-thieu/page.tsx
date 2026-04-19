'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const TIMELINE = [
  { year: '2020', title: 'Khởi Nghiệp', desc: 'An Phước Design & Construction ra đời tại Hải Phòng, với đam mê kiến tạo những công trình chất lượng.' },
  { year: '2022', title: 'Phát Triển', desc: 'Mở rộng đội ngũ kiến trúc sư và thợ thi công. Hoàn thành hàng chục dự án nhà phố, biệt thự tại Hải Phòng.' },
  { year: '2024', title: 'Định Vị', desc: 'Khẳng định thương hiệu với dịch vụ thiết kế kiến trúc và xây dựng trọn gói. Triển khai dự án thương mại đầu tiên — Spa Tâm Tâm.' },
  { year: '2025', title: 'Bứt Phá', desc: 'Mở rộng sang thiết kế nội thất hiện đại và tân cổ điển. Ứng dụng công nghệ 3D rendering vào thiết kế.' },
]

const TEAM: { name: string; role: string; img: string }[] = []

const VALUES = [
  { title: 'Tinh Tế', desc: 'Mọi chi tiết đều có chủ đích. Từ khoảng cách phào chỉ đến góc chiếu của một bóng đèn.' },
  { title: 'Bền Vững', desc: 'Thiết kế vượt thời gian, không theo mốt nhất thời. Công trình đẹp mãi nhiều năm sau.' },
  { title: 'Cá Tính', desc: 'Mỗi không gian phản ánh chính xác cá tính và lối sống của gia chủ.' },
  { title: 'Minh Bạch', desc: 'Quy trình rõ ràng, báo giá chi tiết, không phát sinh ngoài hợp đồng.' },
]

const STATS = [
  { value: '50+', label: 'Dự Án Hoàn Thành' },
  { value: '10+', label: 'Năm Kinh Nghiệm' },
  { value: '100%', label: 'Khách Hài Lòng' },
  { value: '99%', label: 'Chính Xác Bản Thiết Kế' },
]

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && (x.target.classList.add('visible'), obs.unobserve(x.target))), { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function AboutPage() {
  useScrollReveal()
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[65vh] min-h-[500px] flex items-end pb-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550305/anphuoc/pages/gioi-thieu/iuw4lftpqhenj7l5r5yz.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/70 to-bg/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Về Chúng Tôi</span>
            </div>
            <h1 className="font-display text-[clamp(44px,7vw,96px)] text-text leading-[0.95]">
              Chúng Tôi Là<br /><em>An Phước</em>
            </h1>
            <p className="text-text-muted text-lg mt-4 max-w-lg">
              Thiết kế kiến trúc & xây dựng trọn gói tại Hải Phòng — Biến ý tưởng thành hiện thực.
            </p>
          </div>
        </section>

        {/* Brand story */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Câu Chuyện Của Chúng Tôi</span>
              </div>
              <h2 className="font-display text-[clamp(32px,4vw,52px)] text-text mb-5">
                Từ Ý Tưởng Đến<br />Những Không Gian <em>Thực</em>
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                An Phước Design & Construction khởi đầu từ niềm đam mê kiến trúc và xây dựng. Chúng tôi tin rằng mỗi công trình đều xứng đáng được thiết kế tỉ mỉ và thi công chuyên nghiệp.
              </p>
              <p className="text-text-muted leading-relaxed mb-4">
                Từ nhà phố, biệt thự đến công trình thương mại — đội ngũ kiến trúc sư và thợ tay nghề cao của chúng tôi luôn đảm bảo công trình đạt độ chính xác cao so với bản thiết kế.
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                Triết lý của chúng tôi: <em className="text-gold">Biến ý tưởng thành hiện thực — chất lượng vượt trội, tiến độ đúng hẹn</em>.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 reveal reveal-delay-2">
              <div className="img-hover-zoom rounded-sm overflow-hidden aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550303/anphuoc/pages/gioi-thieu/zz3vlfwkkkp0n5qmlx4q.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3 pt-8">
                <div className="img-hover-zoom rounded-sm overflow-hidden aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550300/anphuoc/pages/gioi-thieu/iddbp0rhldyx9skdtvv4.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="img-hover-zoom rounded-sm overflow-hidden aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550309/anphuoc/pages/gioi-thieu/m1b3cnwwzfhoalgzswji.jpg" alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <div key={s.label} className={`reveal reveal-delay-${i}`}>
                <div className="font-display text-[clamp(40px,5vw,72px)] text-gradient-gold leading-none mb-2">{s.value}</div>
                <div className="text-[11px] tracking-[0.2em] text-text-muted uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Hành Trình</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-display text-[clamp(32px,4vw,52px)] text-text">Chặng Đường Phát Triển</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[clamp(32px,8vw,80px)] top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent hidden md:block" />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className={`flex items-start gap-8 md:gap-16 reveal reveal-delay-${i % 4}`}>
                  {/* Year */}
                  <div className="shrink-0 text-right w-16 md:w-24">
                    <span className="font-display text-lg text-gold">{item.year}</span>
                  </div>
                  {/* Dot */}
                  <div className="shrink-0 mt-1.5 hidden md:flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full border-2 border-gold bg-bg" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-8 border-b border-border last:border-0">
                    <h3 className="font-display text-xl text-text mb-2">{item.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team - hidden until real team data available */}
        {TEAM.length > 0 && (
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14 reveal">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold" />
                <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Đội Ngũ</span>
                <span className="w-8 h-px bg-gold" />
              </div>
              <h2 className="font-display text-[clamp(32px,4vw,52px)] text-text">Con Người An Phước</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {TEAM.map((member, i) => (
                <div key={member.name} className={`group text-center reveal reveal-delay-${i}`}>
                  <div className="img-hover-zoom rounded-sm overflow-hidden aspect-square mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-display text-lg text-text">{member.name}</h3>
                  <p className="text-gold text-[11px] tracking-wider mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Values */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Giá Trị</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-display text-[clamp(30px,4vw,48px)] text-text">Triết Lý Thiết Kế</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div key={v.title} className={`glass rounded-sm p-7 gold-border-top reveal reveal-delay-${i}`}>
                <h3 className="font-display text-2xl text-gold mb-3">{v.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-surface text-center">
          <h2 className="font-display text-4xl text-text mb-4">Cùng Tạo Ra Điều Gì Đó Đặc Biệt</h2>
          <p className="text-text-muted mb-8">Tư vấn hoàn toàn miễn phí, không cam kết</p>
          <Link href="/lien-he" className="btn-gold text-[13px] tracking-[0.1em] uppercase px-10 py-4 rounded-sm inline-flex items-center gap-2">
            Liên Hệ Ngay <ArrowRight size={16} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
