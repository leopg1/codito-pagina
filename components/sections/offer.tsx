import { Check } from "lucide-react";
import { CONFIG, PRICES, SPOTS_FREE } from "@/lib/config";
import { SectionHead } from "../ui/section-head";
import { Reveal } from "../ui/motion";
import { E } from "../ui/emoji";
import { ButtonLink } from "../ui/button";

export function FreeLesson() {
  return (
    <section id="gratuit" className="section bg-cream">
      <div className="wrap">
        <SectionHead
          kicker="Primul pas, fără niciun risc"
          title="O lecție gratuită, doar voi și eu, în care vedeți tot"
          lead="45 de minute, unu la unu, online. Înainte să plătești ceva, vezi cu ochii tăi cum lucrăm. Dacă nu vă place, nu ne mai auzim. Fără mesaje insistente, promit."
        />
        <Reveal className="mx-auto mt-12 max-w-[900px]">
          <div className="overflow-hidden rounded-2xl bg-paper shadow-lift ring-1 ring-line">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-coral px-6 py-5 text-white sm:px-8">
              <span className="flex items-center gap-2 font-semibold"><E e="🎁" className="text-[1.3rem]" /> Invitație · 45 de minute</span>
              <span className="flex items-baseline gap-3"><s className="opacity-75">{PRICES.session}</s><b className="font-display text-[2rem] leading-none sm:text-[2.3rem]">0 lei</b></span>
            </div>
            <div className="grid md:grid-cols-2">
              <TicketCol emoji="🧒" title="Ce primește copilul" items={[<>Își construiește <b className="text-ink">primul program, care chiar funcționează</b></>, "Îl păstrează salvat pe calculatorul lui", "Vede că programarea e mai ușoară și mai distractivă decât credea"]} />
              <TicketCol emoji="🙋" border title="Ce primești tu" items={[<>În ultimele 5 minute, <b className="text-ink">copilul îți arată singur ce a construit</b></>, "O părere scurtă, scrisă: de unde pornește și ce i s-ar potrivi", "Răspunsuri la orice întrebare ai, despre lecții sau despre preț"]} />
            </div>
            <ol className="grid border-t border-line bg-cream md:grid-cols-3">
              {[["Răspunzi la 4 întrebări", "durează un minut"], ["Îți scriu în aceeași zi", "și alegem o oră comodă"], ["Vă conectați de acasă", "pe Google Meet, de pe laptop"]].map(([b, s], k) => (
                <li key={b} className={`flex items-baseline gap-3 px-6 py-5 ${k ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
                  <span className="font-display text-[1.05rem] font-bold text-coral-t">{k + 1}.</span>
                  <span className="font-semibold leading-snug">{b}<small className="mt-0.5 block text-[0.88rem] font-normal text-muted">{s}</small></span>
                </li>
              ))}
            </ol>
            <div className="grid justify-items-center gap-3 px-6 pb-8 pt-7 text-center">
              <ButtonLink href="#plan" arrow className="w-full sm:w-auto">Vreau lecția gratuită 1:1</ButtonLink>
              <p className="text-[0.92rem] text-muted">Fără card, fără contract. Lucrez doar 1:1, așa că mai sunt doar {SPOTS_FREE} locuri la preț de început.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TicketCol({ title, items, border = false, emoji }: { title: string; items: React.ReactNode[]; border?: boolean; emoji: string }) {
  return (
    <div className={`p-6 sm:p-8 ${border ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
      <h3 className="mb-4 flex items-center gap-2.5 text-[1.2rem] font-semibold"><E e={emoji} className="text-[1.4rem]" />{title}</h3>
      <ul className="grid gap-3">
        {items.map((t, k) => (
          <li key={k} className="flex gap-2.5 leading-normal text-ink-2"><Check className="mt-1 size-[18px] shrink-0 text-green" strokeWidth={3} aria-hidden /><span>{t}</span></li>
        ))}
      </ul>
    </div>
  );
}

export function Price() {
  return (
    <section id="pret" className="section border-t border-line bg-paper">
      <div className="wrap">
        {/* sinceritate: de ce nu există recenzii încă */}
        <Reveal className="grid items-start gap-8 md:grid-cols-[1.2fr_.8fr] md:gap-14">
          <div>
            <h2 className="text-[clamp(1.7rem,3.6vw,2.35rem)] font-semibold">De ce nu vezi aici zeci de recenzii?</h2>
            <p className="mt-4 text-[1.06rem] leading-relaxed text-ink-2">Pentru că abia acum pornesc lecțiile individuale. Am experiență cu copiii, dar nu o să inventez păreri ca să par mai mare decât sunt.</p>
            <p className="mt-3 text-[1.06rem] leading-relaxed text-ink-2">În schimb, primele familii primesc un <strong className="text-ink">preț de început mult mai mic</strong>. Tot ce îți cer la schimb e o părere sinceră după prima lună, bună sau rea.</p>
          </div>
          <div className="rounded-xl border border-line bg-cream p-5 md:mt-2">
            <div className="mb-3 flex justify-between gap-3 text-[0.95rem] font-semibold">Locuri la preț de început <span className="whitespace-nowrap text-coral-t">{SPOTS_FREE} din {CONFIG.spotsTotal} libere</span></div>
            <div className="flex gap-1.5">
              {Array.from({ length: CONFIG.spotsTotal }, (_, i) => (
                <i key={i} className={`h-3 flex-1 rounded-md ${i < CONFIG.spotsTaken ? "bg-coral" : "bg-mint"}`} />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-20 sm:mt-24">
          <SectionHead center={false} title="Cât costă" />
          <Reveal className="mt-10 grid overflow-hidden rounded-2xl shadow-lift ring-1 ring-line md:grid-cols-2">
            <div className="bg-paper p-7 sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-peach px-3 py-1.5 text-[0.8rem] font-bold text-coral-t"><E e="🎁" /> Preț de început</span>
              <h3 className="mt-4 text-[1.6rem] font-semibold">Abonament lunar</h3>
              <div className="mt-2 flex flex-wrap items-baseline gap-3">
                <b className="font-display text-[3.3rem] leading-none">{PRICES.month}</b>
                <s className="text-[1.2rem] text-muted">{PRICES.monthOld}</s>
                <small className="text-muted">/ lună</small>
              </div>
              <p className="mt-2 text-ink-2">4 lecții × 90 de minute, una pe săptămână</p>
              <ul className="my-7 grid gap-2.5">
                {["Prima lecție gratuită, ca să vedeți dacă vă place", "Plan personalizat, pornit de la ce îi place", "Raport pe WhatsApp după fiecare lecție", "Ajutor pe mesaj între lecții", "Te oprești oricând, fără penalități"].map((t) => (
                  <li key={t} className="flex gap-2.5"><Check className="mt-1 size-[18px] shrink-0 text-green" strokeWidth={3} aria-hidden />{t}</li>
                ))}
              </ul>
              <ButtonLink href="#plan" arrow className="w-full">Începem cu lecția gratuită</ButtonLink>
            </div>
            <div className="bg-ink p-7 text-white sm:p-10">
              <h3 className="text-[1.3rem] font-semibold text-white">Ca să ai o comparație</h3>
              <ul className="mt-5 grid gap-4 text-[#d3d8ea]">
                <li className="flex gap-3.5"><E e="⏱️" className="mt-0.5 text-[1.25rem]" /><span>O lecție de 90 de minute costă <b className="text-white">{PRICES.session}</b>, adică <b className="text-white">{PRICES.hour}</b>, cam cât o meditație obișnuită de o oră.</span></li>
                <li className="flex gap-3.5"><E e="☕" className="mt-0.5 text-[1.25rem]" /><span>Pe zi, înseamnă cam <b className="text-white">{PRICES.day}</b>, cât o cafea și un covrig.</span></li>
                <li className="flex gap-3.5"><E e="💎" className="mt-0.5 text-[1.25rem]" /><span>Ce câștigă copilul e o <b className="text-white">abilitate pe care o păstrează</b>, plus proiecte pe care le poate arăta oricui.</span></li>
              </ul>
              <div className="mt-7 border-t border-white/15 pt-6">
                <b className="flex items-center gap-2 font-display text-[1.15rem] font-semibold text-sun"><E e="🛡️" /> Garanția „merită sau nu plătești”</b>
                <p className="mt-1.5 text-[0.95rem] text-[#d3d8ea]">Dacă după primele 2 lecții plătite simți că nu merită, îți dau banii înapoi pe ele. Integral, fără explicații.</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-6 text-[0.98rem] text-muted">
            <E e="💡" className="mr-1" /> Ai nevoie doar de ajutor punctual (informatică la școală, bac, un proiect)? Lecție individuală: <b className="text-ink">{PRICES.single}</b>.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
