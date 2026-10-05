"use client";

import { ArrowRight } from "lucide-react";
import { BUBBLES, BUBBLE_EMOJI } from "@/lib/content";
import { KidGen } from "../kid-context";
import { E } from "../ui/emoji";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import { CtaInline } from "../ui/cta-inline";
import { Calculator } from "./calculator";

const PAIRS: [string, string][] = [
  ["Se joacă jocuri făcute de alții", "Își face propriul joc și îl dă prietenilor"],
  ["Se uită la clipuri, unul după altul", "Își construiește un site, cu link adevărat"],
  ["Copiază răspunsuri de la AI", "Folosește AI‑ul ca asistent, cu mintea lui"],
];

export function Problem() {
  return (
    <section className="section" id="problema">
      <div className="wrap">
        {/* 1 · gândurile părinților */}
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <Reveal className="lg:pt-6">
            <h2 className="text-[clamp(2rem,4.4vw,3.1rem)] font-semibold">Sună cunoscut?</h2>
            <p className="mt-4 max-w-[30ch] text-[1.12rem] leading-relaxed text-ink-2">
              Sunt lucrurile pe care le aud cel mai des de la părinți, înainte de prima lecție.
            </p>
          </Reveal>
          <Stagger className="grid gap-3">
            {BUBBLES.map((b, i) => (
              <StaggerItem as="p"
                key={b}
                className={`flex w-fit max-w-[34rem] items-start gap-3 rounded-[20px] border border-line bg-paper px-4 py-3.5 text-[1.02rem] leading-snug text-ink-2 sm:px-5 ${
                  i % 2 ? "ml-auto rounded-br-md" : "rounded-bl-md"
                }`}
              >
                <E e={BUBBLE_EMOJI[i]} className="mt-0.5 text-[1.15rem]" />
                <span>{b}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* 2 · ideea centrală + comparația */}
        <div className="mt-24 sm:mt-32">
          <Reveal className="max-w-[760px]">
            <h2 className="text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold">
              Problema nu e calculatorul. E că îl folosește doar ca să consume.
            </h2>
            <p className="mt-5 text-[1.12rem] leading-relaxed text-ink-2 sm:text-[1.2rem]">
              Același copil care stă ore pe ecran are deja tot ce îi trebuie: curiozitate, răbdare pentru ce îi place, ușurință cu tehnologia. Trebuie doar să întoarcem ecranul spre <strong className="text-ink">creație</strong>.
            </p>
          </Reveal>

          <Reveal className="mt-10 overflow-hidden rounded-2xl border border-line bg-paper">
            <div className="grid grid-cols-2 border-b border-line text-[0.82rem] font-semibold uppercase tracking-[0.08em]">
              <div className="px-4 py-3 text-muted sm:px-6"><E e="📱" className="mr-1.5 text-[1rem]" />Acum</div>
              <div className="border-l border-line bg-mint/60 px-4 py-3 text-green sm:px-6"><E e="🛠️" className="mr-1.5 text-[1rem]" />Cu lecții Codito</div>
            </div>
            {PAIRS.map(([a, b], k) => (
              <div key={a} className={`grid grid-cols-2 ${k ? "border-t border-line" : ""}`}>
                <div className="px-4 py-4 text-[0.98rem] leading-snug text-ink-2 sm:px-6 sm:text-[1.04rem]">{a}</div>
                <div className="flex gap-2 border-l border-line bg-mint/30 px-4 py-4 text-[0.98rem] font-medium leading-snug text-ink sm:px-6 sm:text-[1.04rem]">
                  <ArrowRight className="mt-[3px] hidden size-4 shrink-0 text-green sm:block" aria-hidden />
                  {b}
                </div>
              </div>
            ))}
          </Reveal>

          {/* de ce acum: text simplu, fără carduri */}
          <Stagger className="mt-12 grid gap-6 border-t border-line pt-8 md:grid-cols-3 md:gap-10">
            <StaggerItem as="p" className="text-[1rem] leading-relaxed text-ink-2"><E e="🤖" className="mb-2 block text-[1.6rem]" /><b className="block text-ink">AI‑ul intră în toate meseriile.</b>Medic, inginer sau designer: contează cine știe să‑l folosească bine.</StaggerItem>
            <StaggerItem as="p" className="text-[1rem] leading-relaxed text-ink-2"><E e="🧠" className="mb-2 block text-[1.6rem]" /><b className="block text-ink">Programarea învață gândirea.</b>Pași mici, răbdare, să cauți greșeala și să nu renunți.</StaggerItem>
            <StaggerItem as="p" className="text-[1rem] leading-relaxed text-ink-2"><E e="🌱" className="mb-2 block text-[1.6rem]" /><b className="block text-ink">Cu cât mai devreme, cu atât mai ușor.</b>La 12 ani, un copil învață asta jucându-se.</StaggerItem>
          </Stagger>

          <Reveal className="mt-10 max-w-[760px] border-l-[3px] border-coral pl-5 sm:pl-7">
            <p className="font-display text-[1.3rem] font-semibold leading-snug text-ink"><E e="🤔" className="mr-2" />„Dar dacă nu vrea să se facă programator?”</p>
            <p className="mt-2 text-[1.06rem] leading-relaxed text-ink-2">
              Nu trebuie. Ce învață aici, să gândească logic, să caute singur o greșeală și să nu se oprească la primul obstacol, îi folosește în orice meserie ar alege.
            </p>
          </Reveal>
        </div>

        <Calculator />
        <CtaInline>Vrei să vezi cum ar arăta prima oră de creație a <KidGen />?</CtaInline>
      </div>
    </section>
  );
}
