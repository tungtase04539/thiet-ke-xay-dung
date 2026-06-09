'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

interface ProjectForm {
  name: string; slug: string; type: string; area: string; style: string;
  location: string; year: string; status: string; featured: boolean;
  cover_image: string; images: string; description: string;
  highlights: string; materials: string; tags: string;
}

const EMPTY: ProjectForm = {
  name: '', slug: '', type: 'Căn hộ', area: '', style: 'Neo-Classic',
  location: '', year: new Date().getFullYear().toString(), status: 'published', featured: false,
  cover_image: '', images: '', description: '', highlights: '', materials: '', tags: '',
}

export default function ProjectForm() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const isNew = id === 'moi'
  const [form, setForm] = useState<ProjectForm>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/projects/${id}`).then(r => r.json()).then(d => {
        setForm({
          ...EMPTY, ...d,
          cover_image: d.cover_image || '',
          images: Array.isArray(d.images) ? d.images.join('\n') : d.images || '',
          highlights: Array.isArray(d.highlights) ? d.highlights.join('\n') : d.highlights || '',
          materials: Array.isArray(d.materials) ? d.materials.map((m: {name:string;type:string}) => `${m.name}|${m.type}`).join('\n') : '',
          tags: Array.isArray(d.tags) ? d.tags.join(', ') : '',
        })
      })
    }
  }, [id, isNew])

  const set = (k: keyof ProjectForm, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) { setMsg('Vui lòng nhập tên dự án.'); return }
    setSaving(true); setMsg('')
    try {
      // Chuyển đổi tiếng Việt sang slug hợp lệ
      const viMap: Record<string, string> = {
        à:'a',á:'a',ả:'a',ã:'a',ạ:'a',ă:'a',ắ:'a',ằ:'a',ẳ:'a',ẵ:'a',ặ:'a',
        â:'a',ấ:'a',ầ:'a',ẩ:'a',ẫ:'a',ậ:'a',è:'e',é:'e',ẻ:'e',ẽ:'e',ẹ:'e',
        ê:'e',ế:'e',ề:'e',ể:'e',ễ:'e',ệ:'e',ì:'i',í:'i',ỉ:'i',ĩ:'i',ị:'i',
        ò:'o',ó:'o',ỏ:'o',õ:'o',ọ:'o',ô:'o',ố:'o',ồ:'o',ổ:'o',ỗ:'o',ộ:'o',
        ơ:'o',ớ:'o',ờ:'o',ở:'o',ỡ:'o',ợ:'o',ù:'u',ú:'u',ủ:'u',ũ:'u',ụ:'u',
        ư:'u',ứ:'u',ừ:'u',ử:'u',ữ:'u',ự:'u',ỳ:'y',ý:'y',ỷ:'y',ỹ:'y',ỵ:'y',đ:'d',
      }
      const toSlug = (s: string) => s.toLowerCase().split('').map(c => viMap[c] ?? c).join('')
        .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

      const payload = {
        name: form.name, slug: form.slug.trim() || toSlug(form.name),
        type: form.type, area: form.area, style: form.style,
        location: form.location, year: form.year,
        status: form.status, featured: form.featured,
        cover_image: form.cover_image, description: form.description,
        images: form.images.split('\n').map(s => s.trim()).filter(Boolean),
        highlights: form.highlights.split('\n').map(s => s.trim()).filter(Boolean),
        materials: form.materials.split('\n').map(s => s.trim()).filter(Boolean).map(s => {
          const [name, type] = s.split('|')
          return { name: name?.trim() || '', type: type?.trim() || '' }
        }).filter(m => m.name),
        tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      }
      const url = isNew ? '/api/projects' : `/api/projects/${id}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const json = await res.json()
      if (res.ok) {
        setMsg('Đã lưu thành công!')
        if (isNew) router.push('/admin/du-an')
      } else setMsg(json.error ?? 'Lỗi khi lưu.')
    } catch { setMsg('Lỗi kết nối.') }
    finally { setSaving(false) }
  }

  const labelClass = 'text-[10px] tracking-widest text-gold uppercase block mb-1.5'
  const inputClass = 'w-full bg-bg border border-border rounded-sm px-4 py-2.5 text-text text-sm focus:border-gold outline-none transition-colors'
  const textareaClass = `${inputClass} resize-none`

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/du-an" className="text-text-muted hover:text-gold transition-colors"><ArrowLeft size={18} /></Link>
        <h1 className="font-display text-2xl text-text">{isNew ? 'Thêm Dự Án Mới' : 'Chỉnh Sửa Dự Án'}</h1>
      </div>

      <form onSubmit={save} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-surface border border-border rounded-sm p-6 space-y-5">
            <h2 className="text-text text-sm font-medium border-b border-border pb-3 mb-5">Thông Tin Cơ Bản</h2>
            <div>
              <label className={labelClass}>Tên Dự Án *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} placeholder="VD: The Matrix One 08" />
            </div>
            <div>
              <label className={labelClass}>Slug (URL)</label>
              <input value={form.slug} onChange={e => set('slug', e.target.value)} className={inputClass} placeholder="the-matrix-one-08 (tự tạo nếu để trống)" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Loại</label>
                <select value={form.type} onChange={e => set('type', e.target.value)} className={inputClass}>
                  {['Nhà phố','Biệt thự','Nội thất','Xây dựng','Thương mại'].map(v=><option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Diện Tích (m²)</label>
                <input value={form.area} onChange={e => set('area', e.target.value)} className={inputClass} placeholder="120" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phong Cách</label>
                <select value={form.style} onChange={e => set('style', e.target.value)} className={inputClass}>
                  {['Hiện đại','Tân cổ điển','Hiện đại tối giản','Hiện đại sang trọng','Modern Minimalist'].map(v=><option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Năm</label>
                <input value={form.year} onChange={e => set('year', e.target.value)} className={inputClass} placeholder="2024" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Địa Điểm</label>
              <input value={form.location} onChange={e => set('location', e.target.value)} className={inputClass} placeholder="VD: Vinhomes Central Park, TP.HCM" />
            </div>
            <div>
              <label className={labelClass}>Mô Tả</label>
              <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className={textareaClass} placeholder="Mô tả ngắn về thiết kế..." />
            </div>
          </div>

          <div className="bg-surface border border-border rounded-sm p-6 space-y-5">
            <h2 className="text-text text-sm font-medium border-b border-border pb-3 mb-5">Ảnh & Media</h2>
            <ImageUpload
              label="Ảnh Bìa"
              value={form.cover_image}
              onChange={url => set('cover_image', url)}
              folder="anphuoc/projects"
            />
            <div>
              <label className={labelClass}>Thêm Ảnh Vào Gallery</label>
              <ImageUpload
                value=""
                onChange={url => set('images', form.images ? form.images + '\n' + url : url)}
                folder="anphuoc/projects"
              />
            </div>
            <div>
              <label className={labelClass}>Danh Sách Ảnh Gallery (mỗi URL 1 dòng)</label>
              <textarea rows={5} value={form.images} onChange={e => set('images', e.target.value)} className={textareaClass} placeholder="Upload ảnh ở trên hoặc dán URL..." />
            </div>
          </div>

          <div className="bg-surface border border-border rounded-sm p-6 space-y-5">
            <h2 className="text-text text-sm font-medium border-b border-border pb-3 mb-5">Chi Tiết Thiết Kế</h2>
            <div>
              <label className={labelClass}>Điểm Nổi Bật (mỗi điểm 1 dòng)</label>
              <textarea rows={4} value={form.highlights} onChange={e => set('highlights', e.target.value)} className={textareaClass} placeholder="Marble Italy trắng vân vàng&#10;Trần thạch cao phào chỉ 3D" />
            </div>
            <div>
              <label className={labelClass}>Vật Liệu (format: Tên|Loại, mỗi vật liệu 1 dòng)</label>
              <textarea rows={4} value={form.materials} onChange={e => set('materials', e.target.value)} className={textareaClass} placeholder="Marble Italy Carrara|Đá&#10;Walnut Mỹ|Gỗ&#10;Cashmere Bỉ|Vải" />
              <p className="text-text-muted text-xs mt-1">Format: Tên vật liệu|Loại vật liệu</p>
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          <div className="bg-surface border border-border rounded-sm p-6 space-y-4">
            <h2 className="text-text text-sm font-medium border-b border-border pb-3 mb-5">Cài Đặt Đăng</h2>
            <div>
              <label className={labelClass}>Trạng Thái</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className={inputClass}>
                <option value="published">Đã Đăng</option>
                <option value="draft">Nháp</option>
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="accent-[#C9A84C] w-4 h-4" />
              <span className="text-sm text-text-muted">Nổi bật trên trang chủ</span>
            </label>
          </div>

          <div className="bg-surface border border-border rounded-sm p-6 space-y-4">
            <h2 className="text-text text-sm font-medium border-b border-border pb-3 mb-5">Cài Đặt SEO</h2>
            <div>
              <label className={labelClass}>Từ khóa SEO (Tags)</label>
              <textarea rows={3} value={form.tags} onChange={e => set('tags', e.target.value)} className={textareaClass} placeholder="VD: nhà phố, biệt thự hiện đại, hải phòng" />
              <p className="text-text-muted text-[10px] mt-1">Các từ khóa ngăn cách bằng dấu phẩy (,)</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-sm p-6 space-y-3">
            {msg && <p className={`text-sm ${msg.includes('thành công') ? 'text-green-400' : 'text-red-400'}`}>{msg}</p>}
            <button type="submit" disabled={saving}
              className="btn-gold w-full py-3 rounded-sm text-[12px] tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-60">
              <Save size={14} />{saving ? 'Đang Lưu...' : (isNew ? 'Tạo Dự Án' : 'Lưu Thay Đổi')}
            </button>
            <Link href="/admin/du-an" className="block text-center text-text-muted text-sm hover:text-gold transition-colors">Hủy</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
