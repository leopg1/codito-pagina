"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { WA_HELLO } from "@/lib/config";
import { WaIcon } from "../ui/button";
import { E } from "../ui/emoji";

/** Bara fixă de pe telefon + butonul WhatsApp de pe desktop */
export function Floating() {
  const [show, setShow] = useState(false);
  const [tip, setTip] = useState(false);

  useEffect(() => {
    const hidden = new Set<Element>();
    const targets = ["#plan", "#final"].map((s) => document.querySelector(s)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (es) => { es.forEach((e) => (e.isIntersecting ? hidden.add(e.target) : hidden.delete(e.target))); update(); },
      { threshold: 0.05 }
    );
    targets.forEach((t) => io.observe(t));
    const update = () => setShow(window.scrollY > (window.innerWidth < 640 ? 420 : 700) && hidden.size === 0);
    window.addEventListener("scroll", update, { passive: true });
    update();
    const t1 = setTimeout(() => setTip(true), 9000);
    const t2 = setTimeout(() => setTip(false), 15000);
    return () => { io.disconnect(); window.removeEventListener("scroll", update); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      {/* telefon */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 120 }} animate={{ y: 0 }} exit={{ y: 120 }} transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-x-2.5 z-[61] flex gap-2 sm:hidden"
            style={{ bottom: "calc(10px + env(safe-area-inset-bottom, 0px))" }}
          >
            <a href="#plan" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-coral py-4 font-semibold text-white shadow-coral">
              <E e="🎁" /> Lecția gratuită 1:1
            </a>
            <a href={WA_HELLO} target="_blank" rel="noopener" aria-label="Scrie-mi pe WhatsApp" className="grid w-[58px] place-items-center rounded-full bg-wa text-white shadow-[0_12px_28px_-10px_rgb(37_211_102/.7)]">
              <WaIcon className="size-7" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* desktop */}
      <div className="fixed bottom-6 right-6 z-[60] hidden items-center gap-3 sm:flex">
        <AnimatePresence>
          {tip && (
            <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="rounded-2xl bg-paper px-4 py-2.5 text-[0.9rem] shadow-soft">
              Ai o întrebare? Scrie-mi 👋
            </motion.span>
          )}
        </AnimatePresence>
        <a href={WA_HELLO} target="_blank" rel="noopener" aria-label="Scrie-mi pe WhatsApp"
          className="grid size-[62px] place-items-center rounded-full bg-wa text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/.7)] transition hover:scale-105">
          <WaIcon className="size-8" />
        </a>
      </div>
    </>
  );
}
