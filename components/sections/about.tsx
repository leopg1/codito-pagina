import { Check, GraduationCap, Laptop, MapPin, ScrollText, ShieldCheck, Users } from "lucide-react";
import { CONFIG, WA_HELLO } from "@/lib/config";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import { E } from "../ui/emoji";
import { ButtonLink, WaIcon } from "../ui/button";
import { Photo } from "../ui/photo";

const FACTS = [
  [Users, "Predau programare copiilor de peste un an. Construim împreună aplicații reale, nu doar teorie"],
  [ScrollText, "Pregătire în pedagogie: știu cum învață copiii și cum să le explic pe înțelesul lor"],
  [GraduationCap, "Student la inginerie, în domeniul Calculatoare"],
  [Laptop, "Programator software de 5 ani, angajat în domeniu, și cercetător"],
  [MapPin, "Lucrez online cu familii din toată țara și din diaspora"],
] as const;

const TRAITS: [string, string, string][] = [
  ["🧘", "Răbdător", "Explic de câte ori e nevoie, de fiecare dată altfel, până se leagă."],
  ["🤗", "Calm", "Greșelile fac parte din învățare. La mine niciun copil nu e certat sau făcut să se simtă prost."],
  ["👀", "Atent la copil", "Văd când obosește sau se blochează și schimb ritmul pe loc."],
  ["⚡", "Entuziast", "Îmi place sincer ce fac, iar copiii simt asta."],
];

