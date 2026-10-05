import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CONFIG } from "@/lib/config";
import { formatDate, getPost, getPosts } from "@/lib/blog";
import { SiteHeader } from "@/components/site/site-header";
import { Footer } from "@/components/site/footer";
import { Markdown } from "@/components/blog/markdown";
import { ButtonLink } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";

export const dynamicParams = false;
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}/` },
    authors: [{ name: "Leonard Pădurean", url: `${CONFIG.siteUrl}/#despre` }],
    openGraph: {
      type: "article", url: `/blog/${p.slug}/`, title: p.title, description: p.description,
      publishedTime: p.date, modifiedTime: p.updated, authors: ["Leonard Pădurean"], section: p.category,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: p.title }],
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

function Author({ big = false }: { big?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-coral font-display font-bold text-white ${big ? "size-16 text-[1.4rem]" : "size-11 text-[1rem]"}`}>
        L<Photo className="scale-[1.5] object-[50%_42%]" />
      </span>
      <span className="leading-tight">
        <b className="block text-ink">Leonard Pădurean</b>
        <span className="text-[0.9rem] text-muted">Programator și profesor Codito</span>
      </span>
    </span>
  );
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const others = getPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = `${CONFIG.siteUrl}/blog/${post.slug}/`;

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated,
        inLanguage: "ro",
        articleSection: post.category,
        wordCount: post.minutes * 200,
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
      <SiteHeader active="blog" />
      <main>
        <article>
          <header className="wrap pb-8 pt-8 sm:pb-12 sm:pt-14">
            <nav aria-label="Navigare" className="text-[0.9rem] text-muted">
              <Link href="/" className="py-2 hover:text-coral-t">Codito</Link>
              <span className="mx-2" aria-hidden>/</span>
              <Link href="/blog/" className="py-2 hover:text-coral-t">Blog</Link>
            </nav>
            <p className="mt-6 text-[0.95rem] font-semibold text-coral-t">{post.category}</p>
            <h1 className="mt-3 max-w-[820px] text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.08]">{post.title}</h1>
            <p className="mt-5 max-w-[680px] text-[1.15rem] leading-relaxed text-ink-2">{post.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
              <Author />
              <p className="text-[0.92rem] text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min de citit
                {post.updated !== post.date && <> · actualizat <time dateTime={post.updated}>{formatDate(post.updated)}</time></>}
              </p>
            </div>
          </header>

          <div className="wrap grid gap-12 pb-16 lg:grid-cols-[minmax(0,680px)_1fr] lg:gap-16 xl:gap-24">
            <div className="min-w-0">
              <Markdown source={post.body} />

              <div className="mt-14 rounded-2xl bg-ink p-6 text-white sm:p-9">
                <p className="font-display text-[1.45rem] font-semibold leading-snug text-white">Prima lecție e gratuită</p>
                <p className="mt-2 leading-relaxed text-[#c3c8dd]">45 de minute, unu la unu, online. Copilul își face primul program, iar tu primești o evaluare scrisă despre de unde pornește și ce i s‑ar potrivi.</p>
                <ButtonLink href="/#plan" arrow className="mt-6 w-full sm:w-auto">Programează lecția gratuită</ButtonLink>
              </div>

              <div className="mt-12 border-t border-line pt-8">
                <Author big />
                <p className="mt-4 max-w-[60ch] leading-relaxed text-ink-2">Sunt programator software de 5 ani și predau programare copiilor de peste un an. La Codito țin eu fiecare lecție, unu la unu. <Link href="/#despre" className="font-semibold text-coral-t underline underline-offset-4">Mai multe despre mine</Link></p>
              </div>
            </div>

            {post.headings.length > 2 && (
              <aside className="hidden lg:block">
                <nav aria-label="Cuprins" className="sticky top-24">
                  <p className="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-muted">În acest articol</p>
                  <ol className="mt-4 grid gap-1 border-l border-line">
                    {post.headings.map((h) => (
                      <li key={h.id}><a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[0.95rem] leading-snug text-ink-2 transition-colors hover:border-coral hover:text-ink">{h.text}</a></li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}
          </div>
        </article>

        {others.length > 0 && (
          <section className="border-t border-line bg-sand py-14 sm:py-20" aria-label="Alte articole">
            <div className="wrap">
              <h2 className="text-[clamp(1.5rem,3.2vw,2rem)] font-semibold">Mai citește</h2>
              <ul className="mt-8 grid gap-x-10 md:grid-cols-3">
                {others.map((p) => (
                  <li key={p.slug} className="border-t-2 border-ink/80">
                    <Link href={`/blog/${p.slug}/`} className="group block py-5">
                      <p className="text-[0.88rem] font-semibold text-coral-t">{p.category}</p>
                      <p className="mt-2 font-display text-[1.2rem] font-semibold leading-snug text-ink transition-colors group-hover:text-coral-t">{p.title}</p>
                      <p className="mt-2 text-[0.9rem] text-muted">{p.minutes} min de citit</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
