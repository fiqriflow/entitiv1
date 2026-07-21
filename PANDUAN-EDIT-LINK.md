# Panduan Mengubah Link & Navigasi

Panduan ini buat kamu yang mau ganti-ganti link (WA Channel, tombol CTA, menu navbar) tanpa perlu tanya lagi. Semua path file di bawah relatif dari folder utama project.

---

## 1. Link pendaftaran event (link Google Form / WA per event)

**Ini yang PALING SERING kamu ubah — dan nggak perlu edit kode sama sekali.**

Buka `/admin/dashboard` di website kamu → klik ikon pensil (edit) di event yang mau diubah → ganti isi field **"Link Daftar (Google Form / WA)"** → Simpan.

Link ini otomatis dipakai di tombol **"Join Mabar"** di halaman detail event masing-masing.

---

## 2. Link WA Channel (tombol besar di Hero & CTA section)

Ada di 2 file, isinya sama — cari teks `GANTI_DENGAN_LINK_WA_CHANNEL` dan timpa dengan link channel WhatsApp kamu:

**File 1**: `components/Hero.tsx`
```tsx
<a
  href="https://whatsapp.com/channel/GANTI_DENGAN_LINK_WA_CHANNEL"
  ...
>
  Follow WA Channel Sekarang
</a>
```

**File 2**: `components/CTASection.tsx`
```tsx
<a
  href="https://whatsapp.com/channel/GANTI_DENGAN_LINK_WA_CHANNEL"
  ...
>
  Follow WA Channel Sekarang
</a>
```

Tinggal ganti bagian `https://whatsapp.com/channel/GANTI_DENGAN_LINK_WA_CHANNEL` dengan link channel WA asli kamu, di kedua file.

---

## 3. Menu navbar (bar atas)

File: `components/Navbar.tsx`

Menu yang sekarang ada ("Event" dan "Tentang Kami") itu **anchor link** — artinya dia scroll ke section tertentu di halaman yang sama, bukan pindah halaman. Kode-nya:

```tsx
<a href="#event" ...>Event</a>
<a href="#tentang" ...>Tentang Kami</a>
```

Angka `#event` dan `#tentang` itu harus sama persis dengan `id` di section tujuan:
- `#event` → merujuk ke `<section id="event">` di `components/EventsSection.tsx`
- `#tentang` → merujuk ke `<section id="tentang">` di `components/AboutSection.tsx`

**Kalau mau tambah menu baru**, misal "Kontak":
1. Tambah section baru dengan `id="kontak"` di halaman manapun
2. Tambah baris ini di `Navbar.tsx`, sejajar dengan menu lain:
   ```tsx
   <a href="#kontak" className="transition-colors hover:text-tosca">
     Kontak
   </a>
   ```

**Kalau mau menu ke halaman lain** (bukan scroll), pakai komponen `Link` dari Next.js, contoh menu ke halaman `/tentang-kami` (halaman terpisah):
```tsx
import Link from "next/link";
// ...
<Link href="/tentang-kami" className="transition-colors hover:text-tosca">
  Tentang Kami
</Link>
```

Tombol "Gabung Mabar" di pojok kanan navbar juga ada di file yang sama, defaultnya scroll ke `#event` — bisa diganti `href`-nya kalau mau diarahkan ke tempat lain.

---

## 4. Tombol "Kembali ke semua event" di halaman detail

File: `app/event/[slug]/page.tsx`, cari:
```tsx
<Link href="/#event" ...>
  Kembali ke semua event
</Link>
```
`/#event` artinya: balik ke halaman utama (`/`), lalu scroll ke section `#event`. Biasanya nggak perlu diubah.

---

---

## 5. Warna chip gender di card & halaman detail event

File: `types/event.ts`, cari bagian `GENDER_CHIP_STYLES`:

```ts
export const GENDER_CHIP_STYLES: Record<Gender, string> = {
  "Campuran": "bg-white/90 text-ink",
  "Girl/Woman Only": "bg-pink-100 text-pink-700",
  "Boy/Man Only": "bg-blue-100 text-blue-700",
};
```

Format-nya `"bg-{warna}-{tingkat} text-{warna}-{tingkat}"`. Tinggal ganti nama warnanya, contoh mau lebih pekat/mencolok:

```ts
"Girl/Woman Only": "bg-pink-500 text-white",
"Boy/Man Only": "bg-blue-500 text-white",
```

Pilihan warna yang bisa dipakai (bawaan Tailwind): `pink`, `rose`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `gray`. Tingkatnya dari `50` (paling muda) sampai `900` (paling gelap) — biasanya `100` (buat background muda) atau `500`/`600` (buat background pekat) yang paling umum dipakai.

Perubahan di file ini otomatis berlaku di card event (landing page) dan halaman detail event sekaligus, karena keduanya ambil warna dari sini.

## 7. Ukuran logo di navbar & footer

**Navbar** — `components/Navbar.tsx`, cari blok `<Image src="/logo/logodark.svg" ...>`:
```tsx
<Image src="/logo/logodark.svg" ... width={36} height={36} className="h-9 w-9" />
```

**Footer** — `components/Footer.tsx`, cari blok `<Image src="/logo/logolight.svg" ...>`:
```tsx
<Image src="/logo/logolight.svg" ... width={24} height={24} className="h-6 w-6" />
```

Ganti angka `width`/`height` dan class `h-{n} w-{n}` **bareng-bareng, harus konsisten** (angka px-nya sama). Referensi kelipatan Tailwind: `h-8 w-8`=32px, `h-9 w-9`=36px, `h-10 w-10`=40px, `h-12 w-12`=48px, `h-14 w-14`=56px, `h-16 w-16`=64px.

---

## 8. Ringkasan cepat: di mana harus edit apa

| Yang mau diubah | Di mana |
|---|---|
| Link daftar tiap event | Panel admin (`/admin/dashboard`) — **tanpa kode** |
| Link WA Channel | `components/Hero.tsx` dan `components/CTASection.tsx` |
| Menu navbar | `components/Navbar.tsx` |
| Teks/section landing page | `components/Hero.tsx`, `AboutSection.tsx`, dll |
| Logo | sudah otomatis pakai `logodark.svg` (navbar/admin) & `logolight.svg` (footer) di `public/logo/` — tinggal timpa file itu kalau logo berubah lagi |
| Favicon | `app/favicon.ico` — tinggal timpa file-nya kalau mau ganti |

Setelah edit file manapun di atas, jalankan `npm run dev` buat lihat perubahannya di lokal, lalu `git push` supaya Vercel deploy otomatis.
