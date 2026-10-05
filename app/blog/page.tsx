import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { formatDate, getPosts } from "@/lib/blog";
import { SiteHeader } from "@/components/site/site-header";
import { Footer } from "@/components/site/footer";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { E } from "@/components/ui/emoji";
import { Avatar, cat, nb } from "@/components/blog/bits";
import { QuestionsCard } from "@/components/blog/questions-card";
import { EndCta } from "@/components/blog/end-cta";

const title = "Blog pentru părinți: programare, AI și ecrane";
const description = "Articole practice pentru părinți: cu ce să înceapă copilul la programare, cum folosește corect AI-ul și cum faci timpul pe ecran util.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/", types: { "application/rss+xml": "/blog/rss.xml" } },
  openGraph: { type: "website", url: "/blog/", title: `${title} · Codito`, description, images: ["/og.png"] },
};

const d = (v: string) => ({ "--d": v }) as React.CSSProperties;

export default function BlogIndex() {
  const posts = getPosts();
  const [first, ...rest] = posts;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Blog", "@id": `${CONFIG.siteUrl}/blog/#blog`, name: "Blogul Codito", url: `${CONFIG.siteUrl}/blog/`, inLanguage: "ro", description, publisher: { "@id": `${CONFIG.siteUrl}/#org` },
        blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${CONFIG.siteUrl}/blog/${p.slug}/`, datePublished: p.date, dateModified: p.updated })) },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Codito", item: `${CONFIG.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${CONFIG.siteUrl}/blog/` },
      ] },
    ],
  };

  return (
    <>
      <SiteHeader active="blog" />
      <main>
        {/* antet cu personalitate, ca pe pagina principală */}
        <header className="relative overflow-hidden pb-14 pt-10 sm:pt-16 lg:pb-20">
          <div className="wrap grid items-center gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
            <div>
              <span className="rise block font-hand text-[1.3rem] font-bold leading-tight text-coral-t min-[380px]:text-[1.45rem] sm:text-[1.6rem]">Blogul Codito, pentru părinți</span>
              <h1 style={d(".1s")} className="rise mt-3 text-[clamp(2.3rem,5.6vw,4rem)] font-semibold">
                Pentru părinții care vor ca ecranul să <em className="not-italic text-coral">conteze</em>
              </h1>
              <p style={d(".2s")} className="rise mt-6 max-w-[34em] text-[1.12rem] leading-relaxed text-ink-2 sm:text-[1.2rem]">
                Articole scurte, pe înțelesul oricui, despre <span className="hl">programare, inteligență artificială</span> și timpul pe care copiii îl petrec pe calculator.
              </p>
              <div style={d(".3s")} className="rise mt-8 flex items-center gap-3.5 border-t border-line pt-6">
                <Avatar ring className="size-12 text-[1.1rem]" />
                <p className="text-[0.95rem] leading-snug text-ink-2">
                  Scrise de <b className="text-ink">Leonard Pădurean</b>, programator și profesorul de la fiecare lecție
                </p>
              </div>
            </div>
            <QuestionsCard posts={posts} />
          </div>
        </header>

        {first && <Featured p={first} />}

        {rest.length > 0 && (
          <section className="section !pt-14 sm:!pt-20" aria-labelledby="toate">
            <div className="wrap">
              <Reveal className="flex items-end justify-between gap-6">
                <h2 id="toate" className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold">Toate articolele</h2>
                <a href="/blog/rss.xml" className="shrink-0 px-1 py-3 font-mono text-[0.82rem] text-muted transition-colors hover:text-coral-t">RSS</a>
              </Reveal>
              <Stagger as="ul" className="mt-6 border-b border-line">
                {rest.map((p) => {
                  const c = cat(p.category);
                  return (
                    <StaggerItem as="li" key={p.slug} className="border-t border-line">
                      <Link href={`/blog/${p.slug}/`} className="group grid gap-x-10 gap-y-2 py-7 sm:grid-cols-[170px_1fr_auto] sm:py-9">
                        <p className="flex flex-wrap items-center gap-x-2 text-[0.9rem] text-muted sm:block sm:pt-1.5">
                          <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t">{p.category}</span>
                          <span className="sm:hidden" aria-hidden>·</span>
                          <time dateTime={p.date} className="sm:mt-1 sm:block">{formatDate(p.date)}</time>
                        </p>
                        <div className="min-w-0">
                          <h3 className="text-[clamp(1.35rem,2.8vw,1.7rem)] font-semibold leading-snug text-ink transition-colors group-hover:text-coral-t">{nb(p.title)}</h3>
                          <p className="mt-2 max-w-[60ch] leading-relaxed text-ink-2">{nb(p.excerpt)}</p>
                        </div>
                        <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between sm:pt-1">
                          <E e={c.e} className="text-[1.5rem] max-sm:hidden" />
                          <span className="flex items-center gap-2 font-mono text-[0.8rem] text-muted">
                            {p.minutes} min
                            <span className="grid size-9 place-items-center rounded-full ring-1 ring-line transition group-hover:bg-cta group-hover:text-white group-hover:ring-cta"><ArrowRight className="size-4" aria-hidden /></span>
                          </span>
                        </div>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </section>
        )}

        <EndCta title={<>Citești ca să știi cu ce să înceapă. <span className="text-[#ffb08f]">Lecția gratuită</span> îți arată.</>}>
          45 de minute, unu la unu, online. Copilul își face primul program, iar tu primești de la mine o evaluare scrisă: de unde pornește și ce i s‑ar potrivi.
        </EndCta>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}

function Featured({ p }: { p: ReturnType<typeof getPosts>[number] }) {
  const c = cat(p.category);
  return (
    <section className="border-y border-line bg-paper py-14 sm:py-20" aria-labelledby="nou">
      <div className="wrap">
        <Reveal>
          <Link href={`/blog/${p.slug}/`} className="group grid overflow-hidden rounded-2xl bg-cream shadow-lift ring-1 ring-line transition duration-300 hover:-translate-y-1 md:grid-cols-[1.25fr_.75fr]">
            <div className="flex flex-col p-6 sm:p-10 lg:p-12">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t">
                <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-coral" aria-hidden />Cel mai nou</span>
                <span className="text-muted">{p.category}</span>
              </p>
              <h2 id="nou" className="mt-4 text-[clamp(1.75rem,3.8vw,2.7rem)] font-semibold leading-[1.1] text-ink transition-colors group-hover:text-coral-t">{nb(p.title)}</h2>
              <p className="mt-4 max-w-[52ch] text-[1.06rem] leading-relaxed text-ink-2">{nb(p.excerpt)}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-8">
                <span className="inline-flex items-center gap-2.5 rounded-full bg-cta px-6 py-3.5 text-[0.98rem] font-semibold text-white shadow-coral transition group-hover:bg-cta-d">
                  Citește articolul <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
                <span className="text-[0.9rem] text-muted"><time dateTime={p.date}>{formatDate(p.date)}</time> · <span className="font-mono text-[0.82rem]">{p.minutes} min</span></span>
              </div>
            </div>
            {p.headings.length > 0 && (
              <div className={`${c.tone} border-t border-line p-6 sm:p-10 md:border-l md:border-t-0 lg:p-12`}>
                <p className="flex items-center gap-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-ink-2">
                  <E e={c.e} className="text-[1.35rem]" /> În articol
                </p>
                <ol className="mt-5">
                  {p.headings.slice(0, 5).map((h, i) => (
                    <li key={h.id} className="grid grid-cols-[2rem_1fr] border-t border-ink/10 py-3 text-[0.98rem] leading-snug text-ink first:border-t-0 first:pt-0">
                      <span className="font-mono text-[0.8rem] font-semibold text-coral-t">{String(i + 1).padStart(2, "0")}</span>
                      <span>{nb(h.text.replace(/^\d+\.\s*/, ""))}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
