import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import EventInfoCard from "./EventInfoCard";
import type { EventItem } from "@/types/event";

export default async function EventsSection() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .eq("show_on_home", true)
    .order("event_date", { ascending: true });

  const list = (events ?? []) as EventItem[];

  return (
    <section id="event" className="bg-tosca-light/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="font-display text-sm font-semibold uppercase tracking-widest text-tosca">
              Event Kami
            </span>
            <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl">
              Event yang Tersedia
            </h2>
          </div>
          <Link
            href="/event"
            className="focus-ring flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tosca hover:text-ink"
          >
            Join Mabar
            <ArrowRight size={15} />
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 bg-white/60 p-12 text-center text-ink-soft">
            Belum ada event aktif minggu ini. Follow WA Channel biar nggak
            ketinggalan info mabar berikutnya!
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((event) => (
              <EventInfoCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
