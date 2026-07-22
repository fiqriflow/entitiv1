import { createClient } from "./supabase/client";

export type AnalyticsEventType = "page_view" | "cta_click";

/**
 * Catat event analytics (page view / klik CTA) ke Supabase.
 * Sengaja "fire-and-forget" (nggak di-await) supaya nggak nge-block
 * navigasi user pas klik tombol.
 */
export function trackEvent(eventType: AnalyticsEventType, eventLabel: string) {
  try {
    const supabase = createClient();
    void supabase
      .from("analytics_events")
      .insert({ event_type: eventType, event_label: eventLabel });
  } catch {
    // Analytics gagal jangan sampai ganggu pengalaman user
  }
}
