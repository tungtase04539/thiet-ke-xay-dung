// E2E scenario test bằng Node fetch (UTF-8 chuẩn, không bị shell mangle)
const BASE = process.env.BASE || 'https://www.anphuocdesign.vn'
let pass = 0, fail = 0
const log = (ok, msg) => { ok ? pass++ : fail++; console.log(`  ${ok ? '✓' : '✗'} ${msg}`) }

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json; charset=utf-8' } : {},
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let json
  try { json = JSON.parse(text) } catch {}
  return { status: res.status, json, text }
}

async function section(title, fn) {
  console.log(`\n━━━ ${title} ━━━`)
  await fn()
}

(async () => {
  console.log(`E2E @ ${BASE}`)

  await section('[1] Pages', async () => {
    for (const p of ['/', '/du-an', '/xu-huong', '/gioi-thieu', '/dich-vu', '/lien-he']) {
      const r = await req('GET', p)
      log(r.status === 200, `GET ${p} → ${r.status}`)
    }
    const r = await req('GET', '/not-exist-xyz')
    log(r.status === 404, `GET /not-exist-xyz → ${r.status}`)
  })

  await section('[2] Admin routes reachable', async () => {
    for (const p of ['/admin', '/admin/hero-slides', '/admin/du-an', '/admin/bai-viet', '/admin/nhan-su', '/admin/lien-he', '/admin/du-an/moi', '/admin/bai-viet/moi']) {
      const r = await req('GET', p)
      log(r.status === 200, `GET ${p} → ${r.status}`)
    }
  })

  await section('[3] API list endpoints', async () => {
    for (const p of ['/api/projects', '/api/posts', '/api/team', '/api/hero-slides', '/api/contact']) {
      const r = await req('GET', p)
      log(r.status === 200 && Array.isArray(r.json), `GET ${p} → ${r.status}, ${Array.isArray(r.json) ? `array[${r.json.length}]` : 'NOT ARRAY'}`)
    }
  })

  let pid, pslug, bid, bslug, tid, hid, cid
  await section('[4] SEED (UTF-8 có dấu)', async () => {
    const p = await req('POST', '/api/projects', {
      name: 'Biệt Thự Heritage',
      type: 'Biệt thự',
      style: 'Hiện đại',
      area: '320',
      location: 'Hải Phòng',
      year: '2026',
      featured: true,
      status: 'published',
      description: 'Mô tả có dấu tiếng Việt',
      highlights: ['Hồ bơi', 'Vườn Nhật'],
      materials: [{ name: 'Đá Travertine', type: 'Ốp tường' }],
      images: ['https://picsum.photos/seed/p1/1200/800'],
      cover_image: 'https://picsum.photos/seed/c1/1200/800',
    })
    pid = p.json?.id; pslug = p.json?.slug
    log(p.status === 201 && p.json?.type === 'Biệt thự', `project type="${p.json?.type}" (expect "Biệt thự")`)
    log(p.json?.location === 'Hải Phòng', `project location="${p.json?.location}"`)

    const b = await req('POST', '/api/posts', { title: 'Xu Hướng Nội Thất 2026', category: 'Xu Hướng', excerpt: 'Tóm tắt', content: '# Nội dung\n\nĐây là body có dấu', tags: ['2026', 'xu hướng'] })
    bid = b.json?.id; bslug = b.json?.slug
    log(b.status === 201, `post slug="${bslug}"`)

    const t = await req('POST', '/api/team', { name: 'Nguyễn Văn Ánh', role: 'Kiến trúc sư trưởng', bio: '10 năm kinh nghiệm', sort_order: 1 })
    tid = t.json?.id
    log(t.status === 201 && t.json?.name === 'Nguyễn Văn Ánh', `team name="${t.json?.name}"`)

    const h = await req('POST', '/api/hero-slides', { title: 'Slide Hero', tag: 'NEW', subtitle: 'Phụ đề có dấu', image: 'https://picsum.photos/seed/h/1920/1080', sort_order: 1 })
    hid = h.json?.id
    log(h.status === 201, `slide id=${hid}`)

    const c = await req('POST', '/api/contact', { name: 'Khách Hàng Mới', phone: '0899289589', email: 'a@b.com', spaceType: 'Biệt thự', area: '200m²', style: 'Tối giản', budget: '3 tỷ', message: 'Tôi muốn được tư vấn' })
    cid = c.json?.id
    log(c.status === 201, `lead id=${cid}`)
  })

  await section('[5] FILTERS với UTF-8', async () => {
    const byType = await req('GET', `/api/projects?type=${encodeURIComponent('Biệt thự')}`)
    log(byType.status === 200 && byType.json.length === 1, `?type=Biệt thự → count=${byType.json?.length}`)

    const byStyle = await req('GET', `/api/projects?style=${encodeURIComponent('Hiện đại')}`)
    log(byStyle.status === 200 && byStyle.json.length === 1, `?style=Hiện đại → count=${byStyle.json?.length}`)

    const byFeatured = await req('GET', '/api/projects?featured=true')
    log(byFeatured.status === 200 && byFeatured.json.length === 1, `?featured=true → count=${byFeatured.json?.length}`)

    const empty = await req('GET', `/api/projects?type=${encodeURIComponent('KhôngTồnTại')}`)
    log(empty.status === 200 && empty.json.length === 0, `?type=KhôngTồnTại → count=${empty.json?.length}`)
  })

  await section('[6] GET by id/slug', async () => {
    const pById = await req('GET', `/api/projects/${pid}`)
    log(pById.status === 200 && pById.json?.name === 'Biệt Thự Heritage', `GET /api/projects/${pid}`)

    const pBySlug = await req('GET', `/api/projects/${pslug}`)
    log(pBySlug.status === 200 && pBySlug.json?.name === 'Biệt Thự Heritage', `GET /api/projects/${pslug}`)

    const bBySlug = await req('GET', `/api/posts/${bslug}`)
    log(bBySlug.status === 200, `GET /api/posts/${bslug} → title="${bBySlug.json?.title}"`)
  })

  await section('[7] Page SSR/CSR hiển thị dữ liệu', async () => {
    const detail = await fetch(`${BASE}/du-an/${pslug}`).then(r => r.text())
    const hasName = detail.includes('Biệt Thự Heritage')
    log(detail.length > 1000, `/du-an/${pslug} HTML size=${detail.length}B`)
    // Trang dùng 'use client' → không SEO, thông báo chứ không fail test
    console.log(`    ℹ HTML ${hasName ? 'CÓ' : 'KHÔNG CÓ'} chứa tên (trang client-side, render sau hydrate)`)
  })

  await section('[8] UPDATE', async () => {
    const u = await req('PUT', `/api/projects/${pid}`, { name: 'Biệt Thự Heritage v2', featured: false })
    log(u.status === 200 && u.json?.name === 'Biệt Thự Heritage v2', `update project name → "${u.json?.name}"`)
    log(u.json?.featured === false, `update featured → ${u.json?.featured}`)

    const u2 = await req('PUT', `/api/contact/${cid}`, { status: 'contacted', note: 'Đã liên hệ 10h' })
    log(u2.status === 200 && u2.json?.status === 'contacted', `update lead status → "${u2.json?.status}"`)
  })

  await section('[9] VALIDATION', async () => {
    const v1 = await req('POST', '/api/projects', {})
    log(v1.status === 400, `POST /api/projects {} → ${v1.status}`)

    const v2 = await req('POST', '/api/posts', {})
    log(v2.status === 400, `POST /api/posts {} → ${v2.status}`)

    const v3 = await req('POST', '/api/team', {})
    log(v3.status === 400, `POST /api/team {} → ${v3.status}`)

    const v4 = await req('POST', '/api/hero-slides', { title: 'x' })
    log(v4.status === 400, `POST /api/hero-slides no image → ${v4.status}`)

    const v5 = await req('POST', '/api/contact', { name: 'x' })
    log(v5.status === 400, `POST /api/contact no phone → ${v5.status}`)

    // Malformed JSON
    const r = await fetch(`${BASE}/api/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: 'NOT JSON' })
    log(r.status === 400, `POST malformed JSON → ${r.status}`)
  })

  await section('[10] 404', async () => {
    const r1 = await req('GET', '/api/projects/does-not-exist-xyz')
    log(r1.status === 404, `GET unknown project → ${r1.status}`)
    const r2 = await req('GET', '/api/posts/does-not-exist-xyz')
    log(r2.status === 404, `GET unknown post → ${r2.status}`)
  })

  await section('[11] UNIQUE SLUG', async () => {
    const a = await req('POST', '/api/projects', { name: 'Nhà Phố Duy Nhất' })
    const b = await req('POST', '/api/projects', { name: 'Nhà Phố Duy Nhất' })
    const c = await req('POST', '/api/projects', { name: 'Nhà Phố Duy Nhất' })
    log(a.json?.slug === 'nha-pho-duy-nhat', `slug #1 = "${a.json?.slug}"`)
    log(b.json?.slug === 'nha-pho-duy-nhat-1', `slug #2 = "${b.json?.slug}"`)
    log(c.json?.slug === 'nha-pho-duy-nhat-2', `slug #3 = "${c.json?.slug}"`)
    for (const p of [a.json?.id, b.json?.id, c.json?.id]) if (p) await req('DELETE', `/api/projects/${p}`)
  })

  await section('[12] METHOD NOT ALLOWED', async () => {
    const r = await fetch(`${BASE}/api/projects`, { method: 'PATCH' })
    log([405, 404].includes(r.status), `PATCH /api/projects → ${r.status}`)
  })

  await section('[13] CLEANUP', async () => {
    const del = async (path) => (await req('DELETE', path)).json?.success
    log(await del(`/api/projects/${pid}`), `delete project`)
    log(await del(`/api/posts/${bid}`), `delete post`)
    log(await del(`/api/team/${tid}`), `delete team`)
    log(await del(`/api/hero-slides/${hid}`), `delete hero-slide`)
    log(await del(`/api/contact/${cid}`), `delete lead`)

    for (const t of ['projects', 'posts', 'team', 'hero-slides', 'contact']) {
      const r = await req('GET', `/api/${t}`)
      log(r.json.length === 0, `final ${t} count = ${r.json.length}`)
    }
  })

  console.log(`\n════════════════════════════════════════`)
  console.log(`  RESULT: ${pass} pass, ${fail} fail`)
  console.log(`════════════════════════════════════════`)
  process.exit(fail > 0 ? 1 : 0)
})().catch(e => { console.error('FATAL:', e); process.exit(2) })
