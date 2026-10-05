"use client";

import { motion, MotionGlobalConfig, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* mod de verificare vizuală: NEXT_PUBLIC_QA=1 sare peste animații */
if (process.env.NEXT_PUBLIC_QA === "1") MotionGlobalConfig.skipAnimations = true;

const VIEW = { once: true, margin: "0px 0px -80px 0px" } as const;

/** Apariție discretă, o singură dată pe bloc. */
export function Reveal({
  children, delay = 0, y = 12, className, as = "div", ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "section" } & Omit<HTMLMotionProps<"div">, "children">) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Un grup întreg apare odată (fără animație pe fiecare card). */
export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return <Reveal className={className}>{children}</Reveal>;
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export { EASE };
