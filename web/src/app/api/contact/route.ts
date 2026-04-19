import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Trường không được phép client gửi lên DB
const BLOCKED = ['id', 'created_at', 'agree']

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  // Validate required fields
  if (!body.name || !body.phone) {
    return NextResponse.json({ error: 'Họ tên và số điện thoại là bắt buộc' }, { status: 400 })
  }

  // Map camelCase → snake_case và loại bỏ trường không hợp lệ
  const { spaceType, agree: _agree, id: _id, created_at: _ca, ...rest } = body as Record<string, unknown>
  const record: Record<string, unknown> = { ...rest, space_type: spaceType, status: 'new' }
  BLOCKED.forEach(k => delete record[k])

  // anon chỉ có INSERT, không có SELECT → không dùng .select().single().
  const { error } = await supabase.from('contact_leads').insert([record])
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true }, { status: 201 })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const limit = parseInt(searchParams.get('limit') ?? '100')

  let query = supabase.from('contact_leads').select('*').order('created_at', { ascending: false }).limit(limit)
  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}
