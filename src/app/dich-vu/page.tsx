'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Shield, Clock, DollarSign } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const SERVICES_DETAIL = [
  {
    num: '01',
    title: 'Tư Vấn & Thiết Kế Kiến Trúc',
    sub: 'Từ Ý Tưởng Đến Bản Vẽ',
    desc: 'Đội ngũ kiến trúc sư giàu kinh nghiệm sẽ lắng nghe, phân tích và biến những ý tưởng của bạn thành bản vẽ thiết kế chi tiết với hình ảnh 3D photo-realistic sống động như thực.',
    features: ['3D Rendering photo-realistic', 'Bản vẽ kỹ thuật đầy đủ', 'Tư vấn vật liệu cao cấp', 'Lập kế hoạch thi công', 'Thiết kế ánh sáng chuyên nghiệp'],
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80',
    reverse: false,
  },
  {
    num: '02',
    title: 'Thi Công & Xây Dựng',
    sub: 'Biến Bản Vẽ Thành Thực Tế',
    desc: 'Đội thợ lành nghề với 10+ năm kinh nghiệm, được đào tạo bài bản về kỹ thuật hoàn thiện cao cấp. Chúng tôi cam kết đúng tiến độ, minh bạch chi phí, không phát sinh ngoài hợp đồng.',
    features: ['Thợ thủ công lành nghề 10+ năm', 'Vật tư nhập khẩu chính hãng', 'Kiểm soát chất lượng nghiêm ngặt', 'Cam kết đúng tiến độ', 'Bảo hành thi công 2 năm'],
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
    reverse: true,
  },
  {
    num: '03',
    title: 'Giám Sát & Bảo Hành',
    sub: 'Đồng Hành Sau Bàn Giao',
    desc: 'Dịch vụ không dừng lại khi bàn giao chìa khóa. Chúng tôi cung cấp giám sát công trình chuyên nghiệp trong suốt quá trình thi công và hỗ trợ kỹ thuật trọn đời sau hoàn công.',
    features: ['Giám sát công trường hàng ngày', 'Báo cáo tiến độ định kỳ', 'Bảo hành 2 năm thi công', 'Hỗ trợ kỹ thuật trọn đời', 'Bảo trì định kỳ theo gói'],
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=80',
    reverse: false,
  },
]

const PROCESS = [
  { step: '01', title: 'Tư Vấn', desc: 'Gặp gỡ, lắng nghe và phân tích nhu cầu' },
  { step: '02', title: 'Khảo Sát', desc: 'Đo đạc, đánh giá hiện trạng công trình' },
  { step: '03', title: 'Thiết Kế', desc: 'Bản vẽ + 3D rendering + tư vấn vật liệu' },
  { step: '04', title: 'Thi Công', desc: 'Triển khai theo đúng thiết kế và tiến độ' },
  { step: '05', title: 'Bàn Giao', desc: 'Kiểm tra chất lượng, bàn giao, bảo hành' },
]

