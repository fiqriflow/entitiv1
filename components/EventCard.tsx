import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Clock } from "lucide-react";
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

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/event/${event.slug}`}
      className="focus-ring group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
        {event.banner_url && (
          <Image
            src={event.banner_url}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          <span className="rounded-full bg-tosca px-3 py-1 text-xs font-semibold text-ink">
            {event.level}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${GENDER_CHIP_STYLES[event.gender]}`}
          >
            {event.gender}
          </span>
        </div>
      </div>

      {/* Sobekan tiket, membelah poster dan info seperti tiket pertandingan */}
      <div className="ticket-tear h-4 w-full" />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink">
          {event.title}
        </h3>

        <div className="flex flex-col gap-1.5 text-sm text-ink-soft">
          <span className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0 text-tosca" />
            {event.location}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays size={15} className="shrink-0 text-tosca" />
            {formatTanggal(event.event_date)}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={15} className="shrink-0 text-tosca" />
            {event.event_time}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-3">
          <span className="font-display font-semibold text-ink">
            {event.price}
          </span>
          <span className="text-sm font-semibold text-tosca">
            Selengkapnya →
          </span>
        </div>
      </div>
    </Link>
  );
}
