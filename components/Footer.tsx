import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-sm text-white/60 sm:flex-row sm:justify-between">
        <Image
          src="/logo/logolight.svg"
          alt="Entiti Badminton Community"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
        <p>© {new Date().getFullYear()} Entiti Badminton Community — Ciamis</p>
      </div>
    </footer>
  );
}