const GUARANTEES = [
  { icon: Shield, title: 'Bảo Hành 2 Năm', desc: '24 tháng bảo hành toàn bộ hạng mục thi công. Cam kết sửa chữa miễn phí trong thời hạn bảo hành.' },
  { icon: Clock, title: 'Đúng Tiến Độ', desc: 'Cam kết bàn giao đúng hẹn. Phát sinh bồi thường 0.1%/ngày trễ hạn theo hợp đồng.' },
  { icon: DollarSign, title: 'Minh Bạch Chi Phí', desc: 'Báo giá chi tiết từng hạng mục. Không phát sinh ngoài hợp đồng đã ký kết.' },
]

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && (x.target.classList.add('visible'), obs.unobserve(x.target))), { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function ServicesPage() {
  useScrollReveal()
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[450px] flex items-end pb-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/70 to-bg/30" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Dịch Vụ</span>
            </div>
            <h1 className="font-display text-[clamp(40px,6vw,80px)] text-text leading-none">Giải Pháp Thiết Kế<br />Toàn Diện</h1>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-8">
          {SERVICES_DETAIL.map((svc) => (
            <div key={svc.num} className={`flex flex-col ${svc.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} min-h-[60vh]`}>
              <div className="lg:w-1/2 img-hover-zoom">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={svc.img} alt={svc.title} className="w-full h-full object-cover min-h-[400px]" />
              </div>
              <div className="lg:w-1/2 flex items-center bg-surface">
                <div className="p-12 lg:p-16 reveal">
                  <span className="font-display text-7xl text-border">{svc.num}</span>
                  <div className="w-8 h-px bg-gold my-5" />
                  <div className="text-[10px] tracking-[0.3em] text-gold uppercase mb-2">{svc.title}</div>
                  <h2 className="font-display text-3xl text-text mb-4">{svc.sub}</h2>
                  <p className="text-text-muted leading-relaxed mb-6">{svc.desc}</p>
                  <ul className="space-y-2 mb-8">
                    {svc.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm text-text-muted">
                        <CheckCircle2 size={14} className="text-gold shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/lien-he" className="inline-flex items-center gap-2 text-[12px] tracking-widest text-gold uppercase hover:gap-3 transition-all">
                    Tư Vấn Ngay <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Process */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Quy Trình</span>
              <span className="w-8 h-px bg-gold" />
            </div>
            <h2 className="font-display text-[clamp(32px,4vw,50px)] text-text">Quy Trình Làm Việc</h2>
          </div>
          <div className="relative">
            <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent hidden md:block" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {PROCESS.map((p, i) => (
                <div key={p.step} className={`text-center reveal reveal-delay-${i}`}>
                  <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-4 bg-bg relative z-10">
                    <span className="font-display text-xl text-gold">{p.step}</span>
                  </div>
                  <h3 className="font-display text-lg text-text mb-1">{p.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12 reveal">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold" />
                <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Cam Kết</span>
                <span className="w-8 h-px bg-gold" />
              </div>
              <h2 className="font-display text-[clamp(30px,4vw,48px)] text-text">3 Cam Kết Cốt Lõi</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GUARANTEES.map((g, i) => {
                const Icon = g.icon
                return (
                  <div key={g.title} className={`glass rounded-sm p-8 gold-border-top reveal reveal-delay-${i + 1}`}>
                    <div className="w-12 h-12 border border-gold/30 rounded-sm flex items-center justify-center mb-5">
                      <Icon size={20} className="text-gold" />
                    </div>
                    <h3 className="font-display text-xl text-text mb-3">{g.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{g.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Cost Estimator */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-gold" />
                <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Ước Tính Nhanh</span>
              </div>
              <h2 className="font-display text-[clamp(30px,4vw,48px)] text-text mb-4">Ước Tính Chi Phí</h2>
              <p className="text-text-muted">Nhận báo giá sơ bộ ngay – chi tiết chính xác sẽ được gửi sau khi tư vấn trực tiếp.</p>
            </div>
            <CostEstimator />
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-surface text-center">
          <h2 className="font-display text-4xl text-text mb-4">Bắt Đầu Dự Án Của Bạn</h2>
          <p className="text-text-muted mb-8">Tư vấn miễn phí · Không cam kết · Phản hồi trong 24h</p>
          <Link href="/lien-he" className="btn-gold text-[13px] tracking-[0.1em] uppercase px-10 py-4 rounded-sm inline-flex items-center gap-2">
            Nhận Tư Vấn Miễn Phí <ArrowRight size={16} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}

function CostEstimator() {
  const [spaceType, setSpaceType] = useState('Căn hộ')
  const [area, setArea] = useState(100)
  const [style, setStyle] = useState('Modern')

  const priceMap: Record<string, Record<string, number>> = {
    'Căn hộ': { 'Modern': 8, 'Neo-Classic': 12, 'Luxury': 18 },
    'Penthouse': { 'Modern': 12, 'Neo-Classic': 18, 'Luxury': 25 },
    'Villa': { 'Modern': 10, 'Neo-Classic': 15, 'Luxury': 22 },
  }

  const unitPrice = priceMap[spaceType]?.[style] ?? 10
  const total = area * unitPrice

  return (
    <div className="glass rounded-sm p-8 reveal reveal-delay-2">
      <div className="space-y-5">
        <div>
          <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Loại Không Gian</label>
          <select value={spaceType} onChange={e => setSpaceType(e.target.value)}
            className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none">
            {['Căn hộ', 'Penthouse', 'Villa'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Diện Tích: {area}m²</label>
          <input type="range" min={30} max={500} value={area} onChange={e => setArea(+e.target.value)}
            className="w-full accent-[#C9A84C]" />
          <div className="flex justify-between text-[10px] text-text-muted mt-1"><span>30m²</span><span>500m²</span></div>
        </div>
        <div>
          <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Phong Cách</label>
          <div className="grid grid-cols-3 gap-2">
            {['Modern', 'Neo-Classic', 'Luxury'].map(s => (
              <button key={s} onClick={() => setStyle(s)}
                className={`py-2 text-[11px] border rounded-sm transition-all ${style === s ? 'border-gold bg-gold/10 text-gold' : 'border-border text-text-muted'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-border pt-5">
          <div className="text-[10px] tracking-widest text-text-muted uppercase mb-1">Ước Tính Sơ Bộ</div>
          <div className="font-display text-3xl text-gold">{total.toLocaleString('vi-VN')} – {(total * 1.3).toLocaleString('vi-VN')} triệu</div>
          <p className="text-text-muted text-xs mt-2">(*) Chỉ mang tính tham khảo. Báo giá chính xác sau khi khảo sát thực tế.</p>
        </div>
        <Link href="/lien-he" className="btn-gold w-full text-[12px] tracking-[0.1em] uppercase py-3 rounded-sm flex items-center justify-center gap-2">
          Nhận Báo Giá Chi Tiết <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
