"use client";

import clsx from "clsx";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark, Wordmark } from "./logo";
import { E } from "../ui/emoji";

const LINKS = [
  ["#despre", "Despre mine"],
  ["#traseu", "Ce construiește"],
  ["#pret", "Preț"],
  ["#intrebari", "Întrebări"],
] as const;

export function TopBar() {
  return (
    <div className="bg-ink px-4 py-2.5 text-center text-[0.88rem] text-white">
      <E e="🎁" className="mr-1.5" />
      Prima lecție 1:1 e <b className="text-sun">gratuită</b>
      <span className="hidden sm:inline"> · 45 de minute, online, fără obligații</span>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-50 border-b transition-[background,border-color,box-shadow] duration-300",
        scrolled ? "border-line bg-cream/85 shadow-[0_8px_30px_-20px_rgb(30_36_66/.35)] backdrop-blur-xl" : "border-transparent bg-cream/60 backdrop-blur-md"
      )}
    >
      <div className="wrap flex h-[68px] items-center gap-4">
        <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Codito, programare și AI pentru copii și adolescenți">
          <LogoMark />
          <span className="flex min-w-0 flex-col gap-[5px] leading-none">
            <Wordmark className="block" />
            <small className="block text-[0.7rem] leading-tight text-muted min-[380px]:text-[0.74rem] sm:text-[0.78rem]">Programare & AI pentru copii și adolescenți</small>
          </span>
        </a>
        <div className="ml-auto hidden items-center gap-7 text-[0.95rem] font-medium text-ink-2 lg:flex">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="relative transition-colors hover:text-coral-t after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded after:bg-coral after:transition-all hover:after:w-full">
              {label}
            </a>
          ))}
        </div>
        <a
          href="#plan"
          className="ml-auto hidden shrink-0 rounded-full bg-coral px-5 py-3 text-[0.94rem] font-semibold text-white shadow-coral transition hover:-translate-y-0.5 hover:bg-coral-d sm:inline-flex lg:ml-6"
        >
          Lecția gratuită
        </a>
      </div>
      <motion.div className="absolute inset-x-0 bottom-[-1px] h-[3px] origin-left bg-gradient-to-r from-coral to-sun" style={{ scaleX: progress }} />
    </nav>
  );
}
