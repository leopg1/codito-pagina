import clsx from "clsx";
import { Photo } from "../ui/photo";

/** Poza rotundă a lui Leonard (cu inițiala dedesubt, dacă poza lipsește). */
export function Avatar({ className = "size-11 text-[1rem]", ring = false }: { className?: string; ring?: boolean }) {
  return (
    <span className={clsx("relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-coral font-display font-bold text-white", ring && "ring-[3px] ring-peach", className)}>
      L<Photo className="scale-[1.5] object-[50%_42%]" />
    </span>
  );
}

/** Ton și emoji pentru fiecare categorie. Categoriile noi primesc automat tonul neutru. */
const CATS: Record<string, { e: string; tone: string; ring: string }> = {
  "Primii pași": { e: "🌱", tone: "bg-mint/70", ring: "ring-[#c6e9d6]" },
  "Pentru părinți": { e: "☕", tone: "bg-peach/70", ring: "ring-[#f6cfb9]" },
  "Inteligență artificială": { e: "🤖", tone: "bg-[#fff3cc]", ring: "ring-[#f3dd97]" },
};
export const cat = (c: string) => CATS[c] ?? { e: "📘", tone: "bg-sand", ring: "ring-line" };

/** Întrebarea scurtă, așa cum o pun părinții, la care răspunde fiecare articol. */
const QUESTIONS: Record<string, string> = {
  "la-ce-varsta-poate-incepe-copilul-programarea": "„Nu e prea mic pentru programare?”",
  "scratch-sau-python-cu-ce-sa-inceapa-copilul": "„Scratch sau Python?”",
  "timpul-pe-ecran-din-consum-in-creatie": "„Stă prea mult pe telefon.”",
  "copilul-foloseste-chatgpt-la-teme": "„Își face temele cu ChatGPT.”",
  "cum-alegi-un-curs-de-programare-pentru-copil": "„Cum aleg un curs bun?”",
};
export const question = (slug: string, title: string) => QUESTIONS[slug] ?? title;

/** Cratimele dintre litere nu se rup la capăt de rând. */
export const nb = (s: string) => s.replace(/(\p{L})-(\p{L})/gu, "$1‑$2");
