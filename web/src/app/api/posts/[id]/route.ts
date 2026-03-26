import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const READONLY = ['id', 'created_at']
function sanitize(body: Record<string, unknown>) {
  const clean = { ...body }
  READONLY.forEach(k => delete clean[k])
  return clean
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const isUuid = /^[0-9a-f-]{36}$/i.test(id)

  const { data, error } = isUuid
    ? await supabase.from('posts').select('*').eq('id', id).maybeSingle()
    : await supabase.from('posts').select('*').eq('slug', id).maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const updates = sanitize(body)
  updates.updated_at = new Date().toISOString()

  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await supabase.from('posts').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
