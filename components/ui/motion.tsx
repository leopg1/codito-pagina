"use client";

import { MotionGlobalConfig } from "motion/react";
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* mod de verificare vizuală: NEXT_PUBLIC_QA=1 sare peste animații */
if (process.env.NEXT_PUBLIC_QA === "1") MotionGlobalConfig.skipAnimations = true;

/*
 * Aparițiile la scroll sunt făcute cu CSS (globals.css) și cu un script mic din layout,
 * nu cu JavaScript-ul aplicației. Textul e în HTML de la început și apare imediat,
 * chiar înainte să se încarce restul paginii.
 */
type Tag = "div" | "li" | "p" | "section" | "ul" | "ol" | "dl";
type Props = { children: ReactNode; className?: string; as?: Tag } & Omit<HTMLAttributes<HTMLElement>, "children">;

/** Apare lin când intră în ecran. */
export function Reveal({ children, delay = 0, y, as = "div", style, ...rest }: Props & { delay?: number; y?: number }) {
  const T = as as ElementType;
  const vars = { ...(delay ? { "--rd": `${delay}s` } : {}), ...(y != null ? { "--ry": `${y}px` } : {}), ...style } as CSSProperties;
  return <T data-reveal="" style={vars} {...rest}>{children}</T>;
}

/** Copiii direcți apar unul după altul. */
export function Stagger({ children, as = "div", ...rest }: Props) {
  const T = as as ElementType;
  return <T data-stagger="" {...rest}>{children}</T>;
}

export function StaggerItem({ children, as = "div", ...rest }: Props) {
  const T = as as ElementType;
  return <T {...rest}>{children}</T>;
}

export { EASE };
