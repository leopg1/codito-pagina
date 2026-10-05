import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check, GraduationCap, Laptop, Plus, ScrollText, Users } from "lucide-react";
import { CONFIG, FOUNDING_FREE, PRICES, WA_HELLO } from "@/lib/config";
import { TOPICS, type Topic } from "@/lib/topics";
import { getPost, type Post } from "@/lib/blog";
import { SiteHeader } from "./site-header";
import { Footer } from "./footer";
import { ButtonLink, WaIcon } from "../ui/button";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import { E } from "../ui/emoji";
import { Photo } from "../ui/photo";
import { TopicVisualBox } from "../topic/visuals";

/* Pagina unui curs (căutare anume pe Google). Arată ca o versiune concentrată a paginii principale și trimite mereu spre lecția gratuită. */

const strip = (s: string) => s.replace(/‑/g, "-").replace(/⁠/g, "");
const H2 = "text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold";
const LABEL = "text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t";

export function TopicPage({ t }: { t: Topic }) {
  const others = TOPICS.filter((o) => o.slug !== t.slug);
  const posts = t.blog.map((s) => getPost(s)).filter((x): x is Post => !!x);
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "FAQPage", mainEntity: t.faq.map(([q, a]) => ({ "@type": "Question", name: strip(q), acceptedAnswer: { "@type": "Answer", text: strip(a) } })) },
      { "@type": "Course", "@id": `${CONFIG.siteUrl}/${t.slug}/#course`, url: `${CONFIG.siteUrl}/${t.slug}/`, name: strip(t.title), description: strip(t.description), inLanguage: "ro", provider: { "@id": `${CONFIG.siteUrl}/#org` },
        offers: { "@type": "Offer", price: String(CONFIG.price.month), priceCurrency: "RON", category: "Subscription", url: `${CONFIG.siteUrl}/${t.slug}/` },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: "PT1H30M", courseSchedule: { "@type": "Schedule", repeatFrequency: "P1W", repeatCount: 4 }, instructor: { "@id": `${CONFIG.siteUrl}/#leonard` } } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Codito", item: `${CONFIG.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: t.eyebrow, item: `${CONFIG.siteUrl}/${t.slug}/` },
      ] },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main>
        <Hero t={t} />
        <Facts />
        <Why t={t} />
        <LearnBuild t={t} />
        <Lesson t={t} />
        <Teacher />
        <PriceBlock />
        <Questions t={t} />
        <More others={others} posts={posts} />
        <Closing t={t} />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}

const d = (s: string) => ({ "--d": s }) as CSSProperties;

/* ===== Hero ===== */
function Hero({ t }: { t: Topic }) {
  const i = t.title.indexOf(t.accent);
  const [pre, post] = i < 0 ? [t.title, ""] : [t.title.slice(0, i), t.title.slice(i + t.accent.length)];
  return (
    <header className="relative overflow-hidden pb-12 pt-6 sm:pt-12 lg:pb-20">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
        <div>
          <nav aria-label="Breadcrumb" className="rise mb-4 flex items-center gap-2 text-[0.85rem] text-muted">
            <Link href="/" className="-my-2 py-2 hover:text-coral-t">Codito</Link><span aria-hidden>/</span><span aria-current="page" className="truncate">{t.eyebrow}</span>
          </nav>
          <span style={d(".05s")} className="rise block font-hand text-[1.3rem] font-bold leading-tight text-coral-t min-[380px]:text-[1.45rem] sm:text-[1.6rem]">{t.hand}</span>
          <h1 style={d(".12s")} className="rise mt-3 text-[clamp(2.15rem,5.2vw,3.6rem)] font-semibold leading-[1.06]">
            {pre}{i >= 0 && <em className="not-italic text-coral">{t.accent}</em>}{post}
          </h1>
          <p style={d(".22s")} className="rise mt-6 max-w-[34em] text-[1.1rem] leading-relaxed text-ink-2 sm:text-[1.17rem]">{t.lead}</p>
          <div style={d(".32s")} className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/#plan" arrow>Vreau lecția gratuită 1:1</ButtonLink>
            <ButtonLink href={WA_HELLO} variant="wa" external><WaIcon /> Întreabă‑mă pe WhatsApp</ButtonLink>
          </div>
          <p style={d(".42s")} className="rise mt-4 text-[0.95rem] text-muted">Prima lecție, de 45 de minute, e gratuită. Fără card, fără obligații.</p>
        </div>
        <TopicVisualBox kind={t.visual} />
      </div>
    </header>
  );
}

