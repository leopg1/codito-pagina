import type { ReactNode } from "react";
import { ButtonLink } from "./button";
import { Reveal } from "./motion";

export function CtaInline({ children }: { children: ReactNode }) {
  return (
    <Reveal className="mt-14 flex flex-col items-start gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between md:gap-8">
      <p className="font-display text-[1.12rem] font-semibold leading-snug text-ink sm:text-[1.2rem]">{children}</p>
      <ButtonLink href="#plan" arrow className="w-full shrink-0 whitespace-nowrap md:w-auto">Programează lecția gratuită 1:1</ButtonLink>
    </Reveal>
  );
}
