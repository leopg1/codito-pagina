import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { CONFIG, waLink } from "@/lib/config";
import { SiteHeader } from "@/components/site/site-header";
import { Footer } from "@/components/site/footer";
import { Countdown, SignupForm } from "@/components/signup/signup-form";
import { GameWindow } from "@/components/signup/game-window";
import { LessonTimeline } from "@/components/signup/lesson-timeline";
import { ButtonLink, WaIcon } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { E } from "@/components/ui/emoji";
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

/* data, din config: „10”, „oct”, „sâmbătă”, „14:00” */
const fmt = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("ro-RO", { timeZone: "Europe/Bucharest", ...o }).format(new Date(W.start));
const DAY = fmt({ day: "numeric" });
const MONTH = fmt({ month: "short" }).replace(".", "");
const WEEKDAY = fmt({ weekday: "long" });
const TIME = fmt({ hour: "2-digit", minute: "2-digit" });
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const LEFT = Math.max(0, W.total - W.taken);

const AFTER: [string, string, string][] = [
  ["În aceeași zi", "Te contactez eu", "ca să confirm locul și să‑ți spun ce urmează."],
  ["Cu o zi înainte", "Primești linkul de Google Meet", "și un pas mic de pregătire, de 2 minute."],
  [`${cap(WEEKDAY)}, ${TIME}`, "Copilul se conectează", "și își face jocul. În ultimele minute vi‑l arată."],
];

