"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respectă setarea „Reduce mișcarea” din telefon pentru toate animațiile făcute cu motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
