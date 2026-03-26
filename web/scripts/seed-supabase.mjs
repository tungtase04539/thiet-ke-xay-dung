/**
 * Seed 10 dự án thực + 3 bài viết vào Supabase
 * Chạy: node scripts/seed-supabase.mjs
 *
 * Yêu cầu: set env NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Load Cloudinary URLs
const urls = JSON.parse(readFileSync('C:/Users/Admin/anti thiet ke xay dung/extracted/anh thiet ke/cloudinary-urls.json', 'utf-8'))

function getUrls(folder) {
  return (urls[folder] || []).map(i => i.url)
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.error('Set them: export NEXT_PUBLIC_SUPABASE_URL=... export NEXT_PUBLIC_SUPABASE_ANON_KEY=...')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const PROJECTS = [
  {
    slug: 'nha-pho-hien-dai',
    name: 'Nhà Phố Hiện Đại',
    type: 'Nhà phố',
    area: '66',
    style: 'Hiện đại',
    location: 'Thủy Nguyên, Hải Phòng',
    year: '2025',
    status: 'published',
    featured: true,
    description: 'Thiết kế nhà phố hiện đại tại Thủy Nguyên, Hải Phòng. Công trình có diện tích mặt sàn tầng 1 là 66m², thiết kế cho gia đình 4 người gồm 2 tầng. Đội ngũ kiến trúc đã tối ưu hóa công năng và thẩm mỹ, chứng minh rằng diện tích nhỏ vẫn có thể mang lại tiện ích không gian lớn.',
    highlights: ['Tối ưu công năng 2 tầng', 'Phòng khách, bếp, WC tầng 1', '2 phòng ngủ + sân thượng tầng 2', 'Thiết kế cho gia đình 4 người'],
    materials: [],
    cover_image: getUrls('01-Nha-Pho-Hien-Dai')[0],
    images: getUrls('01-Nha-Pho-Hien-Dai'),
  },
  {
    slug: 'biet-thu-tan-co-dien',
    name: 'Biệt Thự Tân Cổ Điển',
    type: 'Biệt thự',
    area: '150',
    style: 'Tân cổ điển',
    location: 'Quảng Thanh, Thủy Nguyên, Hải Phòng',
    year: '2025',
    status: 'published',
    featured: true,
    description: 'Thiết kế biệt thự tân cổ điển 2 tầng kết hợp vẻ đẹp truyền thống thanh lịch với sự tinh tế đương đại. Kiến trúc sử dụng tông trắng và vàng gold với các chi tiết phào chỉ tinh xảo. Mặt tiền nổi bật với các cột cổ điển lớn, ban công sắt rèn mạ vàng.',
    highlights: ['Cột cổ điển mặt tiền', 'Ban công sắt rèn mạ vàng', 'Mái ngói kiểu Nhật xám đá phiến', 'Phù hợp gia đình 3-5 người'],
    materials: [],
    cover_image: getUrls('02-Biet-Thu-Tan-Co-Dien')[0],
    images: getUrls('02-Biet-Thu-Tan-Co-Dien'),
  },
  {
    slug: 'tham-my-vien-tam-tam',
    name: 'Thẩm Mỹ Viện Tâm Tâm',
    type: 'Thương mại',
    area: '',
    style: 'Modern Minimalist',
    location: 'TĐC Cửa Trại, Thủy Nguyên, Hải Phòng',
    year: '2025',
    status: 'published',
    featured: false,
    description: 'Thiết kế phong cách Hiện đại Tối giản kết hợp thẩm mỹ Soft-Arch, tạo không gian đương đại mà mềm mại. Các đường cong và ánh sáng vàng ấm tạo môi trường thư giãn, chuyên nghiệp cho spa, chăm sóc sắc đẹp.',
    highlights: ['Phong cách Modern Minimalist + Soft-Arch', 'Tòa nhà 4 tầng', 'Đường cong kiến trúc mềm mại', 'Cửa kính + rèm voan tự nhiên'],
    materials: [],
    cover_image: getUrls('03-Tham-My-Vien-Tam-Tam')[0],
    images: getUrls('03-Tham-My-Vien-Tam-Tam'),
  },
  {
    slug: 'nha-pho-tan-co-dien',
    name: 'Nhà Phố Tân Cổ Điển',
    type: 'Nhà phố',
    area: '',
    style: 'Tân cổ điển',
    location: 'TĐC Cửa Trại, Thủy Nguyên, Hải Phòng',
    year: '2025',
    status: 'published',
    featured: true,
    description: 'Mẫu kiến trúc tân cổ điển ấn tượng. An Phước Design đã chuyển tầm nhìn của khách hàng thành bản vẽ và thực tế, đạt độ chính xác khoảng 99% so với bản thiết kế gốc. Bố trí hiệu quả 4 phòng ngủ, bếp, phòng khách, phòng thờ và thang máy.',
    highlights: ['Chính xác 99% so với thiết kế', '4 phòng ngủ + thang máy', 'Tầng 1 ốp đá nâu vàng', 'Hệ thống cửa sổ tân cổ điển'],
    materials: [],
    cover_image: getUrls('04-Nha-Pho-Tan-Co-Dien')[0],
    images: getUrls('04-Nha-Pho-Tan-Co-Dien'),
  },
  {
    slug: 'noi-that-hien-dai-sang-trong',
    name: 'Nội Thất Phòng Khách Liền Bếp Hiện Đại',
    type: 'Nội thất',
    area: '',
    style: 'Hiện đại sang trọng',
    location: 'Hải Phòng',
    year: '2025',
    status: 'published',
    featured: false,
    description: 'Thiết kế nội thất phòng khách liền bếp hiện đại, sang trọng. Bố trí không gian mở (open-concept) tối ưu diện tích. Tông màu trung tính với sofa góc cao cấp, trần phân tầng đèn LED âm trần, đảo bếp tối đa lưu trữ.',
    highlights: ['Open-concept phòng khách liền bếp', 'Tông trung tính trắng, be, xám', 'Trần phân tầng đèn LED', 'Đảo bếp tối đa công năng'],
    materials: [],
    cover_image: getUrls('05-Noi-That-Hien-Dai-Sang-Trong')[0],
    images: getUrls('05-Noi-That-Hien-Dai-Sang-Trong'),
  },
  {
    slug: 'noi-that-hien-dai-toi-gian',
    name: 'Nội Thất Hiện Đại Tối Giản',
    type: 'Nội thất',
    area: '98',
    style: 'Hiện đại tối giản',
    location: 'Lê Hồng Phong, Hải Phòng',
    year: '2025',
    status: 'published',
    featured: true,
    description: 'Nội thất hiện đại tối giản cho không gian 98m² tại Hải Phòng. Triết lý thiết kế nhấn mạnh tạo sự ấm áp trong thẩm mỹ tối giản, phá vỡ quan niệm rằng phong cách tối giản phải lạnh lẽo hay trống trải.',
    highlights: ['98m² tối ưu công năng', 'Ấm cúng trong phong cách tối giản', 'Phù hợp gia chủ trẻ', 'Phổ biến cho đất đô thị hẹp'],
    materials: [],
    cover_image: getUrls('06-Noi-That-Hien-Dai-Toi-Gian')[0],
    images: getUrls('06-Noi-That-Hien-Dai-Toi-Gian'),
  },
  {
    slug: 'noi-that-nha-pho-thuy-nguyen',
    name: 'Nội Thất Nhà Phố Thủy Nguyên',
    type: 'Nội thất',
    area: '66',
    style: 'Hiện đại',
    location: 'Thủy Nguyên, Hải Phòng',
    year: '2025',
    status: 'published',
    featured: false,
    description: 'Thiết kế nội thất hiện đại cho nhà phố 2 tầng 66m². Không gian mở liên kết phòng khách, bếp và phòng ăn. Tông màu đen trắng tạo sự tinh tế, thoáng đãng với tương phản cao.',
    highlights: ['Không gian mở tầng 1', 'Tông đen trắng tương phản', 'Cầu thang dọc tường tối ưu', 'Phòng ngủ tầng 1 cho người lớn tuổi'],
    materials: [],
    cover_image: getUrls('07-Noi-That-Nha-Pho-Thuy-Nguyen')[0],
    images: getUrls('07-Noi-That-Nha-Pho-Thuy-Nguyen'),
  },
  {
    slug: 'xay-dung-spa-tam-tam',
    name: 'Xây Dựng Trọn Gói — Spa Tâm Tâm',
    type: 'Xây dựng',
    area: '100',
    style: 'Hiện đại',
    location: 'Thủy Nguyên, Hải Phòng',
    year: '2025',
    status: 'published',
    featured: false,
    description: 'SPA TÂM TÂM là cơ sở dịch vụ ngành làm đẹp được thiết kế với giá trị thẩm mỹ cao. Dự án khởi công tháng 5/2025 và được đẩy nhanh tiến độ để hoàn thành cuối năm 2025. An Phước Xây Dựng giám sát chặt chẽ quá trình thi công.',
    highlights: ['Vốn đầu tư 3 tỷ VNĐ', 'Khởi công 05/2025', 'Giám sát chặt chẽ thi công', 'Đúng bản thiết kế'],
    materials: [],
    cover_image: getUrls('08-Xay-Dung-Spa-Tam-Tam')[0],
    images: getUrls('08-Xay-Dung-Spa-Tam-Tam'),
  },
  {
    slug: 'xay-dung-nha-pho-tan-co-dien',
    name: 'Xây Dựng Trọn Gói Nhà Phố Tân Cổ Điển',
    type: 'Xây dựng',
    area: '',
    style: 'Tân cổ điển',
    location: 'TĐC Cửa Trại, Thủy Nguyên',
    year: '2025',
    status: 'published',
    featured: true,
    description: 'Xây dựng trọn gói nhà phố tân cổ điển. An Phước Xây Dựng chú trọng từng chi tiết nhỏ nhất với đội ngũ thợ tay nghề cao chuyên thi công phào chỉ, gờ chỉ trang trí, đảm bảo công trình đúng bản thiết kế.',
    highlights: ['Vốn đầu tư 5.5 tỷ VNĐ', 'Khởi công 03/2025', 'Thợ tay nghề cao phào chỉ', 'Chi tiết nhỏ nhất được chú trọng'],
    materials: [],
    cover_image: getUrls('09-Xay-Dung-Nha-Pho-Tan-Co-Dien')[0],
    images: getUrls('09-Xay-Dung-Nha-Pho-Tan-Co-Dien'),
  },
  {
    slug: 'biet-thu-3-tang-hien-dai',
    name: 'Biệt Thự 3 Tầng Hiện Đại',
    type: 'Biệt thự',
    area: '126',
    style: 'Hiện đại',
    location: 'Hải Phòng',
    year: '2025',
    status: 'published',
    featured: false,
    description: 'Thiết kế biệt thự 3 tầng hiện đại cho khách hàng Việt Kiều. Nhấn mạnh sự thanh lịch tinh tế, thiết kế bền vững và kết nối cảm xúc với không gian sống. Kiến trúc hình khối sạch sẽ, kết hợp bê tông, kính và cây xanh.',
    highlights: ['Dự toán 4 tỷ VNĐ (gồm thang máy)', 'Ban công kính rộng', 'Cây xanh đa tầng', 'Phù hợp gia đình đa thế hệ'],
    materials: [],
    cover_image: getUrls('10-Biet-Thu-3-Tang-Hien-Dai')[0],
    images: getUrls('10-Biet-Thu-3-Tang-Hien-Dai'),
  },
]

const POSTS = [
  {
    slug: 'mien-giay-phep-xay-dung-2026',
    title: 'Miễn Giấy Phép Xây Dựng 2026 — Những Điều Cần Biết',
    excerpt: 'Tổng hợp các trường hợp được miễn giấy phép xây dựng theo quy định mới nhất năm 2026.',
    content: 'Theo Luật Xây dựng sửa đổi, nhiều trường hợp xây dựng sẽ được miễn giấy phép. Bài viết tổng hợp chi tiết các trường hợp và điều kiện áp dụng.',
    category: 'Kiến Thức',
    tags: ['giấy phép xây dựng', 'luật xây dựng', '2026'],
    cover_image: getUrls('00-Blog')[1],
    read_time: '5',
    status: 'published',
    published_at: new Date('2025-12-01').toISOString(),
  },
  {
    slug: 'xu-huong-nha-pho-2025',
    title: 'Xu Hướng Thiết Kế Nhà Phố Hiện Đại 2025',
    excerpt: 'Khám phá các phong cách kiến trúc nhà phố được ưa chuộng nhất năm 2025 tại Việt Nam.',
    content: 'Năm 2025 chứng kiến sự lên ngôi của phong cách hiện đại tối giản và tân cổ điển trong thiết kế nhà phố. Bài viết phân tích xu hướng và gợi ý cho gia chủ.',
    category: 'Xu Hướng',
    tags: ['nhà phố', 'xu hướng', '2025', 'hiện đại'],
    cover_image: getUrls('00-Blog')[2],
    read_time: '4',
    status: 'published',
    published_at: new Date('2025-11-15').toISOString(),
  },
  {
    slug: 'chi-phi-xay-nha-tron-goi',
    title: 'Chi Phí Xây Nhà Trọn Gói — Bảng Giá Tham Khảo 2025',
    excerpt: 'Hướng dẫn ước tính chi phí xây nhà trọn gói theo từng hạng mục chi tiết tại Hải Phòng.',
    content: 'Chi phí xây nhà trọn gói phụ thuộc nhiều yếu tố: diện tích, số tầng, vật liệu, phong cách kiến trúc. Bài viết cung cấp bảng giá tham khảo chi tiết.',
    category: 'Kiến Thức',
    tags: ['chi phí', 'xây nhà', 'trọn gói', 'báo giá'],
    cover_image: getUrls('00-Blog')[3],
    read_time: '6',
    status: 'published',
    published_at: new Date('2025-11-01').toISOString(),
  },
]

async function main() {
  console.log('=== Seeding Projects ===')

  // Delete existing projects first
  const { error: delErr } = await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delErr) console.log('Warning deleting projects:', delErr.message)

  for (const p of PROJECTS) {
    console.log(`  Inserting: ${p.name}...`)
    const { error } = await supabase.from('projects').insert([p])
    if (error) console.error(`  FAIL: ${error.message}`)
    else console.log(`  OK: ${p.name}`)
  }

  console.log('\n=== Seeding Posts ===')

  const { error: delPostErr } = await supabase.from('posts').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delPostErr) console.log('Warning deleting posts:', delPostErr.message)

  for (const post of POSTS) {
    console.log(`  Inserting: ${post.title}...`)
    const { error } = await supabase.from('posts').insert([post])
    if (error) console.error(`  FAIL: ${error.message}`)
    else console.log(`  OK: ${post.title}`)
  }

  console.log('\nDone! Seeded', PROJECTS.length, 'projects and', POSTS.length, 'posts.')
}

main().catch(console.error)
