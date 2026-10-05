import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { formatDate, getPosts } from "@/lib/blog";
import { SiteHeader } from "@/components/site/site-header";
import { Footer } from "@/components/site/footer";

const title = "Blog pentru părinți: programare, AI și ecrane";
const description = "Articole practice pentru părinți: cu ce să înceapă copilul la programare, cum folosește corect AI-ul și cum faci timpul pe ecran util.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog/", types: { "application/rss+xml": "/blog/rss.xml" } },
  openGraph: { type: "website", url: "/blog/", title: `${title} · Codito`, description, images: ["/og.png"] },
};

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
        <header className="wrap pb-10 pt-12 sm:pb-14 sm:pt-20">
          <p className="text-[0.95rem] font-semibold text-coral-t">Blogul Codito</p>
          <h1 className="mt-3 max-w-[760px] text-[clamp(2.1rem,5.4vw,3.4rem)] font-semibold leading-[1.06]">Pentru părinții care vor ca ecranul să conteze</h1>
          <p className="mt-5 max-w-[620px] text-[1.12rem] leading-relaxed text-ink-2">Articole scurte, scrise pe înțelesul oricui, despre programare, inteligență artificială și timpul pe care copiii îl petrec pe calculator.</p>
        </header>

        {first && (
          <section className="wrap" aria-label="Cel mai nou articol">
            <Link href={`/blog/${first.slug}/`} className="group grid gap-6 rounded-2xl bg-ink p-6 text-white transition hover:shadow-lift sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
              <div>
                <p className="text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-[#ffb08f]">{first.category} · cel mai nou</p>
                <h2 className="mt-3 text-[clamp(1.6rem,3.6vw,2.4rem)] font-semibold leading-[1.12] text-white">{first.title}</h2>
              </div>
              <div>
                <p className="leading-relaxed text-[#c3c8dd]">{first.excerpt}</p>
                <p className="mt-5 flex items-center gap-2 text-[0.92rem] font-semibold text-white">
                  Citește articolul <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  <span className="ml-auto font-normal text-[#a3aac4]">{first.minutes} min de citit</span>
                </p>
              </div>
            </Link>
          </section>
        )}

        <section className="wrap pb-20 pt-12 sm:pb-28 sm:pt-16" aria-label="Toate articolele">
          <ul className="border-t border-line">
            {rest.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link href={`/blog/${p.slug}/`} className="group grid gap-2 py-7 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-9">
                  <p className="text-[0.9rem] text-muted sm:pt-1.5">
                    <span className="font-semibold text-coral-t">{p.category}</span>
                    <span className="block max-sm:inline"><span className="sm:hidden"> · </span>{formatDate(p.date)}</span>
                  </p>
                  <div>
                    <h2 className="text-[clamp(1.3rem,2.8vw,1.65rem)] font-semibold leading-snug text-ink transition-colors group-hover:text-coral-t">{p.title}</h2>
                    <p className="mt-2 max-w-[62ch] leading-relaxed text-ink-2">{p.excerpt}</p>
                    <p className="mt-3 text-[0.9rem] text-muted">{p.minutes} min de citit</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
