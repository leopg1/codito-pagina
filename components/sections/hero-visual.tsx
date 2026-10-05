"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { MessageSquareText, Mic, Monitor, PhoneOff, Video } from "lucide-react";
import { EASE } from "../ui/motion";
import { KidGen, KidSample } from "../kid-context";
import { Photo } from "../ui/photo";

const LINES: { t: string; cls?: string }[][] = [
  [{ t: "# Jocul ", cls: "text-[#6e7aa3]" }, { t: "__KID__", cls: "text-[#6e7aa3]" }],
  [{ t: "numar " }, { t: "= " }, { t: "random", cls: "text-[#93b6ff]" }, { t: ".randint(" }, { t: "1", cls: "text-[#93b6ff]" }, { t: ", " }, { t: "100", cls: "text-[#93b6ff]" }, { t: ")" }],
  [{ t: "ghicit = int(input(" }, { t: '"Ghicește: "', cls: "text-[#9be7be]" }, { t: "))" }],
  [{ t: "if", cls: "text-[#ff9e7a]" }, { t: " ghicit < numar:" }],
  [{ t: "    print(" }, { t: '"Mai mare! ⬆️"', cls: "text-[#9be7be]" }, { t: ")" }],
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? LINES.length : 0);

  useEffect(() => {
    if (reduce) { setShown(LINES.length); return; }
    let i = 0;
    const start = setTimeout(function tick() {
      i++;
      setShown(i);
      if (i < LINES.length) setTimeout(tick, 420);
    }, 500);
    return () => clearTimeout(start);
  }, [reduce]);

  return (
    <div
      style={{ "--d": ".15s" } as React.CSSProperties}
      className="rise relative mx-auto w-full max-w-[470px] lg:ml-auto"
      aria-label="Exemplu de lecție online"
    >
      <div className="mb-1.5 ml-1.5 flex items-end gap-1">
        <span className="font-hand text-[1.45rem] font-bold text-coral-t">Așa arată o lecție cu mine</span>
        <svg viewBox="0 0 46 34" className="-mb-3.5 h-[34px] w-[46px] text-coral-d" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <motion.path d="M4 5c14 0 26 6 30 24" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.7 }} />
          <motion.path d="M34 29l-7-6M34 29l3-9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} />
        </svg>
      </div>

      <div className="rounded-[26px] bg-ink p-3 shadow-[0_40px_80px_-28px_rgb(30_36_66/.6)] ring-1 ring-white/5">
        <div className="flex items-center justify-between px-1.5 pb-3.5 pt-1.5 text-[0.8rem] font-medium text-[#c3c8dd]">
          <span className="flex items-center gap-2 font-semibold text-white">
            <i className="size-2 rounded-full bg-[#ff5a4f] shadow-[0_0_0_3px_rgb(255_90_79/.25)]" /> Lecția 6 · Python
          </span>
          <span className="font-mono tabular-nums">52:14</span>
        </div>

        <div className="min-h-[188px] overflow-hidden rounded-2xl bg-night px-[18px] pb-4 pt-[18px] font-mono text-[0.72rem] leading-[1.75] text-[#d8def5] sm:text-[0.82rem]">
          <pre className="whitespace-pre">
            {LINES.slice(0, shown).map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                {line.map((tok, j) => (
                  <span key={j} className={tok.cls}>{tok.t === "__KID__" ? <KidGen /> : tok.t}</span>
                ))}
              </motion.div>
            ))}
            {shown < LINES.length && <span className="inline-block h-[1.05em] w-2 animate-blink bg-coral align-[-3px]" />}
          </pre>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: shown >= LINES.length ? 1 : 0 }} transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-2.5 border-t border-dashed border-[#2a3156] pt-2.5 text-[#9be7be]"
          >
            ▶ Ghicește: 40 → Mai mare! ⬆️
          </motion.div>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <Tile name="Leonard" initial="L" color="bg-coral" speaking photo />
          <Tile name={<KidSample />} initial="🙂" color="bg-[#5b7fe0]" />
        </div>
        <div className="flex justify-center gap-2.5 pb-1 pt-3 text-[#c3c8dd]" aria-hidden>
          {[Mic, Video, Monitor].map((I, k) => (
            <span key={k} className="grid size-9 place-items-center rounded-full bg-[#2a3156]"><I className="size-4" /></span>
          ))}
          <span className="grid size-9 place-items-center rounded-full bg-[#e5484d] text-white"><PhoneOff className="size-4" /></span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4, duration: 0.5, ease: EASE }}
        className="mt-4 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 shadow-soft ring-1 ring-line"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-mint text-green"><MessageSquareText className="size-[18px]" aria-hidden /></span>
        <span className="min-w-0 leading-tight">
          <b className="block text-[0.9rem]">Raport trimis părintelui</b>
          <small className="text-[0.78rem] text-muted">după fiecare lecție</small>
        </span>
        <span className="ml-auto shrink-0 font-mono text-[0.72rem] text-green">20:14 ✓✓</span>
      </motion.div>
    </div>
  );
}

function Tile({ name, initial, color, speaking = false, photo = false }: { name: React.ReactNode; initial: string; color: string; speaking?: boolean; photo?: boolean }) {
  return (
    <div className="relative grid aspect-video place-items-center overflow-hidden rounded-2xl bg-[#2a3156]">
      <span className={`grid size-12 place-items-center rounded-full ${color} font-display text-[1.25rem] font-bold text-white ${speaking ? "animate-pulse-ring" : ""}`}>{initial}</span>
      {photo && <Photo />}
      <span className="absolute bottom-2 left-2 z-[1] rounded-md bg-night/70 px-2 py-1 text-[0.72rem] font-semibold leading-none text-white">{name}</span>
    </div>
  );
}
