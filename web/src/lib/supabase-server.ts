import { cookies, headers } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

/**
 * Dùng trong API routes / Server Components.
 * - Nếu request có `Authorization: Bearer <access_token>` (Supabase JWT) thì dùng token đó.
 * - Nếu không có, fallback về cookies do @supabase/ssr quản lý (từ trình duyệt đã đăng nhập).
 * RLS nhận diện user dựa trên JWT trong cả hai trường hợp.
 */
export function supabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  try {
    const authHeader = headers().get('authorization')
    if (authHeader?.toLowerCase().startsWith('bearer ')) {
      return createClient(url, key, {
        global: { headers: { Authorization: authHeader } },
        auth: { persistSession: false, autoRefreshToken: false },
      })
    }
  } catch {
    // headers() throws ngoài context request — bỏ qua
  }

  const cookieStore = cookies()
  return createServerClient(url, key, {
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value },
      set(name: string, value: string, options) {
        try { cookieStore.set({ name, value, ...options }) } catch {}
      },
      remove(name: string, options) {
        try { cookieStore.set({ name, value: '', ...options }) } catch {}
      },
    },
  })
}
