import TrackedLink from "./TrackedLink";

export default function CTASection() {
  return (
    <section className="bg-diagonal-tosca">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center">
        <h2 className="font-display max-w-lg text-3xl font-semibold leading-tight text-ink md:text-4xl">
          Siap gaskeun mabar bareng Entiti?
        </h2>
        <TrackedLink
          href="https://whatsapp.com/channel/0029VbCDMFI5q08iB1iXAd1T"
          eventLabel="wa_channel_cta"
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring shrink-0 rounded-full bg-ink px-8 py-4 text-center font-semibold text-white transition-transform hover:scale-[1.03]"
        >
          Follow WA Channel Sekarang
        </TrackedLink>
      </div>
    </section>
  );
}
