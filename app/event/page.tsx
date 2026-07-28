import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import type { EventItem } from "@/types/event";

export default async function EventListPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("event_date", { ascending: true });

  const list = (events ?? []) as EventItem[];

  return (
    <main>
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 max-w-xl">
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-tosca">
            Semua Event
          </span>
          <h1 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Daftar Mabar Entiti
          </h1>
          <p className="mt-3 text-ink-soft">
            Pilih event yang cocok sama level dan jadwal kamu, klik buat lihat
            detail & daftar.
          </p>
        </div>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 bg-white/60 p-12 text-center text-ink-soft">
            Belum ada event aktif saat ini. Follow WA Channel biar nggak
            ketinggalan info mabar berikutnya!
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
