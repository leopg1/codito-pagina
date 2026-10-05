"use client";

import { Printer } from "lucide-react";

/** Deschide fereastra de tipărire a browserului (formularul se tipărește curat, fără meniu și subsol). */
export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full bg-cta px-6 py-[15px] text-[1rem] font-semibold leading-tight text-white shadow-coral transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-d active:scale-[.98] ${className}`}
    >
      <Printer className="size-5 shrink-0" aria-hidden /> Tipărește formularul
    </button>
  );
}
