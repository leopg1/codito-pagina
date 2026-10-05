import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { SiteHeader } from "@/components/site/site-header";
import { Footer } from "@/components/site/footer";
import { Markdown } from "@/components/blog/markdown";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { E } from "@/components/ui/emoji";
import { Avatar, cat, nb } from "@/components/blog/bits";
import { EndCta } from "@/components/blog/end-cta";

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.seoTitle,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/`, types: { "application/rss+xml": "/blog/rss.xml" } },
    authors: [{ name: "Leonard Pădurean", url: `${CONFIG.siteUrl}/#despre` }],
    openGraph: {
      type: "article", url: `/blog/${p.slug}/`, title: p.title, description: p.description,
      publishedTime: `${p.date}T09:00:00+03:00`, modifiedTime: `${p.updated}T09:00:00+03:00`, authors: ["Leonard Pădurean"], section: p.category,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: p.title }],
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

const d = (v: string) => ({ "--d": v }) as React.CSSProperties;

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = getPosts().filter((p) => p.slug !== post.slug).sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category)).slice(0, 3);
  const url = `${CONFIG.siteUrl}/blog/${post.slug}/`;
  const c = cat(post.category);
  const toc = post.headings.length > 2;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: `${post.date}T09:00:00+03:00`,
        dateModified: `${post.updated}T09:00:00+03:00`,
        inLanguage: "ro",
        articleSection: post.category,
        wordCount: post.words,
        mainEntityOfPage: url,
        image: `${CONFIG.siteUrl}/og.png`,
        author: { "@type": "Person", "@id": `${CONFIG.siteUrl}/#leonard`, name: "Leonard Pădurean", url: `${CONFIG.siteUrl}/#despre` },
        publisher: { "@id": `${CONFIG.siteUrl}/#org` },
        isPartOf: { "@id": `${CONFIG.siteUrl}/blog/#blog` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Codito", item: `${CONFIG.siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${CONFIG.siteUrl}/blog/` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <SiteHeader active="blog" progress />
      <main>
        <article>
          {/* antetul articolului */}
          <header className="border-b border-line">
            <div className="wrap pb-10 pt-6 sm:pb-14 sm:pt-10">
              <nav aria-label="Navigare" className="rise text-[0.9rem] text-muted">
                <Link href="/" className="inline-block py-2.5 hover:text-coral-t">Codito</Link>
                <span className="mx-2 text-line" aria-hidden>/</span>
                <Link href="/blog/" className="inline-block py-2.5 hover:text-coral-t">Blog</Link>
              </nav>
              <div className="mt-5 grid items-end gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
                <div>
                  <p style={d(".05s")} className="rise flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t"><E e={c.e} className="text-[1.15rem]" />{post.category}</span>
                    <span className="font-mono text-[0.8rem] text-muted">{post.minutes} min de citit</span>
                  </p>
                  <h1 style={d(".1s")} className="rise mt-4 max-w-[860px] text-[clamp(2.2rem,5.4vw,3.7rem)] font-semibold leading-[1.06]">{nb(post.title)}</h1>
                  <p style={d(".2s")} className="rise mt-6 max-w-[640px] text-[1.12rem] leading-relaxed text-ink-2 sm:text-[1.2rem]">{nb(post.description)}</p>
                </div>
                <div style={d(".3s")} className="rise flex items-center gap-3.5 border-t border-line pt-6 lg:block lg:rounded-2xl lg:border-0 lg:bg-paper lg:p-6 lg:shadow-soft lg:ring-1 lg:ring-line">
                  <Avatar ring className="size-14 text-[1.2rem] lg:size-16" />
                  <div className="min-w-0 leading-snug lg:mt-4">
                    <p className="font-semibold text-ink">Leonard Pădurean</p>
                    <p className="text-[0.9rem] text-muted">Programator, profesorul de la fiecare lecție</p>
                    <p className="mt-1.5 text-[0.88rem] text-ink-2 lg:mt-3 lg:border-t lg:border-line lg:pt-3">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      {post.updated !== post.date && <span className="block text-muted">actualizat <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="wrap grid gap-12 pb-20 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,690px)_1fr] lg:gap-16 xl:gap-24">
            <div className="min-w-0">
              {toc && (
                <details className="group mb-10 rounded-2xl bg-paper ring-1 ring-line lg:hidden">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 text-[0.95rem] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2.5"><span className="font-mono text-[0.8rem] text-coral-t">{String(post.headings.length).padStart(2, "0")}</span> părți în acest articol</span>
                    <span aria-hidden className="grid size-7 place-items-center rounded-full bg-cream text-[1.1rem] leading-none text-ink-2 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <ol className="border-t border-line px-5 pb-2">
                    {post.headings.map((h, i) => (
                      <li key={h.id} className="border-b border-line last:border-0">
                        <a href={`#${h.id}`} className="grid grid-cols-[2rem_1fr] py-3 text-[0.95rem] leading-snug text-ink-2">
                          <span className="pt-px font-mono text-[0.78rem] font-semibold text-coral-t">{String(i + 1).padStart(2, "0")}</span>
                          <span>{nb(h.text.replace(/^\d+\.\s*/, ""))}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
              <Markdown source={post.body} />

              {/* despre autor */}
              <Reveal className="mt-16 rounded-2xl bg-paper p-6 shadow-soft ring-1 ring-line sm:p-8">
                <div className="flex items-center gap-4">
                  <Avatar ring className="size-16 text-[1.4rem] sm:size-[72px]" />
                  <div className="min-w-0 leading-snug">
                    <p className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t">Cine scrie</p>
                    <p className="mt-1 font-display text-[1.3rem] font-semibold text-ink">Leonard Pădurean</p>
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-ink-2">Sunt programator software de 5 ani și predau programare copiilor de peste un an. La Codito țin eu fiecare lecție, unu la unu, iar aici scriu despre întrebările pe care le aud de la părinți.</p>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                  <Link href="/#despre" className="inline-flex items-center gap-1.5 py-2 font-semibold text-coral-t underline decoration-1 underline-offset-4 hover:decoration-2">Mai multe despre mine <ArrowRight className="size-4" aria-hidden /></Link>
                  <span className="font-hand text-[2.1rem] leading-none text-coral-t" aria-hidden>Leonard</span>
                </div>
              </Reveal>
            </div>

            {toc && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <nav aria-label="Cuprins">
                    <p className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-muted">În acest articol</p>
                    <ol className="mt-4 border-t-2 border-ink/80">
                      {post.headings.map((h, i) => (
                        <li key={h.id} className="border-b border-line">
                          <a href={`#${h.id}`} className="group grid grid-cols-[2rem_1fr] py-3 text-[0.95rem] leading-snug text-ink-2 transition-colors hover:text-coral-t">
                            <span className="pt-px font-mono text-[0.78rem] font-semibold text-coral-t">{String(i + 1).padStart(2, "0")}</span>
                            <span>{nb(h.text.replace(/^\d+\.\s*/, ""))}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                  <a href="/#plan" className="group mt-8 block rounded-2xl bg-ink p-5 text-white transition hover:-translate-y-0.5 hover:shadow-lift">
                    <span className="flex items-center gap-2 text-[0.92rem] font-semibold"><E e="🎁" className="text-[1.2rem]" /> Prima lecție e gratuită</span>
                    <span className="mt-1.5 block text-[0.88rem] leading-snug text-[#c3c8dd]">45 de minute, unu la unu, online. Fără obligații.</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-[#ffb08f]">Programează <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                  </a>
                </div>
              </aside>
            )}
          </div>
        </article>

        {others.length > 0 && (
          <section className="section border-t border-line bg-sand" aria-labelledby="mai-citeste">
            <div className="wrap">
              <Reveal className="flex items-end justify-between gap-6">
                <h2 id="mai-citeste" className="text-[clamp(1.6rem,3.4vw,2.2rem)] font-semibold">Mai citește</h2>
                <Link href="/blog/" className="inline-flex shrink-0 items-center gap-1.5 py-2 text-[0.95rem] font-semibold text-ink-2 hover:text-coral-t">Toate articolele <ArrowRight className="size-4" aria-hidden /></Link>
              </Reveal>
              <Stagger as="ul" className="mt-8 grid gap-x-8 md:grid-cols-3">
                {others.map((p) => (
                  <StaggerItem as="li" key={p.slug} className="border-t-2 border-ink/80">
                    <Link href={`/blog/${p.slug}/`} className="group flex h-full flex-col py-5 sm:py-6">
                      <span className="flex items-center justify-between">
                        <span className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t">{p.category}</span>
                        <E e={cat(p.category).e} className="text-[1.4rem]" />
                      </span>
                      <span className="mt-2 font-display text-[1.25rem] font-semibold leading-snug text-ink transition-colors group-hover:text-coral-t">{nb(p.title)}</span>
                      <span className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{nb(p.excerpt)}</span>
                      <span className="mt-auto flex items-center gap-2 pt-4 font-mono text-[0.8rem] text-muted">
                        {p.minutes} min
                        <ArrowRight className="size-4 text-coral-t opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" aria-hidden />
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        <EndCta title={<>Vrei să vezi cum ar fi pentru <span className="text-[#ffb08f]">copilul tău</span>?</>}>
          Prima lecție e gratuită: 45 de minute, unu la unu, online. Copilul își face primul program, iar tu primești de la mine o evaluare scrisă: de unde pornește și ce i s‑ar potrivi.
        </EndCta>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
