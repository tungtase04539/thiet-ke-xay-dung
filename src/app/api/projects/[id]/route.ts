import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Các trường NOT cho phép client ghi
const READONLY = ['id', 'created_at']

function sanitize(body: Record<string, unknown>) {
  const clean = { ...body }
  READONLY.forEach(k => delete clean[k])
  return clean
}

// Lấy project theo UUID hoặc slug — xử lý 2 trường hợp riêng tránh lỗi .or() không trả về row
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  // Thử query theo UUID trước (UUID có dạng xxxxxxxx-xxxx-...)
  const isUuid = /^[0-9a-f-]{36}$/i.test(id)

  const { data, error } = isUuid
    ? await supabase.from('projects').select('*').eq('id', id).maybeSingle()
    : await supabase.from('projects').select('*').eq('slug', id).maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

// PUT — chỉ cho phép cập nhật các trường được phép
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const updates = sanitize(body)
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await supabase.from('projects').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
