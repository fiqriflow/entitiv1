"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { EventItem } from "@/types/event";
import EventForm from "./EventForm";

function formatTanggal(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function EventManager({
  initialEvents,
}: {
  initialEvents: EventItem[];
}) {
  const supabase = createClient();
  const router = useRouter();

  const [events, setEvents] = useState(initialEvents);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  function refresh() {
    router.refresh();
    setFormOpen(false);
    setEditing(null);
  }

  async function toggleField(
    event: EventItem,
    field: "is_active" | "registration_open"
  ) {
    setBusyId(event.id);
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? { ...e, [field]: !e[field] } : e))
    );
    const { error } = await supabase
      .from("events")
      .update({ [field]: !event[field] })
      .eq("id", event.id);

    setBusyId(null);
    if (error) {
      // rollback kalau gagal
      setEvents((prev) =>
        prev.map((e) =>
          e.id === event.id ? { ...e, [field]: event[field] } : e
        )
      );
    }
    router.refresh();
  }

  async function handleDelete(event: EventItem) {
    const confirmed = window.confirm(
      `Hapus event "${event.title}"? Tindakan ini tidak bisa dibatalkan.`
    );
    if (!confirmed) return;

    setBusyId(event.id);
    const { error } = await supabase.from("events").delete().eq("id", event.id);
    setBusyId(null);

    if (!error) {
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">
          Event Berlangsung Minggu Ini
        </h2>
        <button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
          className="focus-ring flex items-center gap-2 rounded-full bg-tosca px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-tosca-dark hover:text-white"
        >
          <Plus size={16} />
          Tambah Event
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-court text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-5 py-3 font-medium">Event</th>
              <th className="px-5 py-3 font-medium">Tanggal</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Pendaftaran</th>
              <th className="px-5 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-ink-soft">
                  Belum ada event. Klik &quot;Tambah Event&quot; untuk mulai.
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
                  <ToggleSwitch
                    checked={event.is_active}
                    disabled={busyId === event.id}
                    onChange={() => toggleField(event, "is_active")}
                    labelOn="Nonaktifkan event"
                    labelOff="Aktifkan event"
                  />
                </td>
                <td className="px-5 py-4">
                  <ToggleSwitch
                    checked={event.registration_open}
                    disabled={busyId === event.id}
                    onChange={() => toggleField(event, "registration_open")}
                    labelOn="Tutup pendaftaran"
                    labelOff="Buka pendaftaran"
                  />
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditing(event);
                        setFormOpen(true);
                      }}
                      className="focus-ring rounded-lg p-2 text-ink-soft hover:bg-black/5 hover:text-ink"
                      aria-label="Edit event"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
                      className="focus-ring rounded-lg p-2 text-ink-soft hover:bg-red-50 hover:text-red-600"
                      aria-label="Hapus event"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <EventForm
          initial={editing}
          onClose={() => setFormOpen(false)}
          onSaved={refresh}
        />
      )}
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
      className={`focus-ring relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-0 p-0 leading-none outline-none transition-colors [appearance:none] disabled:cursor-not-allowed ${
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
