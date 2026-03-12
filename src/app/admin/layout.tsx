'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, FolderOpen, FileText, MessageSquare, LogOut, Menu, X, ExternalLink } from 'lucide-react'
import PageLoader from '@/components/PageLoader'

const NAV = [
  { icon: LayoutDashboard, label: 'Tổng Quan', href: '/admin' },
  { icon: FolderOpen, label: 'Dự Án', href: '/admin/du-an' },
  { icon: FileText, label: 'Bài Viết', href: '/admin/bai-viet' },
  { icon: MessageSquare, label: 'Yêu Cầu', href: '/admin/lien-he' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [sideOpen, setSideOpen] = useState(false)

  useEffect(() => {
    setAuth(localStorage.getItem('atelier_admin') === 'true')
  }, [])

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'atelier2024') {
      localStorage.setItem('atelier_admin', 'true')
      setAuth(true)
    } else {
      setErr('Mật khẩu không đúng.')
    }
  }

  const logout = () => {
    localStorage.removeItem('atelier_admin')
    setAuth(false)
  }

  if (auth === null) return <PageLoader />

  if (!auth) return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="glass rounded-sm p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <svg width="36" height="36" viewBox="0 0 28 28" fill="none" className="mx-auto mb-4">
            <polygon points="14,1 27,8 27,20 14,27 1,20 1,8" stroke="#C9A84C" strokeWidth="1.2" fill="none"/>
          </svg>
          <div className="font-display text-xl tracking-[0.2em] text-gold">ATELIER</div>
          <div className="text-[10px] tracking-[0.3em] text-text-muted mt-1">Admin Panel</div>
        </div>
        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Mật Khẩu</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none"
              placeholder="••••••••" autoFocus />
          </div>
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button type="submit" className="btn-gold w-full py-3 rounded-sm text-[12px] tracking-widest uppercase">Đăng Nhập</button>
        </form>
        <p className="text-center text-text-muted text-xs mt-6">Demo: <span className="text-gold">atelier2024</span></p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-50 w-60 bg-surface border-r border-border flex flex-col
        transition-transform duration-300 md:translate-x-0
        ${sideOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-base tracking-[0.2em] text-gold">ATELIER</div>
              <div className="text-[9px] tracking-[0.25em] text-text-muted">Admin Panel</div>
            </div>
            <button className="md:hidden text-text-muted" onClick={() => setSideOpen(false)}><X size={16} /></button>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(item => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href} onClick={() => setSideOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-text-muted hover:text-text hover:bg-bg transition-all text-sm group">
                <Icon size={15} className="group-hover:text-gold transition-colors" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Link href="/" target="_blank"
            className="flex items-center gap-2 text-text-muted text-xs hover:text-gold transition-colors px-3 py-2">
            <ExternalLink size={12} /> Xem Website
          </Link>
          <button onClick={logout}
            className="w-full flex items-center gap-2 text-text-muted text-xs hover:text-red-400 transition-colors px-3 py-2">
            <LogOut size={12} /> Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sideOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSideOpen(false)} />}

      {/* Main */}
      <div className="flex-1 md:ml-60 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="bg-surface border-b border-border px-6 py-4 flex items-center gap-4">
          <button className="md:hidden text-text-muted hover:text-gold" onClick={() => setSideOpen(true)}>
            <Menu size={18} />
          </button>
          <span className="text-text-muted text-sm ml-auto">Xin chào, Admin</span>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
