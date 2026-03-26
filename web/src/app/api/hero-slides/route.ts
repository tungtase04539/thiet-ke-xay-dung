import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('hero_slides')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  if (!body.title || !body.image) {
    return NextResponse.json({ error: 'Tiêu đề và ảnh là bắt buộc' }, { status: 400 })
  }

  const { id: _id, created_at: _ca, updated_at: _ua, ...safe } = body
  const { data, error } = await supabase.from('hero_slides').insert([safe]).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
