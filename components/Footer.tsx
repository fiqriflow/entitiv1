import Image from "next/image";
import { Instagram, Youtube } from "lucide-react";
import TikTokIcon from "./icons/TikTokIcon";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/entitibadminton",
    icon: Instagram,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@entitibadminton",
    icon: TikTokIcon,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@FiqriNurhadiansyah",
    icon: Youtube,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-sm text-white/60 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <Image
          src="/logo/logolight.svg"
          alt="Entiti Badminton Community"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-tosca hover:text-tosca"
            >
              <social.icon size={16} />
            </a>
          ))}
        </div>

        <p>© {new Date().getFullYear()} Entiti Badminton Community — Ciamis</p>
      </div>
    </footer>
  );
}
