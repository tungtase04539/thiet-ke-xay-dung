import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function makeSlug(text: string): string {
  const map: Record<string, string> = {
    à:'a',á:'a',ả:'a',ã:'a',ạ:'a',ă:'a',ắ:'a',ằ:'a',ẳ:'a',ẵ:'a',ặ:'a',
    â:'a',ấ:'a',ầ:'a',ẩ:'a',ẫ:'a',ậ:'a',
    è:'e',é:'e',ẻ:'e',ẽ:'e',ẹ:'e',ê:'e',ế:'e',ề:'e',ể:'e',ễ:'e',ệ:'e',
    ì:'i',í:'i',ỉ:'i',ĩ:'i',ị:'i',
    ò:'o',ó:'o',ỏ:'o',õ:'o',ọ:'o',ô:'o',ố:'o',ồ:'o',ổ:'o',ỗ:'o',ộ:'o',
    ơ:'o',ớ:'o',ờ:'o',ở:'o',ỡ:'o',ợ:'o',
    ù:'u',ú:'u',ủ:'u',ũ:'u',ụ:'u',ư:'u',ứ:'u',ừ:'u',ử:'u',ữ:'u',ự:'u',
    ỳ:'y',ý:'y',ỷ:'y',ỹ:'y',ỵ:'y',đ:'d',
  }
  return text.toLowerCase().split('').map(c => map[c] ?? c).join('')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    || `post-${Date.now()}`
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') ?? 'published'
  const cat = searchParams.get('category')

  let query = supabase.from('posts').select('*').order('published_at', { ascending: false })
  if (status !== 'all') query = query.eq('status', status)
  if (cat) query = query.eq('category', cat)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  if (!body.title) return NextResponse.json({ error: 'Tiêu đề là bắt buộc' }, { status: 400 })

  const slug = typeof body.slug === 'string' && body.slug.trim()
    ? body.slug.trim()
    : makeSlug(body.title as string)

  // Check duplicate slug
  const { data: existing } = await supabase.from('posts').select('id').eq('slug', slug).maybeSingle()
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug

  const { id: _id, created_at: _ca, updated_at: _ua, ...safe } = body as Record<string, unknown>
  const { data, error } = await supabase.from('posts')
    .insert([{ ...safe, slug: finalSlug, published_at: new Date().toISOString() }])
    .select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
