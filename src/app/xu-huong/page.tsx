'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Post { id: string; slug: string; title: string; excerpt: string; category: string; cover_image: string; read_time: string; published_at: string }

const CATEGORIES = ['Tất Cả', 'Xu Hướng', 'Vật Liệu', 'Ánh Sáng', 'Phong Cách', 'Kỹ Thuật']

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [cat, setCat] = useState('Tất Cả')

  useEffect(() => {
    fetch('/api/posts?status=published')
      .then(r => r.json())
      .then(d => setPosts(Array.isArray(d) ? d : []))
      .catch(() => setPosts([]))
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && (x.target.classList.add('visible'), obs.unobserve(x.target))), { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })

  const filtered = cat === 'Tất Cả' ? posts : posts.filter(p => p.category === cat)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[45vh] min-h-[350px] flex items-end pb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/70 to-bg/30" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <div className="inline-flex items-center gap-3 mb-4"><span className="w-8 h-px bg-gold" /><span className="text-[11px] tracking-[0.3em] text-gold uppercase">Xu Hướng</span></div>
            <h1 className="font-display text-[clamp(38px,6vw,70px)] text-text leading-none">Cảm Hứng & Xu Hướng</h1>
          </div>
        </section>

        {/* Category Filter */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`text-[11px] tracking-wider px-4 py-1.5 rounded-sm border transition-all ${cat === c ? 'border-gold bg-gold/10 text-gold' : 'border-border text-text-muted hover:border-gold/50'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-text-muted">Chưa có bài viết nào.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((post, i) => (
                <Link key={post.id} href={`/xu-huong/${post.slug}`}
                  className={`group rounded-sm overflow-hidden bg-surface border border-border hover:border-gold/30 transition-all reveal reveal-delay-${i % 3}`}>
                  <div className="img-hover-zoom aspect-video overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] tracking-widest text-gold uppercase border border-gold/40 px-2 py-0.5">{post.category}</span>
                    <h2 className="font-display text-xl text-text mt-3 mb-2 group-hover:text-gold transition-colors line-clamp-2">{post.title}</h2>
                    <p className="text-text-muted text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-[11px] text-text-muted">
                      <span className="flex items-center gap-1"><Clock size={11} /> {post.read_time} phút đọc</span>
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
