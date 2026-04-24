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

  // Nén ảnh trên browser trước khi gửi để tránh giới hạn 4.5MB của Vercel.
  // Giữ SVG/GIF nguyên bản.
  const compressImage = (file: File): Promise<File> => new Promise((resolve) => {
    if (file.type === 'image/svg+xml' || file.type === 'image/gif' || file.size < 1_500_000) {
      resolve(file); return
    }
    const img = new Image()
    const reader = new FileReader()
    reader.onload = () => {
      img.src = reader.result as string
    }
    img.onload = () => {
      const MAX = 1920
      let { width, height } = img
      if (width > MAX || height > MAX) {
        const r = Math.min(MAX / width, MAX / height)
        width = Math.round(width * r)
        height = Math.round(height * r)
      }
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) { resolve(file); return }
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return }
          const name = file.name.replace(/\.(png|webp|jpeg|jpg|bmp|tiff?)$/i, '.jpg')
          resolve(new File([blob], name, { type: 'image/jpeg', lastModified: Date.now() }))
        },
        'image/jpeg',
        0.85,
      )
    }
    img.onerror = () => resolve(file)
    reader.onerror = () => resolve(file)
    reader.readAsDataURL(file)
  })

  const upload = async (rawFile: File) => {
    setUploading(true)
    try {
      const file = await compressImage(rawFile)
      // Vẫn cần guard: nếu ảnh gốc là GIF/SVG cực lớn, thông báo thay vì gửi
      if (file.size > 4_300_000) {
        alert(`Ảnh vẫn lớn (${(file.size / 1024 / 1024).toFixed(1)} MB) sau khi nén. Hãy chọn ảnh khác.`)
        return
      }
      const form = new FormData()
      form.append('file', file)
      form.append('folder', folder)
      const res = await fetch('/api/upload', { method: 'POST', body: form })

      // Xử lý cả non-JSON response (VD Vercel 413 trả plain text)
      const ct = res.headers.get('content-type') || ''
      if (!ct.includes('application/json')) {
        const txt = await res.text().catch(() => '')
        if (res.status === 413 || /too large/i.test(txt)) {
          alert('Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn hoặc thử lại.')
        } else {
          alert(`Upload thất bại (HTTP ${res.status}): ${txt.slice(0, 120) || 'Không rõ lỗi'}`)
        }
        return
      }
      const data = await res.json()
      if (res.ok && data.url) onChange(data.url)
      else alert(data.error || `Upload thất bại (HTTP ${res.status})`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Lỗi kết nối khi upload'
      alert(msg)
    } finally {
      setUploading(false)
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
    // Cho phép chọn lại cùng file lần sau
    if (fileRef.current) fileRef.current.value = ''
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
