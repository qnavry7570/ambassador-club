-- Tabela partnerów (firmy wspierające klub) — uruchom w Supabase: SQL Editor
create table if not exists public.partners (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  sector      text,
  website     text,
  description text,
  logo_url    text,
  sort_order  int  default 0,
  published   boolean default true,
  created_at  timestamptz default now()
);

-- RLS
alter table public.partners enable row level security;

-- Publiczny odczyt tylko opublikowanych partnerów (strona /partners używa anon key)
drop policy if exists "public read published partners" on public.partners;
create policy "public read published partners"
  on public.partners for select
  using (published = true);

-- Zapis/edycja/usuwanie tylko przez service role (panel admina przez API) —
-- service role omija RLS, więc nie trzeba osobnej polityki write.
