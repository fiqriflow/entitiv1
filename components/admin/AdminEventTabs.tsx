"use client";

import { useState } from "react";
import { Home, LayoutGrid } from "lucide-react";
import type { EventItem } from "@/types/event";
import HomeSectionManager from "./HomeSectionManager";
import EventManager from "./EventManager";

export default function AdminEventTabs({
  initialEvents,
}: {
  initialEvents: EventItem[];
}) {
  const [tab, setTab] = useState<"home" | "page">("page");

  return (
    <div>
      <div className="mb-6 flex gap-2 rounded-full bg-white p-1 shadow-sm ring-1 ring-black/5 sm:inline-flex">
        <TabButton
          active={tab === "page"}
          onClick={() => setTab("page")}
          icon={<LayoutGrid size={15} />}
          label="Halaman Event"
        />
        <TabButton
          active={tab === "home"}
          onClick={() => setTab("home")}
          icon={<Home size={15} />}
          label="Section Event (Home)"
        />
      </div>

      {tab === "page" ? (
        <EventManager initialEvents={initialEvents} />
      ) : (
        <HomeSectionManager initialEvents={initialEvents} />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:flex-none ${
        active ? "bg-tosca text-ink" : "text-ink-soft hover:bg-court"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
