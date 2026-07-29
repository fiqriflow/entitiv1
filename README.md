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

## 6. Google Analytics

Website ini pakai Google Analytics (GA4) buat tracking pengunjung, bukan sistem custom — biar datanya lengkap (unique visitor, sumber traffic, demografi, dll) tanpa perlu bikin dashboard sendiri.

**Setup:**
1. Buka [analytics.google.com](https://analytics.google.com) → buat property baru buat website kamu
2. Pas setup, pilih platform **Web**, masukin URL `entiti.web.id`
3. Nanti kamu dapat **Measurement ID**, formatnya `G-XXXXXXXXXX`
4. Tambahin ke `.env.local`:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
5. Tambahin juga environment variable yang sama di Vercel: **Settings → Environment Variables** → `NEXT_PUBLIC_GA_ID` = `G-XXXXXXXXXX`
6. Redeploy (bisa lewat `git push` kosong atau klik **Redeploy** di Vercel)

Setelah itu, buka dashboard Google Analytics kamu — data pengunjung mulai masuk beberapa menit setelah ada yang buka website kamu. Nggak perlu ubah kode apa-apa lagi, tinggal isi env variable-nya aja.

## 7. Akses khusus member (passcode)

Halaman `/event` dan halaman detail tiap event (`/event/[slug]`) dikunci pakai passcode bersama. Pengunjung yang belum masukin passcode otomatis di-redirect ke `/event/access`.

**Passcode-nya disimpan di database (bukan env var), jadi bisa diganti kapan aja langsung dari dashboard admin — nggak perlu redeploy.**

**Setup awal:**
1. Passcode default pas `schema.sql` pertama kali dijalankan: `entiti2026`
2. Buka `/admin/dashboard`, di paling atas ada card **"Passcode Halaman Event"** — ganti ke passcode pilihan kamu, klik **Simpan**
3. Share passcode itu ke member lewat WA Channel

**Cara kerja untuk pengunjung:**
- Sekali masukin passcode yang benar, tersimpan di cookie selama **30 hari** — nggak perlu masukin ulang tiap buka web
- Passcode dicek lewat database function khusus (`verify_event_passcode`) yang cuma balikin `true`/`false` — jadi passcode aslinya nggak pernah kekirim atau kebuka ke browser pengunjung, cuma admin yang login yang bisa lihat nilainya

**Ganti passcode kapan aja:** buka dashboard admin → edit di card "Passcode Halaman Event" → Simpan. Member yang udah pernah masuk pakai passcode lama tetap bisa akses (cookie-nya masih valid) sampai 30 hari atau sampai mereka clear cookies sendiri.

## 8. Struktur folder singkat

```
app/
  page.tsx                 → landing page (section Event = preview info-only)
  event/page.tsx           → halaman daftar semua event (bisa diklik + daftar)
  event/[slug]/page.tsx    → halaman detail event
  admin/login/page.tsx     → login admin
  admin/dashboard/page.tsx → panel admin (2 tab: Halaman Event & Section Event Home)
components/                → semua komponen UI
components/admin/          → komponen khusus panel admin
lib/supabase/              → koneksi ke Supabase (browser, server, middleware)
supabase/schema.sql        → skema database + seed data
```

## 9. Cara kerja toggle & 2 tab admin

Ada 3 toggle per event, semuanya independen satu sama lain:

| Toggle | Fungsi |
|---|---|
| **Status** | Event aktif/nonaktif — kalau nonaktif, hilang total dari `/event` dan dari landing page |
| **Pendaftaran** | Tombol "Join Mabar" di halaman detail aktif/nonaktif (event tetap tampil) |
| **Section Event Home** | Event ikut tampil di preview landing page atau nggak (tetap ada di `/event` kalau aktif) |

Di dashboard admin ada 2 tab:
- **Halaman Event** — kelola semua event: tambah, edit, hapus, toggle Status & Pendaftaran. Ini yang nentuin isi halaman `/event`.
- **Section Event (Home)** — cuma atur toggle "Tampil di Home", buat milih event mana yang muncul di preview landing page. Event yang nonaktif (Status off) otomatis nggak bisa ditampilkan di sini juga, meski toggle-nya dinyalain.

