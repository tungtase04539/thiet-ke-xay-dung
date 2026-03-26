'use client'

import { useState, useRef } from 'react'
import { Upload, X, Link as LinkIcon } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  folder?: string
  label?: string
  className?: string
}

export default function ImageUpload({ value, onChange, folder = 'anphuoc/uploads', label, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const upload = async (file: File) => {
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('folder', folder)
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (data.url) onChange(data.url)
      else alert(data.error || 'Upload thất bại')
    } catch {
      alert('Lỗi kết nối khi upload')
    } finally {
      setUploading(false)
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) upload(file)
  }

  const ic = 'w-full bg-bg border border-border rounded-sm px-4 py-2.5 text-text text-sm focus:border-gold outline-none transition-colors'

  return (
    <div className={className}>
      {label && <label className="text-[10px] tracking-widest text-gold uppercase block mb-1.5">{label}</label>}

      {/* Mode toggle */}
      <div className="flex gap-1 mb-2">
        <button type="button" onClick={() => setMode('upload')}
          className={`text-[10px] tracking-wider px-3 py-1 rounded-sm border transition-all ${
            mode === 'upload' ? 'border-gold bg-gold/10 text-gold' : 'border-border text-text-muted'
          }`}>
          <Upload size={10} className="inline mr-1" />Upload
        </button>
        <button type="button" onClick={() => setMode('url')}
          className={`text-[10px] tracking-wider px-3 py-1 rounded-sm border transition-all ${
            mode === 'url' ? 'border-gold bg-gold/10 text-gold' : 'border-border text-text-muted'
          }`}>
          <LinkIcon size={10} className="inline mr-1" />URL
        </button>
      </div>

      {mode === 'upload' ? (
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => !uploading && fileRef.current?.click()}
          className={`border border-dashed rounded-sm p-4 text-center cursor-pointer transition-all ${
            uploading ? 'border-gold/50 bg-gold/5' : 'border-border hover:border-gold/40'
          }`}
        >
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          {uploading ? (
            <div className="text-gold text-sm animate-pulse">Đang upload...</div>
          ) : (
            <div>
              <Upload size={20} className="mx-auto mb-2 text-text-muted" />
              <div className="text-text-muted text-xs">Kéo thả hoặc click để chọn ảnh</div>
              <div className="text-text-muted text-[10px] mt-1">PNG, JPG, WebP</div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <input value={urlInput} onChange={e => setUrlInput(e.target.value)} className={ic} placeholder="https://..." />
          <button type="button" onClick={() => { if (urlInput.trim()) { onChange(urlInput.trim()); setUrlInput('') } }}
            className="px-3 border border-gold rounded-sm text-gold text-[10px] tracking-wider hover:bg-gold/10 transition-colors shrink-0">
            OK
          </button>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="relative mt-2 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-32 w-full object-cover rounded-sm border border-border" />
          <button type="button" onClick={() => onChange('')}
            className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  )
}
