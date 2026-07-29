import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Garis lapangan badminton sebagai motif dekoratif */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        viewBox="0 0 1200 700"
        fill="none"
        aria-hidden="true"
      >
        <rect x="60" y="60" width="1080" height="580" stroke="white" strokeWidth="2" />
        <line x1="60" y1="350" x2="1140" y2="350" stroke="white" strokeWidth="2" />
        <line x1="600" y1="60" x2="600" y2="640" stroke="white" strokeWidth="2" />
        <rect x="180" y="60" width="840" height="580" stroke="white" strokeWidth="2" />
      </svg>

      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-tosca/20 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start px-6 py-24 md:py-32">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-tosca/15 px-4 py-1.5 text-sm font-medium text-tosca">
          🏸 Base Ciamis
        </span>

        <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-6xl">
          Komunitas Fun Mabar Badminton{" "}
          <span className="text-tosca">Base Ciamis</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
          Komunitas santuy untuk player newbie–intermediate sekitaran Ciamis.
          Bukan buat yang terlalu kompetitif, di sini yang penting seru,
          rutin, dan punya teman main 🔥
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://forms.gle/XBADUs4gzHWkBhAZ6"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring rounded-full bg-tosca px-7 py-3.5 text-center font-semibold text-ink transition-transform hover:scale-[1.02] hover:bg-tosca-dark hover:text-white"
          >
            Gabung & Main Bareng
          </a>
          <Link
            href="/#event"
            className="focus-ring rounded-full border border-white/25 px-7 py-3.5 text-center font-semibold text-white transition-colors hover:border-white/60"
          >
            Lihat Event
          </Link>
        </div>
      </div>
    </section>
  );
}
