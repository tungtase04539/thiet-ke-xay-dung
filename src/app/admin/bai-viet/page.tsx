'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye, Search } from 'lucide-react'

interface Post { id: string; slug: string; title: string; category: string; status: string; readTime: string; publishedAt: string }

function formatDate(d: string) { return new Date(d).toLocaleDateString('vi-VN') }

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [search, setSearch] = useState('')

  const load = () => fetch('/api/posts?status=all').then(r => r.json())
    .then(d => setPosts(Array.isArray(d) ? d : []))
    .catch(() => setPosts([]))
  useEffect(() => { load() }, [])

  const del = async (id: string) => {
    if (!confirm('Xóa bài viết này?')) return
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    await load()
  }

  const toggleStatus = async (p: Post) => {
    await fetch(`/api/posts/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: p.status === 'published' ? 'draft' : 'published' }),
    })
    await load()
  }

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-text">Quản Lý Bài Viết</h1>
        <Link href="/admin/bai-viet/moi" className="btn-gold text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm flex items-center gap-2">
          <Plus size={14} /> Viết Bài Mới
        </Link>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm kiếm bài viết..."
          className="w-full bg-surface border border-border rounded-sm pl-9 pr-4 py-2.5 text-text text-sm focus:border-gold outline-none" />
      </div>

      <div className="bg-surface border border-border rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase">Bài Viết</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase hidden md:table-cell">Danh Mục</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase hidden md:table-cell">Ngày</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase">Trạng Thái</th>
              <th className="text-right px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-bg/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="text-text font-medium line-clamp-1">{p.title}</div>
                  <div className="text-text-muted text-[11px]">{p.readTime} phút đọc</div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-[10px] tracking-widest text-gold border border-gold/40 px-2 py-0.5">{p.category}</span>
                </td>
                <td className="px-4 py-3 text-text-muted text-[12px] hidden md:table-cell">{formatDate(p.publishedAt)}</td>
                <td className="px-4 py-3">
                  <button onClick={() => toggleStatus(p)}
                    className={`text-[10px] tracking-widest px-2 py-0.5 border rounded-sm ${
                      p.status === 'published' ? 'border-green-500/40 text-green-400' : 'border-border text-text-muted'
                    }`}>
                    {p.status === 'published' ? 'Đã Đăng' : 'Nháp'}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/xu-huong/${p.slug}`} target="_blank"
                      className="p-1.5 rounded text-text-muted hover:text-gold transition-colors">
                      <Eye size={14} />
                    </Link>
                    <Link href={`/admin/bai-viet/${p.id}`}
                      className="p-1.5 rounded text-text-muted hover:text-gold transition-colors">
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => del(p.id)}
                      className="p-1.5 rounded text-text-muted hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-text-muted text-sm">Chưa có bài viết nào.</div>}
      </div>
    </div>
  )
}
