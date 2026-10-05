import { Check, GraduationCap, Laptop, MapPin, ScrollText, ShieldCheck, Users } from "lucide-react";
import { CONFIG, WA_HELLO } from "@/lib/config";
import { Reveal } from "../ui/motion";
import { ButtonLink, WaIcon } from "../ui/button";
import { Photo } from "../ui/photo";

const FACTS = [
  [Users, "Predau programare copiilor de aproape un an: blocuri, Python și C/C++"],
  [ScrollText, "Certificat psihopedagogic pentru predare (DSPP)"],
  [GraduationCap, "Student în anul 3 la Calculatoare, Universitatea „Ștefan cel Mare” Suceava"],
  [Laptop, "Programator: fac site-uri și aplicații cu AI pentru firme"],
  [MapPin, "Lucrez online cu familii din toată țara și din diaspora"],
] as const;

const TRAITS: [string, string][] = [
  ["Răbdător", "Explic de câte ori e nevoie, de fiecare dată altfel, până se leagă."],
  ["Calm", "Greșelile fac parte din învățare. La mine niciun copil nu e certat sau făcut să se simtă prost."],
  ["Atent la copil", "Văd când obosește sau se blochează și schimb ritmul pe loc."],
  ["Entuziast", "Îmi place sincer ce fac, iar copiii simt asta."],
];

const BUILT: [string, string, string][] = [
  ["Locul 1 · ELSTUD 2025", "Un braț robotic, construit de la zero", "Lucrare premiată la concursul de lucrări științifice studențești."],
  ["Medalie de aur · ICE-USV 2026", "O platformă care urmărește mașini, cu AI", "Prezentată la salonul de inovație al universității."],
  ["Locul 1 din 18 · CTF 2025", "Concurs internațional de securitate cibernetică", "Primul loc printre echipele universitare."],
  ["Finalist național · UNbreakable 2026", "Competiția națională de securitate cibernetică", "Locul 10 din aproximativ 300 de echipe."],
];

const PROMISES: [string, string][] = [
  ["Nu fac temele în locul copilului.", "Îl învăț să le facă el."],
  ["Îți spun sincer cum progresează,", "inclusiv când e greu."],
  ["Sunt punctual și anunț din timp", "orice schimbare."],
  ["Dacă văd că nu e potrivit pentru el, îți spun.", "Nu țin pe nimeni doar pentru bani."],
];

export function About() {
  return (
    <section id="despre" className="section border-y border-line bg-paper">
      <div className="wrap">
        <div className="grid items-start gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
          {/* cartonașul profesorului */}
          <Reveal className="mx-auto w-full max-w-[460px] lg:sticky lg:top-24">
            <div className="relative grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-2xl bg-coral">
              <span className="font-display text-[5rem] font-bold text-white/90">L</span>
              <Photo />
            </div>
            <h3 className="mt-5 text-[1.45rem] font-semibold">Leonard Pădurean</h3>
            <p className="mt-1 text-[0.95rem] font-medium text-coral-t">Fondatorul Codito · profesorul de la fiecare lecție</p>
            {CONFIG.integrityCert && (
              <p className="mt-3 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-green">
                <ShieldCheck className="size-4" /> Certificat de integritate comportamentală
              </p>
            )}
            <ul className="my-6 grid gap-3 border-t border-line pt-5 text-[0.95rem] leading-snug text-ink-2">
              {FACTS.map(([I, t]) => (
                <li key={t} className="flex gap-3"><I className="mt-0.5 size-[17px] shrink-0 text-muted" aria-hidden />{t}</li>
              ))}
            </ul>
            <ButtonLink href={WA_HELLO} variant="wa" external className="w-full !py-4"><WaIcon /> Hai să vorbim 15 minute</ButtonLink>
            <p className="mt-2.5 text-center text-[0.85rem] text-muted">Fără obligații. Mă cunoști înainte să decizi.</p>
          </Reveal>

          {/* povestea */}
          <div className="min-w-0">
            <Reveal>
              <span className="kicker mb-4">Cine lucrează cu copilul tău</span>
              <h2 className="text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold">Bună, sunt Leonard. Eu țin fiecare lecție.</h2>
            </Reveal>
            <Reveal className="mt-6 grid max-w-[680px] gap-4 text-[1.08rem] leading-[1.75] text-ink-2">
              <p>Predau programare copiilor de aproape un an și am observat un lucru: <strong className="text-ink">copiii învață enorm atunci când cineva are timp doar pentru ei</strong>. Când pot întreba orice fără să le fie rușine și când construiesc ceva care e al lor.</p>
              <p>Într-o grupă, timpul ăsta nu există. De aceea am pornit Codito și lucrez doar unu la unu: 90 de minute în care copilul tău are toată atenția mea.</p>
              <p className="border-l-[3px] border-coral pl-5 text-ink">
                Codito nu e o școală mare, cu profesori care se schimbă. Pe mine mă cunoaște copilul, eu îți trimit rapoartele, cu mine vorbești când ai o întrebare.
              </p>
              <p>Sunt destul de tânăr cât copiii să mă simtă „de-al lor” și destul de pregătit cât să-i duc departe. Predau ce construiesc în fiecare zi, ca programator.</p>
              <p className="font-hand text-[2.3rem] leading-none text-coral-t">Leonard</p>
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="text-[1.3rem] font-semibold">Cum sunt la lecție</h3>
              <dl className="mt-4 grid gap-x-10 sm:grid-cols-2">
                {TRAITS.map(([b, t]) => (
                  <div key={b} className="border-t border-line py-4">
                    <dt className="font-semibold text-ink">{b}</dt>
                    <dd className="mt-1 text-[0.98rem] leading-relaxed text-ink-2">{t}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* realizări: listă, ca într-un CV */}
        <Reveal className="mt-20 sm:mt-24">
          <h3 className="text-[1.3rem] font-semibold">Ce am construit eu, ca să știi cu cine lucrezi</h3>
          <ul className="mt-4 grid gap-x-10 md:grid-cols-2">
            {BUILT.map(([badge, b, p]) => (
              <li key={b} className="border-t border-line py-5">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t">{badge}</span>
                <b className="mt-1.5 block text-[1.06rem] leading-snug text-ink">{b}</b>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{p}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12 grid items-start gap-6 rounded-2xl bg-ink p-7 text-white sm:p-10 md:grid-cols-[.8fr_1.2fr] md:gap-10">
          <h3 className="text-[1.45rem] font-semibold text-white sm:text-[1.65rem]">Ce poți aștepta de la mine, mereu</h3>
          <ul className="grid gap-3.5">
            {PROMISES.map(([b, t]) => (
              <li key={b} className="flex gap-3 leading-relaxed text-[#d3d8ea]">
                <Check className="mt-1 size-4 shrink-0 text-[#5be3a7]" strokeWidth={3} aria-hidden />
                <span><b className="font-semibold text-white">{b}</b> {t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
