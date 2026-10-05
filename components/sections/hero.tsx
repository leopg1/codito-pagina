"use client";

import { motion } from "motion/react";
import { EASE } from "../ui/motion";
import { ButtonLink } from "../ui/button";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden pb-14 pt-8 sm:pt-14 lg:pb-20">
      {/* fundal: puncte + pete calde */}
      <div aria-hidden className="dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_30%,black_20%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-[radial-gradient(circle,rgb(240_100_58/.18),transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-52 top-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(255_224_138/.35),transparent_65%)]" />

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
            className="block font-hand text-[1.45rem] font-bold leading-tight text-coral-t sm:text-[1.6rem]"
          >
            Pentru copii și adolescenți de <span className="whitespace-nowrap">9–17 ani</span>
          </motion.span>

          <h1 className="mt-3 text-[clamp(2.3rem,5.6vw,4rem)] font-semibold">
            <motion.span
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
              className="relative mb-2 block w-fit text-[0.6em] font-medium text-muted"
            >
              „Iar stă pe telefon…”
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
                className="absolute inset-x-[-4px] top-[54%] h-[3px] origin-left -rotate-2 rounded bg-coral"
              />
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="block"
            >
              „Mama, <em className="not-italic text-coral">uite ce am construit!</em>”
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mt-6 max-w-[34em] text-[1.12rem] leading-relaxed text-ink-2 sm:text-[1.2rem]"
          >
            Lecții online, <strong className="text-ink">unu la unu</strong>, în care copilul tău învață programare și inteligență artificială construind lucruri adevărate: <span className="hl">jocuri, <span className="whitespace-nowrap">site-uri</span>, aplicații</span>. Explicat simplu, pe înțelesul lui și al tău.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <ButtonLink href="#plan" arrow>Vreau lecția gratuită 1:1</ButtonLink>
            <ButtonLink href="#traseu" variant="ghost">Ce va construi copilul? ↓</ButtonLink>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-[0.95rem] text-muted">
            Nu e nevoie de experiență. Copilul pornește de la zero și învață în ritmul lui.
          </motion.p>
        </div>

        <HeroVisual />
      </div>
    </header>
  );
}
