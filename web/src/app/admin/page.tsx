'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FolderOpen, FileText, MessageSquare, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, posts: 0, leads: 0, newLeads: 0 })

  useEffect(() => {
    Promise.all([
      fetch('/api/projects?status=all').then(r => r.json()).catch(() => []),
      fetch('/api/posts?status=all').then(r => r.json()).catch(() => []),
      fetch('/api/contact').then(r => r.json()).catch(() => []),
    ]).then(([projects, posts, leads]) => {
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        posts: Array.isArray(posts) ? posts.length : 0,
        leads: Array.isArray(leads) ? leads.length : 0,
        newLeads: Array.isArray(leads) ? leads.filter((l: { status: string }) => l.status === 'new').length : 0,
      })
    })
  }, [])

  const cards = [
    { icon: FolderOpen, label: 'Dự Án', value: stats.projects, href: '/admin/du-an', color: 'text-gold' },
    { icon: FileText, label: 'Bài Viết', value: stats.posts, href: '/admin/bai-viet', color: 'text-accent' },
    { icon: MessageSquare, label: 'Yêu Cầu Mới', value: stats.newLeads, href: '/admin/lien-he', color: 'text-green-400' },
    { icon: TrendingUp, label: 'Tổng Yêu Cầu', value: stats.leads, href: '/admin/lien-he', color: 'text-text-muted' },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl text-text mb-8">Tổng Quan</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(c => {
          const Icon = c.icon
          return (
            <Link key={c.label} href={c.href}
              className="bg-surface border border-border rounded-sm p-5 hover:border-gold/40 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <Icon size={18} className={c.color} />
                <span className="text-border text-[10px] tracking-widest">→</span>
              </div>
              <div className={`font-display text-3xl ${c.color} mb-1`}>{c.value}</div>
              <div className="text-text-muted text-xs tracking-wide">{c.label}</div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-text text-sm font-medium">Truy Cập Nhanh</h2>
          </div>
          <div className="space-y-2">
            {[
              { label: '+ Thêm Dự Án Mới', href: '/admin/du-an/moi' },
              { label: '+ Viết Bài Mới', href: '/admin/bai-viet/moi' },
              { label: '→ Xem Yêu Cầu Mới', href: '/admin/lien-he' },
              { label: '↗ Xem Website', href: '/', target: '_blank' },
            ].map(item => (
              <Link key={item.label} href={item.href} target={item.target}
                className="block px-3 py-2 rounded-sm text-sm text-text-muted hover:text-gold hover:bg-bg transition-all">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-sm p-6">
          <h2 className="text-text text-sm font-medium mb-4">Hướng Dẫn Sử Dụng</h2>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span>Vào <strong className="text-text">Dự Án</strong> để thêm, sửa, xóa dự án thiết kế</li>
            <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span>Vào <strong className="text-text">Bài Viết</strong> để quản lý blog xu hướng thiết kế</li>
            <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span>Vào <strong className="text-text">Yêu Cầu</strong> để xem và xử lý form liên hệ từ khách hàng</li>
            <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span>Dữ liệu được lưu trên Supabase (PostgreSQL)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
