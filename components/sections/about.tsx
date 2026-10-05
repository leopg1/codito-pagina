import { Award, Check, GraduationCap, Heart, Laptop, MapPin, ScrollText, ShieldCheck, Smile, Timer, Trophy, Zap, Eye, Users } from "lucide-react";
import { E, EBadge } from "../ui/emoji";
import { CONFIG, WA_HELLO } from "@/lib/config";
import { SectionHead } from "../ui/section-head";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import { ButtonLink, WaIcon } from "../ui/button";
import { Photo } from "../ui/photo";

const FACTS = [
  [Users, "Predau programare copiilor de aproape un an: blocuri, Python și C/C++"],
  [ScrollText, "Certificat psihopedagogic pentru predare (DSPP)"],
  [GraduationCap, "Student în anul 3 la Calculatoare, Universitatea „Ștefan cel Mare” Suceava"],
  [Laptop, "Programator: fac site-uri și aplicații cu AI pentru firme"],
  [MapPin, "Lucrez online cu familii din toată țara și din diaspora"],
] as const;

const TRAITS = [
  ["🧘", "Răbdător", "Explic de câte ori e nevoie, de fiecare dată altfel, până se leagă."],
  ["🤗", "Calm și încurajator", "Greșelile sunt parte din învățare. La mine niciun copil nu e certat sau făcut să se simtă prost."],
  ["👀", "Atent la copil", "Văd când obosește sau se blochează și schimb ritmul pe loc."],
  ["⚡", "Entuziast", "Îmi place sincer ce fac. Copiii simt asta și se molipsesc."],
] as const;

const BUILT = [
  ["Locul 1", true, "Un braț robotic, construit de la zero", "Lucrare premiată la ELSTUD 2025, concurs de lucrări științifice studențești.", "🦾"],
  ["Medalie de aur", true, "O platformă care urmărește mașini cu AI", "Salonul de inovație ICE-USV 2026.", "🚗"],
  ["Locul 1 din 18", false, "Concurs internațional de securitate cibernetică", "Printre echipele universitare, CTF 2025.", "🔐"],
  ["Finalist național", false, "UNbreakable România 2026", "Locul 10 din aproximativ 300 de echipe.", "🏆"],
] as const;

const PROMISES = [
  ["Nu fac temele în locul copilului.", "Îl învăț să le facă el."],
  ["Îți spun sincer cum progresează,", "inclusiv când e greu."],
  ["Sunt punctual și anunț din timp", "orice schimbare."],
  ["Dacă văd că nu e potrivit pentru el, îți spun.", "Nu țin pe nimeni doar pentru bani."],
];

