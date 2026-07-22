import { Users, MousePointerClick } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

function formatCtaLabel(label: string): string {
  if (label === "wa_channel_hero") return "WA Channel (tombol Hero)";
  if (label === "wa_channel_cta") return "WA Channel (tombol CTA akhir)";
  if (label.startsWith("event_register:")) {
    return `Daftar Event — ${label.replace("event_register:", "")}`;
  }
  return label;
}

export default async function StatsOverview() {
  const supabase = await createClient();

  const [{ count: pageViews }, { count: ctaClicks }, { data: ctaRows }] =
    await Promise.all([
      supabase
        .from("analytics_events")
        .select("*", { count: "exact", head: true })
        .eq("event_type", "page_view"),
      supabase
        .from("analytics_events")
        .select("*", { count: "exact", head: true })
        .eq("event_type", "cta_click"),
      supabase
        .from("analytics_events")
        .select("event_label")
        .eq("event_type", "cta_click"),
    ]);

  const breakdown = (ctaRows ?? []).reduce<Record<string, number>>(
    (acc, row) => {
      acc[row.event_label] = (acc[row.event_label] ?? 0) + 1;
      return acc;
    },
    {}
  );

  const breakdownList = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  const maxCount = breakdownList[0]?.[1] ?? 1;

  return (
    <div className="mb-10">
      <h2 className="font-display mb-4 text-lg font-semibold text-ink">
        Statistik
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          icon={<Users size={20} />}
          label="Total Pengunjung"
          value={pageViews ?? 0}
        />
        <StatCard
          icon={<MousePointerClick size={20} />}
          label="Total Klik CTA"
          value={ctaClicks ?? 0}
        />
      </div>

      {breakdownList.length > 0 && (
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <h3 className="mb-4 text-sm font-semibold text-ink">
            Rincian Klik CTA
          </h3>
          <div className="flex flex-col gap-3">
            {breakdownList.map(([label, count]) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-ink-soft">{formatCtaLabel(label)}</span>
                  <span className="font-semibold text-ink">{count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-court">
                  <div
                    className="h-full rounded-full bg-tosca"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tosca/15 text-tosca">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-semibold text-ink">
          {value.toLocaleString("id-ID")}
        </p>
        <p className="text-sm text-ink-soft">{label}</p>
      </div>
    </div>
  );
}
