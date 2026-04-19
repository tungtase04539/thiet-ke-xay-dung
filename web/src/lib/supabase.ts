/**
 * Backward-compatible proxy: chuyển `supabase.*` thành server client
 * (đọc cookies từng request → RLS dựa trên user đã đăng nhập).
 *
 * Mọi API route cũ `import { supabase } from '@/lib/supabase'` vẫn chạy
 * mà không phải sửa. Cho code mới, import `supabaseServer()` trực tiếp.
 */
import { supabaseServer } from './supabase-server'

type Client = ReturnType<typeof supabaseServer>

export const supabase = new Proxy({} as Client, {
  get(_target, prop) {
    const client = supabaseServer()
    const value = (client as unknown as Record<string | symbol, unknown>)[prop as string]
    return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(client) : value
  },
})
