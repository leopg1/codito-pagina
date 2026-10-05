import { PRICES } from "@/lib/config";
import { Reveal } from "../ui/motion";

const FACTS: [string, string][] = [
  ["Lecții 1:1", "online, de acasă"],
  ["9–17 ani", "copii și adolescenți"],
  ["90 de minute", "o dată pe săptămână"],
  [`de la ${PRICES.session}`, "pe lecție, fără contract"],
];

export function QuickFacts() {
  return (
    <div aria-label="Pe scurt" className="wrap">
      <Reveal className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-paper lg:grid-cols-5">
        {FACTS.map(([b, s], k) => (
          <div
            key={b}
            className={`px-4 py-4 sm:px-6 sm:py-5 ${k % 2 ? "border-l" : ""} ${k > 1 ? "border-t lg:border-t-0" : ""} border-line lg:border-l lg:first:border-l-0`}
          >
            <b className="block font-display text-[1rem] leading-tight sm:text-[1.12rem]">{b}</b>
            <span className="mt-1 block text-[0.8rem] leading-snug text-muted sm:text-[0.86rem]">{s}</span>
          </div>
        ))}
        <a href="#plan" className="group col-span-2 bg-coral px-4 py-4 text-white transition-colors hover:bg-coral-d sm:px-6 sm:py-5 lg:col-span-1">
          <b className="block font-display text-[1rem] leading-tight sm:text-[1.12rem]">Prima lecție e gratuită</b>
          <span className="mt-1 block text-[0.8rem] leading-snug text-white/90 sm:text-[0.86rem]">45 de minute · rezervă <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span></span>
        </a>
      </Reveal>
    </div>
  );
}
