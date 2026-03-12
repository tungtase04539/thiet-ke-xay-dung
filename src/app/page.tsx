'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown, Layers, Hammer, Shield, Star, Quote } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── Data ────────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90',
    tag: 'Neo-Classic',
    title: 'Không Gian Là\nCảm Xúc',
    sub: 'Chúng tôi thiết kế những không gian kể câu chuyện của bạn — tinh tế, bền vững và đậm chất riêng.',
  },
  {
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=90',
    tag: 'Modern Luxury',
    title: 'Sang Trọng\nTinh Tế',
    sub: 'Mỗi đường nét, mỗi vật liệu đều được chọn lựa kỹ càng để tạo nên tổng thể hoàn mỹ.',
  },
  {
    img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1920&q=90',
    tag: 'Indochine',
    title: 'Nghệ Thuật\nSống',
    sub: 'Hòa quyện văn hóa Đông - Tây, tạo ra không gian sống đầy cảm hứng và bản sắc.',
  },
]

const STATS = [
  { value: '150+', label: 'Dự Án' },
  { value: '8', label: 'Năm Kinh Nghiệm' },
  { value: '98%', label: 'Khách Hài Lòng' },
  { value: '50K+', label: 'm² Đã Thiết Kế' },
]

const SERVICES = [
  {
    icon: Layers,
    title: 'Tư Vấn & Thiết Kế',
    desc: 'Từ ý tưởng thô sơ đến bản vẽ kỹ thuật hoàn chỉnh. 3D rendering photo-realistic, tư vấn vật liệu cao cấp.',
    href: '/dich-vu',
    num: '01',
  },
  {
    icon: Hammer,
    title: 'Thi Công & Xây Dựng',
    desc: 'Đội thợ lành nghề 10+ năm kinh nghiệm. Cam kết đúng tiến độ, minh bạch chi phí, bảo hành dài hạn.',
    href: '/dich-vu',
    num: '02',
  },
  {
    icon: Shield,
    title: 'Giám Sát & Bảo Hành',
    desc: 'Giám sát công trình chuyên nghiệp. Bảo hành 2 năm thi công, hỗ trợ kỹ thuật trọn đời sau bàn giao.',
    href: '/dich-vu',
    num: '03',
  },
]

const PROJECTS = [
  {
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
    name: 'The Matrix One 08',
    type: 'Penthouse',
    area: '280m²',
    style: 'Neo-Classic',
    href: '/du-an/the-matrix-one-08',
  },
  {
    img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=85',
    name: 'Empire City Tower',
    type: 'Penthouse',
    area: '320m²',
    style: 'Modern Luxury',
    href: '/du-an/empire-city',
  },
  {
    img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=85',
    name: 'Vinhomes Central Park',
    type: 'Căn hộ',
    area: '180m²',
    style: 'Indochine',
    href: '/du-an/vinhomes-central-park',
  },
  {
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85',
    name: 'Aqua Bay Villa',
    type: 'Villa',
    area: '450m²',
    style: 'Tropical Modern',
    href: '/du-an/aqua-bay',
  },
]

const TESTIMONIALS = [
  {
    name: 'Anh Minh Tuấn',
    project: 'Empire City Penthouse',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    quote: 'ATELIER đã biến căn penthouse của tôi thành một kiệt tác nghệ thuật. Từng góc nhỏ đều được chăm chút tỉ mỉ, vượt xa mọi kỳ vọng.',
  },
  {
    name: 'Chị Thu Hà',
    project: 'The Matrix One Villa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    quote: 'Đội thiết kế lắng nghe tốt và hiểu lifestyle của gia đình tôi. Kết quả là một ngôi nhà thực sự "của mình" với phong cách Indochine sang trọng.',
  },
  {
    name: 'Anh Hoàng Long',
    project: 'Vinhomes Smart City',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    quote: 'Quy trình làm việc chuyên nghiệp, báo giá minh bạch, bàn giao đúng hẹn. Tôi đặc biệt ấn tượng với chất lượng thi công hoàn thiện.',
  },
]