/* ===== Pe scurt (ca QuickFacts de pe pagina principală) ===== */
function Facts() {
  const facts: [string, string][] = [
    ["Lecții 1:1", "online, de acasă"],
    ["90 de minute", "o dată pe săptămână"],
    ["Același profesor", "la fiecare lecție"],
    [PRICES.session, "pe lecție, fără contract"],
  ];
  return (
    <div aria-label="Pe scurt" className="wrap pb-16 sm:pb-20">
      <Reveal className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-paper lg:grid-cols-5">
        {facts.map(([b, s], k) => (
          <div key={b} className={`border-line px-4 py-4 sm:px-6 sm:py-5 lg:border-l lg:first:border-l-0 ${k % 2 ? "border-l" : ""} ${k > 1 ? "border-t lg:border-t-0" : ""}`}>
            <b className="block font-display text-[1rem] leading-tight sm:text-[1.12rem]">{b}</b>
            <span className="mt-1 block text-[0.8rem] leading-snug text-muted sm:text-[0.86rem]">{s}</span>
          </div>
        ))}
        <a href="/#plan" className="group col-span-2 bg-cta px-4 py-4 text-white transition-colors hover:bg-cta-d sm:px-6 sm:py-5 lg:col-span-1">
          <b className="block font-display text-[1rem] leading-tight sm:text-[1.12rem]">Prima lecție e gratuită</b>
          <span className="mt-1 block text-[0.8rem] leading-snug sm:text-[0.86rem]">45 de minute · rezervă <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span></span>
        </a>
      </Reveal>
    </div>
  );
}

