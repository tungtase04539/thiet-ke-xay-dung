'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown, Layers, Hammer, Shield, Star, Quote } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── Data ────────────────────────────────────────────────────────────────────
const HERO_SLIDES: { img: string; mobileImg: string; tag: string; title: string; sub: string }[] = [
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550344/anphuoc/pages/trang-chu/a8tgzsszcd5l38esivrr.jpg',
    mobileImg: '',
    tag: 'Thiết Kế Kiến Trúc',
    title: 'Biến Ý Tưởng\nThành Hiện Thực',
    sub: 'An Phước Design & Construction — Thiết kế kiến trúc & xây dựng trọn gói tại Hải Phòng. Chất lượng vượt trội, tiến độ đúng hẹn.',
  },
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550361/anphuoc/projects/02-biet-thu-tan-co-dien/i1prppmw04nk9yvlo7tj.jpg',
    mobileImg: '',
    tag: 'Xây Dựng Trọn Gói',
    title: 'Chất Lượng\nLà Uy Tín',
    sub: 'Đội thợ tay nghề cao, giám sát chặt chẽ. Công trình hoàn thiện đạt 99% so với bản thiết kế.',
  },
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550398/anphuoc/projects/05-noi-that-hien-dai-sang-trong/n3ryzlesezwf9a5wt2iy.jpg',
    mobileImg: '',
    tag: 'Nội Thất Hiện Đại',
    title: 'Không Gian\nĐáng Sống',
    sub: 'Thiết kế nội thất hiện đại, tối giản. Biến diện tích nhỏ thành không gian sống lý tưởng.',
  },
]

const STATS = [
  { value: '50+', label: 'Dự Án' },
  { value: '10+', label: 'Năm Kinh Nghiệm' },
  { value: '100%', label: 'Khách Hài Lòng' },
  { value: '99%', label: 'Đúng Bản Thiết Kế' },
]

const SERVICES = [
  {
    icon: Layers,
    title: 'Thiết Kế Kiến Trúc',
    desc: 'Thiết kế nhà phố, biệt thự, công trình thương mại. 3D rendering photo-realistic, bản vẽ kỹ thuật chi tiết.',
    href: '/dich-vu',
    num: '01',
  },
  {
    icon: Hammer,
    title: 'Xây Dựng Trọn Gói',
    desc: 'Thi công trọn gói từ móng đến hoàn thiện. Đội thợ tay nghề cao, giám sát chặt chẽ, cam kết đúng tiến độ.',
    href: '/dich-vu',
    num: '02',
  },
  {
    icon: Shield,
    title: 'Thiết Kế Nội Thất',
    desc: 'Nội thất hiện đại, tân cổ điển, tối giản. Tối ưu công năng, tạo không gian sống ấm cúng và tiện nghi.',
    href: '/dich-vu',
    num: '03',
  },
]

const PROJECTS = [
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550384/anphuoc/projects/04-nha-pho-tan-co-dien/yas5wwjfnb1oauilukzr.jpg',
    name: 'Nhà Phố Tân Cổ Điển',
    type: 'Thiết kế kiến trúc',
    area: '',
    style: 'Tân cổ điển',
    href: '/du-an/nha-pho-tan-co-dien',
  },
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550363/anphuoc/projects/02-biet-thu-tan-co-dien/svv0apytbdgijrjrcozw.jpg',
    name: 'Biệt Thự Tân Cổ Điển',
    type: 'Thiết kế kiến trúc',
    area: '150m²',
    style: 'Tân cổ điển',
    href: '/du-an/biet-thu-tan-co-dien',
  },
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550434/anphuoc/projects/06-noi-that-hien-dai-toi-gian/q5z4rf9lxqcmb3ejjcp9.jpg',
    name: 'Nội Thất Hiện Đại Tối Giản',
    type: 'Thiết kế nội thất',
    area: '98m²',
    style: 'Hiện đại tối giản',
    href: '/du-an/noi-that-hien-dai-toi-gian',
  },
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550539/anphuoc/projects/09-xay-dung-nha-pho-tan-co-dien/mmpwi6phtkfjhaohrm39.jpg',
    name: 'Xây Dựng Nhà Phố Tân Cổ Điển',
    type: 'Xây dựng trọn gói',
    area: '',
    style: 'Tân cổ điển',
    href: '/du-an/xay-dung-nha-pho-tan-co-dien',
  },
]

const TESTIMONIALS = [
  {
    name: 'Anh Dũng',
    project: 'Nhà Phố Tân Cổ Điển',
    avatar: '',
    quote: 'An Phước chuyển tầm nhìn của tôi thành hiện thực, đạt độ chính xác gần 99% so với bản thiết kế. Rất hài lòng với chất lượng thi công.',
  },
  {
    name: 'Chị Tâm',
    project: 'Spa Tâm Tâm',
    avatar: '',
    quote: 'Dự án spa được đẩy nhanh tiến độ để kịp khai trương. An Phước giám sát chặt chẽ, đảm bảo chất lượng từng chi tiết nhỏ nhất.',
  },
  {
    name: 'Anh Phước',
    project: 'Nội Thất Hiện Đại Tối Giản',
    avatar: '',
    quote: 'Thiết kế tối giản nhưng vẫn ấm cúng ở mọi góc, phá vỡ quan niệm rằng phong cách tối giản phải lạnh lẽo. Rất ưng ý!',
  },
]