const FAQ: [string, string][] = [
  ["Chiar e gratuit?", "Da. Nu plătești nimic și nu ți se cere cardul. Dacă după lecție vreți să continuați, vorbim. Dacă nu, nu insist."],
  ["Copilul n‑a mai programat niciodată. E o problemă?", "Deloc. Lecția e făcută exact pentru începători. Explic pas cu pas, iar copilul scrie singur codul."],
  [`De ce doar ${W.total} copii?`, "Ca să am timp pentru fiecare. Cu mai mulți copii, unii ar rămâne în urmă."],
  ["Ce îi trebuie copilului?", "Un laptop sau un calculator cu internet. Linkul de Google Meet îl primești cu o zi înainte."],
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
      <SiteHeader cta={{ href: "#formular", label: "Rezervă locul" }} />

      <main>
        {/* ===== hero: ce, când, formularul ===== */}
        <section className="pb-16 pt-7 sm:pt-14 lg:pb-24">
          <div className="wrap grid items-start gap-9 lg:grid-cols-[1.08fr_.92fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-14">
            <div className="min-w-0 md:mx-auto md:w-full md:max-w-[580px] lg:col-start-1 lg:row-start-1 lg:mx-0 lg:max-w-none">
              <span className="rise block font-hand text-[1.35rem] font-bold leading-tight text-coral-t min-[380px]:text-[1.5rem] sm:text-[1.65rem]">
                Lecție gratuită de programare, online
              </span>
              <h1 style={{ "--d": ".08s" } as React.CSSProperties} className="rise mt-2.5 text-[clamp(2.2rem,5.4vw,3.7rem)] font-semibold">
                {cap(WEEKDAY)}, copilul tău își face <em className="not-italic text-coral">primul joc</em> pe calculator.
              </h1>
              <p style={{ "--d": ".18s" } as React.CSSProperties} className="rise mt-5 max-w-[34em] text-[1.08rem] leading-relaxed text-ink-2 sm:text-[1.18rem]">
                De la zero, scris de el, în {W.minutes} de minute. La final vi‑l arată și îl puteți juca împreună.
              </p>

              {/* data, ca pe o invitație */}
              <div style={{ "--d": ".26s" } as React.CSSProperties} className="rise mt-7 flex max-w-full items-center gap-4 sm:gap-5">
                <div className="w-[66px] shrink-0 overflow-hidden rounded-xl bg-paper text-center shadow-soft ring-1 ring-line sm:w-[74px]" aria-hidden>
                  <span className="block bg-cta py-1 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-white">{MONTH}</span>
                  <b className="block py-1.5 font-display text-[2rem] leading-none sm:py-2 sm:text-[2.3rem]">{DAY}</b>
                </div>
                <p className="min-w-0 leading-snug">
                  <b className="block text-[1.08rem] text-ink first-letter:uppercase sm:text-[1.15rem]">{W.date}</b>
                  <span className="mt-0.5 block text-[0.95rem] text-muted">{W.minutes} de minute · pe Google Meet · maximum {W.total} copii</span>
                </p>
              </div>
            </div>

            {/* formularul: pe telefon vine imediat după titlu */}
            <div id="formular" style={{ "--d": ".2s" } as React.CSSProperties} className="rise w-full md:mx-auto md:max-w-[580px] lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none">
              <div className="rounded-[22px] bg-paper p-5 shadow-lift ring-1 ring-line min-[380px]:p-6 sm:p-8">
                <SignupForm />
              </div>
            </div>

            <div className="min-w-0 pt-2 md:mx-auto md:w-full md:max-w-[580px] lg:col-start-1 lg:row-start-2 lg:mx-0 lg:max-w-none lg:pt-0">
              <GameWindow minutes={W.minutes} />
            </div>
          </div>
        </section>

        {/* ===== cele 60 de minute ===== */}
        <section className="section border-y border-line bg-paper">
          <div className="wrap">
            <Reveal className="max-w-[680px]">
              <h2 className="text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold">Ce se întâmplă în cele {W.minutes} de minute</h2>
              <p className="mt-5 text-[1.12rem] leading-relaxed text-ink-2 sm:text-[1.2rem]">Online, de acasă, cu camera pornită. Cel mai mult timp îl petrece scriind cod, cu mâna lui.</p>
            </Reveal>
            <div className="mt-12">
              <LessonTimeline />
            </div>
            <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
              <StaggerItem className="flex gap-3.5 rounded-2xl bg-mint/60 p-5 ring-1 ring-[#c6e9d6] sm:p-6">
                <E e="💻" className="mt-0.5 text-[1.4rem]" />
                <p className="leading-relaxed text-ink-2"><b className="text-ink">Îi trebuie doar un laptop sau un calculator cu internet.</b> Linkul îl primești cu o zi înainte.</p>
              </StaggerItem>
              <StaggerItem className="flex gap-3.5 rounded-2xl bg-peach p-5 ring-1 ring-[#f9d3c0] sm:p-6">
                <E e="🧒" className="mt-0.5 text-[1.4rem]" />
                <p className="leading-relaxed text-ink-2"><b className="text-ink">Nu e nevoie de experiență.</b> Lecția e făcută pentru începători, iar grupa are maximum {W.total} copii.</p>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* ===== după înscriere ===== */}
        <section className="section bg-sand">
          <div className="wrap grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <h2 className="text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold">După ce te înscrii</h2>
              <p className="mt-5 max-w-[30em] text-[1.12rem] leading-relaxed text-ink-2">Nu trebuie să pregătești nimic special. Te țin eu la curent, pas cu pas.</p>
            </Reveal>
            <Stagger as="ol" className="border-t border-[#e3d3bd]">
              {AFTER.map(([when, b, t], k) => (
                <StaggerItem as="li" key={b} className="grid gap-x-6 gap-y-1 border-b border-[#e3d3bd] py-5 sm:grid-cols-[10.5rem_1fr]">
                  <span className="flex items-baseline gap-2.5 font-mono text-[0.85rem] font-semibold text-coral-t">
                    <span className="font-display text-[1.05rem] font-bold">{k + 1}.</span>{when}
                  </span>
                  <p className="leading-relaxed text-ink-2"><b className="text-ink">{b}</b> {t}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ===== profesorul + întrebări ===== */}
        <section className="section">
          <div className="wrap grid items-start gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
            <Reveal className="rounded-2xl bg-paper p-6 shadow-lift ring-1 ring-line sm:p-8 lg:sticky lg:top-24">
              <div className="flex items-center gap-4">
                <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-coral font-display text-[1.8rem] font-bold text-white ring-4 ring-peach sm:size-24">
                  L<Photo className="scale-[1.5] object-[50%_42%]" />
                </span>
                <div className="min-w-0">
                  <span className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t">Cine ține lecția</span>
                  <h2 className="mt-1 text-[1.4rem] font-semibold leading-tight sm:text-[1.55rem]">Leonard Pădurean</h2>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-ink-2">Sunt programator software de 5 ani și cercetător. Predau programare copiilor de peste un an și am pregătire în pedagogie.</p>
              <p className="mt-4 border-l-[3px] border-coral pl-4 leading-relaxed text-ink">
                Lucrez cu maximum {W.total} copii odată, ca să am timp să mă uit pe ecranul fiecăruia.
              </p>
              <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t border-line pt-4">
                <span className="font-hand text-[2rem] leading-none text-coral-t">Leonard</span>
                <Link href="/#despre" className="py-2 text-[0.95rem] font-semibold text-coral-t underline underline-offset-4">Mai multe despre mine</Link>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <h2 className="text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold">Întrebări de la părinți</h2>
              </Reveal>
              <Reveal delay={0.08} className="mt-8 border-t border-line">
                {FAQ.map(([q, a]) => (
                  <details key={q} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.05rem] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                      {q}
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-cream text-[1.3rem] leading-none text-coral-t ring-1 ring-line transition-transform group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <p className="max-w-[62ch] pb-6 leading-relaxed text-ink-2">{a}</p>
                  </details>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== final ===== */}
        <section className="section bg-ink text-center text-white">
          <div className="wrap">
            <Reveal>
              <h2 className="mx-auto max-w-[760px] text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold text-white">
                {W.taken > 0 && LEFT > 0 ? (LEFT === 1 ? "A mai rămas un singur loc." : `Mai sunt ${LEFT} locuri.`) : `Grupa are doar ${W.total} locuri.`} Înscrierea durează 30 de secunde.
              </h2>
              <p className="mx-auto mt-5 max-w-[560px] text-[1.12rem] text-[#c3c8dd]">
                <span className="first-letter:uppercase inline-block">{W.date}</span>, online. Te contactez în aceeași zi ca să confirm locul.
              </p>
            </Reveal>
            <Reveal delay={0.08} className="mx-auto mt-9 max-w-[460px]">
              <Countdown dark />
            </Reveal>
            <Reveal delay={0.12} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="#formular" arrow>Rezervă locul gratuit</ButtonLink>
              <ButtonLink href={waLink(`Bună, Leonard! Am o întrebare despre lecția gratuită din ${W.date}.`)} variant="wa" external><WaIcon /> Întreabă‑mă pe WhatsApp</ButtonLink>
            </Reveal>
            <Reveal delay={0.16} className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.92rem] text-[#c3c8dd]">
              {["Gratuit", "Fără card", "Fără obligații"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5"><Check className="size-4 text-[#5be3a7]" strokeWidth={3} aria-hidden />{t}</span>
              ))}
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }} />
    </>
  );
}
