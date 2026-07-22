"use client";

import { trackEvent } from "@/lib/analytics";

export default function TrackedLink({
  href,
  eventLabel,
  className,
  children,
  target,
  rel,
}: {
  href: string;
  eventLabel: string;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={() => trackEvent("cta_click", eventLabel)}
    >
      {children}
    </a>
  );
}
