import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { Footer } from "@/components/site/footer";
import { ButtonLink } from "@/components/ui/button";
import { E } from "@/components/ui/emoji";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = { title: "Pagina nu există", robots: { index: false, follow: true } };

const LINKS = [
  { href: "/inscriere/", e: "🧪", title: `Atelier gratuit, ${CONFIG.workshop.date}`, desc: "Online, primul joc pe calculator. Înscrie copilul aici." },
  { href: "/blog/", e: "📚", title: "Blogul pentru părinți", desc: "Ghiduri despre programare, AI și ecrane." },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-hidden">
        <section className="wrap grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:min-h-[calc(100vh-64px-120px)] lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pb-24">
          <div>
            <span className="rise block font-hand text-[1.45rem] font-bold leading-tight text-coral-t sm:text-[1.6rem]">Eroarea 404, pe românește:</span>
            <h1 style={{ "--d": ".08s" } as React.CSSProperties} className="rise mt-3 text-[clamp(2.3rem,5.6vw,3.9rem)] font-semibold">
              Pagina asta <em className="not-italic text-coral">nu există</em>.
            </h1>
            <p style={{ "--d": ".18s" } as React.CSSProperties} className="rise mt-5 max-w-[32em] text-[1.1rem] leading-relaxed text-ink-2 sm:text-[1.18rem]">
              Poate linkul are o greșeală de tastare sau pagina a fost mutată. Se întâmplă și programatorilor, de câteva ori pe zi. Alege de aici unde mergi mai departe.
            </p>
            <div style={{ "--d": ".28s" } as React.CSSProperties} className="rise mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
              <ButtonLink href="/" arrow>Înapoi la pagina principală</ButtonLink>
              <ButtonLink href="/#plan" variant="ghost">Vreau lecția gratuită →</ButtonLink>
            </div>

            <ul style={{ "--d": ".38s" } as React.CSSProperties} className="rise mt-10 max-w-[520px] border-b border-line">
              {LINKS.map((l) => (
                <li key={l.href} className="border-t border-line">
                  <Link href={l.href} className="group flex items-center gap-4 py-4">
                    <E e={l.e} className="text-[1.35rem]" />
                    <span className="min-w-0 flex-1 leading-snug">
                      <b className="block text-[1.02rem] text-ink transition-colors group-hover:text-coral-t">{l.title}</b>
                      <span className="text-[0.93rem] text-muted">{l.desc}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-coral-t transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Console />
        </section>
      </main>
      <Footer />
    </>
  );
}

/** Mică „consolă” Python, în stilul lecțiilor: eroarea, apoi rezolvarea. */
function Console() {
  return (
    <div style={{ "--d": ".2s" } as React.CSSProperties} className="rise relative mx-auto w-full max-w-[480px] lg:ml-auto" aria-hidden>
      <div className="rounded-[26px] bg-ink p-3 shadow-[0_40px_80px_-28px_rgb(30_36_66/.6)] ring-1 ring-white/5">
        <div className="flex items-center justify-between px-1.5 pb-3.5 pt-1.5 text-[0.8rem] font-medium text-[#c3c8dd]">
          <span className="flex items-center gap-1.5">
            <i className="size-2.5 rounded-full bg-[#ff5a4f]" /><i className="size-2.5 rounded-full bg-[#ffbd2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="font-mono">codito.py</span>
          <span className="w-[42px]" />
        </div>
        <div className="overflow-hidden rounded-2xl bg-night px-4 pb-5 pt-[18px] font-mono text-[0.72rem] leading-[1.8] text-[#d8def5] min-[360px]:text-[0.76rem] sm:px-5 sm:text-[0.84rem]">
          <pre className="whitespace-pre-wrap break-words">
            <span className="text-[#6e7aa3]">&gt;&gt;&gt; </span>pagina = site.deschide(<span className="text-[#9be7be]">&quot;/aici&quot;</span>)<br />
            <span className="text-[#ff9e7a]">PaginaNegasita: 404</span><br /><br />
            <span className="text-[#6e7aa3]"># Nicio problemă. Încercăm altceva:</span><br />
            <span className="text-[#6e7aa3]">&gt;&gt;&gt; </span>site.deschide(<span className="text-[#9be7be]">&quot;/&quot;</span>)
          </pre>
          <div className="mt-3 border-t border-dashed border-[#2a3156] pt-3 text-[#9be7be]">
            ▶ Bine ai revenit la Codito! <span className="inline-block h-[1.05em] w-2 animate-blink bg-coral align-[-3px]" />
          </div>
        </div>
      </div>
      <div className="absolute -right-2 -top-7 rotate-[4deg] rounded-2xl bg-paper px-4 py-3 shadow-soft ring-1 ring-line sm:-right-6">
        <span className="block font-mono text-[2.1rem] font-semibold leading-none text-coral">404</span>
        <small className="text-[0.78rem] text-muted">pagină negăsită</small>
      </div>
    </div>
  );
}
