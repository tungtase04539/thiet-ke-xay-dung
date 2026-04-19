import Link from 'next/link'
import { Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'

const footerLinks = {
  'Dịch Vụ': [
    { label: 'Tư Vấn & Thiết Kế', href: '/dich-vu' },
    { label: 'Thi Công & Xây Dựng', href: '/dich-vu' },
    { label: 'Giám Sát & Bảo Hành', href: '/dich-vu' },
  ],
  'Dự Án': [
    { label: 'Thiết Kế Nội Thất', href: '/du-an' },
    { label: 'Penthouse & Villa', href: '/du-an' },
    { label: 'Căn Hộ Cao Cấp', href: '/du-an' },
  ],
  'Công Ty': [
    { label: 'Giới Thiệu', href: '/gioi-thieu' },
    { label: 'Xu Hướng', href: '/xu-huong' },
    { label: 'Liên Hệ', href: '/lien-he' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#070709] border-t border-border">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="An Phước Design" className="h-9 w-auto" />
              <div>
                <div className="font-display text-base tracking-[0.12em] text-text">AN PHƯỚC</div>
                <div className="text-[8px] tracking-[0.2em] text-text-muted">DESIGN & CONSTRUCTION</div>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-xs">
              An Phước Design & Construction — Thiết kế kiến trúc & xây dựng trọn gói. Biến ý tưởng thành hiện thực với chất lượng vượt trội.
            </p>
            <div className="space-y-2 text-sm text-text-muted">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span>Thủy Nguyên, Hải Phòng</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                <a href="tel:0899289589" className="hover:text-gold transition-colors">0899 289 589</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gold shrink-0" />
                <a href="mailto:contact@anphuocdesign.vn" className="hover:text-gold transition-colors">contact@anphuocdesign.vn</a>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[11px] tracking-[0.2em] text-gold uppercase mb-5">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted tracking-wide">
            © 2025 An Phước Design & Construction. Thiết kế & Xây dựng.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 border border-border rounded-sm flex items-center justify-center text-text-muted hover:border-gold hover:text-gold transition-all"
            >
              <Instagram size={14} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 border border-border rounded-sm flex items-center justify-center text-text-muted hover:border-gold hover:text-gold transition-all"
            >
              <Youtube size={14} />
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 border border-border rounded-sm flex items-center justify-center text-text-muted hover:border-gold hover:text-gold transition-all text-[10px] font-bold"
            >
              Be
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
