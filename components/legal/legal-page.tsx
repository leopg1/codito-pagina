import Link from "next/link";
import { ArrowRight, ArrowUp, CalendarDays, ChevronDown, Clock3, Phone } from "lucide-react";
import { CONFIG, WA_HELLO, telLink, waLink } from "@/lib/config";
import { SiteHeader } from "../site/site-header";
import { Footer } from "../site/footer";
import { ButtonLink, WaIcon } from "../ui/button";
import { Photo } from "../ui/photo";
import { LegalToc, type TocItem } from "./legal-toc";
import { PrintButton } from "./print-button";

export type LegalSlug = "termeni" | "confidentialitate" | "acord-gdpr";

const DOCS: { slug: LegalSlug; title: string; desc: string }[] = [
  { slug: "termeni", title: "Termeni și condiții", desc: "Prețuri, programare, garanția și dreptul de retragere." },
  { slug: "confidentialitate", title: "Politica de confidențialitate", desc: "Ce date folosesc, de ce și ce drepturi ai." },
  { slug: "acord-gdpr", title: "Acord GDPR pentru părinți", desc: "Formularul de semnat înainte de prima lecție plătită." },
];

/** Cratimă care nu se rupe la capăt de rând (U+2011) și spații fixe între număr și unitate. */
const nbText = (t: string) => t.replace(/(\p{L})-(\p{L})/gu, "$1\u2011$2").replace(/(\d) (lei|zile|de|minute|luni|ani|ore)\b/g, "$1\u00a0$2").replace(/\+40 (\d{3}) (\d{3}) (\d{3})/g, "+40\u00a0$1\u00a0$2\u00a0$3");
/** Același lucru, aplicat doar pe textul din HTML (nu în atribute). */
const nbHtml = (h: string) => h.replace(/>([^<]+)</g, (_, t: string) => ">" + nbText(t) + "<");
const stripTags = (h: string) => h.replace(/<[^>]+>/g, "").trim();

/**
 * Desface documentul (păstrat ca HTML în lib/legal) în bucățile paginii:
 * eticheta, titlul, data, rezumatul și corpul, cu titlurile de secțiune numerotate și ancorate.
 * Textul juridic rămâne neatins.
 */
function parse(html: string, slug: LegalSlug) {
  const pick = (re: RegExp) => re.exec(html)?.[1]?.trim() ?? "";
  const kicker = pick(/<span class="kicker">([\s\S]*?)<\/span>/);
  const h1 = pick(/<h1>([\s\S]*?)<\/h1>/);
  const upd = pick(/<p class="upd">([\s\S]*?)<\/p>/);
  const introRaw = pick(/<div class="intro">([\s\S]*?)<\/div>/);
  const intro = introRaw.replace(/^Pe scurt:\s*/i, "");
  const intro0 = intro.charAt(0).toUpperCase() + intro.slice(1);

  let body = html
    .replace(/<span class="kicker">[\s\S]*?<\/span>/, "")
    .replace(/<h1>[\s\S]*?<\/h1>/, "")
    .replace(/<p class="upd">[\s\S]*?<\/p>/, "")
    .replace(/<div class="intro">[\s\S]*?<\/div>/, "")
    .replace(/<nav class="toc"[\s\S]*?<\/nav>/, "")
    .trim();

  const toc: TocItem[] = [];
  const prefix = slug.charAt(0);
  let k = 0;
  body = body.replace(/<h2(?: id="([^"]+)")?>([\s\S]*?)<\/h2>/g, (_, id: string | undefined, inner: string) => {
    k++;
    const m = /^(\d+)\.\s+([\s\S]*)$/.exec(inner.trim());
    const n = m ? m[1].padStart(2, "0") : String(k).padStart(2, "0");
    const text = m ? m[2] : inner.trim();
    const hid = id ?? `${prefix}${m ? m[1] : k}`;
    toc.push({ id: hid, n, label: nbText(stripTags(text)) });
    return m
      ? `<h2 id="${hid}"><span class="n">${n}</span><span>${text}</span></h2>`
      : `<h2 id="${hid}">${text}</h2>`;
  });

  const words = stripTags(body).split(/\s+/).length;
  return { kicker, h1, upd, intro: intro0, hasShort: intro !== introRaw, body, toc, minutes: Math.max(1, Math.round(words / 200)) };
}

