"use client";

import { motion, MotionGlobalConfig, type HTMLMotionProps, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* mod de verificare vizuală: NEXT_PUBLIC_QA=1 sare peste animații */
if (process.env.NEXT_PUBLIC_QA === "1") MotionGlobalConfig.skipAnimations = true;

/** Apare lin când intră în ecran. Conținutul e vizibil și fără JS (SSR), doar animat la scroll. */
export function Reveal({
  children, delay = 0, y = 22, className, as = "div", ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" } & Omit<HTMLMotionProps<"div">, "children">) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Stagger({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" | "dl" }) {
  const M = motion[as] as typeof motion.div;
  return (
    <M className={className} variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -60px 0px" }}>
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "p" }) {
  const M = motion[as] as typeof motion.div;
  return <M className={className} variants={item}>{children}</M>;
}

export { EASE };
