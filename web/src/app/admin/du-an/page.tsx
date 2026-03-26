'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Eye, Star, StarOff, Search } from 'lucide-react'

interface Project {
  id: string; slug: string; name: string; type: string; area: string;
  style: string; status: string; featured: boolean; cover_image: string; year: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const load = () => fetch('/api/projects?status=all').then(r => r.json())
    .then(d => setProjects(Array.isArray(d) ? d : []))
    .catch(() => setProjects([]))
  useEffect(() => { load() }, [])

  const del = async (id: string) => {
    if (!confirm('Xóa dự án này?')) return
    setDeleting(id)
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    await load()
    setDeleting(null)
  }

  const toggleFeatured = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !p.featured }),
    })
    await load()
  }

  const toggleStatus = async (p: Project) => {
    await fetch(`/api/projects/${p.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: p.status === 'published' ? 'draft' : 'published' }),
    })
    await load()
  }

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.style.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-text">Quản Lý Dự Án</h1>
        <Link href="/admin/du-an/moi" className="btn-gold text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm flex items-center gap-2">
          <Plus size={14} /> Thêm Dự Án
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Tìm kiếm dự án..."
          className="w-full bg-surface border border-border rounded-sm pl-9 pr-4 py-2.5 text-text text-sm focus:border-gold outline-none" />
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase">Dự Án</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase hidden md:table-cell">Loại</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase hidden lg:table-cell">Phong Cách</th>
              <th className="text-left px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase">Trạng Thái</th>
              <th className="text-right px-4 py-3 text-[10px] tracking-widest text-text-muted uppercase">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-bg/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.cover_image} alt="" className="w-10 h-10 object-cover rounded-sm shrink-0" />
                    <div>
                      <div className="text-text font-medium line-clamp-1">{p.name}</div>
                      <div className="text-text-muted text-[11px]">{p.area}m² · {p.year}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-muted hidden md:table-cell">{p.type}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-[10px] tracking-widest text-gold border border-gold/40 px-2 py-0.5">{p.style}</span>
                </td>
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
                    <button onClick={() => toggleFeatured(p)} title="Nổi bật"
                      className={`p-1.5 rounded hover:bg-bg transition-colors ${p.featured ? 'text-gold' : 'text-border hover:text-gold'}`}>
                      {p.featured ? <Star size={14} fill="currentColor" /> : <StarOff size={14} />}
                    </button>
                    <Link href={`/du-an/${p.slug}`} target="_blank"
                      className="p-1.5 rounded text-text-muted hover:text-gold transition-colors" title="Xem">
                      <Eye size={14} />
                    </Link>
                    <Link href={`/admin/du-an/${p.id}`}
                      className="p-1.5 rounded text-text-muted hover:text-gold transition-colors" title="Sửa">
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => del(p.id)} disabled={deleting === p.id}
                      className="p-1.5 rounded text-text-muted hover:text-red-400 transition-colors" title="Xóa">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted text-sm">Không có dự án nào.</div>
        )}
      </div>
    </div>
  )
}
