import Link from "next/link";
import { CONFIG, WA_HELLO, telLink } from "@/lib/config";
import { LogoMark, Wordmark } from "./logo";
import { TOPICS } from "@/lib/topics";

export function Footer() {
  const c = CONFIG.company;
  return (
    <footer className="bg-ink pb-28 pt-14 text-[0.9rem] text-[#a3aac4] sm:pb-14">
      <div className="wrap grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_.9fr_1.4fr_1.1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-3"><LogoMark className="size-9 text-[1.3rem]" /><Wordmark light /></div>
          <p>Programare & AI pentru copii și adolescenți. Lecții 1:1, online.</p>
        </div>
        <FootCol title="Lecții">
          {TOPICS.map((t) => <Link key={t.slug} href={`/${t.slug}/`} className="hover:text-white">{t.eyebrow}</Link>)}
        </FootCol>
        <FootCol title="Contact">
          <a href={telLink} className="hover:text-white">{CONFIG.phone}</a>
          <a href={WA_HELLO} target="_blank" rel="noopener" className="hover:text-white">WhatsApp: scrie-mi direct</a>
        </FootCol>
        <FootCol title="Date firmă">
          <span>Codito este operat de<br /><strong className="font-semibold text-white">{c.name}</strong></span>
          <span>CUI: {c.cui}</span>
          <span>Nr. Reg. Com.: {c.regCom}</span>
          <span>Sediu: {c.address}</span>
        </FootCol>
        <FootCol title="Informații">
          <Link href="/termeni/" className="hover:text-white">Termeni și condiții</Link>
          <Link href="/confidentialitate/" className="hover:text-white">Politica de confidențialitate</Link>
          <Link href="/acord-gdpr/" className="hover:text-white">Acord GDPR pentru părinți</Link>
          <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener" className="hover:text-white">ANPC · Soluționarea alternativă a litigiilor</a>
        </FootCol>
      </div>
      <div className="wrap mt-10">
        <div className="border-t border-white/10 pt-5 text-[0.82rem]">
          © {new Date().getFullYear()} Codito · operat de {c.name} · CUI {c.cui}
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2 leading-relaxed">
      <b className="mb-1 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-white">{title}</b>
      {children}
    </div>
  );
}
