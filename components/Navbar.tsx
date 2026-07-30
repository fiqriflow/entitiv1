"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-court/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center" onClick={() => setMenuOpen(false)}>
          <Image
                    src="/logo/logodark.svg"
                    alt="Entiti Badminton Community"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
        </Link>

        <nav className="hidden items-center gap-8 font-body text-sm font-medium text-ink-soft md:flex">
          <a href="/#tentang" className="transition-colors hover:text-tosca">
            Tentang Kami
          </a>
          <a href="/#event" className="transition-colors hover:text-tosca">
            Event
          </a>
          <a href="/#workflow" className="transition-colors hover:text-tosca">
            Cara Join
          </a>
          <a href="/#faq" className="transition-colors hover:text-tosca">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/event"
            className="focus-ring rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-tosca"
          >
            Join Event
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-black/5 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-court px-6 py-4 font-body text-sm font-medium text-ink-soft md:hidden">
          <Link
            href="/#tentang"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-black/5 hover:text-tosca"
          >
            Tentang Kami
          </Link>
          <a
            href="/#event"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-black/5 hover:text-tosca"
          >
            Event
          </a>
          <a
            href="/#workflow"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-black/5 hover:text-tosca"
          >
            Cara Join
          </a>
          <a
            href="/#faq"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-3 py-2.5 transition-colors hover:bg-black/5 hover:text-tosca"
          >
            FAQ
          </a>
        </nav>
      )}
    </header>
  );
}
