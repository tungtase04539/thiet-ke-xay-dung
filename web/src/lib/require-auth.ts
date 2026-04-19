import { NextResponse } from 'next/server'
import { supabaseServer } from './supabase-server'

// Trả về { user } nếu đã đăng nhập, ngược lại trả NextResponse 401.
export async function requireAuth() {
  const sb = supabaseServer()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), user: null, sb }
  }
  return { user, sb, error: null as null }
}
