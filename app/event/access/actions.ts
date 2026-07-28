"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { EVENT_ACCESS_COOKIE } from "@/lib/eventAccess";

export async function verifyEventPasscode(formData: FormData) {
  const input = ((formData.get("passcode") as string) ?? "").trim();
  const redirectTo = (formData.get("redirectTo") as string) || "/event";
  const correctPasscode = process.env.EVENT_PASSCODE;

  if (!correctPasscode || input !== correctPasscode) {
    redirect(
      `/event/access?error=1&redirectTo=${encodeURIComponent(redirectTo)}`
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(EVENT_ACCESS_COOKIE, "granted", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 hari
    path: "/",
  });

  redirect(redirectTo);
}
