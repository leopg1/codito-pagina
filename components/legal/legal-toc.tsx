"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; n: string; label: string };

/** Cuprinsul documentului; marchează secțiunea în care se află cititorul. */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const onScroll = () => {
      const y = 120;
      let cur: string | null = null;
      for (const el of els) if (el.getBoundingClientRect().top <= y) cur = el.id;
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <ol className="grid">
      {items.map((it) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            aria-current={active === it.id ? "location" : undefined}
            className="group relative grid grid-cols-[2.1rem_1fr] items-baseline gap-1 rounded-lg py-[9px] pl-3 pr-2 text-[0.93rem] leading-snug text-ink-2 transition-colors hover:bg-sand/70 hover:text-ink aria-[current=location]:bg-paper aria-[current=location]:text-ink aria-[current=location]:shadow-[inset_0_0_0_1px_var(--color-line)]"
          >
            <span aria-hidden className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-coral opacity-0 transition-opacity group-aria-[current=location]:opacity-100" />
            <span className="font-mono text-[0.78rem] text-coral-t tabular-nums">{it.n}</span>
            <span>{it.label}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
