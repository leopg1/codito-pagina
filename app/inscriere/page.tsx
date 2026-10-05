import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { LogoMark, Wordmark } from "@/components/site/logo";
import { Footer } from "@/components/site/footer";
import { Countdown, SignupForm } from "@/components/signup/signup-form";
import { Photo } from "@/components/ui/photo";

const W = CONFIG.workshop;
const title = "Înscriere la lecția gratuită de programare";
const description = `Lecție gratuită de programare pentru copii, ${W.date}, online, ${W.minutes} de minute. Copilul își face primul joc pe calculator. Doar ${W.total} locuri.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/inscriere/" },
  openGraph: { type: "website", url: "/inscriere/", siteName: "Codito", locale: "ro_RO", title: `Lecție gratuită de programare · ${W.date}`, description, images: ["/og.png"] },
};

const FACTS: [string, string][] = [
  ["Unde", `Online, de acasă, pe Google Meet`],
  ["Durată", `${W.minutes} de minute`],
  ["Pentru cine", W.ages ? `Copii de ${W.ages}, fără experiență` : "Copii și adolescenți, fără experiență"],
  ["Grupă", `Maximum ${W.total} copii`],
  ["Ce îi trebuie", "Un laptop sau calculator cu internet"],
];

const STEPS: [string, string][] = [
  ["Te contactez în aceeași zi", "ca să confirm locul și să‑ți spun ce urmează."],
  ["Cu o zi înainte primești linkul", "de conectare și un pas mic de pregătire, de 2 minute."],
  ["Sâmbătă, copilul se conectează", "și își face jocul. În ultimele minute vi‑l arată."],
];

const FAQ: [string, string][] = [
  ["Chiar e gratuit?", "Da. Nu plătești nimic și nu ți se cere cardul. Dacă după lecție vreți să continuați, vorbim. Dacă nu, nu insist."],
  ["Copilul n‑a mai programat niciodată. E o problemă?", "Deloc. Lecția e făcută exact pentru începători. Explic pas cu pas, iar copilul scrie singur codul."],
  ["De ce doar 5 copii?", "Ca să am timp pentru fiecare. Cu mai mulți copii, unii ar rămâne în urmă."],
  ["Trebuie să stau lângă copil?", "Nu e nevoie. Dacă vrei, poți sta lângă el, iar în ultimele minute vă invit pe toți să vedeți jocul."],
];

const eventLd = {
  "@context": "https://schema.org",
  "@type": "EducationEvent",
  name: "Lecție gratuită de programare pentru copii",
  description,
  startDate: W.start,
  endDate: new Date(new Date(W.start).getTime() + W.minutes * 60000).toISOString(),
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: { "@type": "VirtualLocation", url: `${CONFIG.siteUrl}/inscriere/` },
  isAccessibleForFree: true,
  inLanguage: "ro",
  maximumAttendeeCapacity: W.total,
  remainingAttendeeCapacity: Math.max(0, W.total - W.taken),
  image: `${CONFIG.siteUrl}/og.png`,
  organizer: { "@id": `${CONFIG.siteUrl}/#org` },
  performer: { "@type": "Person", name: "Leonard Pădurean" },
  offers: { "@type": "Offer", price: "0", priceCurrency: "RON", availability: W.taken < W.total ? "https://schema.org/InStock" : "https://schema.org/SoldOut", url: `${CONFIG.siteUrl}/inscriere/`, validFrom: "2026-10-01" },
};

export default function Page() {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-xl">
        <div className="wrap flex h-16 items-center justify-between gap-3 [@media(max-height:480px)]:h-14">
          <Link href="/" className="flex min-h-11 items-center gap-2.5" aria-label="Codito, pagina principală"><LogoMark className="size-9 text-[1.3rem]" /><Wordmark className="text-[1.3rem]" /></Link>
          <Link href="/" className="-mr-2 inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-3 text-[0.92rem] font-semibold text-ink-2 hover:text-coral-t"><ArrowLeft className="size-4" /> Despre lecții</Link>
        </div>
      </nav>

      <main>
        <section className="wrap grid items-start gap-6 pb-16 pt-6 sm:gap-8 sm:pt-14 lg:grid-cols-[1.05fr_.95fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8 lg:pb-24">
          <div className="min-w-0 md:mx-auto md:w-full md:max-w-[560px] lg:mx-0 lg:max-w-none lg:col-start-1 lg:row-start-1">
            <p className="text-[0.95rem] font-semibold text-coral-t">Lecție gratuită de programare</p>
            <h1 className="mt-3 text-[clamp(2.1rem,6vw,3.5rem)] font-semibold leading-[1.06]">
              Sâmbătă, copilul tău își face <em className="not-italic text-coral">primul joc</em> pe calculator.
            </h1>
            <p className="mt-5 max-w-[34rem] text-[1.12rem] leading-relaxed text-ink-2">
              De la zero, scris de el, în {W.minutes} de minute. La final vi‑l arată și îl puteți juca împreună.
            </p>
            <p className="mt-4 border-l-[3px] border-coral pl-4 sm:mt-6 text-[1.05rem] leading-snug">
              <b className="block text-ink first-letter:uppercase">{W.date}</b>
              <span className="text-ink-2">Online · gratuit</span>
            </p>
          </div>

          {/* formularul: pe telefon vine imediat după titlu */}
          <div id="formular" className="w-full md:mx-auto md:max-w-[560px] lg:mx-0 lg:max-w-none lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="rounded-2xl bg-paper p-5 shadow-lift ring-1 ring-line sm:p-8">
              <SignupForm />
            </div>
          </div>

          <div className="min-w-0 md:mx-auto md:w-full md:max-w-[560px] lg:mx-0 lg:max-w-none lg:col-start-1 lg:row-start-2">
            <h2 className="text-[1.15rem] font-semibold">Pe scurt</h2>
            <dl className="mt-3 border-t border-line">
              {FACTS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-x-4 border-b border-line py-3 max-[380px]:grid-cols-1">
                  <dt className="text-[0.95rem] text-muted">{k}</dt>
                  <dd className="font-semibold leading-snug text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8"><Countdown /></div>
          </div>
        </section>

        <section className="border-t border-line bg-sand py-14 sm:py-20">
          <div className="wrap">
            <h2 className="text-[clamp(1.6rem,3.6vw,2.2rem)] font-semibold">Ce se întâmplă după ce te înscrii</h2>
            <ol className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-3">
              {STEPS.map(([b, t], k) => (
                <li key={b} className="border-t-2 border-ink/80 pt-4">
                  <span className="font-display text-[1.6rem] font-bold text-coral-t">{k + 1}</span>
                  <p className="mt-1 leading-relaxed text-ink-2"><b className="text-ink">{b}</b> {t}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="wrap grid items-start gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div className="flex flex-col items-start gap-4 min-[380px]:flex-row min-[380px]:gap-5">
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

        <section className="border-b border-white/10 bg-ink py-14 text-center text-white sm:py-16">
          <div className="wrap">
            <h2 className="mx-auto max-w-[620px] text-[clamp(1.6rem,3.6vw,2.2rem)] font-semibold text-white">{W.taken > 0 && W.taken < W.total ? `Mai sunt ${W.total - W.taken} locuri.` : `Grupa are doar ${W.total} locuri.`} Înscrierea durează 30 de secunde.</h2>
            <a href="#formular" className="mt-7 inline-flex items-center gap-2 rounded-full bg-cta px-7 py-4 font-semibold text-white shadow-coral transition hover:bg-cta-d">Rezervă locul gratuit</a>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }} />
    </>
  );
}
