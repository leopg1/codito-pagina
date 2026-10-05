import { SectionHead } from "../ui/section-head";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import { E } from "../ui/emoji";
import { CtaInline } from "../ui/cta-inline";
import { KidSample } from "../kid-context";
import { Photo } from "../ui/photo";

const STEPS = [
  ["👋", "0–10", "Ne salutăm", "Vorbim despre ce a făcut între lecții și ce îl entuziasmează."],
  ["✏️", "10–35", "O idee nouă", "O explic pe tableta grafică, desenat, cu exemple din lumea lui."],
  ["🛠️", "35–80", "Construiește el", "Scrie cod cu mâna lui, cu o pauză scurtă la mijloc. Eu ghidez, el scrie."],
  ["🎉", "80–90", "Arată ce a făcut", "Rulează proiectul și îmi explică el cum funcționează."],
] as const;

const PEACE: [string, string, string][] = [
  ["📲", "Raport după fiecare lecție", "Scurt, pe înțelesul oricui, cu o poză cu ce a construit. Îl citești într‑un minut."],
  ["☕", "Discuție cu tine la fiecare 6 lecții", "15 minute, doar noi doi: ce știe acum, ce urmează și ce ai observat tu acasă."],
  ["🔧", "Instalările le facem împreună", "Programe și setări, în prima lecție. Tot ce folosim e gratuit."],
  ["🧾", "Factură pentru fiecare plată", "Codito funcționează legal, prin PFA."],
];

export function How() {
  return (
    <section id="cum-lucram" className="section bg-sand">
      <div className="wrap">
        <SectionHead center={false} title="Cum arată o lecție, minut cu minut" lead="90 de minute, online, de acasă. Cu camera pornită și ecranul partajat, ca și cum am sta unul lângă altul." />

        <div className="mt-12">
          <Stagger as="ol" className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([e, t, b, p]) => (
              <StaggerItem as="li" key={b} className="border-t-2 border-ink/80 py-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.8rem] font-semibold text-coral-t">min {t}</span>
                  <E e={e} className="text-[1.5rem]" />
                </div>
                <b className="mt-1.5 block text-[1.08rem]">{b}</b>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-2 text-[0.98rem] text-ink-2"><E e="📲" className="mr-1.5" /><b className="text-ink">După lecție,</b> primești pe WhatsApp un raport: ce a făcut, ce a înțeles și ce urmează.</Reveal>
        </div>

        <div className="mt-20 grid items-center gap-12 sm:mt-24 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <SectionHead center={false} title="Știi mereu ce face, chiar dacă nu te pricepi la calculatoare." />
            <Stagger as="dl" className="mt-8 max-w-[560px]">
              {PEACE.map(([e, b, p]) => (
                <StaggerItem key={b} className="grid grid-cols-[auto_1fr] gap-x-3.5 border-t border-[#e3d3bd] py-4 first:border-t-0 first:pt-0">
                  <E e={e} className="row-span-2 mt-0.5 text-[1.35rem]" />
                  <dt className="text-[1.06rem] font-semibold text-ink">{b}</dt>
                  <dd className="mt-0.5 leading-relaxed text-ink-2">{p}</dd>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-[340px] rounded-[34px] border-[9px] border-[#1c1c21] bg-[#ece5dd] p-4 shadow-[0_40px_70px_-30px_rgb(30_36_66/.45)]" aria-label="Exemplu de raport trimis părintelui">
              <div className="-mx-4 -mt-4 mb-3.5 flex items-center gap-2.5 rounded-t-[24px] bg-[#075e54] px-4 py-3.5 text-[0.9rem] text-white">
                <span className="relative grid size-[34px] place-items-center overflow-hidden rounded-full bg-coral font-display text-[0.85rem] font-bold">L<Photo className="scale-[1.6] object-[50%_42%]" /></span>
                <span className="leading-tight">Leonard · Codito<small className="block text-[0.72rem] opacity-80">online</small></span>
              </div>
              <div className="rounded-xl rounded-bl-sm bg-white px-3.5 py-3 text-[0.86rem] leading-normal shadow-sm">
                <p>Bună seara! 👋 Pe scurt, lecția de azi a lui <b><KidSample /></b>:</p>
                <p className="mt-1.5">✅ A terminat jocul cu scor și niveluri. A găsit <b>singur</b> o greșeală și a <span className="whitespace-nowrap">reparat‑o</span>. 💪</p>
                <p className="mt-1.5">🧠 A înțeles cum „ține minte” un program informații (variabile).</p>
                <p className="mt-1.5">🎯 Data viitoare îl punem pe internet, ca să‑l poată juca și prietenii.</p>
                <div className="mt-1 text-right text-[0.68rem] text-[#8a8a8a]">20:14 ✓✓</div>
              </div>
              <div className="ml-auto mt-2.5 max-w-[82%] rounded-xl rounded-br-sm bg-[#dcf8c6] px-3.5 py-2.5 text-[0.86rem] shadow-sm">Mulțumim! Ne‑a arătat și nouă la cină, era foarte mândru 😄</div>
            </div>
            <p className="mt-4 text-center text-[0.9rem] text-muted">Un raport, așa cum îl primești după lecție.</p>
          </Reveal>
        </div>

        <CtaInline>Vezi chiar de la prima lecție, gratuită, cum ar fi pentru voi.</CtaInline>
      </div>
    </section>
  );
}