const BLOG_POSTS = [
  {
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    cat: 'Xu Hướng',
    title: 'Phong Cách Neo-Classic: Sự Hội Tụ Giữa Cổ Điển Và Hiện Đại',
    excerpt: 'Khám phá cách phong cách Neo-Classic đang chiếm lĩnh thị trường thiết kế nội thất cao cấp Việt Nam năm 2024.',
    time: '5 phút đọc',
    href: '/xu-huong/neo-classic',
  },
  {
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    cat: 'Vật Liệu',
    title: 'Vật Liệu Marble: Lựa Chọn Hoàn Hảo Cho Không Gian Luxury',
    excerpt: 'Hướng dẫn chọn lựa và ứng dụng đá marble cho nội thất cao cấp.',
    time: '4 phút đọc',
    href: '/xu-huong/vat-lieu-marble',
  },
  {
    img: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=400&q=80',
    cat: 'Ánh Sáng',
    title: 'Kỹ Thuật Chiếu Sáng Tạo Chiều Sâu Cho Không Gian',
    excerpt: 'Bí quyết sắp xếp hệ thống đèn để tôn vinh vẻ đẹp của từng góc phòng.',
    time: '6 phút đọc',
    href: '/xu-huong/chieu-sang',
  },
]

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const slide = HERO_SLIDES[current]

  return (
    <section className="relative h-screen min-h-[700px] flex flex-col">
      {/* Background images */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.img}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/60 to-bg/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/20" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 w-full pt-24">
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="text-[11px] tracking-[0.3em] text-gold uppercase">{slide.tag}</span>
          </div>
          <h1 className="font-display font-light text-[clamp(52px,8vw,110px)] leading-[1.15] text-text mb-6 whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="text-text-muted text-[17px] leading-relaxed max-w-lg mb-10">
            {slide.sub}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/du-an" className="btn-gold text-[13px] tracking-[0.1em] uppercase px-8 py-4 rounded-sm flex items-center gap-2">
              Xem Dự Án
              <ArrowRight size={16} />
            </Link>
            <Link href="/lien-he" className="btn-outline text-[13px] tracking-[0.1em] uppercase px-8 py-4 rounded-sm">
              Tư Vấn Miễn Phí
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="relative z-10 flex items-center gap-3 max-w-7xl mx-auto px-6 w-full pb-6">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-px transition-all duration-500 ${i === current ? 'w-10 bg-gold' : 'w-4 bg-text-muted'}`}
          />
        ))}
        <span className="ml-4 text-[11px] tracking-widest text-text-muted">
          0{current + 1} / 0{HERO_SLIDES.length}
        </span>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {STATS.map((s) => (
              <div key={s.label} className="px-8 py-4 text-center">
                <div className="font-display text-2xl text-gold">{s.value}</div>
                <div className="text-[11px] tracking-widest text-text-muted mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-28 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gold opacity-60" />
        <ChevronDown size={14} className="text-gold animate-bounce" />
        <span className="text-[10px] tracking-[0.3em] text-text-muted rotate-90 origin-center translate-x-4">SCROLL</span>
      </div>
    </section>
  )
}

// ─── About Intro ──────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-gold" />
            <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Về Chúng Tôi</span>
          </div>
          <h2 className="font-display text-[clamp(38px,4vw,60px)] leading-[1.05] text-text mb-6">
            Nghệ Nhân <em>Của</em><br />Những Không Gian
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            Thành lập từ 2017, ATELIER đã đồng hành cùng hơn 150 gia đình trong hành trình kiến tạo ngôi nhà mơ ước. Chúng tôi tin rằng không gian sống tốt nhất là không gian phản ánh đúng cá tính và lối sống của chủ nhân.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Với đội ngũ kiến trúc sư và kỹ sư thi công lành nghề, chúng tôi mang đến giải pháp trọn gói từ thiết kế đến hoàn thiện — cam kết chất lượng cao cấp và tiến độ đúng hẹn.
          </p>
          <Link href="/gioi-thieu" className="btn-outline text-[12px] tracking-[0.12em] uppercase px-6 py-3 rounded-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
            Tìm Hiểu Thêm
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Image mosaic */}
        <div className="grid grid-cols-2 gap-3 reveal reveal-delay-2">
          <div className="img-hover-zoom rounded-sm overflow-hidden aspect-[3/4]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-3 pt-6">
            <div className="img-hover-zoom rounded-sm overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="img-hover-zoom rounded-sm overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Dịch Vụ</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-[clamp(34px,4vw,54px)] text-text">Giải Pháp Toàn Diện</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <Link
                key={svc.num}
                href={svc.href}
                className={`group block p-8 border border-border rounded-sm hover:border-gold/40 transition-all duration-500 reveal reveal-delay-${i + 1}`}
                style={{ background: 'rgba(10,10,15,0.6)' }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 border border-gold/30 rounded-sm flex items-center justify-center group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <span className="font-display text-5xl text-border group-hover:text-gold/20 transition-colors duration-300">
                    {svc.num}
                  </span>
                </div>
                <div className="w-8 h-px bg-gold mb-5 group-hover:w-16 transition-all duration-500" />
                <h3 className="font-display text-xl text-text mb-3">{svc.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-6">{svc.desc}</p>
                <span className="inline-flex items-center gap-2 text-[12px] tracking-widest text-gold uppercase group-hover:gap-3 transition-all">
                  Khám Phá <ArrowRight size={12} />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 reveal">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Dự Án Nổi Bật</span>
            </div>
            <h2 className="font-display text-[clamp(34px,4vw,54px)] text-text">Công Trình Tiêu Biểu</h2>
          </div>
          <Link href="/du-an" className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-widest text-text-muted uppercase hover:text-gold transition-colors gap-hover:gap-3">
            Xem Tất Cả <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Featured large */}
          <Link href={PROJECTS[0].href} className="group relative rounded-sm overflow-hidden aspect-[4/5] md:row-span-2 img-hover-zoom reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROJECTS[0].img} alt={PROJECTS[0].name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block text-[10px] tracking-[0.2em] text-gold uppercase border border-gold/40 px-3 py-1 mb-3">
                {PROJECTS[0].style}
              </span>
              <h3 className="font-display text-2xl text-text mb-1">{PROJECTS[0].name}</h3>
              <p className="text-text-muted text-sm">{PROJECTS[0].type} · {PROJECTS[0].area}</p>
            </div>
            <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-sm" />
          </Link>

          {/* 3 smaller */}
          {PROJECTS.slice(1).map((p, i) => (
            <Link key={p.name} href={p.href} className={`group relative rounded-sm overflow-hidden aspect-video img-hover-zoom reveal reveal-delay-${i + 1}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="inline-block text-[10px] tracking-[0.2em] text-gold uppercase border border-gold/40 px-2 py-0.5 mb-2">
                  {p.style}
                </span>
                <h3 className="font-display text-lg text-text">{p.name}</h3>
                <p className="text-text-muted text-xs">{p.type} · {p.area}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link href="/du-an" className="btn-outline text-[12px] tracking-[0.1em] uppercase px-8 py-3 rounded-sm inline-flex items-center gap-2">
            Xem Tất Cả Dự Án <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Stats Counter ─────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <section className="py-20 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <div key={s.label} className={`reveal reveal-delay-${i}`}>
              <div className="font-display text-[clamp(40px,5vw,72px)] text-gradient-gold leading-none mb-2">
                {s.value}
              </div>
              <div className="text-[11px] tracking-[0.2em] text-text-muted uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Đánh Giá</span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display text-[clamp(32px,4vw,50px)] text-text">Khách Hàng Nói Gì?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`glass rounded-sm p-8 flex flex-col gap-5 reveal reveal-delay-${i + 1}`}
            >
              <Quote size={28} className="text-gold/30" />
              <p className="text-text-muted leading-relaxed text-sm italic">{t.quote}</p>
              <div className="mt-auto flex items-center gap-3 pt-5 border-t border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover grayscale" />
                <div>
                  <div className="text-text text-sm font-medium">{t.name}</div>
                  <div className="text-[11px] text-gold">{t.project}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-gold text-gold" />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Blog Teaser ──────────────────────────────────────────────────────────────
function BlogSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 reveal">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Xu Hướng</span>
            </div>
            <h2 className="font-display text-[clamp(32px,4vw,50px)] text-text">Cảm Hứng & Xu Hướng</h2>
          </div>
          <Link href="/xu-huong" className="hidden md:inline-flex items-center gap-2 text-[12px] tracking-widest text-text-muted uppercase hover:text-gold transition-colors">
            Tất Cả Bài Viết <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal">
          {/* Featured */}
          <Link href={BLOG_POSTS[0].href} className="group lg:col-span-2 relative rounded-sm overflow-hidden aspect-[16/9] img-hover-zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BLOG_POSTS[0].img} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block text-[10px] tracking-widest text-gold uppercase border border-gold/40 px-3 py-1 mb-3">
                {BLOG_POSTS[0].cat}
              </span>
              <h3 className="font-display text-xl text-text mb-2">{BLOG_POSTS[0].title}</h3>
              <p className="text-text-muted text-sm line-clamp-2 mb-3">{BLOG_POSTS[0].excerpt}</p>
              <span className="text-[11px] tracking-widest text-text-muted">{BLOG_POSTS[0].time}</span>
            </div>
          </Link>

          {/* Side posts */}
          <div className="flex flex-col gap-6">
            {BLOG_POSTS.slice(1).map((post) => (
              <Link key={post.title} href={post.href} className="group flex gap-4 items-start">
                <div className="img-hover-zoom w-28 h-20 rounded-sm overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] tracking-widest text-gold uppercase">{post.cat}</span>
                  <h3 className="text-sm text-text mt-1 mb-1 group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <span className="text-[11px] text-text-muted">{post.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-bg/90 to-bg" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 mb-6 reveal">
          <span className="w-8 h-px bg-gold" />
          <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Bắt Đầu</span>
          <span className="w-8 h-px bg-gold" />
        </div>
        <h2 className="font-display text-[clamp(38px,5vw,72px)] text-text mb-5 reveal">
          Biến Căn Nhà<br />Thành <em>Kiệt Tác</em>
        </h2>
        <p className="text-text-muted text-lg mb-10 reveal reveal-delay-1">
          Tư vấn hoàn toàn miễn phí · Không cam kết · Đội ngũ phản hồi trong 24h
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-2">
          <Link href="/lien-he" className="btn-gold text-[13px] tracking-[0.12em] uppercase px-10 py-4 rounded-sm inline-flex items-center justify-center gap-2">
            Tư Vấn Ngay <ArrowRight size={16} />
          </Link>
          <a href="tel:0922229787" className="btn-outline text-[13px] tracking-[0.12em] uppercase px-10 py-4 rounded-sm inline-flex items-center justify-center gap-2">
            Gọi: 0922 22 9787
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
