'use client'

import { useState } from 'react'
import { ArrowRight, MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface FormData {
  name: string; phone: string; email: string; spaceType: string;
  area: string; style: string; budget: string; message: string; agree: boolean;
}

const INITIAL: FormData = { name: '', phone: '', email: '', spaceType: 'Căn hộ', area: '', style: 'Tất cả', budget: 'Chưa xác định', message: '', agree: false }

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: keyof FormData, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.agree) { setError('Vui lòng đồng ý với chính sách bảo mật.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact_form' }),
      })
      if (res.ok) { setSubmitted(true); setForm(INITIAL) }
      else setError('Có lỗi xảy ra, vui lòng thử lại hoặc gọi điện trực tiếp.')
    } catch { setError('Không thể kết nối. Vui lòng thử lại.') }
    finally { setLoading(false) }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[38vh] min-h-[280px] flex items-end pb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://res.cloudinary.com/dmjrk2fov/image/upload/v1774550287/anphuoc/pages/dich-vu/zn7y60qjqocbgcp93phb.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/70 to-bg/30" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
            <p className="text-[11px] tracking-[0.3em] text-gold/70 uppercase mb-3">Trang Chủ / Liên Hệ</p>
            <h1 className="font-display text-[clamp(38px,6vw,72px)] text-text leading-none">Bắt Đầu Hành Trình<br />Của Bạn</h1>
            <p className="text-text-muted mt-3">Tư vấn hoàn toàn miễn phí. Không cam kết.</p>
          </div>
        </section>

        {/* Main */}
        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info panel */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-[11px] tracking-[0.3em] text-gold uppercase mb-5">Thông Tin Liên Hệ</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-text-muted text-sm">
                    <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                    Thủy Nguyên, Hải Phòng
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-gold shrink-0" />
                    <a href="tel:0922229787" className="text-text hover:text-gold transition-colors font-medium">0922 22 9787</a>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-gold shrink-0" />
                    <a href="mailto:contact@anphuocdesign.vn" className="text-text hover:text-gold transition-colors">contact@anphuocdesign.vn</a>
                  </li>
                  <li className="flex items-center gap-3 text-text-muted text-sm">
                    <Clock size={16} className="text-gold shrink-0" />
                    Thứ 2 – Thứ 7: 8:00 – 18:00
                  </li>
                </ul>
              </div>

              {/* Quick actions */}
              <div className="space-y-3">
                <a href="tel:0922229787"
                  className="gold-border w-full py-3 px-5 rounded-sm flex items-center gap-3 text-sm text-text hover:bg-gold/10 transition-colors">
                  <Phone size={16} className="text-gold" /> Gọi Ngay: 0922 22 9787
                </a>
                <a href="https://zalo.me/0922229787" target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-sm flex items-center gap-3 text-sm text-text border border-[#0068FF]/40 hover:bg-[#0068FF]/10 transition-colors">
                  <span className="w-4 h-4 bg-[#0068FF] rounded-full text-[8px] flex items-center justify-center text-white font-bold">Z</span>
                  Chat Zalo (phản hồi trong 5 phút)
                </a>
              </div>

              {/* Map placeholder */}
              <div className="rounded-sm overflow-hidden border border-border bg-surface h-48 flex items-center justify-center text-text-muted text-sm">
                <div className="text-center">
                  <MapPin size={24} className="text-gold mx-auto mb-2" />
                  Thủy Nguyên<br />Hải Phòng
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="glass rounded-sm p-12 text-center">
                  <CheckCircle2 size={48} className="text-gold mx-auto mb-5" />
                  <h3 className="font-display text-2xl text-text mb-3">Đã Nhận Yêu Cầu!</h3>
                  <p className="text-text-muted mb-6">Chúng tôi sẽ liên hệ lại với bạn trong vòng 24 giờ làm việc.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline text-[12px] tracking-wider px-6 py-2 rounded-sm">
                    Gửi Yêu Cầu Khác
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="glass rounded-sm p-8 space-y-5">
                  <h2 className="font-display text-2xl text-text mb-2">Gửi Yêu Cầu Tư Vấn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Họ và Tên *</label>
                      <input required value={form.name} onChange={e => set('name', e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none placeholder:text-text-muted/50 transition-colors" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Số Điện Thoại *</label>
                      <input required value={form.phone} onChange={e => set('phone', e.target.value)}
                        placeholder="0912 345 678"
                        className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none placeholder:text-text-muted/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Email</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                      placeholder="email@example.com"
                      className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none placeholder:text-text-muted/50 transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Loại Không Gian</label>
                      <select value={form.spaceType} onChange={e => set('spaceType', e.target.value)}
                        className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none">
                        {['Căn hộ', 'Penthouse', 'Villa', 'Biệt thự', 'Văn phòng', 'Khác'].map(v => <option key={v}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Diện Tích (m²)</label>
                      <input value={form.area} onChange={e => set('area', e.target.value)}
                        placeholder="VD: 120 m²"
                        className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none placeholder:text-text-muted/50 transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Phong Cách</label>
                      <select value={form.style} onChange={e => set('style', e.target.value)}
                        className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none">
                        {['Tất cả', 'Neo-Classic', 'Modern', 'Indochine', 'Tropical', 'Scandinavian'].map(v => <option key={v}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Ngân Sách</label>
                      <select value={form.budget} onChange={e => set('budget', e.target.value)}
                        className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none">
                        {['Chưa xác định', 'Dưới 500 triệu', '500 triệu – 1 tỷ', '1 tỷ – 2 tỷ', 'Trên 2 tỷ'].map(v => <option key={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest text-gold uppercase block mb-2">Mô Tả Yêu Cầu</label>
                    <textarea value={form.message} onChange={e => set('message', e.target.value)}
                      rows={4} placeholder="Mô tả ngắn về dự án của bạn..."
                      className="w-full bg-bg border border-border rounded-sm px-4 py-3 text-text text-sm focus:border-gold outline-none placeholder:text-text-muted/50 transition-colors resize-none" />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="agree" checked={form.agree} onChange={e => set('agree', e.target.checked)}
                      className="mt-0.5 accent-[#C9A84C]" />
                    <label htmlFor="agree" className="text-sm text-text-muted cursor-pointer">
                      Tôi đồng ý với <span className="text-gold">chính sách bảo mật</span> và cho phép An Phước liên hệ tư vấn.
                    </label>
                  </div>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="btn-gold w-full text-[13px] tracking-[0.12em] uppercase py-4 rounded-sm flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? 'Đang Gửi...' : <><span>Gửi Yêu Cầu Tư Vấn</span><ArrowRight size={16} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
