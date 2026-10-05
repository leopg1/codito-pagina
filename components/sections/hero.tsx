import { ButtonLink } from "../ui/button";
import { HeroVisual } from "./hero-visual";

export function Hero() {
  return (
    <header id="top" className="relative overflow-hidden pb-14 pt-8 sm:pt-16 lg:pb-20">

      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
        <div>
          <span
            className="rise block font-hand text-[1.45rem] font-bold leading-tight text-coral-t sm:text-[1.6rem]"
          >
            Pentru copii și adolescenți de <span className="whitespace-nowrap">9–17 ani</span>
          </span>

          <h1 className="mt-3 text-[clamp(2.3rem,5.6vw,4rem)] font-semibold">
            <span
              style={{ "--d": ".05s" } as React.CSSProperties}
              className="rise relative mb-2 block w-fit text-[0.6em] font-medium text-muted"
            >
              „Iar stă pe telefon…”
              <span
                aria-hidden
                className="strike absolute inset-x-[-4px] top-[54%] h-[3px] origin-left -rotate-2 rounded bg-coral"
              />
            </span>
            <span
              style={{ "--d": ".2s" } as React.CSSProperties}
              className="rise block"
            >
              „Mama, <em className="not-italic text-coral">uite ce am construit!</em>”
            </span>
          </h1>

          <p
            style={{ "--d": ".3s" } as React.CSSProperties}
            className="rise mt-6 max-w-[34em] text-[1.12rem] leading-relaxed text-ink-2 sm:text-[1.2rem]"
          >
            Lecții online, <strong className="text-ink">unu la unu</strong>, în care copilul tău învață programare și inteligență artificială construind lucruri adevărate: <span className="hl">jocuri, <span className="whitespace-nowrap">site-uri</span>, aplicații</span>. Explicat simplu, pe înțelesul lui și al tău.
          </p>

          <div
            style={{ "--d": ".4s" } as React.CSSProperties}
            className="rise mt-8 flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <ButtonLink href="#plan" arrow>Vreau lecția gratuită 1:1</ButtonLink>
            <ButtonLink href="#traseu" variant="ghost">Ce va construi copilul? ↓</ButtonLink>
          </div>
          <p style={{ "--d": ".5s" } as React.CSSProperties} className="rise mt-4 text-[0.95rem] text-muted">
            Nu e nevoie de experiență. Copilul pornește de la zero și învață în ritmul lui.
          </p>
        </div>

        <HeroVisual />
      </div>
    </header>
  );
}
