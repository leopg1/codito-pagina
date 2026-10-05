import { CONFIG } from "@/lib/config";

/** Poza ta, dacă e setată în config (`photo`). Altfel rămâne ce e dedesubt. */
export function Photo({ className = "", alt = "Leonard Pădurean" }: { className?: string; alt?: string }) {
  if (!CONFIG.photo) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={CONFIG.photo} alt={alt} className={`absolute inset-0 size-full object-cover ${className}`} />;
}
