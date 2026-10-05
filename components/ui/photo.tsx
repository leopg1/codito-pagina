"use client";

import { useEffect, useState } from "react";

/** Afișează /poza.jpg doar dacă există. Altfel rămâne ce e dedesubt (inițiala). */
export function Photo({ className = "", alt = "Leonard Pădurean" }: { className?: string; alt?: string }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setOk(true);
    img.src = "/poza.jpg";
  }, []);
  if (!ok) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/poza.jpg" alt={alt} className={`absolute inset-0 size-full object-cover ${className}`} />;
}
