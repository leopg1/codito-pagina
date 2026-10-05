import clsx from "clsx";
import { Stagger, StaggerItem } from "../ui/motion";
import { E } from "../ui/emoji";

/* [de la, până la, emoji, titlu, text, faza principală] · pe desktop, coloanele sunt proporționale cu durata */
const STEPS: [number, number, string, string, string, boolean][] = [
  [0, 10, "👋", "Ne cunoaștem", "Ne salutăm, fiecare copil spune ce jocuri îi plac și verificăm că merge totul.", false],
  [10, 25, "✏️", "Prima idee", "Explic pe înțelesul lor, cu desene și exemple, cum urmează calculatorul pașii unui program.", false],
  [25, 50, "🛠️", "Își scrie jocul", "Fiecare copil scrie codul cu mâna lui. Eu ghidez pas cu pas și ajut pe oricine se blochează.", true],
  [50, 60, "🎉", "Vi‑l arată", "Vă chemăm lângă calculator: copilul vă arată jocul și îl jucați împreună.", false],
];

export function LessonTimeline() {
  return (
    <Stagger as="ol" className="relative grid gap-0 lg:grid-cols-[10fr_15fr_25fr_10fr] lg:gap-x-6">
      {STEPS.map(([a, b, e, t, p, main]) => (
        <StaggerItem
          as="li"
          key={t}
          className="relative grid grid-cols-[4.6rem_1fr] gap-x-4 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-[5.5rem_1fr] lg:block lg:border-t-0 lg:py-0"
        >
          {/* bara de timp: pe desktop, lățimea arată cât durează */}
          <span aria-hidden className={clsx("hidden h-2 rounded-full lg:block", main ? "bg-coral" : "bg-ink/80")} />
          <span className="pt-0.5 font-mono text-[0.82rem] font-semibold leading-snug text-coral-t lg:mt-4 lg:block lg:pt-0">
            min {a}–{b}
            {main && <small className="mt-0.5 block font-sans text-[0.75rem] font-medium text-muted lg:hidden">cea mai lungă parte</small>}
          </span>
          <div className="min-w-0 lg:mt-1.5">
            <b className="flex items-center gap-2 text-[1.08rem] leading-snug">
              <E e={e} className="text-[1.25rem]" />
              {t}
            </b>
            <p className={clsx("mt-1 text-[0.97rem] leading-relaxed text-ink-2", main && "lg:max-w-[30ch]")}>{p}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
