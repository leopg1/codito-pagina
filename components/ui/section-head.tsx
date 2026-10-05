import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "./motion";

/** Titlu de secțiune. Eticheta (kicker) e opțională și se folosește rar, doar la secțiunile cheie. */
export function SectionHead({
  kicker, title, lead, center = true, dark = false, className,
}: { kicker?: string; title: ReactNode; lead?: ReactNode; center?: boolean; dark?: boolean; className?: string }) {
  return (
    <Reveal className={clsx(center ? "mx-auto max-w-[760px] text-center" : "max-w-[680px]", className)}>
      {kicker && <span className={clsx("kicker mb-4", dark && "!text-[#ffb08f]", center && "justify-center")}>{kicker}</span>}
      <h2 className={clsx("text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold", dark ? "text-white" : "text-ink")}>{title}</h2>
      {lead && <p className={clsx("mt-5 text-[1.12rem] leading-relaxed sm:text-[1.2rem]", center && "[text-wrap:balance]", dark ? "text-[#c3c8dd]" : "text-ink-2")}>{lead}</p>}
    </Reveal>
  );
}
