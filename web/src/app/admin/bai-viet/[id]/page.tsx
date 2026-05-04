'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'
import RichEditor from '@/components/RichEditor'
import { POST_CATEGORIES, normalizePostCategory } from '@/lib/categories'

interface PostForm {
  title: string; slug: string; category: string; excerpt: string;
  content: string; cover_image: string; read_time: string; status: string; tags: string
}
const EMPTY: PostForm = {
  title: '', slug: '', category: POST_CATEGORIES[0], excerpt: '', content: '',
  cover_image: '', read_time: '5', status: 'published', tags: ''
}

export default function PostFormPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const isNew = id === 'moi'
  const [form, setForm] = useState<PostForm>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')


  useEffect(() => {
    if (!isNew) {
      fetch(`/api/posts/${id}`).then(r => r.json()).then(d => {
        const category = normalizePostCategory(d.category as string)
        setForm({
          ...EMPTY, ...d,
          cover_image: d.cover_image || '',
          read_time: d.read_time || '5',
          category,
          tags: Array.isArray(d.tags) ? d.tags.join(', ') : d.tags || ''
        })
      })
    }
  }, [id, isNew])

  const set = (k: keyof PostForm, v: string) => setForm(f => ({ ...f, [k]: v }))

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) { setMsg('Vui lòng nhập tiêu đề.'); return }
    setSaving(true); setMsg('')
    try {
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
        title: form.title, slug: form.slug.trim() || toSlug(form.title),
        category: form.category, excerpt: form.excerpt, content: form.content,
        cover_image: form.cover_image, read_time: form.read_time, status: form.status,
        tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      }
      const url = isNew ? '/api/posts' : `/api/posts/${id}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const json = await res.json()
      if (res.ok) { setMsg('Đã lưu!'); if (isNew) router.push('/admin/bai-viet') }
      else setMsg(json.error ?? 'Lỗi khi lưu.')
    } catch { setMsg('Lỗi kết nối.') }
    finally { setSaving(false) }
  }

  const lc = 'text-[10px] tracking-widest text-gold uppercase block mb-1.5'
  const ic = 'w-full bg-bg border border-border rounded-sm px-4 py-2.5 text-text text-sm focus:border-gold outline-none transition-colors'

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/bai-viet" className="text-text-muted hover:text-gold"><ArrowLeft size={18} /></Link>
        <h1 className="font-display text-2xl text-text">{isNew ? 'Viết Bài Mới' : 'Chỉnh Sửa Bài Viết'}</h1>
      </div>

      <form onSubmit={save} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-surface border border-border rounded-sm p-6 space-y-5">
            <div>
              <label className={lc}>Tiêu Đề *</label>
              <input required value={form.title} onChange={e => set('title', e.target.value)} className={ic} placeholder="VD: Phong Cách Neo-Classic 2024" />
            </div>
            <div>
              <label className={lc}>Slug (URL)</label>
              <input value={form.slug} onChange={e => set('slug', e.target.value)} className={ic} placeholder="tự tạo từ tiêu đề" />
            </div>
            <div>
              <label className={lc}>Tóm Tắt</label>
              <textarea rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} className={`${ic} resize-none`} placeholder="Mô tả ngắn hiển thị ở trang danh sách..." />
            </div>
            <div>
              <label className={lc}>Nội Dung</label>
              <RichEditor
                value={form.content}
                onChange={html => set('content', html)}
                placeholder="Viết nội dung bài viết... Paste ảnh trực tiếp hoặc dùng nút chèn ảnh trên toolbar."
              />
              <p className="text-text-muted text-[11px] mt-1.5">Hỗ trợ paste ảnh từ clipboard, kéo thả, upload file. Bôi đen text để format.</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-sm p-6 space-y-5">
            <ImageUpload
              label="Ảnh Bìa"
              value={form.cover_image}
              onChange={url => set('cover_image', url)}
              folder="anphuoc/posts"
            />
            <div>
              <label className={lc}>Tags (phân cách bằng dấu phẩy)</label>
              <input value={form.tags} onChange={e => set('tags', e.target.value)} className={ic} placeholder="thiết kế, xu hướng, 2024" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-surface border border-border rounded-sm p-6 space-y-4">
            <h2 className="text-text text-sm font-medium border-b border-border pb-3">Cài Đặt</h2>
            <div>
              <label className={lc}>Danh Mục</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={ic}>
                {POST_CATEGORIES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <p className="text-text-muted text-[10px] mt-1">Trùng với bộ lọc trang Xu hướng.</p>
            </div>
            <div>
              <label className={lc}>Thời Gian Đọc (phút)</label>
              <input type="number" min="1" max="60" value={form.read_time} onChange={e => set('read_time', e.target.value)} className={ic} />
            </div>
            <div>
              <label className={lc}>Trạng Thái</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className={ic}>
                <option value="published">Đã Đăng</option>
                <option value="draft">Nháp</option>
              </select>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-sm p-6 space-y-3">
            {msg && <p className={`text-sm ${msg.includes('Đã lưu') ? 'text-green-400' : 'text-red-400'}`}>{msg}</p>}
            <button type="submit" disabled={saving}
              className="btn-gold w-full py-3 rounded-sm text-[12px] tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-60">
              <Save size={14} />{saving ? 'Đang Lưu...' : (isNew ? 'Đăng Bài' : 'Lưu Thay Đổi')}
            </button>
            <Link href="/admin/bai-viet" className="block text-center text-text-muted text-sm hover:text-gold transition-colors">Hủy</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
