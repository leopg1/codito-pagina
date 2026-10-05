/** Trimite un eveniment la Plausible, dacă statisticile sunt pornite din config. Altfel nu face nimic. */
export function track(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { plausible?: (n: string, o?: { props?: Record<string, string> }) => void };
  w.plausible?.(name, props ? { props } : undefined);
}
