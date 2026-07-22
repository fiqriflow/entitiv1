import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EventManager from "@/components/admin/EventManager";
import LogoutButton from "@/components/admin/LogoutButton";
import type { EventItem } from "@/types/event";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  return (
    <main className="min-h-screen bg-court">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo/logodark.svg"
              alt="Entiti Badminton Community"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="font-display font-semibold text-ink">
              Admin Entiti
            </span>
          </div>
          <LogoutButton />
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <EventManager initialEvents={(events ?? []) as EventItem[]} />
      </div>
    </main>
  );
}
