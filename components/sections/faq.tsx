"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQ } from "@/lib/content";
import { WA_HELLO } from "@/lib/config";
import { SectionHead } from "../ui/section-head";
import { EASE, Reveal } from "../ui/motion";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="intrebari" className="section">
      <div className="wrap">
        <div className="grid items-start gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <SectionHead center={false} title="Întrebări frecvente" />
            <p className="mt-4 max-w-[34ch] text-[1.06rem] leading-relaxed text-ink-2">Nu găsești ce cauți? <a href={WA_HELLO} target="_blank" rel="noopener" className="font-semibold text-coral-t underline underline-offset-4">Scrie‑mi pe WhatsApp</a>, îți răspund personal.</p>
          </div>
        <Reveal className="border-t border-line">
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="overflow-hidden border-b border-line">
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 py-5 text-left text-[1rem] font-semibold sm:text-[1.08rem]">
                  {q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-coral"><Plus className="size-6" aria-hidden /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
                      <p className="max-w-[62ch] pb-6 pr-8 leading-relaxed text-ink-2">
                        {a.includes("politica de confidențialitate") ? (
                          <>{a.replace(/politica de confidențialitate\.$/, "")}<a href="/confidentialitate/" className="font-semibold text-coral-t underline">politica de confidențialitate</a>.</>
                        ) : a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
        </div>
      </div>
    </section>
  );
}
