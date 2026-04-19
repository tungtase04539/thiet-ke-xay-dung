-- ============================================================
-- Tighten RLS: public reads, auth-only writes.
-- Contact form exception: public can INSERT leads (form submission).
-- ============================================================

do $$
declare t text;
begin
  -- Drop previous permissive policies
  foreach t in array array['projects','posts','team_members','hero_slides','contact_leads']
  loop
    execute format('drop policy if exists "%s public all" on public.%I', t, t);
  end loop;
end$$;

-- ─── projects ───
create policy "projects read"   on public.projects for select to anon, authenticated using (true);
create policy "projects write"  on public.projects for insert to authenticated with check (true);
create policy "projects update" on public.projects for update to authenticated using (true) with check (true);
create policy "projects delete" on public.projects for delete to authenticated using (true);

-- ─── posts ───
create policy "posts read"   on public.posts for select to anon, authenticated using (true);
create policy "posts write"  on public.posts for insert to authenticated with check (true);
create policy "posts update" on public.posts for update to authenticated using (true) with check (true);
create policy "posts delete" on public.posts for delete to authenticated using (true);

-- ─── team_members ───
create policy "team read"   on public.team_members for select to anon, authenticated using (true);
create policy "team write"  on public.team_members for insert to authenticated with check (true);
create policy "team update" on public.team_members for update to authenticated using (true) with check (true);
create policy "team delete" on public.team_members for delete to authenticated using (true);

-- ─── hero_slides ───
create policy "hero read"   on public.hero_slides for select to anon, authenticated using (true);
create policy "hero write"  on public.hero_slides for insert to authenticated with check (true);
create policy "hero update" on public.hero_slides for update to authenticated using (true) with check (true);
create policy "hero delete" on public.hero_slides for delete to authenticated using (true);

-- ─── contact_leads ───
-- Public can submit leads (form), but cannot read/edit/delete.
create policy "contact submit" on public.contact_leads for insert to anon, authenticated with check (true);
create policy "contact read"   on public.contact_leads for select to authenticated using (true);
create policy "contact update" on public.contact_leads for update to authenticated using (true) with check (true);
create policy "contact delete" on public.contact_leads for delete to authenticated using (true);
