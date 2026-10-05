import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { CONFIG, PRICES, WA_HELLO } from "@/lib/config";
import { TOPICS, type Topic } from "@/lib/topics";
import { LogoMark, Wordmark } from "./logo";
import { Footer } from "./footer";
import { ButtonLink, WaIcon } from "../ui/button";

/** Pagină scurtă pentru o căutare anume pe Google. Trimite mereu spre pagina principală și spre lecția gratuită. */
export function TopicPage({ t }: { t: Topic }) {
  const others = TOPICS.filter((o) => o.slug !== t.slug);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-xl">
        <div className="wrap flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Codito, pagina principală"><LogoMark className="size-9 text-[1.3rem]" /><Wordmark className="text-[1.3rem]" /></Link>
          <Link href="/" className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.92rem] font-semibold text-ink-2 hover:text-coral-t"><ArrowLeft className="size-4" /> Pagina principală</Link>
        </div>
      </nav>

      <main>
        <header className="wrap pb-14 pt-12 sm:pb-20 sm:pt-20">
          <span className="kicker mb-4">{t.eyebrow}</span>
          <h1 className="max-w-[820px] text-[clamp(2.1rem,5vw,3.4rem)] font-semibold leading-[1.08]">{t.title}</h1>
          <p className="mt-6 max-w-[680px] text-[1.15rem] leading-relaxed text-ink-2">{t.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#plan" arrow>Vreau lecția gratuită 1:1</ButtonLink>
            <ButtonLink href={WA_HELLO} variant="wa" external><WaIcon /> Întreabă-mă pe WhatsApp</ButtonLink>
          </div>
          <p className="mt-4 text-[0.92rem] text-muted">Prima lecție (45 de minute) e gratuită. Fără card, fără obligații.</p>
        </header>

        <section className="border-t border-line bg-paper py-14 sm:py-20">
          <div className="wrap grid gap-8 md:grid-cols-3 md:gap-10">
            {t.why.map(([b, p]) => (
              <div key={b} className="border-t-2 border-ink/80 pt-4">
                <h2 className="text-[1.2rem] font-semibold">{b}</h2>
                <p className="mt-2 leading-relaxed text-ink-2">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="wrap grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,1.9rem)] font-semibold">Ce învață</h2>
              <ul className="mt-5 grid gap-3">{t.learn.map((x) => <li key={x} className="flex gap-2.5 leading-relaxed text-ink-2"><Check className="mt-1 size-[18px] shrink-0 text-green" strokeWidth={3} aria-hidden />{x}</li>)}</ul>
            </div>
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,1.9rem)] font-semibold">Ce construiește</h2>
              <ul className="mt-5 grid gap-3">{t.build.map((x) => <li key={x} className="flex gap-2.5 leading-relaxed text-ink-2"><Check className="mt-1 size-[18px] shrink-0 text-green" strokeWidth={3} aria-hidden />{x}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="bg-sand py-14 sm:py-20">
          <div className="wrap grid items-start gap-10 md:grid-cols-[1.1fr_.9fr]">
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,1.9rem)] font-semibold">Cine ține lecțiile</h2>
              <p className="mt-4 leading-relaxed text-ink-2">Sunt Leonard Pădurean, student în anul 3 la Calculatoare și programator. Predau programare copiilor de aproape un an și am certificat psihopedagogic pentru predare. La Codito țin eu fiecare lecție, cu fiecare copil.</p>
              <Link href="/#despre" className="mt-3 inline-block font-semibold text-coral-t underline underline-offset-4">Mai multe despre mine</Link>
            </div>
            <div className="rounded-2xl bg-paper p-6 ring-1 ring-line sm:p-7">
              <b className="block font-display text-[1.2rem]">Cât costă</b>
              <p className="mt-2 text-ink-2"><b className="font-display text-[2rem] text-ink">{PRICES.month}</b> / lună</p>
              <p className="text-[0.95rem] text-ink-2">4 lecții × 90 de minute · {PRICES.session} lecția</p>
              <p className="mt-1 text-[0.88rem] text-muted">Preț pentru primele {CONFIG.founding.total} familii, blocat {CONFIG.founding.lockMonths} luni. Fără contract, te oprești oricând.</p>
              <Link href="/#pret" className="mt-3 inline-block text-[0.95rem] font-semibold text-coral-t underline underline-offset-4">Vezi tot ce include</Link>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="wrap max-w-[860px]">
            <h2 className="text-[clamp(1.5rem,3vw,1.9rem)] font-semibold">Întrebări frecvente</h2>
            <div className="mt-6 border-t border-line">
              {t.faq.map(([q, a]) => (
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

        <section className="bg-ink py-14 text-center text-white sm:py-20">
          <div className="wrap">
            <h2 className="mx-auto max-w-[680px] text-[clamp(1.6rem,3.6vw,2.3rem)] font-semibold text-white">Vedeți cum e, la o lecție gratuită de 45 de minute</h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/#plan" arrow>Programează lecția gratuită</ButtonLink>
              <ButtonLink href={WA_HELLO} variant="wa" external><WaIcon /> Scrie-mi pe WhatsApp</ButtonLink>
            </div>
          </div>
        </section>

        <nav aria-label="Alte pagini" className="wrap py-10">
          <b className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-muted">Mai citește</b>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((o) => <li key={o.slug}><Link href={`/${o.slug}/`} className="font-semibold text-ink-2 hover:text-coral-t">{o.eyebrow}</Link></li>)}
          </ul>
        </nav>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
