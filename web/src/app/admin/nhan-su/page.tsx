'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, Save, Pencil, Users } from 'lucide-react'

interface Member {
  id?: string; name: string; role: string; avatar: string;
  bio: string; sort_order: number; status: string;
}

const EMPTY: Member = { name: '', role: '', avatar: '', bio: '', sort_order: 0, status: 'published' }

export default function AdminTeam() {
  const [members, setMembers] = useState<Member[]>([])
  const [editing, setEditing] = useState<Member | null>(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = () => fetch('/api/team?status=all')
    .then(r => r.json())
    .then(d => setMembers(Array.isArray(d) ? d : []))
    .catch(() => setMembers([]))

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (!editing.name.trim()) { setMsg('Tên là bắt buộc.'); return }
    setSaving(true); setMsg('')
    try {
      const url = editing.id ? `/api/team/${editing.id}` : '/api/team'
      const method = editing.id ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
      if (res.ok) { setMsg('Đã lưu!'); setEditing(null); await load() }
      else { const j = await res.json(); setMsg(j.error ?? 'Lỗi khi lưu.') }
    } catch { setMsg('Lỗi kết nối.') }
    finally { setSaving(false) }
  }

  const del = async (id: string) => {
    if (!confirm('Xóa thành viên này?')) return
    await fetch(`/api/team/${id}`, { method: 'DELETE' })
    await load()
    if (editing?.id === id) setEditing(null)
  }

  const ic = 'w-full bg-bg border border-border rounded-sm px-4 py-2.5 text-text text-sm focus:border-gold outline-none transition-colors'
  const lc = 'text-[10px] tracking-widest text-gold uppercase block mb-1.5'

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-text">Quản Lý Nhân Sự</h1>
        <button onClick={() => setEditing({ ...EMPTY, sort_order: members.length })}
          className="btn-gold text-[11px] tracking-widest uppercase px-4 py-2 rounded-sm flex items-center gap-2">
          <Plus size={14} /> Thêm Thành Viên
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="space-y-3">
          {members.length === 0 ? (
            <div className="bg-surface border border-border rounded-sm p-10 text-center text-text-muted text-sm">
              <Users size={32} className="mx-auto mb-3 opacity-30" />
              Chưa có thành viên nào.
            </div>
          ) : members.map(m => (
            <div key={m.id}
              onClick={() => setEditing({ ...m })}
              className={`bg-surface border rounded-sm p-4 cursor-pointer transition-all flex gap-4 items-center ${
                editing?.id === m.id ? 'border-gold' : 'border-border hover:border-gold/40'
              }`}>
              {m.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold text-lg font-medium shrink-0">
                  {m.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-text text-sm font-medium">{m.name}</div>
                <div className="text-gold text-[11px] tracking-wider">{m.role}</div>
                {m.bio && <div className="text-text-muted text-xs mt-1 truncate">{m.bio}</div>}
              </div>
              <div className="flex gap-1 shrink-0">
                <span className={`text-[10px] tracking-widest px-2 py-0.5 border rounded-sm ${
                  m.status === 'published' ? 'border-green-500/40 text-green-400' : 'border-border text-text-muted'
                }`}>{m.status === 'published' ? 'Hiển thị' : 'Ẩn'}</span>
                <button onClick={e => { e.stopPropagation(); del(m.id!) }}
                  className="p-1.5 text-text-muted hover:text-red-400"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit panel */}
        {editing ? (
          <div className="bg-surface border border-border rounded-sm p-6 space-y-4 h-fit sticky top-20">
            <h2 className="text-text text-sm font-medium border-b border-border pb-3">
              {editing.id ? 'Chỉnh Sửa Thành Viên' : 'Thêm Thành Viên Mới'}
            </h2>
            <div>
              <label className={lc}>Họ Tên *</label>
              <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className={ic} placeholder="Nguyễn Văn A" />
            </div>
            <div>
              <label className={lc}>Chức Vụ</label>
              <input value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} className={ic} placeholder="VD: Kiến Trúc Sư Trưởng" />
            </div>
            <div>
              <label className={lc}>Ảnh Đại Diện (URL)</label>
              <input value={editing.avatar} onChange={e => setEditing({ ...editing, avatar: e.target.value })} className={ic} placeholder="https://res.cloudinary.com/..." />
              {editing.avatar && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={editing.avatar} alt="" className="mt-2 w-16 h-16 rounded-full object-cover border border-border" />
              )}
            </div>
            <div>
              <label className={lc}>Giới Thiệu Ngắn</label>
              <textarea rows={3} value={editing.bio} onChange={e => setEditing({ ...editing, bio: e.target.value })} className={`${ic} resize-none`} placeholder="Mô tả ngắn về kinh nghiệm..." />
            </div>
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
            <Users size={32} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">Chọn thành viên để chỉnh sửa hoặc thêm mới</p>
          </div>
        )}
      </div>
    </div>
  )
}