/* ===== De ce: titlu + citat la stânga, listă cu linii subțiri la dreapta ===== */
function Why({ t }: { t: Topic }) {
  return (
    <section className="section border-y border-line bg-paper">
      <div className="wrap grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <h2 className={H2}>{t.whyTitle}</h2>
          <p className="mt-4 max-w-[34em] text-[1.08rem] leading-relaxed text-ink-2">{t.whyLead}</p>
          {t.quote && (
            <p className="mt-8 border-l-[3px] border-coral pl-5 font-display text-[1.15rem] leading-snug text-ink sm:text-[1.25rem]">{t.quote}</p>
          )}
        </Reveal>
        <Stagger as="dl">
          {t.why.map(([b, p, e]) => (
            <StaggerItem key={b} className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-line py-5 last:border-b">
              <E e={e ?? "✨"} className="row-span-2 mt-0.5 text-[1.45rem]" />
              <dt className="text-[1.1rem] font-semibold text-ink">{b}</dt>
              <dd className="mt-1 leading-relaxed text-ink-2">{p}</dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ===== Ce învață / ce construiește ===== */
function LearnBuild({ t }: { t: Topic }) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="max-w-[680px]">
          <h2 className={H2}>Ce învață și ce construiește</h2>
          <p className="mt-5 text-[1.1rem] leading-relaxed text-ink-2 sm:text-[1.15rem]">{t.learnLead}</p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 md:gap-6">
          <Reveal className="rounded-2xl bg-paper p-6 shadow-lift ring-1 ring-line sm:p-9">
            <h3 className="flex items-center gap-2.5 text-[1.3rem] font-semibold"><E e="🧠" className="text-[1.4rem]" /> Ce învață</h3>
            <ul className="mt-5 grid gap-3.5">
              {t.learn.map((x) => (
                <li key={x} className="flex gap-3 leading-relaxed text-ink-2"><Check className="mt-1 size-[18px] shrink-0 text-green" strokeWidth={3} aria-hidden />{x}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col rounded-2xl bg-ink p-6 text-white sm:p-9">
            <h3 className="flex items-center gap-2.5 text-[1.3rem] font-semibold text-white"><E e="🛠️" className="text-[1.4rem]" /> Ce construiește</h3>
            <ol className="mt-4">
              {t.build.map((x, k) => (
                <li key={x} className="grid grid-cols-[2.2rem_1fr] items-baseline border-t border-white/10 py-3.5 leading-relaxed text-[#d3d8ea] first:border-t-0">
                  <span className="font-mono text-[0.85rem] font-semibold text-[#ffb08f]">{String(k + 1).padStart(2, "0")}</span>{x}
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-white/10 pt-4 md:mt-auto text-[0.92rem] text-[#a3aac4]"><E e="🎤" /> La final de nivel, își prezintă proiectul în fața familiei.</p>
          </Reveal>
        </div>

        <Reveal className="mt-6 grid rounded-2xl bg-peach/70 p-6 sm:grid-cols-[auto_1fr] sm:gap-x-5 sm:p-8">
          <E e={t.project.e} className="mb-3 text-[2rem] sm:row-span-3 sm:mb-0 sm:mt-0.5 sm:text-[2.2rem]" />
          <span className={LABEL}>Exemplu de proiect</span>
          <b className="mt-1 block font-display text-[1.25rem] font-semibold leading-snug text-ink sm:text-[1.4rem]">{t.project.title}</b>
          <p className="mt-2 max-w-[62ch] leading-relaxed text-ink-2">{t.project.text}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ===== Lecția, minut cu minut ===== */
function Lesson({ t }: { t: Topic }) {
  return (
    <section className="section bg-sand">
      <div className="wrap">
        <Reveal className="max-w-[680px]">
          <h2 className={H2}>Cum arată o lecție, minut cu minut</h2>
          <p className="mt-5 text-[1.1rem] leading-relaxed text-ink-2 sm:text-[1.15rem]">90 de minute, online, de acasă. Cu camera pornită și ecranul partajat, ca și cum am sta unul lângă altul.</p>
        </Reveal>
        <Stagger as="ol" className="mt-12 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.lesson.map(([m, e, b, p]) => (
            <StaggerItem as="li" key={b} className="border-t-2 border-ink/80 py-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.8rem] font-semibold text-coral-t">min {m}</span>
                <E e={e} className="text-[1.5rem]" />
              </div>
              <b className="mt-1.5 block text-[1.08rem]">{b}</b>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{p}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-2 text-[0.98rem] text-ink-2"><E e="📲" /> <b className="text-ink">După lecție,</b> primești pe WhatsApp un raport scurt: ce a făcut, ce a înțeles și ce urmează.</Reveal>
      </div>
    </section>
  );
}

/* ===== Profesorul ===== */
const FACTS = [
  [Laptop, "Programator software de 5 ani, angajat în domeniu, și cercetător"],
  [Users, "Predau programare copiilor de peste un an"],
  [ScrollText, "Pregătire în pedagogie: știu cum să explic pe înțelesul copiilor"],
  [GraduationCap, "Student la inginerie, în domeniul Calculatoare"],
] as const;

function Teacher() {
  return (
    <section className="section border-y border-line bg-paper">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <Reveal>
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="relative grid size-24 shrink-0 place-items-center overflow-hidden rounded-full border-4 border-peach bg-coral font-display text-[2rem] font-bold text-white sm:size-32">
              L<Photo className="scale-[1.35] object-[50%_40%]" />
            </div>
            <div className="min-w-0">
              <span className={LABEL}>Cine ține lecțiile</span>
              <h2 className="mt-1.5 text-[clamp(1.7rem,3.6vw,2.35rem)] font-semibold">Bună, sunt <span className="whitespace-nowrap">Leonard <E e="👋" className="text-[0.85em]" /></span></h2>
            </div>
          </div>
          <div className="mt-7 grid max-w-[640px] gap-4 text-[1.06rem] leading-[1.75] text-ink-2">
            <p>La Codito țin eu fiecare lecție, cu fiecare copil. <strong className="text-ink">Copiii învață enorm atunci când cineva are timp doar pentru ei</strong>: pot întreba orice fără să le fie rușine și construiesc ceva care e al lor.</p>
            <p className="border-l-[3px] border-coral pl-5 text-ink">Pe mine mă cunoaște copilul, eu îți trimit rapoartele, cu mine vorbești când ai o întrebare.</p>
          </div>
          <p className="mt-5 font-hand text-[2.2rem] leading-none text-coral-t">Leonard</p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="grid gap-0 text-[0.98rem] leading-snug text-ink-2">
            {FACTS.map(([I, x]) => (
              <li key={x} className="flex gap-3.5 border-t border-line py-4 last:border-b"><I className="mt-0.5 size-[18px] shrink-0 text-muted" aria-hidden />{x}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col items-stretch gap-2 sm:items-start">
            <ButtonLink href={WA_HELLO} variant="wa" external><WaIcon /> Hai să vorbim 15 minute</ButtonLink>
            <Link href="/#despre" className="inline-flex items-center gap-1.5 px-1 py-3 font-semibold text-coral-t underline-offset-4 hover:underline">Mai multe despre mine <ArrowRight className="size-4" aria-hidden /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===== Preț: abonament + lecția gratuită ===== */
const TRIAL: [string, string, string][] = [
  ["0–10", "Ne cunoaștem", "Aflu ce îi place și ce a mai încercat."],
  ["10–40", "Lucrează el", "Scrie el codul, eu îl ghidez pas cu pas."],
  ["40–45", "Ți‑l arată", "Intri și tu și îți explică ce a făcut."],
];

function PriceBlock() {
  const f = CONFIG.founding;
  const founding = FOUNDING_FREE > 0;
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="max-w-[680px]">
          <h2 className={H2}>Cât costă</h2>
          <p className="mt-5 text-[1.1rem] leading-relaxed text-ink-2 sm:text-[1.15rem]">Un singur abonament, același pentru toate cursurile. Și, înainte de el, o lecție gratuită, ca să vedeți dacă vă place.</p>
        </Reveal>
        <Reveal className="mt-10 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl shadow-lift ring-1 ring-line md:grid-cols-[1.1fr_.9fr]">
          <div className="bg-paper p-5 sm:p-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-[0.8rem] font-bold text-coral-t ring-1 ring-line"><E e="🌱" /> {founding ? "Preț pentru familiile fondatoare" : "Abonament lunar"}</span>
            <h3 className="mt-4 text-[1.5rem] font-semibold">Abonament lunar</h3>
            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <b className="font-display text-[3.2rem] leading-none">{founding ? PRICES.month : PRICES.later}</b>
              <small className="text-muted">/ lună</small>
            </div>
            <p className="mt-2 text-ink-2">4 lecții × 90 de minute, una pe săptămână. Adică <span className="whitespace-nowrap">{PRICES.session}</span> pe lecție.</p>
            {founding && <p className="mt-1 text-[0.9rem] text-muted">Pentru primele {f.total} familii, blocat {f.lockMonths} luni. Apoi: {PRICES.later} pe lună.</p>}
            <ul className="my-7 grid gap-2.5">
              {["Plan personalizat, pornit de la ce îi place", "Raport pe WhatsApp după fiecare lecție", "Discuție cu tine la fiecare 6 lecții", "Factură pentru fiecare plată", "Te oprești oricând, fără penalități"].map((x) => (
                <li key={x} className="flex gap-2.5"><Check className="mt-1 size-[18px] shrink-0 text-green" strokeWidth={3} aria-hidden />{x}</li>
              ))}
            </ul>
            <Link href="/#pret" className="inline-flex items-center gap-1.5 py-2 font-semibold text-coral-t underline-offset-4 hover:underline">Reduceri, garanție și tot ce include <ArrowRight className="size-4" aria-hidden /></Link>
          </div>
          <div className="flex flex-col bg-ink p-5 text-white sm:p-10">
            <span className="flex items-center gap-2 font-semibold text-[#d3d8ea]"><E e="🎁" className="text-[1.2rem]" /> Prima lecție · 45 de minute</span>
            <span className="mt-3 flex items-baseline gap-3"><b className="font-display text-[3.2rem] leading-none text-white">0 lei</b><s className="text-[#a3aac4]">{PRICES.session}</s></span>
            <ol className="mt-6 grid">
              {TRIAL.map(([m, b, p]) => (
                <li key={b} className="border-t border-white/10 py-3.5">
                  <span className="font-mono text-[0.78rem] font-semibold text-[#ffb08f]">min {m}</span>
                  <b className="mt-0.5 block text-white">{b}</b>
                  <p className="text-[0.92rem] leading-normal text-[#c3c8dd]">{p}</p>
                </li>
              ))}
            </ol>
            <ButtonLink href="/#plan" arrow className="mt-auto w-full">Vreau lecția gratuită 1:1</ButtonLink>
            <p className="mt-3 text-center text-[0.88rem] text-[#a3aac4]">Fără card, fără contract, fără obligații.</p>
          </div>
        </Reveal>
        <Reveal className="mt-8 text-[0.98rem] text-muted">
          <E e="💡" /> Ai nevoie doar de ajutor punctual? Lecție individuală de 90 de minute: <b className="text-ink">{PRICES.single}</b>.
        </Reveal>
      </div>
    </section>
  );
}

/* ===== Întrebări ===== */
function Questions({ t }: { t: Topic }) {
  return (
    <section className="section border-t border-line bg-paper">
      <div className="wrap grid items-start gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-24">
          <h2 className={H2}>Întrebări frecvente</h2>
          <p className="mt-4 max-w-[34ch] text-[1.06rem] leading-relaxed text-ink-2">Nu găsești ce cauți? <a href={WA_HELLO} target="_blank" rel="noopener" className="font-semibold text-coral-t underline underline-offset-4"><span className="whitespace-nowrap">Scrie‑mi pe WhatsApp</span></a>, îți răspund personal.</p>
        </Reveal>
        <Reveal className="border-t border-line">
          {t.faq.map(([q, a], k) => (
            <details key={q} open={k === 0} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1rem] font-semibold sm:text-[1.08rem] [&::-webkit-details-marker]:hidden">
                {q}<Plus className="size-6 shrink-0 text-coral transition-transform duration-200 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="max-w-[62ch] pb-6 pr-8 leading-relaxed text-ink-2">{a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ===== Alte cursuri + blog ===== */
function More({ others, posts }: { others: Topic[]; posts: Post[] }) {
  return (
    <section className="section border-t border-line">
      <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="text-[clamp(1.5rem,3vw,1.95rem)] font-semibold">Alte cursuri Codito</h2>
          <ul className="mt-5 border-b border-line">
            {others.map((o) => (
              <li key={o.slug} className="border-t border-line">
                <Link href={`/${o.slug}/`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-4">
                  <E e={o.emoji} className="text-[1.5rem]" />
                  <span className="min-w-0">
                    <b className="block font-display text-[1.12rem] font-semibold leading-snug text-ink transition-colors group-hover:text-coral-t">{o.eyebrow}</b>
                    <span className="mt-0.5 block text-[0.93rem] leading-snug text-muted">{o.short}</span>
                  </span>
                  <ArrowRight className="size-5 text-coral transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        {posts.length > 0 && (
          <Reveal delay={0.08}>
            <h2 className="text-[clamp(1.5rem,3vw,1.95rem)] font-semibold">Din blogul pentru părinți</h2>
            <ul className="mt-5 border-b border-line">
              {posts.map((p) => (
                <li key={p.slug} className="border-t border-line">
                  <Link href={`/blog/${p.slug}/`} className="group block py-4">
                    <span className={LABEL}>{p.category} · {p.minutes} min</span>
                    <b className="mt-1 block font-display text-[1.12rem] font-semibold leading-snug text-ink transition-colors group-hover:text-coral-t">{p.title}</b>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog/" className="mt-3 inline-flex items-center gap-1.5 py-2.5 font-semibold text-coral-t underline-offset-4 hover:underline">Toate articolele <ArrowRight className="size-4" aria-hidden /></Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ===== Final, pe fundal închis ===== */
function Closing({ t }: { t: Topic }) {
  return (
    <section className="section bg-ink text-center text-white">
      <div className="wrap">
        <Reveal>
          <h2 className="mx-auto max-w-[780px] text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold text-white">{t.closing}</h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[1.12rem] text-[#c3c8dd]">45 de minute, unu la unu, online. Vedeți cum lucrăm înainte să plătiți ceva.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/#plan" arrow>Programează lecția gratuită 1:1</ButtonLink>
          <ButtonLink href={WA_HELLO} variant="wa" external><WaIcon /> Scrie‑mi pe WhatsApp</ButtonLink>
        </Reveal>
        <Reveal delay={0.15} className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.92rem] text-[#c3c8dd]">
          {["Gratuit", "Fără obligații", "Garanție de returnare a banilor"].map((x) => (
            <span key={x} className="inline-flex items-center gap-1.5"><Check className="size-4 text-[#5be3a7]" strokeWidth={3} aria-hidden />{x}</span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
