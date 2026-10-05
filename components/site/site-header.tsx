import Link from "next/link";
import { LogoMark, Wordmark } from "./logo";
import { ReadingProgress } from "../blog/reading-progress";

const link =
  "relative px-2 py-3 transition-colors hover:text-coral-t aria-[current=page]:text-coral-t lg:px-0 lg:after:absolute lg:after:bottom-2 lg:after:left-0 lg:after:h-0.5 lg:after:w-0 lg:after:rounded lg:after:bg-coral lg:after:transition-all hover:lg:after:w-full aria-[current=page]:lg:after:w-full";

/** Antet pentru paginile secundare: logo, Lecții, Blog și butonul spre lecția gratuită. */
export function SiteHeader({ active, progress = false, cta = { href: "/#plan", label: "Lecția gratuită" } }: { active?: "blog"; progress?: boolean; cta?: { href: string; label: string } }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-cream/85 shadow-[0_8px_30px_-24px_rgb(30_36_66/.35)] backdrop-blur-xl">
      <div className="wrap flex h-16 items-center gap-2 sm:h-[68px] sm:gap-4">
        <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2.5 sm:gap-3" aria-label="Codito, pagina principală">
          <LogoMark className="size-9 sm:size-10" />
          <span className="flex min-w-0 flex-col gap-[5px] leading-none max-[359px]:hidden">
            <Wordmark className="block text-[1.3rem] sm:text-[1.45rem]" />
            <small className="hidden text-[0.78rem] leading-tight text-muted md:block">Programare & AI pentru copii și adolescenți</small>
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-1 text-[0.95rem] font-medium text-ink-2 sm:gap-3 lg:gap-7">
          <Link href="/" className={`${link} hidden min-[400px]:inline-block`}>Lecții</Link>
          <Link href="/blog/" aria-current={active === "blog" ? "page" : undefined} className={link}>Blog</Link>
        </div>
        <Link
          href={cta.href}
          className="inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-cta px-4 text-[0.88rem] font-semibold leading-none text-white shadow-coral transition hover:-translate-y-0.5 hover:bg-cta-d sm:px-5 sm:text-[0.94rem] lg:ml-3"
        >
          {cta.label}
        </Link>
      </div>
      {progress && <ReadingProgress />}
    </nav>
  );
}
