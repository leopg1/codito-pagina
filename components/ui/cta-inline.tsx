import type { ReactNode } from "react";
import { ButtonLink } from "./button";
import { Reveal } from "./motion";

export function CtaInline({ children }: { children: ReactNode }) {
  return (
    <Reveal className="mt-12 flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-6">
      <p className="font-display text-[1.12rem] font-semibold leading-snug text-ink sm:text-[1.2rem]">{children}</p>
      <ButtonLink href="#plan" arrow className="w-full shrink-0 whitespace-nowrap md:w-auto">Programează lecția gratuită 1:1</ButtonLink>
    </Reveal>
  );
}
