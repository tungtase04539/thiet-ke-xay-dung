/**
 * Nén + upload ảnh qua /api/upload (Cloudinary).
 * Dùng chung cho ImageUpload và form admin (chèn ảnh vào nội dung).
 */

export function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    if (file.type === 'image/svg+xml' || file.type === 'image/gif' || file.size < 1_500_000) {
      resolve(file)
      return
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
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(file)
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file)
            return
          }
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
}

export async function uploadImageFile(file: File, folder: string): Promise<string> {
  const prepared = await compressImage(file)
  if (prepared.size > 4_300_000) {
    throw new Error(`Ảnh vẫn lớn (${(prepared.size / 1024 / 1024).toFixed(1)} MB) sau khi nén.`)
  }
  const form = new FormData()
  form.append('file', prepared)
  form.append('folder', folder)
  const res = await fetch('/api/upload', { method: 'POST', body: form })
  const ct = res.headers.get('content-type') || ''
  if (!ct.includes('application/json')) {
    const txt = await res.text().catch(() => '')
    if (res.status === 413 || /too large/i.test(txt)) {
      throw new Error('Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn.')
    }
    throw new Error(`Upload thất bại (HTTP ${res.status}): ${txt.slice(0, 120) || 'Không rõ lỗi'}`)
  }
  const data = await res.json()
  if (!res.ok || !data.url) throw new Error(data.error || `Upload thất bại (HTTP ${res.status})`)
  return data.url as string
}