const BLOG_POSTS = [
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550273/anphuoc/pages/blog/lav003eu4wb1xj9uueqg.jpg',
    cat: 'Kiến Thức',
    title: 'Miễn Giấy Phép Xây Dựng 2026 — Những Điều Cần Biết',
    excerpt: 'Tổng hợp các trường hợp được miễn giấy phép xây dựng theo quy định mới nhất.',
    time: '5 phút đọc',
    href: '/xu-huong/mien-giay-phep-xay-dung-2026',
  },
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550275/anphuoc/pages/blog/klc0645euss0gjed2ufc.jpg',
    cat: 'Xu Hướng',
    title: 'Xu Hướng Thiết Kế Nhà Phố Hiện Đại 2025',
    excerpt: 'Khám phá các phong cách kiến trúc nhà phố được ưa chuộng nhất năm 2025.',
    time: '4 phút đọc',
    href: '/xu-huong/xu-huong-nha-pho-2025',
  },
  {
    img: 'https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550276/anphuoc/pages/blog/p7sgesz3m8t1i1x7ebwh.jpg',
    cat: 'Kiến Thức',
    title: 'Chi Phí Xây Nhà Trọn Gói — Bảng Giá Tham Khảo',
    excerpt: 'Hướng dẫn ước tính chi phí xây nhà trọn gói theo từng hạng mục chi tiết.',
    time: '6 phút đọc',
    href: '/xu-huong/chi-phi-xay-nha',
  },
]

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [slides, setSlides] = useState(HERO_SLIDES)
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Try fetch from API, fallback to hardcoded
    fetch('/api/hero-slides')
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d) && d.length > 0) {
          setSlides(d.map((s: { tag?: string; title: string; subtitle?: string; image: string; mobile_image?: string }) => ({
            img: s.image, mobileImg: s.mobile_image || '', tag: s.tag || '', title: s.title, sub: s.subtitle || '',
          })))
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoaded(true)
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
    return () => clearInterval(t)
  }, [slides.length])

  const slide = slides[current]

  return (
    <section className="relative h-screen min-h-[700px] flex flex-col">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Desktop image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.img}
            alt=""
            className={`w-full h-full object-cover ${s.mobileImg ? 'hidden md:block' : ''}`}
          />
          {/* Mobile image (if available) */}
          {s.mobileImg && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.mobileImg}
              alt=""
              className="w-full h-full object-cover md:hidden"
            />
          )}
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
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-px transition-all duration-500 ${i === current ? 'w-10 bg-gold' : 'w-4 bg-text-muted'}`}
          />
        ))}
        <span className="ml-4 text-[11px] tracking-widest text-text-muted">
          0{current + 1} / 0{slides.length}
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
            Thiết Kế <em>&</em><br />Xây Dựng
          </h2>
          <p className="text-text-muted leading-relaxed mb-4">
            An Phước Design & Construction chuyên thiết kế kiến trúc và xây dựng trọn gói tại Hải Phòng. Từ nhà phố, biệt thự đến công trình thương mại — chúng tôi biến ý tưởng thành hiện thực.
          </p>
          <p className="text-text-muted leading-relaxed mb-8">
            Với đội ngũ kiến trúc sư giàu kinh nghiệm và thợ thi công tay nghề cao, chúng tôi cam kết công trình đạt 99% chính xác so với bản thiết kế, đúng tiến độ và minh bạch chi phí.
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
            <img src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550303/anphuoc/pages/gioi-thieu/zz3vlfwkkkp0n5qmlx4q.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-3 pt-6">
            <div className="img-hover-zoom rounded-sm overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550300/anphuoc/pages/gioi-thieu/iddbp0rhldyx9skdtvv4.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="img-hover-zoom rounded-sm overflow-hidden aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550298/anphuoc/pages/gioi-thieu/ej9x3cikkkg9jfe76ptc.jpg" alt="" className="w-full h-full object-cover" />
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
              <p className="text-text-muted text-sm">{PROJECTS[0].type}{PROJECTS[0].area ? ` · ${PROJECTS[0].area}` : ''}</p>
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
                <p className="text-text-muted text-xs">{p.type}{p.area ? ` · ${p.area}` : ''}</p>
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
                {t.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover grayscale" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold text-sm font-medium">
                    {t.name.charAt(0)}
                  </div>
                )}
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
          src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550343/anphuoc/pages/trang-chu/jjao5mv3qh0fxiiybvlr.jpg"
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
          Biến Ý Tưởng<br />Thành <em>Hiện Thực</em>
        </h2>
        <p className="text-text-muted text-lg mb-10 reveal reveal-delay-1">
          Tư vấn hoàn toàn miễn phí · Không cam kết · Phản hồi trong 24h
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-2">
          <Link href="/lien-he" className="btn-gold text-[13px] tracking-[0.12em] uppercase px-10 py-4 rounded-sm inline-flex items-center justify-center gap-2">
            Tư Vấn Ngay <ArrowRight size={16} />
          </Link>
          <a href="tel:0899289589" className="btn-outline text-[13px] tracking-[0.12em] uppercase px-10 py-4 rounded-sm inline-flex items-center justify-center gap-2">
            Gọi: 0899 289 589
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
