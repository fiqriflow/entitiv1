-- ============================================
-- Schema untuk website Entiti Badminton Community
-- Jalankan ini di Supabase SQL Editor
-- Aman dijalankan berkali-kali (idempotent)
-- ============================================

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  location text not null,
  event_date date not null,
  event_time text not null,
  price text not null,
  level text not null,
  gender text not null default 'Campuran'
    check (gender in ('Campuran', 'Girl/Woman Only', 'Boy/Man Only')),
  description text not null,
  banner_url text,
  register_url text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Migrasi buat yang tabelnya sudah kebentuk dari versi schema sebelumnya
-- (aman di-skip kalau kolom gender sudah ada)
alter table public.events
  add column if not exists gender text not null default 'Campuran';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'events_gender_check'
  ) then
    alter table public.events
      add constraint events_gender_check
      check (gender in ('Campuran', 'Girl/Woman Only', 'Boy/Man Only'));
  end if;
end $$;

-- Auto-update updated_at setiap kali row di-update
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_events_updated_at on public.events;
create trigger trg_events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

-- ============================================
-- Row Level Security
-- Publik hanya boleh BACA event yang is_active = true.
-- Tulis (insert/update/delete) hanya boleh oleh user yang login (admin).
-- ============================================
alter table public.events enable row level security;

drop policy if exists "Publik bisa lihat event aktif" on public.events;
create policy "Publik bisa lihat event aktif"
  on public.events for select
  using ( is_active = true );

drop policy if exists "Admin (login) bisa lihat semua event" on public.events;
create policy "Admin (login) bisa lihat semua event"
  on public.events for select
  to authenticated
  using ( true );

drop policy if exists "Admin bisa tambah event" on public.events;
create policy "Admin bisa tambah event"
  on public.events for insert
  to authenticated
  with check ( true );

drop policy if exists "Admin bisa update event" on public.events;
create policy "Admin bisa update event"
  on public.events for update
  to authenticated
  using ( true );

drop policy if exists "Admin bisa hapus event" on public.events;
create policy "Admin bisa hapus event"
  on public.events for delete
  to authenticated
  using ( true );

-- ============================================
-- Storage bucket untuk banner event
-- ============================================
insert into storage.buckets (id, name, public)
values ('event-banners', 'event-banners', true)
on conflict (id) do nothing;

drop policy if exists "Publik bisa lihat banner" on storage.objects;
create policy "Publik bisa lihat banner"
  on storage.objects for select
  using ( bucket_id = 'event-banners' );

drop policy if exists "Admin bisa upload banner" on storage.objects;
create policy "Admin bisa upload banner"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'event-banners' );

drop policy if exists "Admin bisa hapus banner" on storage.objects;
create policy "Admin bisa hapus banner"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'event-banners' );

-- ============================================
-- Migrasi: convert deskripsi lama (teks biasa per baris) ke format HTML
-- Cuma jalan kalau deskripsinya BELUM pernah diedit ulang lewat WYSIWYG
-- editor baru (dideteksi dari belum adanya tag HTML sama sekali)
-- ============================================
update public.events
set description = '<ul><li>Shuttlecock disediakan</li><li>Kesempatan bermain lebih dari 2 kali (disesuaikan dengan jumlah peserta)</li><li>Sistem: 2 Service 2x15</li><li>Match Format: Penyesuaian</li></ul>'
where slug in ('skuy-mabar-with-bascom-1', 'skuy-mabar-with-bascom-2', 'skuy-mabar-with-bascom-3')
  and description not like '%<%';

-- ============================================
-- Seed data 3 event awal (isi dari data Entiti Badminton)
-- Aman dijalankan berkali-kali: skip kalau slug sudah ada
-- ============================================
insert into public.events
  (slug, title, location, event_date, event_time, price, level, gender, description, banner_url, register_url, is_active)
values
  (
    'skuy-mabar-with-bascom-1',
    'Skuy Mabar with BASCOM',
    'GOR Canary Hall Badminton (Dekat Stasiun KAI)',
    '2026-07-26',
    '16.00 WIB - Selesai',
    'Rp25.000/orang',
    'Beginner - Intermediate',
    'Campuran',
    '<ul><li>Shuttlecock disediakan</li><li>Kesempatan bermain lebih dari 2 kali (disesuaikan dengan jumlah peserta)</li><li>Sistem: 2 Service 2x15</li><li>Match Format: Penyesuaian</li></ul>',
    '/events/event1.png',
    'https://forms.gle/f9m86U9oxB9MpYs1A',
    true
  ),
  (
    'skuy-mabar-with-bascom-2',
    'Skuy Mabar with BASCOM',
    'GOR Canary Hall Badminton (Dekat Stasiun KAI)',
    '2026-08-02',
    '16.00 WIB - Selesai',
    'Rp25.000/orang',
    'Beginner - Intermediate',
    'Campuran',
    '<ul><li>Shuttlecock disediakan</li><li>Kesempatan bermain lebih dari 2 kali (disesuaikan dengan jumlah peserta)</li><li>Sistem: 2 Service 2x15</li><li>Match Format: Penyesuaian</li></ul>',
    '/events/event2.png',
    'https://forms.gle/f9m86U9oxB9MpYs1A',
    true
  ),
  (
    'skuy-mabar-with-bascom-3',
    'Skuy Mabar with BASCOM',
    'GOR Canary Hall Badminton (Dekat Stasiun KAI)',
    '2026-08-09',
    '16.00 WIB - Selesai',
    'Rp25.000/orang',
    'Beginner - Intermediate',
    'Campuran',
    '<ul><li>Shuttlecock disediakan</li><li>Kesempatan bermain lebih dari 2 kali (disesuaikan dengan jumlah peserta)</li><li>Sistem: 2 Service 2x15</li><li>Match Format: Penyesuaian</li></ul>',
    '/events/event3.png',
    'https://forms.gle/f9m86U9oxB9MpYs1A',
    true
  )
on conflict (slug) do nothing;
