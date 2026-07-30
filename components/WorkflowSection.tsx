import { MessageCircleMore, CalendarSearch, Wallet, PartyPopper } from "lucide-react";

const STEPS = [
  {
    icon: MessageCircleMore,
    title: "Follow WA Channel",
    description:
      "Gabung WA Channel Entiti biar selalu update info mabar & event terbaru.",
  },
  {
    icon: CalendarSearch,
    title: "Pilih Event",
    description:
      "Cek jadwal mabar minggu ini, pilih yang cocok sama level dan waktu luang kamu.",
  },
  {
    icon: Wallet,
    title: "Daftar & Bayar HTM",
    description:
      "Isi form pendaftaran, bayar HTM sesuai info di event, slot terbatas jadi gercep ya.",
  },
  {
    icon: PartyPopper,
    title: "Datang & Mabar",
    description:
      "Dateng ke lokasi sesuai jadwal, kenalan sama player lain, dan gaskeun main bareng!",
  },
];

export default function WorkflowSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-xl">
        <span className="font-display text-sm font-semibold uppercase tracking-widest text-tosca">
          Cara Ikutan
        </span>
        <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl">
          4 Langkah Gampang Buat Mabar Bareng Entiti
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <div key={step.title} className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tosca/15 text-tosca">
              <step.icon size={22} />
            </div>
            <span className="font-display mt-4 block text-sm font-semibold text-tosca">
              Langkah {index + 1}
            </span>
            <h3 className="font-display mt-1 text-lg font-semibold text-ink">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
