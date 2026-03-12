import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Tạo slug an toàn từ tiếng Việt
function makeSlug(text: string): string {
  const vietnameseMap: Record<string, string> = {
    à: 'a', á: 'a', ả: 'a', ã: 'a', ạ: 'a',
    ă: 'a', ắ: 'a', ằ: 'a', ẳ: 'a', ẵ: 'a', ặ: 'a',
    â: 'a', ấ: 'a', ầ: 'a', ẩ: 'a', ẫ: 'a', ậ: 'a',
    è: 'e', é: 'e', ẻ: 'e', ẽ: 'e', ẹ: 'e',
    ê: 'e', ế: 'e', ề: 'e', ể: 'e', ễ: 'e', ệ: 'e',
    ì: 'i', í: 'i', ỉ: 'i', ĩ: 'i', ị: 'i',
    ò: 'o', ó: 'o', ỏ: 'o', õ: 'o', ọ: 'o',
    ô: 'o', ố: 'o', ồ: 'o', ổ: 'o', ỗ: 'o', ộ: 'o',
    ơ: 'o', ớ: 'o', ờ: 'o', ở: 'o', ỡ: 'o', ợ: 'o',
    ù: 'u', ú: 'u', ủ: 'u', ũ: 'u', ụ: 'u',
    ư: 'u', ứ: 'u', ừ: 'u', ử: 'u', ữ: 'u', ự: 'u',
    ỳ: 'y', ý: 'y', ỷ: 'y', ỹ: 'y', ỵ: 'y',
    đ: 'd',
  }
  return text
    .toLowerCase()
    .split('')
    .map(c => vietnameseMap[c] ?? c)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || `project-${Date.now()}`
}

// Đảm bảo slug không trùng
async function uniqueSlug(base: string): Promise<string> {
  let slug = base, attempt = 0
  while (true) {
    const { data } = await supabase.from('projects').select('id').eq('slug', slug).maybeSingle()
    if (!data) return slug
    slug = `${base}-${++attempt}`
  }
}

// GET /api/projects
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const style = searchParams.get('style')
  const type = searchParams.get('type')
  const featured = searchParams.get('featured')
  const status = searchParams.get('status') ?? 'published'

  let query = supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (status !== 'all') query = query.eq('status', status)
  if (style) query = query.eq('style', style)
  if (type) query = query.eq('type', type)
  if (featured === 'true') query = query.eq('featured', true)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

// POST /api/projects
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  if (!body.name) return NextResponse.json({ error: 'Tên dự án là bắt buộc' }, { status: 400 })

  const baseSlug = typeof body.slug === 'string' && body.slug.trim()
    ? body.slug.trim()
    : makeSlug(body.name as string)
  const slug = await uniqueSlug(baseSlug)

  // Chỉ giữ các trường hợp lệ, bỏ id và timestamps sinh tự động
  const { id: _id, created_at: _ca, updated_at: _ua, ...safe } = body as Record<string, unknown>
  const { data, error } = await supabase.from('projects').insert([{ ...safe, slug }]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
