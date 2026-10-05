import { ExternalLink, Star } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { PROJECTS, TESTIMONIALS } from "@/lib/content";
import { SectionHead } from "../ui/section-head";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";

/** Proiecte reale și păreri de la părinți. Nu apare deloc până nu există conținut real în lib/content.ts. */
export function Proof() {
  if (!PROJECTS.length && !TESTIMONIALS.length) return null;
  return (
    <section id="rezultate" className="section border-t border-line bg-paper">
      <div className="wrap">
        <SectionHead center={false} title={PROJECTS.length ? "Ce au construit copiii" : "Ce spun părinții"} />

        {PROJECTS.length > 0 && (
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <StaggerItem key={p.title} className="min-w-0">
                <figure>
                  <div className="overflow-hidden rounded-xl bg-sand ring-1 ring-line">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={`${p.title}, proiect făcut de ${p.kid}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                  </div>
                  <figcaption className="mt-3">
                    <b className="block text-[1.05rem]">{p.title}</b>
                    <span className="text-[0.92rem] text-muted">{p.kid}{p.note ? ` · ${p.note}` : ""}</span>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener" className="mt-1 flex items-center gap-1 text-[0.92rem] font-semibold text-coral-t">Deschide proiectul <ExternalLink className="size-3.5" /></a>
                    )}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {TESTIMONIALS.length > 0 && (
          <>
            {PROJECTS.length > 0 && <h3 className="mt-16 text-[1.3rem] font-semibold">Ce spun părinții</h3>}
            <Stagger className="mt-6 grid gap-x-10 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <StaggerItem key={t.name} className="border-t border-line py-6">
                  <blockquote className="text-[1.06rem] leading-relaxed text-ink">„{t.text}”</blockquote>
                  <p className="mt-3 text-[0.92rem]"><b>{t.name}</b><span className="text-muted"> · {t.detail}</span></p>
                </StaggerItem>
              ))}
            </Stagger>
          </>
        )}

        {CONFIG.googleReviewsUrl && (
          <Reveal className="mt-6">
            <a href={CONFIG.googleReviewsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-semibold text-coral-t underline underline-offset-4">
              <Star className="size-4 fill-sun text-sun" aria-hidden /> Vezi toate recenziile pe Google
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
