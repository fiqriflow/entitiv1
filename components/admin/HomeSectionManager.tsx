"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { EventItem } from "@/types/event";

function formatTanggal(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function HomeSectionManager({
  initialEvents,
}: {
  initialEvents: EventItem[];
}) {
  const supabase = createClient();
  const router = useRouter();

  const [events, setEvents] = useState(initialEvents);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function toggleShowOnHome(event: EventItem) {
    setBusyId(event.id);
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id ? { ...e, show_on_home: !e.show_on_home } : e
      )
    );
    const { error } = await supabase
      .from("events")
      .update({ show_on_home: !event.show_on_home })
      .eq("id", event.id);

    setBusyId(null);
    if (error) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === event.id ? { ...e, show_on_home: event.show_on_home } : e
        )
      );
    }
    router.refresh();
  }

  return (
    <div>
      <p className="mb-6 max-w-2xl text-sm text-ink-soft">
        Atur event mana yang muncul di section &quot;Event Berlangsung Minggu
        Ini&quot; di landing page. Event yang nonaktif (toggle Status di tab
        &quot;Halaman Event&quot;) nggak akan tampil di sini walau
        toggle-nya dinyalain.
      </p>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-court text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-5 py-3 font-medium">Event</th>
              <th className="px-5 py-3 font-medium">Tanggal</th>
              <th className="px-5 py-3 font-medium">Status Event</th>
              <th className="px-5 py-3 font-medium">Tampil di Home</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-ink-soft">
                  Belum ada event. Tambah dulu lewat tab &quot;Halaman
                  Event&quot;.
                </td>
              </tr>
            )}
            {events.map((event) => (
              <tr key={event.id} className={busyId === event.id ? "opacity-50" : ""}>
                <td className="px-5 py-4">
                  <p className="font-medium text-ink">{event.title}</p>
                  <p className="text-xs text-ink-soft">{event.location}</p>
                </td>
                <td className="px-5 py-4 text-ink-soft">
                  {formatTanggal(event.event_date)}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      event.is_active
                        ? "bg-tosca/15 text-tosca"
                        : "bg-black/5 text-ink-soft"
                    }`}
                  >
                    {event.is_active ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <ToggleSwitch
                    checked={event.show_on_home}
                    disabled={busyId === event.id || !event.is_active}
                    onChange={() => toggleShowOnHome(event)}
                    labelOn="Sembunyikan dari home"
                    labelOff="Tampilkan di home"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ToggleSwitch({
  checked,
  disabled,
  onChange,
  labelOn,
  labelOff,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  labelOn: string;
  labelOff: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`focus-ring relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-0 p-0 leading-none outline-none transition-colors [appearance:none] disabled:cursor-not-allowed disabled:opacity-40 ${
        checked ? "bg-tosca" : "bg-black/15"
      }`}
      aria-label={checked ? labelOn : labelOff}
    >
      <span
        className={`inline-block h-5 w-5 shrink-0 rounded-full bg-white shadow transition-transform will-change-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
