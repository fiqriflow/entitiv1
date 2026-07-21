# Entiti Badminton Community — Website

Landing page + halaman detail event + panel admin untuk Entiti Badminton Community, Ciamis.

Stack: **Next.js 16 (App Router) + React 19 + Tailwind CSS + Supabase (database, auth, storage) + Vercel (hosting)**.

> **Catatan proteksi halaman admin**: di Next.js 16, taruh logika auth di `middleware`/`proxy` tidak lagi disarankan (dianggap kurang aman). Jadi proyek ini mengecek login langsung di `app/admin/dashboard/page.tsx` (Server Component) — kalau belum login, otomatis di-redirect ke `/admin/login`.

---

## 1. Setup Supabase

1. Buka project Supabase kamu → menu **SQL Editor**.
2. Copy seluruh isi file `supabase/schema.sql` di folder ini, paste, lalu **Run**.
   Ini akan membuat:
   - Tabel `events`
   - Aturan keamanan (RLS): publik hanya bisa lihat event yang aktif, admin (login) bisa CRUD semua
   - Storage bucket `event-banners` untuk upload banner
   - 3 data event contoh (pakai poster yang kamu kirim)
3. Buka menu **Authentication → Users → Add user**, buat akun admin:
   - Email: `fiqriflow@gmail.com` (atau email lain yang kamu mau)
   - Password: bebas, minimal 8 karakter
   - Centang **Auto Confirm User** supaya bisa langsung login tanpa verifikasi email.
4. Buka menu **Project Settings → API**, catat:
   - **Project URL**
   - **anon public key**

## 2. Setup environment variables

1. Copy file `.env.local.example` jadi `.env.local`
2. Isi dengan URL dan anon key dari Supabase tadi:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

## 3. Jalankan di lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` untuk landing page, dan `http://localhost:3000/admin/login` untuk masuk ke panel admin.

## 4. Yang masih perlu kamu ganti manual

- **Link WA Channel** — di `components/Hero.tsx` dan `components/CTASection.tsx`, cari teks `GANTI_DENGAN_LINK_WA_CHANNEL` dan ganti dengan link channel WhatsApp asli kamu.
- **Detail Event 2, 3, 4** — di dokumen yang kamu kasih, cuma Event 1 yang detailnya lengkap. Data Event 2 & 3 di `supabase/schema.sql` sementara aku isi mirip Event 1 (tanggal beda per minggu) supaya ada 3 contoh. Silakan edit langsung lewat panel admin setelah web-nya jalan — nggak perlu edit SQL lagi.
- Poster Event 4 belum ada file-nya (yang kamu upload cuma 3 poster), jadi baru dibuatkan 3 event contoh. Tambah event ke-4 lewat panel admin kapan saja.

## 5. Deploy ke Vercel

1. Push folder ini ke repo GitHub baru.
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → import repo tadi.
3. Di step **Environment Variables**, masukkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` yang sama seperti di `.env.local`.
4. Klik **Deploy**.

Setelah deploy selesai, website kamu langsung live, dan panel admin ada di `/admin/login`.

## 6. Struktur folder singkat

```
app/
  page.tsx                 → landing page
  event/[slug]/page.tsx    → halaman detail event
  admin/login/page.tsx     → login admin
  admin/dashboard/page.tsx → panel admin (CRUD + toggle)
components/                → semua komponen UI
components/admin/          → komponen khusus panel admin
lib/supabase/              → koneksi ke Supabase (browser, server, middleware)
supabase/schema.sql        → skema database + seed data
```

## 7. Cara kerja toggle aktif/nonaktif

Section "Event Berlangsung Minggu Ini" di landing page hanya menampilkan event dengan status **aktif**. Kalau kamu nonaktifkan event lewat toggle di admin, event itu otomatis hilang dari landing page (tanpa perlu dihapus datanya) — bisa diaktifkan lagi kapan saja.
