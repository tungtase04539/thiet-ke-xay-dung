-- Fix: tách policy cho contact_leads thành 2 statement riêng cho anon và authenticated
-- để tránh trường hợp PG parser xử lý list role không đúng.

drop policy if exists "contact submit" on public.contact_leads;
drop policy if exists "contact submit anon" on public.contact_leads;
drop policy if exists "contact submit auth" on public.contact_leads;
drop policy if exists "cs_anon" on public.contact_leads;

create policy "cs_anon" on public.contact_leads
  for insert to anon with check (true);

create policy "cs_auth" on public.contact_leads
  for insert to authenticated with check (true);
