"use client";

import clsx from "clsx";
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
        <SectionHead kicker="Întrebări frecvente" title="Ce mă întreabă de obicei părinții" />
        <Reveal className="mx-auto mt-12 grid max-w-[800px] gap-3">
          {FAQ.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className={clsx("overflow-hidden rounded-[18px] border bg-paper transition-colors", isOpen ? "border-coral/40 shadow-soft" : "border-line")}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-[1rem] font-semibold sm:px-6 sm:text-[1.06rem]">
                  {q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-coral"><Plus className="size-6" aria-hidden /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
                      <p className="px-5 pb-5 text-ink-2 sm:px-6">
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
        <p className="mt-8 text-center text-ink-2">Ai altă întrebare? <a href={WA_HELLO} target="_blank" rel="noopener" className="font-semibold text-coral-t underline underline-offset-4">Scrie-mi pe WhatsApp</a>, îți răspund personal.</p>
      </div>
    </section>
  );
}
