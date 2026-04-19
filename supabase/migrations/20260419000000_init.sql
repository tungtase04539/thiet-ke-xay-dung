-- ============================================================
-- An Phuoc Design & Construction — Supabase schema
-- Run in Supabase Dashboard → SQL Editor → New Query → Run
-- Safe to re-run (uses IF NOT EXISTS / CREATE OR REPLACE)
-- ============================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ────────────────────────────────────────────────
-- 1) projects
-- ────────────────────────────────────────────────
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  slug          text not null unique,
  type          text,
  area          text,
  style         text,
  location      text,
  year          text,
  status        text default 'published',
  featured      boolean default false,
  cover_image   text,
  images        jsonb default '[]'::jsonb,
  description   text,
  highlights    jsonb default '[]'::jsonb,
  materials     jsonb default '[]'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists projects_status_idx   on public.projects(status);
create index if not exists projects_featured_idx on public.projects(featured);
create index if not exists projects_style_idx    on public.projects(style);
create index if not exists projects_type_idx     on public.projects(type);

-- ────────────────────────────────────────────────
-- 2) posts
-- ────────────────────────────────────────────────
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  category      text,
  excerpt       text,
  content       text,
  cover_image   text,
  read_time     text default '5',
  status        text default 'published',
  tags          jsonb default '[]'::jsonb,
  published_at  timestamptz default now(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists posts_status_idx   on public.posts(status);
create index if not exists posts_category_idx on public.posts(category);

-- ────────────────────────────────────────────────
-- 3) team_members
-- ────────────────────────────────────────────────
create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  avatar      text,
  bio         text,
  sort_order  int  default 0,
  status      text default 'published',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists team_members_status_idx on public.team_members(status);

-- ────────────────────────────────────────────────
-- 4) hero_slides
-- ────────────────────────────────────────────────
create table if not exists public.hero_slides (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  tag           text,
  subtitle      text,
  image         text not null,
  mobile_image  text,
  sort_order    int  default 0,
  status        text default 'published',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists hero_slides_status_idx on public.hero_slides(status);

-- ────────────────────────────────────────────────
-- 5) contact_leads
-- ────────────────────────────────────────────────
create table if not exists public.contact_leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  phone       text not null,
  email       text,
  space_type  text,
  area        text,
  style       text,
  budget      text,
  message     text,
  status      text default 'new',
  note        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists contact_leads_status_idx on public.contact_leads(status);

-- ────────────────────────────────────────────────
-- Row Level Security
-- anon key được dùng ở client, cần policy cho phép đọc/ghi.
-- Cấu hình đơn giản: cho phép public read/write giống project cũ.
-- Nếu muốn siết, sau này tách admin role.
-- ────────────────────────────────────────────────
alter table public.projects       enable row level security;
alter table public.posts          enable row level security;
alter table public.team_members   enable row level security;
alter table public.hero_slides    enable row level security;
alter table public.contact_leads  enable row level security;

-- Helper: drop old policy nếu có rồi tạo lại
do $$
declare t text;
begin
  foreach t in array array['projects','posts','team_members','hero_slides','contact_leads']
  loop
    execute format('drop policy if exists "%s public all" on public.%I', t, t);
    execute format('create policy "%s public all" on public.%I for all to anon, authenticated using (true) with check (true)', t, t);
  end loop;
end$$;
