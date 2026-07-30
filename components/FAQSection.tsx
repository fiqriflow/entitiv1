import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "Apakah harus jadi member dulu buat ikut mabar?",
    answer:
      "Ya, wajib daftar member dulu untuk pendataan dan mempermudah proses join mabar. Setelah itu, follow WA Channel untuk info jadwal terbaru.",
  },
  {
    question: "Peralatan apa aja yang perlu dibawa?",
    answer:
      "Bawa raket, sepatu indoor, dan baju ganti. Shuttlecock biasanya sudah disediakan sesuai info event.",
  },
  {
    question: "Saya masih pemula banget, boleh ikut?",
    answer:
      "Boleh banget! Komunitas ini santuy dan ramah buat level newbie sampai intermediate. Cek info level di tiap event biar dapet lawan main yang seru dan sepadan.",
  },
  {
    question: "Gimana cara daftar event?",
    answer:
      "Buka halaman utama entiti.my.id, klik tombol \"Join Mabar\", nanti diarahkan ke halaman event yang tersedia untuk pendaftaran join mabar (Google Form).",
  },
  {
    question: "Bisa daftar dadakan / on the spot?",
    answer:
      "Tidak bisa. Pendaftaran mabar wajib dilakukan terlebih dahulu melalui form.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-10 text-center">
        <span className="font-display text-sm font-semibold uppercase tracking-widest text-tosca">
          FAQ
        </span>
        <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink md:text-4xl">
          Pertanyaan yang Sering Ditanyain
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {FAQS.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 open:ring-tosca/30"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                size={18}
                className="shrink-0 text-tosca transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
