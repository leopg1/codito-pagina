"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { KidName } from "../kid-context";
import { Reveal } from "../ui/motion";

function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => format(v));
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

export function Calculator() {
  const [h, setH] = useState(3);
  const year = Math.round(h * 365);
  const days = Math.round(year / 24);
  const pct = ((1.5 * 52) / year) * 100;

  return (
    <Reveal className="relative mt-16 overflow-hidden rounded-2xl border border-line bg-paper p-6 sm:p-10">
      <h3 className="text-[1.35rem] font-semibold sm:text-[1.55rem]">Un calcul rapid</h3>
      <p className="mt-1.5 text-ink-2">Câte ore pe zi crezi că stă <KidName /> pe telefon, tabletă sau calculator?</p>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:gap-6">
        <input
          type="range" min={1} max={7} step={0.5} value={h} onChange={(e) => setH(+e.target.value)}
          aria-label="Ore pe zi"
          className="range my-3 flex-1"
          style={{ ["--p" as string]: `${((h - 1) / 6) * 100}%` }}
        />
        <span className="min-w-[120px] font-display text-[1.7rem] font-bold text-coral-t tabular-nums">
          {String(h).replace(".", ",")} ore/zi
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-cream p-5 sm:p-6">
          <span className="block font-display text-[2.2rem] font-bold leading-none tabular-nums sm:text-[2.5rem]">
            <AnimatedNumber value={year} format={(n) => `${Math.round(n).toLocaleString("ro-RO")} ore`} />
          </span>
          <p className="mt-2.5 text-[0.98rem] text-ink-2">petrece pe ecran într-un singur an. Adică <b>{days} de zile</b> întregi, zi și noapte.</p>
        </div>
        <div className="rounded-xl bg-mint p-5 sm:p-6">
          <span className="block font-display text-[2.2rem] font-bold leading-none text-green tabular-nums sm:text-[2.5rem]">
            <AnimatedNumber value={pct} format={(n) => (n < 1 ? "<1%" : `${Math.round(n)}%`)} />
          </span>
          <p className="mt-2.5 text-[0.98rem] text-ink-2">
            Doar atât din timpul ăsta (o lecție de 90 de minute pe săptămână) e nevoie ca, într-un an, să aibă <b>propriul joc, propriul site și o aplicație cu AI</b>, făcute cu mâna lui.
          </p>
        </div>
      </div>
      <p className="mt-4 text-[0.9rem] text-muted">Nu îi luăm din timpul de joacă. Doar dăm o direcție unei părți mici din el.</p>
    </Reveal>
  );
}
