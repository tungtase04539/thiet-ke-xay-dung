'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Tag } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageLoader from '@/components/PageLoader'

interface Post {
  id: string; slug: string; title: string; excerpt: string; content: string;
  category: string; tags: string[]; cover_image: string; read_time: string; published_at: string;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => d ? setPost(d) : router.push('/xu-huong'))
      .catch(() => router.push('/xu-huong'))
  }, [slug, router])

  if (!post) return <PageLoader />

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[400px] flex items-end pb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover_image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/70 to-bg/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 w-full">
            <Link href="/xu-huong" className="flex items-center gap-2 text-text-muted text-sm hover:text-gold transition-colors mb-5">
              <ArrowLeft size={14} /> Xu Hướng
            </Link>
            <span className="inline-block text-[10px] tracking-widest text-gold uppercase border border-gold/40 px-3 py-1 mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-[clamp(28px,4vw,52px)] text-text leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-text-muted text-xs">
              <span className="flex items-center gap-1.5"><Clock size={11} />{post.read_time} phút đọc</span>
              <span className="text-border">·</span>
              <span>{formatDate(post.published_at)}</span>
            </div>
          </div>
        </section>

        {/* Content */}
        <article className="py-16 max-w-4xl mx-auto px-6">
          {post.excerpt && (
            <p className="font-display text-xl text-text italic leading-relaxed mb-8 pb-8 border-b border-border">
              &ldquo;{post.excerpt}&rdquo;
            </p>
          )}
          <div className="prose prose-invert prose-lg max-w-none text-text-muted leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mt-12 pt-8 border-t border-border">
              <Tag size={13} className="text-gold" />
              {post.tags.map(tag => (
                <span key={tag} className="text-[11px] tracking-wider text-text-muted border border-border px-2 py-0.5 rounded-sm">{tag}</span>
              ))}
            </div>
          )}
        </article>

        {/* CTA */}
        <section className="py-16 bg-surface text-center">
          <h2 className="font-display text-3xl text-text mb-4">Muốn Tư Vấn Thiết Kế?</h2>
          <p className="text-text-muted mb-6">Nhận tư vấn miễn phí từ đội ngũ An Phước</p>
          <Link href="/lien-he" className="btn-gold text-[13px] tracking-[0.1em] uppercase px-8 py-3 rounded-sm inline-flex items-center gap-2">
            Liên Hệ Ngay <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
