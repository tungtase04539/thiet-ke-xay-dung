-- ==========================================================
-- ATELIER Interior Design Website — Supabase Schema
-- Chạy SQL này trong Supabase Dashboard > SQL Editor
-- ==========================================================

-- 1. PROJECTS TABLE
create table if not exists projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  type        text not null default 'Căn hộ',
  area        text,
  style       text,
  location    text,
  year        text,
  status      text not null default 'published',
  featured    boolean not null default false,
  cover_image text,
  images      jsonb default '[]',
  description text,
  highlights  jsonb default '[]',
  materials   jsonb default '[]',
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 2. POSTS TABLE
create table if not exists posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  content      text,
  category     text not null default 'Xu Hướng',
  tags         jsonb default '[]',
  cover_image  text,
  read_time    text default '5',
  status       text not null default 'published',
  published_at timestamptz default now(),
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- 3. CONTACT LEADS TABLE
create table if not exists contact_leads (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  phone       text,
  email       text,
  space_type  text,
  area        text,
  style       text,
  budget      text,
  message     text,
  status      text not null default 'new',
  source      text default 'contact_form',
  agree       boolean default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- 4. ENABLE ROW LEVEL SECURITY + PUBLIC READ/WRITE
-- (Cho phép anon key thực hiện mọi thao tác — phù hợp cho demo)
alter table projects enable row level security;
alter table posts enable row level security;
alter table contact_leads enable row level security;

create policy "Public read projects" on projects for select using (true);
create policy "Public write projects" on projects for all using (true);

create policy "Public read posts" on posts for select using (true);
create policy "Public write posts" on posts for all using (true);

create policy "Public write leads" on contact_leads for insert with check (true);
create policy "Public read leads" on contact_leads for select using (true);
create policy "Public update leads" on contact_leads for update using (true);
create policy "Public delete leads" on contact_leads for delete using (true);

-- 5. SEED: PROJECTS
insert into projects (slug, name, type, area, style, location, year, status, featured, cover_image, images, description, highlights, materials) values
(
  'the-matrix-one-08',
  'The Matrix One 08',
  'Penthouse',
  '280',
  'Neo-Classic',
  'The Matrix One, Hà Nội',
  '2024',
  'published',
  true,
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85',
  '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85","https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=85","https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&q=85","https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85","https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85","https://images.unsplash.com/photo-1556912173-3bb406ef7e8a?w=1200&q=85"]',
  'Một không gian được hòa quyện bởi sự hiện đại, mới mẻ và nét hoài cổ, được thể hiện ở mọi khía cạnh của công trình.',
  '["Marble Italy trắng vân vàng","Trần thạch cao phào chỉ 3D","Hệ đèn âm trần Philips Hue","Cửa kính tempered 10mm"]',
  '[{"name":"Marble Italy Carrara","type":"Đá"},{"name":"Walnut Mỹ","type":"Gỗ"},{"name":"Vải Cashmere Bỉ","type":"Vải"},{"name":"Chrome Brushed Gold","type":"Kim loại"}]'
),
(
  'empire-city',
  'Empire City Tower',
  'Penthouse',
  '320',
  'Modern Luxury',
  'Empire City, TP.HCM',
  '2024',
  'published',
  true,
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=85',
  '["https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=85","https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85"]',
  'Penthouse tầng cao nhất với tầm nhìn toàn cảnh sông Sài Gòn. Phong cách Modern Luxury với gam màu trung tính.',
  '["View sông Sài Gòn 180°","Pool on terrace","Smart home Crestron","Wine cellar tùy chỉnh"]',
  '[]'
),
(
  'vinhomes-central-park',
  'Vinhomes Central Park',
  'Căn hộ',
  '180',
  'Indochine',
  'Vinhomes Central Park, TP.HCM',
  '2023',
  'published',
  false,
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=85',
  '["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=85"]',
  'Hòa quyện tinh tế giữa kiến trúc Đông Dương cổ điển và phong cách sống hiện đại.',
  '["Tranh đồng Việt thủ công","Gỗ teak tự nhiên","Đèn lồng decor","Cây xanh trong nhà"]',
  '[]'
),
(
  'aqua-bay-villa',
  'Aqua Bay Villa',
  'Villa',
  '450',
  'Tropical Modern',
  'Ecopark, Hưng Yên',
  '2023',
  'published',
  false,
  'https://images.unsplash.com/photo-1556912173-3bb406ef7e8a?w=1200&q=85',
  '["https://images.unsplash.com/photo-1556912173-3bb406ef7e8a?w=1200&q=85"]',
  'Villa ven hồ với kiến trúc Tropical Modern, hòa mình vào thiên nhiên xanh mát.',
  '["Bể bơi infinity 15m","Gym kính toàn cảnh","Vườn nhiệt đới","Double height living"]',
  '[]'
),
(
  'mipec-riverside',
  'Mipec Riverside',
  'Căn hộ',
  '95',
  'Scandinavian',
  'Mipec Riverside, Hà Nội',
  '2024',
  'published',
  false,
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
  '["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85"]',
  'Căn hộ phong cách Scandinavian tối giản, tràn ngập ánh sáng tự nhiên.',
  '["Tối giản hóa 95%","Full ánh sáng tự nhiên","Gỗ ash sáng","Bếp island mở"]',
  '[]'
)
on conflict (slug) do nothing;

-- 6. SEED: POSTS
insert into posts (slug, title, excerpt, content, category, cover_image, read_time, status, published_at) values
(
  'neo-classic-xu-huong-2024',
  'Phong Cách Neo-Classic: Sự Hội Tụ Giữa Cổ Điển Và Hiện Đại',
  'Khám phá cách phong cách Neo-Classic đang chiếm lĩnh thị trường thiết kế nội thất cao cấp Việt Nam năm 2024.',
  'Neo-Classic là sự kết hợp tinh tế giữa kiến trúc cổ điển châu Âu và ngôn ngữ thiết kế hiện đại. Phong cách này đặc trưng bởi những đường phào chỉ tinh tế, vật liệu marble sang trọng, và bảng màu trung tính ấm áp. Sự cân bằng hoàn hảo giữa hoa văn cổ điển và sự tối giản hiện đại tạo nên một không gian vừa sang trọng vừa không bị cứng nhắc.',
  'Xu Hướng',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
  '5',
  'published',
  '2024-03-01T08:00:00.000Z'
),
(
  'vat-lieu-marble-luxury',
  'Vật Liệu Marble: Lựa Chọn Hoàn Hảo Cho Không Gian Luxury',
  'Hướng dẫn chọn lựa và ứng dụng đá marble cho nội thất cao cấp — từ Carrara Italy đến Onyx đặc biệt.',
  'Marble đã và đang là vật liệu biểu tượng của sự sang trọng trong thiết kế nội thất. Với vân đá tự nhiên độc đáo, mỗi tấm marble là một tác phẩm nghệ thuật không thể sao chép. Marble Carrara trắng tinh, Calacatta vân vàng, hay Nero Marquina đen huyền bí — mỗi loại đều mang đến một cá tính riêng cho không gian.',
  'Vật Liệu',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  '4',
  'published',
  '2024-02-15T08:00:00.000Z'
),
(
  'ky-thuat-chieu-sang',
  'Kỹ Thuật Chiếu Sáng Tạo Chiều Sâu Cho Không Gian',
  'Bí quyết sắp xếp hệ thống đèn để tôn vinh vẻ đẹp của từng góc phòng và tạo cảm xúc cho không gian.',
  'Ánh sáng là linh hồn của không gian nội thất. Một hệ thống chiếu sáng được thiết kế tốt có thể biến một căn phòng bình thường trở nên xuất sắc. Layered lighting — kết hợp đèn ambient, task và accent — là chìa khóa để tạo ra chiều sâu và cảm xúc cho không gian.',
  'Kỹ Thuật',
  'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
  '6',
  'published',
  '2024-02-01T08:00:00.000Z'
)
on conflict (slug) do nothing;