const BUILT: [string, string, string, string][] = [
  ["💻", "Experiență", "5 ani ca programator software", "Sunt angajat în domeniu și scriu zilnic cod pentru aplicații folosite de oameni reali. Copiii învață de la cineva care face asta în fiecare zi."],
  ["🧑‍🏫", "Predare", "Peste un an alături de copii", "Am lucrat cu copii de 9–17 ani, de la primul lor program până la proiecte terminate și prezentate cu mândrie."],
  ["🏆", "Concursuri", "Premii naționale și internaționale", "Proiectele mele au luat premii la concursuri de tehnologie, în țară și în afara ei."],
  ["🔬", "Cercetare", "Lucrări premiate la conferințe", "Ca cercetător, am prezentat lucrări la conferințe științifice, unde au fost premiate."],
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
        {/* pe telefon, titlul vine înaintea pozei */}
        <Reveal className="mb-8 lg:hidden">
          <span className="kicker mb-4">Cine lucrează cu copilul tău</span>
          <h2 className="text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold">Bună, sunt <span className="whitespace-nowrap">Leonard <E e="👋" className="text-[0.85em]" /></span><br />Eu țin fiecare lecție.</h2>
        </Reveal>
        <div className="grid items-start gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
          {/* cartonașul profesorului */}
          <Reveal className="mx-auto w-full max-w-[460px] lg:sticky lg:top-24">
            {CONFIG.video ? (
              <div className="overflow-hidden rounded-2xl bg-ink">
                <video src={CONFIG.video} poster={CONFIG.videoPoster || undefined} controls playsInline preload="none" className="aspect-[4/5] w-full object-cover" aria-label="Leonard se prezintă, 60 de secunde" />
              </div>
            ) : CONFIG.photo ? (
              /* pe telefon: card de profil compact (poză mică + nume); de la tabletă în sus: poză mare */
              <div className="flex items-center gap-4 sm:block">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-coral border-4 border-peach min-[400px]:size-28 sm:aspect-[4/5] sm:size-auto sm:w-full sm:border-0">
                  <Photo className="object-[50%_35%] max-sm:scale-[1.35] max-sm:object-[50%_45%]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[1.3rem] font-semibold leading-tight sm:mt-5 sm:text-[1.45rem]">Leonard Pădurean</h3>
                  <p className="mt-1 text-[0.92rem] font-medium leading-snug text-coral-t sm:text-[0.95rem]">Fondatorul Codito · <span className="sm:whitespace-nowrap">profesorul de la fiecare lecție</span></p>
                </div>
              </div>
            ) : (
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-night p-6 font-mono text-[0.95rem] leading-[1.9] text-[#c3c8dd] sm:aspect-[4/5] sm:p-7" aria-label="Leonard Pădurean: predau Python, C++ și AI copiilor, 1:1">
                <div className="mb-5 flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" /></div>
                <div aria-hidden>
                  <p><span className="text-coral">$</span> whoami</p>
                  <p className="text-white">Leonard Pădurean</p>
                  <p className="mt-3"><span className="text-coral">$</span> cat predau.txt</p>
                  <p className="text-[#9be7be]">Python · C++ · AI</p>
                  <p className="text-[#9be7be]">copii și adolescenți, 1:1</p>
                  <p className="mt-3"><span className="text-coral">$</span> cat motto.txt</p>
                  <p className="text-sun">„Ecranul e pentru construit.”</p>
                  <p className="mt-3"><span className="text-coral">$</span> <i className="inline-block h-[1.1em] w-[0.55em] translate-y-[3px] animate-blink bg-coral" /></p>
                </div>
              </div>
            )}
            {!CONFIG.photo && (
              <>
                <h3 className="mt-5 text-[1.45rem] font-semibold">Leonard Pădurean</h3>
                <p className="mt-1 text-[0.95rem] font-medium text-coral-t">Fondatorul Codito · <span className="whitespace-nowrap">profesorul de la fiecare lecție</span></p>
              </>
            )}
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
            <Reveal className="hidden lg:block">
              <span className="kicker mb-4">Cine lucrează cu copilul tău</span>
              <h2 className="text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold">Bună, sunt <span className="whitespace-nowrap">Leonard <E e="👋" className="text-[0.85em]" /></span><br />Eu țin fiecare lecție.</h2>
            </Reveal>
            <Reveal className="grid lg:mt-6 max-w-[680px] gap-4 text-[1.08rem] leading-[1.75] text-ink-2">
              <p>Predau programare copiilor de peste un an și am observat un lucru: <strong className="text-ink">copiii învață enorm atunci când cineva are timp doar pentru ei</strong>. Când pot întreba orice fără să le fie rușine și când construiesc ceva care e al lor.</p>
              <p>Într‑o grupă, timpul ăsta nu există. De aceea am pornit Codito și lucrez doar unu la unu: 90 de minute în care copilul tău are toată atenția mea.</p>
              <p className="border-l-[3px] border-coral pl-5 text-ink">
                <E e="💬" className="mr-1.5" />Codito nu e o școală mare, cu profesori care se schimbă. Pe mine mă cunoaște copilul, eu îți trimit rapoartele, cu mine vorbești când ai o întrebare.
              </p>
              <p>Sunt destul de tânăr cât copiii să mă simtă „de‑al lor” și destul de pregătit cât să‑i duc departe. Predau ce construiesc în fiecare zi, ca programator.</p>
              <p className="font-hand text-[2.3rem] leading-none text-coral-t">Leonard</p>
            </Reveal>

            <Reveal className="mt-14">
              <h3 className="text-[1.3rem] font-semibold">Cum sunt la lecție</h3>
              <Stagger as="dl" className="mt-4 grid gap-x-10 sm:grid-cols-2">
                {TRAITS.map(([e, b, t]) => (
                  <StaggerItem key={b} className="border-t border-line py-4">
                    <dt className="flex items-center gap-2 font-semibold text-ink"><E e={e} className="text-[1.2rem]" />{b}</dt>
                    <dd className="mt-1 text-[0.98rem] leading-relaxed text-ink-2">{t}</dd>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          </div>
        </div>

        {/* realizări: listă, ca într‑un CV */}
        <Reveal className="mt-14 sm:mt-24">
          <h3 className="text-[1.3rem] font-semibold">Ce am construit eu, ca să știi cu cine lucrezi</h3>
          <Stagger as="ul" className="mt-4 grid gap-x-10 md:grid-cols-2">
            {BUILT.map(([e, badge, b, p]) => (
              <StaggerItem as="li" key={b} className="grid grid-cols-[auto_1fr] gap-x-4 border-t border-line py-5">
                <E e={e} className="row-span-3 mt-0.5 text-[1.7rem]" />
                <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-coral-t">{badge}</span>
                <b className="mt-1.5 block text-[1.06rem] leading-snug text-ink">{b}</b>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>

        <Reveal className="mt-12 grid items-start gap-6 rounded-2xl bg-ink p-6 text-white sm:p-10 md:grid-cols-[.8fr_1.2fr] md:gap-10">
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
