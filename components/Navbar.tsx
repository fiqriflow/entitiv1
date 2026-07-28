import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-court/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
                    src="/logo/logodark.svg"
                    alt="Entiti Badminton Community"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
        </Link>

        <nav className="hidden items-center gap-8 font-body text-sm font-medium text-ink-soft md:flex">
          <Link href="/event" className="transition-colors hover:text-tosca">
            Event
          </Link>
          <a href="#tentang" className="transition-colors hover:text-tosca">
            Tentang Kami
          </a>
        </nav>

        <Link
          href="/event"
          className="focus-ring rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tosca"
        >
          Gabung Mabar
        </Link>
      </div>
    </header>
  );
}
