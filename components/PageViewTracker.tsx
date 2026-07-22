"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function PageViewTracker() {
  useEffect(() => {
    trackEvent("page_view", "landing");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
