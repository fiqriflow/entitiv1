import { cookies } from "next/headers";

export const EVENT_ACCESS_COOKIE = "entiti_event_access";

/**
 * Cek apakah pengunjung ini udah pernah masukin passcode yang benar
 * (disimpan di cookie httpOnly, jadi nggak bisa diutak-atik lewat browser).
 */
export async function hasEventAccess() {
  const cookieStore = await cookies();
  return cookieStore.get(EVENT_ACCESS_COOKIE)?.value === "granted";
}
