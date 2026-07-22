export type Gender = "Campuran" | "Girl/Woman Only" | "Boy/Man Only";

export const GENDER_OPTIONS: Gender[] = [
  "Campuran",
  "Girl/Woman Only",
  "Boy/Man Only",
];

// Warna chip per kategori gender. Ganti nilai class di sini kalau mau ubah warnanya.
export const GENDER_CHIP_STYLES: Record<Gender, string> = {
  "Campuran": "bg-white/90 text-ink",
  "Girl/Woman Only": "bg-pink-100 text-pink-700",
  "Boy/Man Only": "bg-blue-100 text-blue-700",
};

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  event_date: string;
  event_time: string;
  price: string;
  level: string;
  gender: Gender;
  registration_open: boolean;
  description: string;
  banner_url: string | null;
  register_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type EventFormInput = Omit<
  EventItem,
  "id" | "created_at" | "updated_at"
>;