export function LegalPage({ html, slug }: { html: string; slug: LegalSlug }) {
  const d = parse(html, slug);
  const isForm = slug === "acord-gdpr";
  const c = CONFIG.company;
  const others = DOCS.filter((x) => x.slug !== slug);

  const introCard = d.intro ? (
              <div className="relative rounded-[22px] bg-paper p-6 shadow-lift ring-1 ring-line sm:p-8 print:hidden">
                <span className="font-hand text-[1.55rem] font-bold leading-none text-coral-t">{isForm ? "Cum se completează" : "Pe scurt"}</span>
                <p className={`mt-3 leading-relaxed text-ink ${isForm ? "text-[1rem]" : "text-[1.06rem]"}`}>{nbText(d.intro)}</p>
                {isForm && (
                  <div className="mt-6 flex flex-col gap-2.5 min-[480px]:flex-row min-[480px]:items-center lg:flex-col lg:items-stretch">
                    <PrintButton />
                    <a href={waLink("Bună, Leonard! Îți trimit acordul GDPR completat pentru lecțiile Codito.")} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-3 py-3 text-[0.98rem] font-semibold text-wa transition-colors hover:text-[#0d6a38]">
                      <WaIcon /> Trimite pe WhatsApp
                    </a>
                  </div>
                )}
              </div>
  ) : null;

  return (
    <>
      <div className="print:hidden"><SiteHeader /></div>

      <main id="top">
        {/* Antetul documentului */}
        <header className="border-b border-line print:border-0">
          <div className={`wrap grid gap-9 pb-10 pt-9 sm:pb-14 sm:pt-14 lg:items-center lg:gap-16 lg:pb-16 lg:pt-16 print:block print:px-0 print:pb-3 print:pt-0 ${isForm ? "" : "lg:grid-cols-[1fr_420px]"}`}>
            <div>
              <p className="hidden pb-3 text-[9pt] text-muted print:block">Codito · {c.name} · CUI {c.cui} · {CONFIG.siteUrl.replace("https://", "")}</p>
              <nav aria-label="Navigare" className="flex flex-wrap items-center gap-x-2 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-coral-t print:hidden">
                <Link href="/" className="py-1 text-muted transition-colors hover:text-coral-t">Codito</Link>
                <span aria-hidden className="text-line">/</span>
                <span>{d.kicker}</span>
              </nav>
              <h1 className="mt-4 max-w-[16em] text-[clamp(2.15rem,5.4vw,3.7rem)] font-semibold print:mt-0 print:text-[20pt]">{nbText(d.h1)}</h1>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.95rem] text-muted print:mt-2 print:text-[9pt]">
                <span className="inline-flex items-center gap-2"><CalendarDays className="size-[18px] text-coral-t print:hidden" aria-hidden />{d.upd}</span>
                {!isForm && <span className="inline-flex items-center gap-2 print:hidden"><Clock3 className="size-[18px] text-coral-t" aria-hidden />{d.minutes} minute de citit</span>}
              </div>
            </div>

            {!isForm && introCard}
          </div>
        </header>

        {/* Corpul documentului */}
        <div className={`wrap pt-8 sm:py-14 lg:py-16 print:p-0 ${isForm ? "pb-10" : "max-sm:pb-0"} grid gap-8 ${isForm ? "lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 xl:gap-16" : "lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-14 xl:gap-20"}`}>
          {isForm && <aside className="lg:order-last print:hidden"><div className="lg:sticky lg:top-[100px]">{introCard}</div></aside>}
          {!isForm && (
            <aside className="max-lg:hidden print:hidden">
              <div className="sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto pb-6 pr-1">
                <p className="mb-3 pl-3 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-muted">Cuprins</p>
                <LegalToc items={d.toc} />
                <a href="#top" className="mt-5 inline-flex items-center gap-2 py-2 pl-3 text-[0.88rem] font-semibold text-ink-2 transition-colors hover:text-coral-t">
                  <ArrowUp className="size-4" aria-hidden /> Înapoi sus
                </a>
              </div>
            </aside>
          )}

          <div className="min-w-0">
            {!isForm && (
              <details className="group mb-6 rounded-2xl bg-paper ring-1 ring-line lg:hidden print:hidden">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center gap-3 px-5 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[1.12rem] font-semibold text-ink">Cuprins</span>
                  <span className="font-mono text-[0.8rem] text-coral-t">{d.toc.length} secțiuni</span>
                  <ChevronDown className="ml-auto size-5 text-muted transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <div className="border-t border-line px-2 pb-3 pt-2">
                  <LegalToc items={d.toc} />
                </div>
              </details>
            )}

            <article
              className="legal -mx-[18px] border-y border-line bg-paper px-[18px] py-9 sm:mx-0 sm:rounded-[26px] sm:border-0 sm:px-10 sm:py-12 sm:shadow-soft sm:ring-1 sm:ring-line lg:px-14 lg:py-14 print:m-0 print:rounded-none print:border-0 print:bg-transparent print:p-0 print:shadow-none print:ring-0"
              dangerouslySetInnerHTML={{ __html: nbHtml(d.body) }}
            />
          </div>
        </div>

        {/* Întrebări și celelalte documente */}
        <section className="border-t border-line bg-sand py-14 sm:py-20 print:hidden" aria-labelledby="legal-help">
          <div className="wrap grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-4">
                <span className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-coral font-display text-[1.5rem] font-bold text-white ring-4 ring-paper">
                  L<Photo className="object-[50%_35%]" />
                </span>
                <span className="leading-tight">
                  <b className="block text-[1.02rem] text-ink">Leonard Pădurean</b>
                  <small className="text-[0.9rem] text-muted">programator și profesor de programare</small>
                </span>
              </div>
              <h2 id="legal-help" className="mt-6 text-[clamp(1.75rem,3.6vw,2.4rem)] font-semibold">Ceva nu e clar? Întreabă‑mă direct.</h2>
              <p className="mt-4 max-w-[34em] text-[1.06rem] leading-relaxed text-ink-2">
                Îți explic pe înțeles orice punct din document, înainte să decizi ceva. Răspund {CONFIG.reply}.
              </p>
              <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center">
                <ButtonLink href={WA_HELLO} variant="wa" external><WaIcon /> Scrie‑mi pe WhatsApp</ButtonLink>
                <ButtonLink href={telLink} variant="ghost"><Phone className="size-[18px]" aria-hidden /> {CONFIG.phone}</ButtonLink>
              </div>
            </div>

            <div>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t">Celelalte documente</p>
              <ul className="mt-4 border-b border-[#e6d8c4]">
                {others.map((o) => (
                  <li key={o.slug} className="border-t border-[#e6d8c4]">
                    <Link href={`/${o.slug}/`} className="group flex items-center gap-4 py-5">
                      <span className="min-w-0 flex-1">
                        <b className="block font-display text-[1.25rem] font-semibold leading-snug text-ink transition-colors group-hover:text-coral-t">{nbText(o.title)}</b>
                        <span className="mt-1 block text-[0.95rem] text-ink-2">{nbText(o.desc)}</span>
                      </span>
                      <ArrowRight className="size-5 shrink-0 text-coral-t transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.9rem] leading-relaxed text-muted">
                Codito este operat de {nbText(c.name)}, CUI {c.cui}, {c.address}.
              </p>
            </div>
          </div>
        </section>
      </main>

      <div className="print:hidden"><Footer /></div>
    </>
  );
}
