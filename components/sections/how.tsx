import { DoorOpen, Hammer, Hand, Lightbulb, MessageSquareText, PartyPopper, Receipt, Wrench } from "lucide-react";
import { E, EBadge } from "../ui/emoji";
import { SectionHead } from "../ui/section-head";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import { CtaInline } from "../ui/cta-inline";
import { KidSample } from "../kid-context";

const STEPS = [
  ["👋", "0–10 min", "Ne salutăm", "Vorbim despre ce a făcut între lecții și ce îl entuziasmează."],
  ["✏️", "10–35 min", "O idee nouă", "O explic pe tableta grafică, desenat, cu exemple din lumea lui."],
  ["🛠️", "35–80 min", "Construiește el", "Scrie cod cu mâna lui. Eu ghidez, nu fac în locul lui. (+ o pauză scurtă)"],
  ["🎉", "80–90 min", "Arată ce a făcut", "Rulează proiectul și îmi explică el cum funcționează."],
  ["📲", "după lecție", "Tu primești raportul", "Pe WhatsApp: ce a făcut, ce a înțeles, ce urmează."],
] as const;

const PEACE = [
  [MessageSquareText, "Raport după fiecare lecție", "Scurt, pe înțelesul oricui, cu o poză cu ce a construit. Citești în 1 minut."],
  [DoorOpen, "Ușa e mereu deschisă", "Poți intra oricând la lecție să vezi cum lucrăm. Comunicarea cu copilul are loc doar pe un grup în care ești și tu."],
  [Wrench, "Partea tehnică e rezolvată", "Instalări, programe, setări: le facem împreună în prima lecție. Tot ce folosim e gratuit."],
  [Receipt, "Totul în regulă, cu acte", "Codito funcționează legal, prin PFA. Primești factură pentru fiecare plată."],
] as const;

export function How() {
  return (
    <section id="cum-lucram" className="section bg-sand">
      <div className="wrap">
        <SectionHead kicker="Cum lucrăm" title="Cum arată o lecție, minut cu minut" lead="90 de minute, online, de acasă. Cu camera pornită și cu ecranul partajat, ca și cum am sta unul lângă altul." />

        <Stagger className="mt-12 grid overflow-hidden rounded-[22px] border border-[#ead9c3] md:grid-cols-5">
          {STEPS.map(([e, t, b, p], k) => (
            <StaggerItem key={b} className={`grid grid-cols-[auto_1fr] gap-x-3.5 p-5 md:block md:p-6 ${k < 4 ? "border-b border-[#ead9c3] bg-paper md:border-b-0 md:border-r" : "bg-mint"}`}>
              <EBadge e={e} className={`row-span-3 mb-3 size-12 rounded-xl text-[1.45rem] ${k < 4 ? "bg-cream" : "bg-white/70"}`} />
              <span className="block font-mono text-[0.78rem] font-semibold text-coral-t">{t}</span>
              <b className="mt-1 block text-[1.02rem]">{b}</b>
              <p className="mt-1 text-[0.92rem] leading-normal text-ink-2">{p}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-16 grid items-center gap-12 border-t border-dashed border-[#e3d3bd] pt-16 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <SectionHead center={false} kicker="Pentru liniștea ta" title="Știi mereu ce face. Chiar dacă nu te pricepi deloc la calculatoare." />
            <Stagger className="mt-8 grid gap-5">
              {PEACE.map(([I, b, p]) => (
                <StaggerItem key={b} className="grid grid-cols-[48px_1fr] gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl border border-line bg-paper text-coral-t"><I className="size-5" aria-hidden /></span>
                  <span className="leading-relaxed text-ink-2"><b className="mb-0.5 block text-[1.06rem] leading-snug text-ink">{b}</b>{p}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-[340px] rounded-[34px] border-[9px] border-[#1c1c21] bg-[#ece5dd] p-4 shadow-[0_40px_70px_-30px_rgb(30_36_66/.45)]" aria-label="Exemplu de raport trimis părintelui">
              <div className="-mx-4 -mt-4 mb-3.5 flex items-center gap-2.5 rounded-t-[24px] bg-[#075e54] px-4 py-3.5 text-[0.9rem] text-white">
                <span className="grid size-[34px] place-items-center rounded-full bg-coral font-display text-[0.85rem] font-bold">L</span>
                <span className="leading-tight">Leonard · Codito<small className="block text-[0.72rem] opacity-80">online</small></span>
              </div>
              <div className="rounded-xl rounded-bl-sm bg-white px-3.5 py-3 text-[0.86rem] leading-normal shadow-sm">
                <p>Bună seara! 👋 Pe scurt, lecția de azi a lui <b><KidSample /></b>:</p>
                <p className="mt-1.5">✅ A terminat jocul cu scor și niveluri. A găsit <b>singur</b> o greșeală și a <span className="whitespace-nowrap">reparat-o</span>. 💪</p>
                <p className="mt-1.5">🧠 A înțeles cum „ține minte” un program informații (variabile).</p>
                <p className="mt-1.5">🎯 Data viitoare îl punem pe internet, ca să-l poată juca și prietenii.</p>
                <div className="mt-1 text-right text-[0.68rem] text-[#8a8a8a]">20:14 ✓✓</div>
              </div>
              <div className="ml-auto mt-2.5 max-w-[82%] rounded-xl rounded-br-sm bg-[#dcf8c6] px-3.5 py-2.5 text-[0.86rem] shadow-sm">Mulțumim! Ne-a arătat și nouă la cină, era foarte mândru 😄</div>
            </div>
            <p className="mt-4 text-center font-hand text-[1.45rem] font-bold text-coral-t">↑ așa arată un raport</p>
          </Reveal>
        </div>

        <CtaInline>Vezi chiar de la prima lecție, gratuită, cum ar fi pentru voi.</CtaInline>
      </div>
    </section>
  );
}
