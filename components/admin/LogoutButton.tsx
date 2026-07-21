"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="focus-ring flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-black/25 hover:text-ink"
    >
      <LogOut size={15} />
      Keluar
    </button>
  );
}
