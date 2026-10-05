import Link from "next/link";
import { LogoMark, Wordmark } from "./logo";

/** Antet pentru paginile secundare (blog): logo, Lecții, Blog și butonul spre lecția gratuită. */
export function SiteHeader({ active }: { active?: "blog" }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-cream/[.97] backdrop-blur-xl">
      <div className="wrap flex h-16 items-center gap-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 py-1" aria-label="Codito, pagina principală">
          <LogoMark className="size-9 text-[1.3rem]" /><Wordmark className="text-[1.3rem]" />
        </Link>
        <div className="ml-auto flex items-center gap-1 text-[0.95rem] font-medium text-ink-2 sm:gap-2">
          <Link href="/" className="hidden px-3 py-3 transition-colors hover:text-coral-t min-[400px]:inline-block">Lecții</Link>
          <Link href="/blog/" aria-current={active === "blog" ? "page" : undefined} className="px-3 py-3 transition-colors hover:text-coral-t aria-[current=page]:text-coral-t">Blog</Link>
          <Link href="/#plan" className="ml-1 whitespace-nowrap rounded-full bg-cta px-4 py-2.5 text-[0.9rem] font-semibold text-white transition hover:bg-cta-d sm:px-5">Lecția gratuită</Link>
        </div>
      </div>
    </nav>
  );
}
