/** Danh mục bài viết — khớp bộ lọc trang /xu-huong (không gồm "Tất Cả") */
export const POST_CATEGORIES = [
  'Xu Hướng',
  'Kiến Thức',
  'Vật Liệu',
  'Phong Cách',
  'Kỹ Thuật',
] as const

export type PostCategory = (typeof POST_CATEGORIES)[number]

export const ALL_CATEGORIES_LABEL = 'Tất Cả'

export const POST_CATEGORY_FILTERS = [ALL_CATEGORIES_LABEL, ...POST_CATEGORIES] as const

/** Danh mục cũ trong DB → danh mục hiện tại (khớp /xu-huong) */
const LEGACY_CATEGORY_MAP: Record<string, PostCategory> = {
  'Tin Tức': 'Kiến Thức',
  'Ánh Sáng': 'Kỹ Thuật',
}

export function normalizePostCategory(raw: string | undefined | null): PostCategory {
  if (!raw) return POST_CATEGORIES[0]
  if ((POST_CATEGORIES as readonly string[]).includes(raw)) return raw as PostCategory
  const mapped = LEGACY_CATEGORY_MAP[raw]
  if (mapped) return mapped
  return POST_CATEGORIES[0]
}