export function About() {
  return (
    <section id="despre" className="section border-y border-line bg-paper">
      <div className="wrap">
        <SectionHead kicker="Cine lucrează cu copilul tău" title="Un profesor pe care copilul îl ascultă. Și în care tu poți avea încredere." />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[360px_1fr] lg:gap-14">
          <Reveal as="div" className="mx-auto w-full max-w-[520px] rounded-[28px] border border-line bg-cream p-7 text-center lg:sticky lg:top-24">
            <div className="relative mx-auto mb-5 grid size-[150px] place-items-center overflow-hidden rounded-full bg-gradient-to-br from-[#ffd7c2] to-[#f0905f] shadow-[0_0_0_6px_#fff,0_0_0_7px_var(--color-line)]">
              <span className="font-display text-[3.6rem] font-bold text-white">L</span>
              <Photo />
            </div>
            <h3 className="text-[1.5rem] font-semibold">Leonard Pădurean</h3>
            <p className="mt-1.5 text-[0.95rem] font-semibold text-coral-t">Fondatorul Codito · profesorul de la fiecare lecție</p>
            {CONFIG.integrityCert && (
              <p className="mx-auto mt-3 inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1.5 text-[0.82rem] font-semibold text-green">
                <ShieldCheck className="size-4" /> Certificat de integritate comportamentală
              </p>
            )}
            <ul className="my-6 grid gap-3 text-left text-[0.95rem] leading-snug text-ink-2">
              {FACTS.map(([I, t]) => (
                <li key={t} className="flex gap-3"><I className="mt-0.5 size-[18px] shrink-0 text-coral" aria-hidden />{t}</li>
              ))}
            </ul>
            <ButtonLink href={WA_HELLO} variant="wa" external className="w-full !py-4"><WaIcon /> Hai să vorbim 15 minute</ButtonLink>
            <p className="mt-2.5 text-[0.85rem] text-muted">Fără obligații. Mă cunoști înainte să decizi.</p>
          </Reveal>

          <div className="min-w-0">
            <Reveal className="grid gap-4 text-[1.08rem] leading-[1.75] text-ink-2">
              <p className="font-display text-[1.7rem] font-semibold leading-tight text-ink">Bună! Sunt Leonard. 👋</p>
              <p>Predau programare copiilor de aproape un an și am observat un lucru: <strong className="text-ink">copiii învață enorm atunci când cineva are timp doar pentru ei</strong>. Când pot întreba orice fără să le fie rușine și când construiesc ceva care e al lor.</p>
              <p>Într-o grupă, timpul ăsta nu există. De aceea am pornit <strong className="text-ink">Codito</strong> și lucrez doar unu la unu: 90 de minute în care copilul tău are toată atenția mea.</p>
              <p className="rounded-2xl bg-peach px-5 py-4 text-[1rem] leading-relaxed">
                <E e="💬" className="mr-1.5" />
                Codito nu e o școală mare, cu profesori care se schimbă. <strong className="text-ink">Sunt eu, Leonard, la fiecare lecție.</strong> Pe mine mă cunoaște copilul, eu îți trimit rapoartele, cu mine vorbești când ai o întrebare.
              </p>
              <p>Sunt destul de tânăr cât copiii să mă simtă „de-al lor” și să vorbim aceeași limbă. Și destul de pregătit cât să-i duc departe: <strong className="text-ink">nu predau din carte, predau ce construiesc în fiecare zi.</strong></p>
              <p className="font-hand text-[2.3rem] leading-none text-coral-t">Leonard</p>
            </Reveal>

            <h3 className="mb-4 mt-12 text-[1.35rem] font-semibold">Cum sunt la lecție</h3>
            <Stagger className="grid gap-3 sm:grid-cols-2">
              {TRAITS.map(([e, b, t]) => (
                <StaggerItem key={b} className="flex gap-3.5 rounded-[18px] bg-cream p-5 transition-transform hover:-translate-y-0.5">
                  <EBadge e={e} className="size-12 rounded-xl bg-paper text-[1.45rem] shadow-[0_4px_12px_-6px_rgb(30_36_66/.25)]" />
                  <span className="text-[0.95rem] leading-relaxed text-ink-2"><b className="mb-0.5 block text-[1.04rem] leading-snug text-ink">{b}</b>{t}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <Reveal><h3 className="mb-6 text-center text-[1.35rem] font-semibold">Ce am construit eu, ca să știi cu cine lucrezi</h3></Reveal>
          <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {BUILT.map(([badge, gold, b, p, e]) => (
              <StaggerItem key={b} className="card flex gap-4 p-4 transition-shadow hover:shadow-soft sm:flex-col sm:gap-2 sm:p-5">
                <E e={e} className="text-[1.9rem] sm:mb-1" />
                <div className="flex min-w-0 flex-col gap-2">
                <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-bold sm:text-[0.78rem] ${gold ? "bg-[#fff1c9] text-[#8a5a00]" : "bg-[#e5eeff] text-[#2f55b8]"}`}>
                  {badge}
                </span>
                <b className="text-[1rem] leading-snug sm:text-[1.02rem]">{b}</b>
                <p className="text-[0.86rem] leading-normal text-muted sm:text-[0.9rem]">{p}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-12 grid items-center gap-6 rounded-[28px] bg-ink p-7 text-white sm:p-10 md:grid-cols-[.8fr_1.2fr] md:gap-10">
          <div>
            <h3 className="text-[1.45rem] font-semibold text-white sm:text-[1.65rem]">Promisiunile mele față de tine</h3>
            <p className="mt-2 text-[#c3c8dd]">Pe scurt, ce poți aștepta de la mine, mereu.</p>
          </div>
          <ul className="grid gap-3.5">
            {PROMISES.map(([b, t]) => (
              <li key={b} className="flex gap-3 leading-normal text-[#d3d8ea]">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-[#5be3a7]/20 text-[#5be3a7]"><Check className="size-3.5" strokeWidth={3} /></span>
                <span><b className="text-white">{b}</b> {t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
