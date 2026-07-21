export default function AboutSection() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 md:grid-cols-[0.4fr_0.6fr] md:gap-16">
        <div>
          <span className="font-display text-sm font-semibold uppercase tracking-widest text-tosca">
            Tentang Kami
          </span>
          <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl">
            Komunitas Badminton Ciamis yang Ramah untuk Semua Level
          </h2>
        </div>
        <p className="text-lg leading-relaxed text-ink-soft">
          Kami bukan sekadar komunitas badminton biasa. Entiti adalah
          ekosistem bagi siapa saja yang ingin bugar, berkembang, dan
          menambah relasi sosial di Ciamis.
        </p>
      </div>
    </section>
  );
}
