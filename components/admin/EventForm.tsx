"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { EventItem, Gender } from "@/types/event";
import { GENDER_OPTIONS } from "@/types/event";
import RichTextEditor from "./RichTextEditor";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function EventForm({
  initial,
  onClose,
  onSaved,
}: {
  initial?: EventItem | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const supabase = createClient();
  const isEdit = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [eventDate, setEventDate] = useState(initial?.event_date ?? "");
  const [eventTime, setEventTime] = useState(
    initial?.event_time ?? "16.00 WIB - Selesai"
  );
  const [price, setPrice] = useState(initial?.price ?? "Rp25.000/orang");
  const [level, setLevel] = useState(initial?.level ?? "Beginner - Intermediate");
  const [gender, setGender] = useState<Gender>(initial?.gender ?? "Campuran");
  const [registrationOpen, setRegistrationOpen] = useState(
    initial?.registration_open ?? true
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [registerUrl, setRegisterUrl] = useState(initial?.register_url ?? "");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(
    initial?.banner_url ?? null
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleBannerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const isDescriptionEmpty = description.replace(/<[^>]*>/g, "").trim() === "";
    if (isDescriptionEmpty) {
      setError("Deskripsi tidak boleh kosong.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      let bannerUrl = initial?.banner_url ?? null;

      if (bannerFile) {
        const ext = bannerFile.name.split(".").pop();
        const path = `${Date.now()}-${slugify(title)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("event-banners")
          .upload(path, bannerFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrl } = supabase.storage
          .from("event-banners")
          .getPublicUrl(path);
        bannerUrl = publicUrl.publicUrl;
      }

      const payload = {
        title,
        location,
        event_date: eventDate,
        event_time: eventTime,
        price,
        level,
        gender,
        registration_open: registrationOpen,
        description,
        register_url: registerUrl,
        banner_url: bannerUrl,
        slug: initial?.slug ?? `${slugify(title)}-${Date.now()}`,
      };

      const { error: saveError } = isEdit
        ? await supabase.from("events").update(payload).eq("id", initial!.id)
        : await supabase.from("events").insert({ ...payload, is_active: true });

      if (saveError) throw saveError;

      onSaved();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menyimpan event. Coba lagi."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">
            {isEdit ? "Edit Event" : "Tambah Event"}
          </h2>
          <button
            onClick={onClose}
            className="focus-ring rounded-full p-1.5 text-ink-soft hover:bg-black/5"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Judul Event">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="focus-ring w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm"
              placeholder="Skuy Mabar with BASCOM"
            />
          </Field>

          <Field label="Lokasi">
            <input
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="focus-ring w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm"
              placeholder="GOR Canary Hall Badminton"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Tanggal">
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="focus-ring w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm"
              />
            </Field>
            <Field label="Waktu">
              <input
                required
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className="focus-ring w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="HTM">
              <input
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="focus-ring w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm"
              />
            </Field>
            <Field label="Level">
              <input
                required
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="focus-ring w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm"
              />
            </Field>
          </div>

          <Field label="Kategori Gender">
            <select
              required
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="focus-ring w-full rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm"
            >
              {GENDER_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Pendaftaran">
            <button
              type="button"
              onClick={() => setRegistrationOpen((v) => !v)}
              className={`focus-ring flex w-full items-center justify-between rounded-lg border border-black/10 px-3.5 py-2.5 text-sm ${
                registrationOpen ? "bg-tosca-light/60" : "bg-court"
              }`}
            >
              <span className="font-medium text-ink">
                {registrationOpen
                  ? "Dibuka — tombol Join Mabar aktif"
                  : "Ditutup — tombol Join Mabar nonaktif"}
              </span>
              <span
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  registrationOpen ? "bg-tosca" : "bg-black/15"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 shrink-0 translate-x-0.5 rounded-full bg-white shadow transition-transform will-change-transform ${
                    registrationOpen ? "translate-x-[22px]" : ""
                  }`}
                />
              </span>
            </button>
          </Field>

          <Field label="Deskripsi">
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Tulis deskripsi event... gunakan toolbar untuk bold, italic, atau bullet list"
            />
          </Field>

          <Field label="Link Daftar (Google Form / WA)">
            <input
              type="url"
              required
              value={registerUrl}
              onChange={(e) => setRegisterUrl(e.target.value)}
              className="focus-ring w-full rounded-lg border border-black/10 px-3.5 py-2.5 text-sm"
              placeholder="https://forms.gle/..."
            />
          </Field>

          <Field label="Banner Event">
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="focus-ring w-full text-sm"
            />
            {bannerPreview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={bannerPreview}
                alt="Preview banner"
                className="mt-3 h-40 w-full rounded-lg object-cover"
              />
            )}
          </Field>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="focus-ring mt-2 rounded-full bg-tosca py-3 font-semibold text-ink transition-colors hover:bg-tosca-dark hover:text-white disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambah Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </span>
      {children}
    </div>
  );
}
