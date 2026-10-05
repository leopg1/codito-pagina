import { Check } from "lucide-react";
import { CONFIG, FOUNDING_FREE, PRICES, waLink } from "@/lib/config";
import { SectionHead } from "../ui/section-head";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import { ButtonLink } from "../ui/button";
import { E } from "../ui/emoji";
import { KidSample } from "../kid-context";

const TRIAL: [string, string, string][] = [
  ["0–10 min", "Ne cunoaștem", "Aflu ce îi place, ce a mai încercat și ce l‑ar entuziasma să construiască."],
  ["10–40 min", "Își face primul joc", "Scrie el codul, cu mâna lui. Eu îl ghidez pas cu pas."],
  ["40–45 min", "Ți‑l arată", "Intri și tu: copilul îți arată jocul și îți explică cum funcționează."],
];

export function FreeLesson() {
  return (
    <section id="gratuit" className="section bg-cream">
      <div className="wrap">
        <SectionHead
          kicker="Primul pas, fără niciun risc"
          title="O lecție gratuită, doar voi și eu, în care vedeți tot"
          lead="45 de minute, unu la unu, online. Înainte să plătești ceva, vezi cu ochii tăi cum lucrăm. Dacă nu vă place, nu ne mai auzim."
        />
        <Reveal className="mx-auto mt-12 max-w-[900px]">
          <div className="overflow-hidden rounded-2xl bg-paper shadow-lift ring-1 ring-line">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-cta px-6 py-5 text-white sm:px-8">
              <span className="flex items-center gap-2 font-semibold"><E e="🎁" className="text-[1.3rem]" /> Invitație · 45 de minute</span>
              <span className="flex items-baseline gap-3"><s>{PRICES.session}</s><b className="font-display text-[2rem] leading-none sm:text-[2.3rem]">0 lei</b></span>
            </div>

            {/* scenariul lecției: părintele știe dinainte ce se întâmplă */}
            <ol className="grid border-b border-line md:grid-cols-3">
              {TRIAL.map(([t, b, p], k) => (
                <li key={b} className={`px-6 py-5 sm:px-8 ${k ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
                  <span className="font-mono text-[0.78rem] font-semibold text-coral-t">{t}</span>
                  <b className="mt-1 block text-[1.04rem]">{b}</b>
                  <p className="mt-1 text-[0.93rem] leading-normal text-ink-2">{p}</p>
                </li>
              ))}
            </ol>

            <div className="grid md:grid-cols-2">
              <TicketCol emoji="🧒" title="Ce primește copilul" items={[<>Își construiește <b className="text-ink">primul program, care chiar funcționează</b></>, "Îl păstrează salvat pe calculatorul lui", "Vede că programarea e mai ușoară și mai distractivă decât credea"]} />
              <TicketCol emoji="🙋" border title="Ce primești tu" items={[<>O <b className="text-ink">evaluare scrisă, în aceeași zi</b>: de unde pornește și ce i s‑ar potrivi</>, "Un plan pentru prima lună, dacă vreți să continuați", "Răspunsuri la orice întrebare ai, despre lecții sau despre preț"]} />
            </div>
            <ol className="grid border-t border-line bg-cream md:grid-cols-3">
              {[["Răspunzi la 5 întrebări", "durează un minut"], ["Îți scriu în aceeași zi", "și alegem o oră comodă"], ["Vă conectați de acasă", "pe Google Meet, de pe laptop"]].map(([b, s], k) => (
                <li key={b} className={`flex items-baseline gap-3 px-6 py-5 ${k ? "border-t border-line md:border-l md:border-t-0" : ""}`}>
                  <span className="font-display text-[1.05rem] font-bold text-coral-t">{k + 1}.</span>
                  <span className="font-semibold leading-snug">{b}<small className="mt-0.5 block text-[0.88rem] font-normal text-muted">{s}</small></span>
                </li>
              ))}
            </ol>
            <div className="grid justify-items-center gap-3 px-6 pb-8 pt-7 text-center">
              <ButtonLink href="#plan" arrow className="w-full sm:w-auto">Vreau lecția gratuită 1:1</ButtonLink>
              <p className="text-[0.92rem] text-muted">Fără card, fără contract, fără obligații.</p>
            </div>
          </div>
        </Reveal>

        {/* după lecție: fără presiune + exemplu de evaluare */}
        <div className="mx-auto mt-16 grid max-w-[900px] items-center gap-10 md:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <h3 className="text-[clamp(1.45rem,3vw,1.85rem)] font-semibold">După lecție decizi tu. Fără presiune.</h3>
            <p className="mt-4 leading-relaxed text-ink-2">Știu cum arată multe „lecții demo”: la final urmează o ofertă și telefoane insistente. La mine nu.</p>
            <ul className="mt-5 grid gap-3">
              {[
                ["📝", "Primești evaluarea în scris, în aceeași zi."],
                ["📵", "Nu te sun și nu insist. Dacă vreți să continuați, îmi scrieți voi."],
                ["🤝", "Dacă nu e potrivit pentru copil, îți spun sincer, chiar dacă pierd un client."],
              ].map(([e, t]) => (
                <li key={t} className="flex gap-3 leading-relaxed text-ink-2"><E e={e} className="mt-0.5 text-[1.2rem]" /><span>{t}</span></li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <Evaluation />
            <p className="mt-3 text-center text-[0.88rem] text-muted">Exemplu de evaluare, așa cum o primești după lecția gratuită.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Evaluation() {
  return (
    <div className="relative rounded-xl bg-paper p-6 text-[0.92rem] leading-relaxed text-ink-2 shadow-lift ring-1 ring-line sm:p-7" aria-label="Exemplu de evaluare după lecția gratuită">
      <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
        <div>
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-coral-t">Evaluare scrisă</span>
          <b className="mt-1 block font-display text-[1.2rem] text-ink"><KidSample />, 10 ani</b>
        </div>
        <span className="rounded-md bg-mint px-2 py-1 text-[0.78rem] font-semibold text-[#15784d]">exemplu</span>
      </div>
      <dl className="mt-4 grid gap-3">
        <div><dt className="font-semibold text-ink">De unde pornește</dt><dd>Nu a mai programat, dar înțelege repede ordinea pașilor. A scris un joc de ghicit în 25 de minute, fără ajutor.</dd></div>
        <div><dt className="font-semibold text-ink">Ce i‑a plăcut cel mai mult</dt><dd>Când jocul a început să răspundă la ce scria el. Vrea un joc cu personaje din Minecraft.</dd></div>
        <div><dt className="font-semibold text-ink">Recomandarea mea</dt><dd>Python de la zero, nivelul Explorator, câte o lecție pe săptămână.</dd></div>
        <div><dt className="font-semibold text-ink">Prima lună</dt><dd>Un joc cu scor și niveluri, pe care îl poate juca toată familia.</dd></div>
      </dl>
      <p className="mt-4 border-t border-line pt-3 font-hand text-[1.5rem] leading-none text-coral-t">Leonard</p>
    </div>
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

const COMPARE: [string, string, string, string, boolean][] = [
  ["Grupă la o școală de programare", "8–12 copii", "90 min", "~50–85 lei", false],
  ["Lecții 1:1 la școlile mari", "1 copil, profesori care se schimbă", "50 min", "~150–180 lei", false],
  ["Codito", "1 copil, același profesor", "90 min", `~${PRICES.hourN} lei`, true],
];

const VOUCHER = waLink("Bună, Leonard! Aș vrea un voucher cadou pentru o lună de lecții Codito. Copilul are __ ani.");

export function Price() {
  const f = CONFIG.founding;
  return (
    <section id="pret" className="section border-t border-line bg-paper">
      <div className="wrap">
        {/* sinceritate: de ce nu există recenzii încă + familiile fondatoare */}
        <Reveal className="grid items-start gap-8 md:grid-cols-[1.15fr_.85fr] md:gap-14">
          <div>
            <h2 className="text-[clamp(1.7rem,3.6vw,2.35rem)] font-semibold">De ce nu vezi aici zeci de recenzii?</h2>
            <p className="mt-4 text-[1.06rem] leading-relaxed text-ink-2">Pentru că abia acum pornesc lecțiile individuale. Am experiență cu copiii, dar nu o să inventez păreri ca să par mai mare decât sunt.</p>
            <p className="mt-3 text-[1.06rem] leading-relaxed text-ink-2">În schimb, primele {f.total} familii devin <strong className="text-ink">familii fondatoare</strong>: păstrează prețul de început {f.lockMonths} luni. Tot ce îți cer la schimb e o părere sinceră după prima lună, bună sau rea.</p>
          </div>
          <div className="rounded-xl border border-line bg-cream p-6 md:mt-2">
            <b className="flex items-center gap-2 font-display text-[1.15rem]"><E e="🌱" /> Familii fondatoare</b>
            {FOUNDING_FREE === 0 && <p className="mt-2 text-[0.92rem] font-semibold text-coral-t">Toate cele {f.total} locuri s‑au ocupat. Mulțumesc!</p>}
            <ul className="mt-3 grid gap-2 text-[0.95rem] text-ink-2">
              <li className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-green" strokeWidth={3} aria-hidden />{PRICES.month} pe lună, blocat {f.lockMonths} luni</li>
              <li className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-green" strokeWidth={3} aria-hidden />Aceleași lecții, același profesor, nimic tăiat</li>
              <li className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-green" strokeWidth={3} aria-hidden />Doar {f.total} locuri. Apoi prețul devine {PRICES.later} pe lună</li>
            </ul>
            {f.taken > 0 && (
              <div className="mt-4">
                <div className="mb-2 flex justify-between text-[0.88rem] font-semibold">Locuri ocupate <span className="text-coral-t">{f.taken} din {f.total}</span></div>
                <div className="flex gap-1.5">
                  {Array.from({ length: f.total }, (_, i) => <i key={i} className={`h-2.5 flex-1 rounded-md ${i < f.taken ? "bg-coral" : "bg-mint"}`} />)}
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <div className="mt-20 sm:mt-24">
          <SectionHead center={false} title="Cât costă" />
          <Reveal className="mt-10 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl shadow-lift ring-1 ring-line md:grid-cols-2">
            <div className="bg-paper p-5 sm:p-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-[0.8rem] font-bold text-coral-t ring-1 ring-line"><E e="🌱" /> {FOUNDING_FREE > 0 ? "Preț pentru familiile fondatoare" : "Abonament lunar"}</span>
              <h3 className="mt-4 text-[1.6rem] font-semibold">Abonament lunar</h3>
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <b className="font-display text-[3.3rem] leading-none">{FOUNDING_FREE > 0 ? PRICES.month : PRICES.later}</b>
                <small className="text-muted">/ lună</small>
              </div>
              <p className="mt-2 text-ink-2">4 lecții × 90 de minute, una pe săptămână. Adică <span className="whitespace-nowrap">{PRICES.session}</span> pe lecție.</p>
              {FOUNDING_FREE > 0 && <p className="mt-1 text-[0.9rem] text-muted">Blocat {f.lockMonths} luni. Pentru familiile care vin după: {PRICES.later} pe lună.</p>}
              <ul className="my-7 grid gap-2.5">
                {["Prima lecție gratuită, ca să vedeți dacă vă place", "Plan personalizat, pornit de la ce îi place", "Raport pe WhatsApp după fiecare lecție", "Discuție cu tine la fiecare 6 lecții", "Diplomă și prezentare în fața familiei la final de nivel", "Te oprești oricând, fără penalități"].map((t) => (
                  <li key={t} className="flex gap-2.5"><Check className="mt-1 size-[18px] shrink-0 text-green" strokeWidth={3} aria-hidden />{t}</li>
                ))}
              </ul>
              <ButtonLink href="#plan" arrow className="w-full">Începem cu lecția gratuită</ButtonLink>
            </div>
            <div className="bg-ink p-5 text-white sm:p-10">
              <h3 className="text-[1.3rem] font-semibold text-white">Ca să ai o comparație</h3>
              <p className="mt-1 text-[0.9rem] text-[#a3aac4]">Prețuri obișnuite în România, pe oră de lecție.</p>
              <ul className="mt-5 grid gap-3">
                {COMPARE.map(([name, who, len, hour, us]) => (
                  <li key={name} className={`rounded-xl px-4 py-3 ${us ? "bg-white/10 ring-1 ring-[#5be3a7]/50" : "bg-white/[.04]"}`}>
                    <span className="flex items-baseline justify-between gap-3">
                      <b className={`min-w-0 text-[0.98rem] leading-snug ${us ? "text-white" : "text-[#d3d8ea]"}`}>{name}</b>
                      <span className={`shrink-0 whitespace-nowrap font-display text-[1.15rem] font-semibold tabular-nums ${us ? "text-[#5be3a7]" : "text-[#d3d8ea]"}`}>{hour}<small className="ml-1 font-sans text-[0.78rem] font-normal text-[#a3aac4]">/oră</small></span>
                    </span>
                    <small className="mt-1 block text-[0.84rem] leading-snug text-[#a3aac4]">{who} · {len}</small>
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-white/15 pt-6">
                <b className="flex items-start gap-2 font-display text-[1.15rem] font-semibold text-sun"><E e="🛡️" className="mt-0.5" /> Garanția „merită sau nu plătești”</b>
                <p className="mt-1.5 text-[0.95rem] text-[#d3d8ea]">Dacă după primele 2 lecții plătite simți că nu merită, îți dau banii înapoi pe ele. Integral, fără explicații.</p>
              </div>
            </div>
          </Reveal>

          {/* reduceri, cadou, lecție individuală */}
          <Stagger className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerItem className="border-t border-line pt-4"><b className="flex items-center gap-2"><E e="👫" /> Frați</b><p className="mt-1 text-[0.93rem] text-ink-2">{CONFIG.discounts.sibling}% reducere pentru al doilea copil.</p></StaggerItem>
            <StaggerItem className="border-t border-line pt-4"><b className="flex items-center gap-2"><E e="📅" /> Plată pe 3 luni</b><p className="mt-1 text-[0.93rem] text-ink-2">{CONFIG.discounts.prepay3}% reducere dacă plătești 3 luni deodată.</p></StaggerItem>
            <StaggerItem className="border-t border-line pt-4"><b className="flex items-center gap-2"><E e="🤝" /> Recomandare</b><p className="mt-1 text-[0.93rem] text-ink-2">Recomanzi o familie care începe: primiți amândoi o lecție gratuită.</p></StaggerItem>
            <StaggerItem className="border-t border-line pt-4"><b className="flex items-center gap-2"><E e="🎁" /> Cadou</b><p className="mt-1 text-[0.93rem] text-ink-2">Voucher pentru o lună de lecții. <a href={VOUCHER} target="_blank" rel="noopener" className="font-semibold text-coral-t underline underline-offset-2"><span className="whitespace-nowrap">Cere‑l pe WhatsApp</span></a></p></StaggerItem>
          </Stagger>
          <Reveal className="mt-8 text-[0.98rem] text-muted">
            <E e="💡" />  Ai nevoie doar de ajutor punctual (informatică la școală, bac, un proiect)? Lecție individuală: <b className="text-ink">{PRICES.single}</b>.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
