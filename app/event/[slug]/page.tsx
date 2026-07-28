import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Clock, Wallet } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { hasEventAccess } from "@/lib/eventAccess";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { EventItem } from "@/types/event";
import { GENDER_CHIP_STYLES } from "@/types/event";

function formatTanggal(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(await hasEventAccess())) {
    redirect(`/event/access?redirectTo=/event/${slug}`);
  }

  const supabase = await createClient();

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!event) notFound();

  const item = event as EventItem;

  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link
          href="/event"
          className="focus-ring inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-tosca"
        >
          <ArrowLeft size={16} />
          Kembali ke semua event
        </Link>
      </div>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 md:grid-cols-2 md:gap-14">
        {/* Kiri: banner */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-ink shadow-sm md:sticky md:top-24 md:self-start">
          {item.banner_url && (
            <Image
              src={item.banner_url}
              alt={item.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Kanan: penjelasan + CTA */}
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-tosca/15 px-3 py-1 text-xs font-semibold text-tosca">
              {item.level}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${GENDER_CHIP_STYLES[item.gender]}`}
            >
              {item.gender}
            </span>
          </div>

          <h1 className="font-display mt-4 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            {item.title}
          </h1>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <InfoRow icon={<MapPin size={18} />} label="Tempat" value={item.location} />
            <InfoRow icon={<CalendarDays size={18} />} label="Hari" value={formatTanggal(item.event_date)} />
            <InfoRow icon={<Clock size={18} />} label="Waktu" value={item.event_time} />
            <InfoRow icon={<Wallet size={18} />} label="HTM" value={item.price} />
          </div>

          <div className="mt-8 border-t border-black/5 pt-8">
            <h2 className="font-display text-lg font-semibold text-ink">
              Deskripsi
            </h2>
            <div
              className="rich-content mt-4 text-ink-soft"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>

          {item.registration_open ? (
            <a
              href={item.register_url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-10 block w-full rounded-full bg-tosca py-4 text-center font-display font-semibold text-ink transition-transform hover:scale-[1.01] hover:bg-tosca-dark hover:text-white sm:w-auto sm:px-10"
            >
              Join Mabar
            </a>
          ) : (
            <div
              aria-disabled="true"
              className="mt-10 block w-full cursor-not-allowed rounded-full bg-black/10 py-4 text-center font-display font-semibold text-ink-soft sm:w-auto sm:px-10"
            >
              Pendaftaran Ditutup
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl ring-1 ring-black/5 p-4">
      <span className="mt-0.5 text-tosca">{icon}</span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft/70">
          {label}
        </p>
        <p className="font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}
