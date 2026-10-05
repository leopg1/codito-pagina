import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark, Wordmark } from "../site/logo";
import { Footer } from "../site/footer";

export function LegalPage({ html }: { html: string }) {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[860px] items-center justify-between gap-3 px-[18px]">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Codito, pagina principală"><LogoMark className="size-9 text-[1.3rem]" /><Wordmark className="text-[1.3rem]" /></Link>
          <Link href="/" className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.92rem] font-semibold text-ink-2 hover:text-coral-t"><ArrowLeft className="size-4" /> Înapoi la site</Link>
        </div>
      </nav>
      <main className="mx-auto max-w-[860px] px-4 pb-20 pt-8 sm:px-[18px] sm:pt-10">
        <article className="legal rounded-[24px] border border-line bg-paper p-6 text-[16px] leading-[1.7] sm:p-12 sm:text-[17px]" dangerouslySetInnerHTML={{ __html: html }} />
      </main>
      <Footer />
    </>
  );
}
