import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark, Wordmark } from "../site/logo";
import { Footer } from "../site/footer";

/** Cratimă care nu se rupe la capăt de rând, doar în text (nu în atribute). */
const nbHtml = (h: string) => h.replace(/>([^<]+)</g, (_, t: string) => ">" + t.replace(/(\p{L})-(\p{L})/gu, "$1\u2011$2").replace(/(\d) (lei|zile|de|minute|luni|ani|ore)\b/g, "$1\u00a0$2") + "<");

export function LegalPage({ html }: { html: string }) {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[860px] items-center justify-between gap-3 px-[18px]">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Codito, pagina principală"><LogoMark className="size-9 text-[1.3rem]" /><Wordmark className="text-[1.3rem]" /></Link>
          <Link href="/" className="-mr-2 inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-3 text-[0.92rem] font-semibold text-ink-2 hover:text-coral-t"><ArrowLeft className="size-4" /> Înapoi la site</Link>
        </div>
      </nav>
      <main className="mx-auto max-w-[860px] px-4 pb-20 pt-8 sm:px-[18px] sm:pt-10">
        <article className="legal text-[16px] leading-[1.7] sm:rounded-[24px] sm:border sm:border-line sm:bg-paper sm:p-12 sm:text-[17px]" dangerouslySetInnerHTML={{ __html: nbHtml(html) }} />
      </main>
      <Footer />
    </>
  );
}
