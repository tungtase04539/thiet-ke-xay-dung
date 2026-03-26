'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Filter, X } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const STYLES = ['Tất Cả', 'Hiện đại', 'Tân cổ điển', 'Hiện đại tối giản', 'Hiện đại sang trọng', 'Modern Minimalist']
const TYPES = ['Tất Cả', 'Nhà phố', 'Biệt thự', 'Nội thất', 'Xây dựng', 'Thương mại']
const AREAS = ['Tất Cả', '50-100m²', '100-200m²', '200-400m²', '400m²+']

interface Project {
  id: string; slug: string; name: string; type: string; area: string;
  style: string; location: string; year: string; cover_image: string; featured: boolean;
}

function areaMatch(area: string, filter: string) {
  if (filter === 'Tất Cả') return true
  const a = parseInt(area)
  if (filter === '50-100m²') return a >= 50 && a <= 100
  if (filter === '100-200m²') return a > 100 && a <= 200
  if (filter === '200-400m²') return a > 200 && a <= 400
  if (filter === '400m²+') return a > 400
  return true
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [style, setStyle] = useState('Tất Cả')
  const [type, setType] = useState('Tất Cả')
  const [area, setArea] = useState('Tất Cả')
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(8)

  useEffect(() => {
    fetch('/api/projects?status=published')
      .then(r => r.json())
      .then(d => { setProjects(Array.isArray(d) ? d : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && (x.target.classList.add('visible'), obs.unobserve(x.target))), { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [projects, style, type, area, visible])

  const filtered = projects.filter(p =>
    (style === 'Tất Cả' || p.style === style) &&
    (type === 'Tất Cả' || p.type === type) &&
    areaMatch(p.area, area)
  )

  const resetFilters = useCallback(() => { setStyle('Tất Cả'); setType('Tất Cả'); setArea('Tất Cả') }, [])
  const hasFilters = style !== 'Tất Cả' || type !== 'Tất Cả' || area !== 'Tất Cả'

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-end pb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550398/anphuoc/projects/05-noi-that-hien-dai-sang-trong/n3ryzlesezwf9a5wt2iy.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/70 to-bg/40" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <p className="text-[11px] tracking-[0.3em] text-gold/70 uppercase mb-3">Trang Chủ / Dự Án</p>
            <h1 className="font-display text-[clamp(40px,6vw,80px)] text-text leading-none">Dự Án Của Chúng Tôi</h1>
            <p className="text-text-muted mt-3">Dự án thiết kế kiến trúc & xây dựng trọn gói tại Hải Phòng</p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-surface border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center gap-6">
              {/* Style */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] tracking-widest text-text-muted uppercase">Phong cách:</span>
                {STYLES.map(s => (
                  <button key={s} onClick={() => setStyle(s)}
                    className={`text-[11px] tracking-wider px-3 py-1 rounded-sm border transition-all ${
                      style === s ? 'border-gold bg-gold/10 text-gold' : 'border-border text-text-muted hover:border-gold/50'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-3">
              {/* Type */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] tracking-widest text-text-muted uppercase">Loại:</span>
                {TYPES.map(t => (
                  <button key={t} onClick={() => setType(t)}
                    className={`text-[11px] tracking-wider px-3 py-1 rounded-sm border transition-all ${
                      type === t ? 'border-gold bg-gold/10 text-gold' : 'border-border text-text-muted hover:border-gold/50'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
              {/* Area */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] tracking-widest text-text-muted uppercase">Diện tích:</span>
                {AREAS.map(a => (
                  <button key={a} onClick={() => setArea(a)}
                    className={`text-[11px] tracking-wider px-3 py-1 rounded-sm border transition-all ${
                      area === a ? 'border-gold bg-gold/10 text-gold' : 'border-border text-text-muted hover:border-gold/50'
                    }`}>
                    {a}
                  </button>
                ))}
              </div>
              {hasFilters && (
                <button onClick={resetFilters} className="flex items-center gap-1 text-[11px] text-text-muted hover:text-gold transition-colors">
                  <X size={12} /> Xóa lọc
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-24">
              <svg width="36" height="36" viewBox="0 0 28 28" fill="none" className="mx-auto animate-pulse mb-3">
                <polygon points="14,1 27,8 27,20 14,27 1,20 1,8" stroke="#C9A84C" strokeWidth="1" fill="none" />
                <polygon points="14,6 22,10.5 22,17.5 14,22 6,17.5 6,10.5" stroke="#C9A84C" strokeWidth="0.5" fill="rgba(201,168,76,0.05)" />
              </svg>
              <div className="text-[11px] tracking-[0.3em] text-[#9A9488] uppercase">Đang tải...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <Filter size={40} className="text-border mx-auto mb-4" />
              <p className="text-text-muted">Không có dự án nào phù hợp với bộ lọc.</p>
              <button onClick={resetFilters} className="mt-4 btn-outline text-[12px] tracking-wider px-6 py-2 rounded-sm">Xóa Bộ Lọc</button>
            </div>
          ) : (
            <>
              <p className="text-text-muted text-sm mb-8">Hiển thị {Math.min(visible, filtered.length)}/{filtered.length} dự án</p>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {filtered.slice(0, visible).map((p, i) => (
                  <Link key={p.id} href={`/du-an/${p.slug}`}
                    className={`group relative rounded-sm overflow-hidden img-hover-zoom block reveal reveal-delay-${i % 4}`}
                    style={{ breakInside: 'avoid' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.cover_image} alt={p.name}
                      className="w-full object-cover"
                      style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    {p.featured && (
                      <div className="absolute top-4 right-4 text-[9px] tracking-widest bg-gold text-bg px-2 py-0.5">NỔI BẬT</div>
                    )}
                    <div className="absolute bottom-0 left-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      <span className="text-[10px] tracking-widest text-gold uppercase border border-gold/40 px-2 py-0.5 mb-2 inline-block">{p.style}</span>
                      <h3 className="font-display text-lg text-text leading-tight">{p.name}</h3>
                      <p className="text-text-muted text-xs mt-1">{p.type}{p.area ? ` · ${p.area}m²` : ''}</p>
                      <span className="inline-flex items-center gap-1 mt-2 text-[11px] text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                        Xem chi tiết <ArrowRight size={10} />
                      </span>
                    </div>
                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 rounded-sm transition-all duration-500" />
                  </Link>
                ))}
              </div>
              {visible < filtered.length && (
                <div className="text-center mt-12">
                  <button onClick={() => setVisible(v => v + 6)}
                    className="btn-outline text-[12px] tracking-[0.12em] uppercase px-10 py-3 rounded-sm">
                    Xem Thêm Dự Án
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
