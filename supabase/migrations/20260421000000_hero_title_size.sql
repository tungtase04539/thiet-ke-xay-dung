-- Thêm cột title_size để admin chỉnh cỡ chữ tiêu đề hero slide
-- Đơn vị: phần trăm so với mặc định (100 = mặc định, 80 = nhỏ hơn, 130 = to hơn)
alter table public.hero_slides
  add column if not exists title_size int default 100;
