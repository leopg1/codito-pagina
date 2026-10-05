import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { LogoMark, Wordmark } from "@/components/site/logo";
import { Footer } from "@/components/site/footer";
import { Countdown, Seats, SignupForm } from "@/components/signup/signup-form";
import { E } from "@/components/ui/emoji";
import { Photo } from "@/components/ui/photo";

const W = CONFIG.workshop;
const title = "Înscriere la lecția gratuită de programare";
const description = `Lecție gratuită de programare pentru copii de 9–14 ani, ${W.date}, online, ${W.minutes} de minute. Copilul își face primul joc pe calculator. Doar ${W.total} locuri.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/inscriere/" },
  openGraph: { title: `Lecție gratuită de programare · ${W.date}`, description, images: ["/og.png"] },
};

const FACTS: [string, string, string][] = [
  ["📅", "Când", W.date],
  ["💻", "Unde", `online, de acasă · ${W.minutes} de minute`],
  ["🧒", "Pentru cine", `copii de ${W.ages}, fără experiență`],
  ["🎮", "Ce face copilul", "își face primul joc pe calculator"],
  ["🔌", "Ce îi trebuie", "un laptop sau calculator cu internet"],
];

const STEPS: [string, string][] = [
  ["Te contactez în aceeași zi", "ca să confirm locul și să-ți spun ce urmează."],
  ["Cu o zi înainte primești linkul", "de conectare și un pas mic de pregătire, de 2 minute."],
  ["Sâmbătă, copilul se conectează", "și își face jocul. În ultimele minute vi-l arată."],
];

const FAQ: [string, string][] = [
  ["Chiar e gratuit?", "Da. Nu plătești nimic și nu ți se cere cardul. Dacă după lecție vreți să continuați, vorbim. Dacă nu, nu insist."],
  ["Copilul n‑a mai programat niciodată. E o problemă?", "Deloc. Lecția e făcută exact pentru începători. Explic pas cu pas, iar copilul scrie singur codul."],
  ["De ce doar 5 copii?", "Ca să am timp pentru fiecare. Cu mai mulți copii, unii ar rămâne în urmă."],
  ["Trebuie să stau lângă copil?", "Nu e nevoie. Dacă vrei, poți sta lângă el, iar în ultimele minute vă invit pe toți să vedeți jocul."],
];

export default function Page() {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-xl">
        <div className="wrap flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Codito, pagina principală"><LogoMark className="size-9 text-[1.3rem]" /><Wordmark className="text-[1.3rem]" /></Link>
          <Link href="/" className="-mr-2 inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-3 text-[0.92rem] font-semibold text-ink-2 hover:text-coral-t"><ArrowLeft className="size-4" /> Despre lecții</Link>
        </div>
      </nav>

      <main>
        <section className="wrap grid items-start gap-8 pb-16 pt-8 sm:pt-14 lg:grid-cols-[1.05fr_.95fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8 lg:pb-24">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-peach px-3.5 py-1.5 text-[0.85rem] font-bold text-coral-t"><E e="🎁" /> Lecție gratuită · grupă de {W.total} copii</span>
            <h1 className="mt-5 text-[clamp(2.1rem,6vw,3.5rem)] font-semibold leading-[1.06]">
              Sâmbătă, copilul tău își face <em className="not-italic text-coral">primul joc</em> pe calculator.
            </h1>
            <p className="mt-5 max-w-[34rem] text-[1.12rem] leading-relaxed text-ink-2">
              O lecție online de programare, gratuită, pentru copii de {W.ages}. De la zero, cu mâna lui, în {W.minutes} de minute.
            </p>
            <p className="mt-5 flex w-fit items-center gap-2.5 rounded-xl bg-ink px-4 py-3 font-semibold text-white lg:hidden">
              <E e="📅" className="shrink-0" /><span className="min-w-0 first-letter:uppercase">{W.date}</span>
            </p>
          </div>

          {/* formularul: pe telefon vine imediat după titlu */}
          <div id="formular" className="scroll-mt-20 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="rounded-2xl bg-paper p-5 shadow-lift ring-1 ring-line sm:p-8">
              <Seats />
              <div className="mt-6"><SignupForm /></div>
            </div>
          </div>

          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <dl className="grid rounded-2xl bg-paper ring-1 ring-line">
              {FACTS.map(([e, k, v], i) => (
                <div key={k} className={`grid grid-cols-[auto_1fr] items-center gap-x-3.5 px-5 py-3.5 ${i ? "border-t border-line" : ""}`}>
                  <E e={e} className="row-span-2 text-[1.35rem]" />
                  <dt className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-muted">{k}</dt>
                  <dd className="font-semibold leading-snug text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6"><Countdown /></div>
          </div>
        </section>

        <section className="border-t border-line bg-sand py-14 sm:py-20">
          <div className="wrap">
            <h2 className="text-[clamp(1.6rem,3.6vw,2.2rem)] font-semibold">Ce se întâmplă după ce te înscrii</h2>
            <ol className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-3">
              {STEPS.map(([b, t], k) => (
                <li key={b} className="border-t-2 border-ink/80 pt-4">
                  <span className="font-display text-[1.6rem] font-bold text-coral">{k + 1}</span>
                  <p className="mt-1 leading-relaxed text-ink-2"><b className="text-ink">{b}</b> {t}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="wrap grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div className="flex items-start gap-5">
              <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-coral font-display text-[1.8rem] font-bold text-white ring-4 ring-peach">
                L<Photo className="scale-[1.5] object-[50%_42%]" />
              </span>
              <div>
                <h2 className="text-[1.35rem] font-semibold">Cine ține lecția</h2>
                <p className="mt-2 leading-relaxed text-ink-2">Sunt Leonard Pădurean, programator software de 5 ani și cercetător. Predau programare copiilor de peste un an și am pregătire în pedagogie.</p>
                <Link href="/#despre" className="mt-1 inline-block py-2 font-semibold text-coral-t underline underline-offset-4">Mai multe despre mine</Link>
              </div>
            </div>
            <div className="border-t border-line">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.04rem] font-semibold [&::-webkit-details-marker]:hidden">
                    {q}<span className="text-[1.4rem] leading-none text-coral transition-transform group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="max-w-[62ch] pb-6 leading-relaxed text-ink-2">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink py-14 text-center text-white sm:py-16">
          <div className="wrap">
            <h2 className="mx-auto max-w-[620px] text-[clamp(1.6rem,3.6vw,2.2rem)] font-semibold text-white">Grupa are doar 5 locuri. Înscrierea durează 30 de secunde.</h2>
            <a href="#formular" className="mt-7 inline-flex items-center gap-2 rounded-full bg-coral px-7 py-4 font-semibold text-white shadow-coral transition hover:bg-coral-d">Rezervă locul gratuit</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
