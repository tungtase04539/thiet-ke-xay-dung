import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const READONLY = ['id', 'created_at']
function sanitize(body: Record<string, unknown>) {
  const clean = { ...body }
  READONLY.forEach(k => delete clean[k])
  return clean
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { status, note } = body as { status?: string; note?: string }

  // Chỉ cho phép cập nhật trạng thái và ghi chú — không cho phép overwrite sensitive fields
  const updates = sanitize({ status, note })
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('contact_leads')
    .update(updates)
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await supabase.from('contact_leads').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
