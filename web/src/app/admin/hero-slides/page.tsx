'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Save, ArrowUp, ArrowDown, Image as ImageIcon } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

interface Slide {
  id?: string; tag: string; title: string; subtitle: string;
  image: string; mobile_image: string; sort_order: number; status: string;
}

const EMPTY: Slide = { tag: '', title: '', subtitle: '', image: '', mobile_image: '', sort_order: 0, status: 'published' }

export default function AdminHeroSlides() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [editing, setEditing] = useState<Slide | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = () => fetch('/api/hero-slides')
    .then(r => r.json())
    .then(d => setSlides(Array.isArray(d) ? d : []))
    .catch(() => setSlides([]))

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (!editing.title.trim() || !editing.image.trim()) { setMsg('Tiêu đề và ảnh là bắt buộc.'); return }
    setSaving(true); setMsg('')
    try {
      const url = editing.id ? `/api/hero-slides/${editing.id}` : '/api/hero-slides'
      const method = editing.id ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
      if (res.ok) { setMsg('Đã lưu!'); setEditing(null); await load() }
      else { const j = await res.json(); setMsg(j.error ?? 'Lỗi khi lưu.') }
    } catch { setMsg('Lỗi kết nối.') }
    finally { setSaving(false) }
  }

  const del = async (id: string) => {
    if (!confirm('Xóa slide này?')) return
    await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' })
    await load()
    if (editing?.id === id) setEditing(null)
  }

  const moveOrder = async (slide: Slide, dir: number) => {
    await fetch(`/api/hero-slides/${slide.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sort_order: (slide.sort_order || 0) + dir }),
    })
    await load()
  }

  const ic = 'w-full bg-bg border border-border rounded-sm px-4 py-2.5 text-text text-sm focus:border-gold outline-none transition-colors'
  const lc = 'text-[10px] tracking-widest text-gold uppercase block mb-1.5'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-text">Hero Slides</h1>
        <button onClick={() => setEditing({ ...EMPTY, sort_order: slides.length })}
          className="btn-gold text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm flex items-center gap-2">
          <Plus size={14} /> Thêm Slide
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {slides.length === 0 ? (
            <div className="bg-surface border border-border rounded-sm p-10 text-center text-text-muted text-sm">
              <ImageIcon size={32} className="mx-auto mb-3 opacity-30" />
              Chưa có slide nào. Thêm slide đầu tiên!
            </div>
          ) : slides.map(s => (
            <div key={s.id}
              onClick={() => setEditing({ ...s })}
              className={`bg-surface border rounded-sm p-4 cursor-pointer transition-all flex gap-4 items-center ${
                editing?.id === s.id ? 'border-gold' : 'border-border hover:border-gold/40'
              }`}>
              {s.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.image} alt="" className="w-20 h-14 object-cover rounded-sm shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-gold text-[10px] tracking-widest uppercase">{s.tag || 'Slide'}</div>
                <div className="text-text text-sm font-medium whitespace-pre-line line-clamp-2">{s.title}</div>
                <div className="text-text-muted text-xs truncate">{s.subtitle}</div>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button onClick={e => { e.stopPropagation(); moveOrder(s, -1) }} className="p-1 text-text-muted hover:text-gold"><ArrowUp size={12} /></button>
                <button onClick={e => { e.stopPropagation(); moveOrder(s, 1) }} className="p-1 text-text-muted hover:text-gold"><ArrowDown size={12} /></button>
                <button onClick={e => { e.stopPropagation(); del(s.id!) }} className="p-1 text-text-muted hover:text-red-400"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit panel */}
        {editing ? (
          <div className="bg-surface border border-border rounded-sm p-6 space-y-4 h-fit sticky top-20">
            <h2 className="text-text text-sm font-medium border-b border-border pb-3">
              {editing.id ? 'Chỉnh Sửa Slide' : 'Thêm Slide Mới'}
            </h2>
            <div>
              <label className={lc}>Tag (nhãn nhỏ)</label>
              <input value={editing.tag} onChange={e => setEditing({ ...editing, tag: e.target.value })} className={ic} placeholder="VD: Thiết Kế Kiến Trúc" />
            </div>
            <div>
              <label className={lc}>Tiêu Đề *</label>
              <textarea
                rows={2}
                value={editing.title}
                onChange={e => setEditing({ ...editing, title: e.target.value })}
                className={`${ic} resize-none`}
                placeholder={"Biến Ý Tưởng\nThành Hiện Thực"}
              />
              <p className="text-[10px] text-text-muted mt-1">Nhấn Enter để xuống dòng. Trang chủ sẽ hiển thị đúng như bạn gõ.</p>
            </div>
            <div>
              <label className={lc}>Phụ Đề</label>
              <textarea rows={2} value={editing.subtitle} onChange={e => setEditing({ ...editing, subtitle: e.target.value })} className={`${ic} resize-none`} placeholder="Mô tả ngắn..." />
            </div>
            <ImageUpload
              label="Ảnh Desktop *"
              value={editing.image}
              onChange={url => setEditing({ ...editing, image: url })}
              folder="anphuoc/hero-slides"
            />
            <ImageUpload
              label="Ảnh Mobile (tùy chọn)"
              value={editing.mobile_image}
              onChange={url => setEditing({ ...editing, mobile_image: url })}
              folder="anphuoc/hero-slides/mobile"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lc}>Thứ Tự</label>
                <input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: +e.target.value })} className={ic} />
              </div>
              <div>
                <label className={lc}>Trạng Thái</label>
                <select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} className={ic}>
                  <option value="published">Hiển Thị</option>
                  <option value="draft">Ẩn</option>
                </select>
              </div>
            </div>
            {msg && <p className={`text-sm ${msg.includes('Đã lưu') ? 'text-green-400' : 'text-red-400'}`}>{msg}</p>}
            <div className="flex gap-2">
              <button onClick={save} disabled={saving}
                className="btn-gold flex-1 py-2.5 rounded-sm text-[11px] tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-60">
                <Save size={13} />{saving ? 'Đang Lưu...' : 'Lưu'}
              </button>
              <button onClick={() => { setEditing(null); setMsg('') }}
                className="px-4 py-2.5 border border-border rounded-sm text-text-muted text-[11px] hover:text-gold transition-colors">
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-sm p-10 text-center text-text-muted h-fit">
            <ImageIcon size={32} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">Chọn slide để chỉnh sửa hoặc thêm mới</p>
          </div>
        )}
      </div>
    </div>
  )
}
