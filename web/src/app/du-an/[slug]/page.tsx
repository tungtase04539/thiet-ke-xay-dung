'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Maximize2, Layers, X, ChevronLeft, ChevronRight } from 'lucide-react'
// ChevronLeft/ChevronRight still used in lightbox
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageLoader from '@/components/PageLoader'

interface Project {
  id: string; slug: string; name: string; type: string; area: string;
  style: string; location: string; year: string; description: string;
  highlights: string[]; materials: { name: string; type: string }[];
  cover_image: string; images: string[]; featured: boolean;
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    fetch(`/api/projects/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => d ? setProject(d) : router.push('/du-an'))
      .catch(() => router.push('/du-an'))
  }, [slug, router])

  if (!project) return <PageLoader />

  const images = Array.isArray(project.images) && project.images.length ? project.images : [project.cover_image]

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-screen min-h-[600px] flex flex-col justify-end">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[0]} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/85 via-bg/50 to-bg/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-transparent to-bg/30" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/du-an" className="flex items-center gap-1.5 text-text-muted text-sm hover:text-gold transition-colors">
                <ArrowLeft size={14} /> Dự Án
              </Link>
              <span className="text-border">/</span>
              <span className="text-gold/70 text-sm">{project.name}</span>
            </div>
            <h1 className="font-display text-[clamp(40px,7vw,96px)] text-text leading-none uppercase tracking-wide">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-text-muted text-sm">
              <span className="flex items-center gap-1.5"><Layers size={13} className="text-gold" />{project.style}</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5"><Maximize2 size={13} className="text-gold" />{project.area}m²</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gold" />{project.location}</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1.5"><Calendar size={13} className="text-gold" />{project.year}</span>
            </div>
          </div>
        </section>

        {/* Info bar */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { label: 'Loại Công Trình', val: project.type },
              { label: 'Diện Tích', val: `${project.area}m²` },
              { label: 'Phong Cách', val: project.style },
              { label: 'Hoàn Thành', val: project.year },
            ].map(item => (
              <div key={item.label} className="px-6 py-5">
                <div className="text-[10px] tracking-widest text-text-muted uppercase mb-1">{item.label}</div>
                <div className="text-text font-medium">{item.val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-gold" />
                <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Câu Chuyện Thiết Kế</span>
              </div>
              <p className="font-display text-xl text-text italic leading-relaxed mb-4">&ldquo;{project.description}&rdquo;</p>
            </div>
            {project.highlights?.length > 0 && (
              <div>
                <h3 className="text-[11px] tracking-widest text-gold uppercase mb-4">Điểm Nổi Bật</h3>
                <ul className="space-y-3">
                  {project.highlights.map(h => (
                    <li key={h} className="flex items-center gap-3 text-text-muted">
                      <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Gallery */}
        {images.length > 1 && (
          <section className="pb-16 max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Thư Viện Ảnh</span>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map((img, i) => (
                <button key={i} onClick={() => setLightbox(i)}
                  className="group relative w-full rounded-sm overflow-hidden img-hover-zoom block text-left"
                  style={{ breakInside: 'avoid' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full object-cover" style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }} />
                  <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/20 transition-colors flex items-center justify-center">
                    <Maximize2 size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Before/After Slider — hidden until project has before_image data */}

        {/* Materials */}
        {project.materials?.length > 0 && (
          <section className="pb-16 max-w-7xl mx-auto px-6">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.3em] text-gold uppercase">Bảng Vật Liệu</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {project.materials.map(m => (
                <div key={m.name} className="shrink-0 glass rounded-sm p-5 w-36 text-center">
                  <div className="w-12 h-12 rounded-sm bg-surface border border-border mx-auto mb-3" />
                  <div className="text-text text-sm">{m.name}</div>
                  <div className="text-gold text-[10px] tracking-widest mt-1">{m.type}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-surface text-center">
          <h2 className="font-display text-4xl text-text mb-4">Bạn Muốn Không Gian Tương Tự?</h2>
          <p className="text-text-muted mb-8">Tư vấn miễn phí — phản hồi trong 24 giờ</p>
          <Link href="/lien-he" className="btn-gold text-[13px] tracking-[0.1em] uppercase px-10 py-4 rounded-sm inline-flex items-center gap-2">
            Liên Hệ Ngay <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </section>
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors" onClick={() => setLightbox(null)}>
            <X size={24} />
          </button>
          <button className="absolute left-6 text-white hover:text-gold transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l - 1 + images.length) % images.length : null) }}>
            <ChevronLeft size={32} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[lightbox]} alt="" className="max-h-[90vh] max-w-[90vw] object-contain" onClick={e => e.stopPropagation()} />
          <button className="absolute right-6 text-white hover:text-gold transition-colors"
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l + 1) % images.length : null) }}>
            <ChevronRight size={32} />
          </button>
          <div className="absolute bottom-6 text-text-muted text-sm">{lightbox + 1} / {images.length}</div>
        </div>
      )}

      <Footer />
    </>
  )
}
