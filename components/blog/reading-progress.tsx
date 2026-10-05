"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Bara subțire coral → galben de sub antet, ca pe pagina principală: cât ai citit din articol. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-[3px] origin-left bg-gradient-to-r from-coral to-sun" style={{ scaleX: progress }} />;
}
