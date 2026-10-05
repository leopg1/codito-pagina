"use client";

import Script from "next/script";
import { useEffect } from "react";
import { CONFIG } from "@/lib/config";
import { track } from "@/lib/track";

/** Statistici fără cookie‑uri (Plausible). Pornește doar dacă `plausibleDomain` e completat în config. */
export function Analytics() {
  useEffect(() => {
    if (!CONFIG.plausibleDomain) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const where = a.closest("section")?.id || a.closest("nav, footer, header")?.tagName.toLowerCase() || "pagina";
      if (href.includes("wa.me/?")) track("Trimis altui părinte", { where });
      else if (href.includes("wa.me/")) track("WhatsApp", { where });
      else if (href.startsWith("tel:")) track("Telefon", { where });
      else if (CONFIG.calUrl && href.startsWith(CONFIG.calUrl)) track("Calendar", { where });
      else if (href.endsWith("#plan")) track("Spre formular", { where });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!CONFIG.plausibleDomain) return null;
  return <Script defer data-domain={CONFIG.plausibleDomain} src="https://plausible.io/js/script.tagged-events.js" strategy="afterInteractive" />;
}
