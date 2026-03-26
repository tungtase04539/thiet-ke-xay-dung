'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Giới Thiệu', href: '/gioi-thieu' },
  { label: 'Dự Án', href: '/du-an' },
  { label: 'Dịch Vụ', href: '/dich-vu' },
  { label: 'Xu Hướng', href: '/xu-huong' },
  { label: 'Liên Hệ', href: '/lien-he' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          scrolled
            ? 'py-3 glass shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'py-5 bg-gradient-to-b from-bg/80 via-bg/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="An Phước Design" className="h-10 w-auto" />
            <div>
              <div className="font-display text-lg tracking-[0.12em] text-text font-semibold leading-none group-hover:text-gold transition-colors">
                AN PHƯỚC
              </div>
              <div className="text-[8px] tracking-[0.2em] text-text-muted leading-none mt-0.5">
                DESIGN & CONSTRUCTION
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-[0.1em] text-text font-medium uppercase hover:text-gold transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:0922229787" className="flex items-center gap-2 text-text-muted hover:text-gold transition-colors">
              <Phone size={14} />
              <span className="text-[12px] tracking-wider">0922 22 9787</span>
            </a>
            <Link
              href="/lien-he"
              className="btn-gold text-[12px] tracking-[0.1em] uppercase px-5 py-2.5 rounded-sm"
            >
              Tư Vấn Miễn Phí
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-gold p-2"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[300px] bg-surface border-l border-border flex flex-col
            transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex justify-between items-center p-6 border-b border-border">
            <span className="font-display text-lg tracking-[0.12em] text-gold">AN PHƯỚC</span>
            <button onClick={() => setMenuOpen(false)} className="text-text-muted hover:text-gold transition-colors">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-8 px-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl text-text-muted hover:text-gold transition-colors tracking-wider"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-8 border-t border-border space-y-4">
            <Link
              href="/lien-he"
              onClick={() => setMenuOpen(false)}
              className="btn-gold block text-center text-[12px] tracking-[0.1em] uppercase px-5 py-3 rounded-sm"
            >
              Tư Vấn Miễn Phí
            </Link>
            <a href="tel:0922229787" className="block text-center text-text-muted text-sm tracking-wider hover:text-gold transition-colors">
              0922 22 9787
            </a>
          </div>
        </div>
      </div>

      {/* Floating Zalo & Phone */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="https://zalo.me/0922229787"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#0068FF] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Chat Zalo"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.03 2 11c0 2.7 1.25 5.12 3.24 6.78L4.5 22l4.36-1.45A10.5 10.5 0 0012 21c5.52 0 10-4.03 10-9S17.52 2 12 2z"/>
            <text x="6.5" y="15" fontSize="7" fill="#0068FF" fontWeight="bold">ZA</text>
          </svg>
        </a>
        <a
          href="tel:0922229787"
          className="w-12 h-12 rounded-full bg-gold flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          title="Gọi ngay"
        >
          <Phone size={18} color="#0A0A0F" />
        </a>
      </div>
    </>
  )
}
