'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Clock, Trash2, Phone, Mail, Home, Maximize2, MessageSquare } from 'lucide-react'

interface Lead {
  id: string; name: string; phone: string; email: string; space_type: string;
  area: string; style: string; budget: string; message: string; status: 'new' | 'contacted' | 'done';
  created_at: string;
}

const STATUS_LABELS: Record<string, string> = {
  new: 'Mới',
  contacted: 'Đã Liên Hệ',
  done: 'Hoàn Thành',
}
const STATUS_COLORS: Record<string, string> = {
  new: 'text-gold border-gold/40',
  contacted: 'text-blue-400 border-blue-400/40',
  done: 'text-green-400 border-green-500/40',
}

function formatDate(d: string) {
  return new Date(d).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Lead | null>(null)

  const load = () => fetch('/api/contact').then(r => r.json())
    .then(d => setLeads(Array.isArray(d) ? d : []))
    .catch(() => setLeads([]))
  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    await load()
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Lead['status'] } : null)
  }

  const del = async (id: string) => {
    if (!confirm('Xóa yêu cầu này?')) return
    await fetch(`/api/contact/${id}`, { method: 'DELETE' })
    await load()
    if (selected?.id === id) setSelected(null)
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  const counts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    done: leads.filter(l => l.status === 'done').length,
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl text-text">Yêu Cầu Tư Vấn</h1>
        <div className="flex items-center gap-2">
          {counts.new > 0 && (
            <span className="bg-gold text-bg text-[10px] tracking-widest font-bold px-2 py-0.5 rounded-sm">
              {counts.new} MỚI
            </span>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {[['all', 'Tất Cả', counts.all], ['new', 'Mới', counts.new], ['contacted', 'Đã Liên Hệ', counts.contacted], ['done', 'Hoàn Thành', counts.done]].map(([val, label, count]) => (
          <button key={val} onClick={() => setFilter(val as string)}
            className={`text-[11px] tracking-wider px-3 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 ${
              filter === val ? 'border-gold bg-gold/10 text-gold' : 'border-border text-text-muted hover:border-gold/50'
            }`}>
            {label} <span className="opacity-70">({count})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Lead cards */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-surface border border-border rounded-sm p-10 text-center text-text-muted text-sm">
              <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
              Chưa có yêu cầu nào.
            </div>
          ) : filtered.map(lead => (
            <div key={lead.id}
              onClick={() => setSelected(lead)}
              className={`bg-surface border rounded-sm p-4 cursor-pointer transition-all ${
                selected?.id === lead.id ? 'border-gold' : 'border-border hover:border-gold/40'
              }`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-text font-medium">{lead.name}</div>
                  <div className="text-text-muted text-xs">{formatDate(lead.created_at)}</div>
                </div>
                <span className={`text-[10px] tracking-widest border px-2 py-0.5 rounded-sm ${STATUS_COLORS[lead.status]}`}>
                  {STATUS_LABELS[lead.status]}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-text-muted text-xs mt-2">
                <span className="flex items-center gap-1"><Home size={10} className="text-gold" />{lead.space_type}</span>
                {lead.area && <span className="flex items-center gap-1"><Maximize2 size={10} className="text-gold" />{lead.area}</span>}
                {lead.phone && <span className="flex items-center gap-1"><Phone size={10} className="text-gold" />{lead.phone}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected ? (
          <div className="bg-surface border border-border rounded-sm p-6 h-fit sticky top-20">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="font-display text-xl text-text">{selected.name}</h2>
                <p className="text-text-muted text-xs mt-0.5">{formatDate(selected.created_at)}</p>
              </div>
              <span className={`text-[10px] tracking-widest border px-2 py-0.5 ${STATUS_COLORS[selected.status]}`}>
                {STATUS_LABELS[selected.status]}
              </span>
            </div>

            <div className="space-y-3 mb-6 text-sm">
              {selected.phone && (
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-gold shrink-0" />
                  <a href={`tel:${selected.phone}`} className="text-text hover:text-gold transition-colors">{selected.phone}</a>
                </div>
              )}
              {selected.email && (
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-gold shrink-0" />
                  <a href={`mailto:${selected.email}`} className="text-text hover:text-gold transition-colors">{selected.email}</a>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { label: 'Loại không gian', val: selected.space_type },
                  { label: 'Diện tích', val: selected.area || '—' },
                  { label: 'Phong cách', val: selected.style || '—' },
                  { label: 'Ngân sách', val: selected.budget || '—' },
                ].map(item => (
                  <div key={item.label} className="bg-bg rounded-sm p-3">
                    <div className="text-[10px] tracking-widest text-text-muted uppercase mb-1">{item.label}</div>
                    <div className="text-text text-sm">{item.val}</div>
                  </div>
                ))}
              </div>
              {selected.message && (
                <div className="bg-bg rounded-sm p-3">
                  <div className="text-[10px] tracking-widest text-text-muted uppercase mb-1">Ghi Chú</div>
                  <p className="text-text text-sm leading-relaxed">{selected.message}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <p className="text-[10px] tracking-widest text-text-muted uppercase mb-2">Cập Nhật Trạng Thái</p>
              <div className="grid grid-cols-3 gap-2">
                {(['new', 'contacted', 'done'] as const).map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`py-2 text-[10px] tracking-wider border rounded-sm transition-all ${
                      selected.status === s ? STATUS_COLORS[s] + ' bg-opacity-10' : 'border-border text-text-muted hover:border-gold/50'
                    }`}>
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                {selected.phone && (
                  <a href={`tel:${selected.phone}`}
                    className="flex-1 py-2.5 text-[11px] tracking-wider border border-gold rounded-sm text-gold text-center hover:bg-gold/10 transition-colors flex items-center justify-center gap-1.5">
                    <Phone size={12} /> Gọi Ngay
                  </a>
                )}
                <button onClick={() => del(selected.id)}
                  className="py-2.5 px-4 text-[11px] tracking-wider border border-border rounded-sm text-text-muted hover:border-red-400 hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <Trash2 size={12} /> Xóa
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-sm p-10 text-center text-text-muted h-fit">
            <CheckCircle size={32} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm">Chọn một yêu cầu để xem chi tiết</p>
          </div>
        )}
      </div>
    </div>
  )
}
