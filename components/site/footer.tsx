import Link from "next/link";
import { CONFIG, WA_HELLO, telLink } from "@/lib/config";
import { LogoMark, Wordmark } from "./logo";
import { TOPICS } from "@/lib/topics";

export function Footer({ pad = false }: { pad?: boolean }) {
  const c = CONFIG.company;
  return (
    <footer className={`border-t border-white/10 bg-ink pt-12 sm:pt-14 ${pad ? "pb-[calc(96px+env(safe-area-inset-bottom))] md:pb-14" : "pb-[calc(40px+env(safe-area-inset-bottom))] sm:pb-14"} text-[0.9rem] text-[#a3aac4]`}>
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-[1.1fr_1fr_.9fr_1.4fr_1.1fr]">
        <div className="col-span-2 space-y-3 lg:col-span-1">
          <div className="flex items-center gap-3"><LogoMark className="size-9 text-[1.3rem]" /><Wordmark light /></div>
          <p>Programare & AI pentru copii și adolescenți. Lecții 1:1, online.</p>
        </div>
        <FootCol title="Lecții">
          {TOPICS.map((t) => <Link key={t.slug} href={`/${t.slug}/`} className="py-2.5 hover:text-white">{t.eyebrow}</Link>)}
          <Link href="/blog/" className="py-2.5 font-semibold text-white/90 hover:text-white">Blog pentru părinți</Link>
        </FootCol>
        <FootCol title="Contact">
          <a href={telLink} className="py-2.5 hover:text-white">{CONFIG.phone}</a>
          <a href={WA_HELLO} target="_blank" rel="noopener" className="py-2.5 hover:text-white">WhatsApp: scrie‑mi direct</a>
        </FootCol>
        <FootCol title="Date firmă" className="col-span-2 sm:col-span-1">
          <span>Codito este operat de<br /><strong className="font-semibold text-white">{c.name.replace("-", "\u2011")}</strong></span>
          <span>CUI: {c.cui}</span>
          <span>Nr. Reg. Com.: {c.regCom}</span>
          <span>Sediu: {c.address}</span>
        </FootCol>
        <FootCol title="Informații" className="col-span-2 sm:col-span-1">
          <Link href="/termeni/" className="py-2.5 hover:text-white">Termeni și condiții</Link>
          <Link href="/confidentialitate/" className="py-2.5 hover:text-white">Politica de confidențialitate</Link>
          <Link href="/acord-gdpr/" className="py-2.5 hover:text-white">Acord GDPR pentru părinți</Link>
          <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener" className="py-2.5 hover:text-white">ANPC · Soluționarea alternativă a litigiilor</a>
        </FootCol>
      </div>
      <div className="wrap mt-10">
        <div className="border-t border-white/10 pt-5 text-[0.82rem]">
          © {new Date().getFullYear()} Codito · operat de {c.name.replace("-", "\u2011")} · CUI {c.cui}
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex min-w-0 flex-col items-start gap-0.5 leading-snug ${className}`}>
      <b className="mb-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white">{title}</b>
      {children}
    </div>
  );
}
