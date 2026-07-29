"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Copy, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function PasscodeSettings({
  initialPasscode,
}: {
  initialPasscode: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [passcode, setPasscode] = useState(initialPasscode);
  const [savedPasscode, setSavedPasscode] = useState(initialPasscode);
  const [visible, setVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDirty = passcode.trim() !== savedPasscode;

  async function handleSave() {
    const trimmed = passcode.trim();
    if (!trimmed) {
      setError("Passcode nggak boleh kosong.");
      return;
    }

    setSaving(true);
    setError(null);

    const { error: saveError } = await supabase
      .from("app_settings")
      .update({ event_passcode: trimmed })
      .eq("id", true);

    setSaving(false);

    if (saveError) {
      setError("Gagal menyimpan passcode. Coba lagi.");
      return;
    }

    setSavedPasscode(trimmed);
    setPasscode(trimmed);
    router.refresh();
  }

  function handleCopy() {
    navigator.clipboard.writeText(savedPasscode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h2 className="font-display text-lg font-semibold text-ink">
        Passcode Halaman Event
      </h2>
      <p className="mt-1 text-sm text-ink-soft">
        Passcode ini yang dibagikan ke member lewat WA Channel buat bisa
        akses halaman <code className="text-xs">/event</code>. Member yang
        udah pernah masuk pakai passcode lama tetap punya akses sampai
        cookie-nya expired (30 hari), meski passcode-nya udah diganti.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type={visible ? "text" : "password"}
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="focus-ring w-full rounded-lg border border-black/10 px-3.5 py-2.5 pr-10 text-sm"
            placeholder="Masukin passcode baru"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-ink-soft hover:bg-black/5"
            aria-label={visible ? "Sembunyikan passcode" : "Tampilkan passcode"}
          >
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="focus-ring flex items-center gap-1.5 rounded-lg border border-black/10 px-3.5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-court"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Ke-copy" : "Copy"}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="focus-ring rounded-lg bg-tosca px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-tosca-dark hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
