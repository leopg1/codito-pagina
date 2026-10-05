"use client";

import { motion } from "motion/react";
import { E, EBadge } from "../ui/emoji";
import { ArrowDown, ArrowRight, Check, X } from "lucide-react";
import { BUBBLES, BUBBLE_EMOJI } from "@/lib/content";
import { KidGen } from "../kid-context";
import { SectionHead } from "../ui/section-head";
import { Reveal, Stagger, StaggerItem, item } from "../ui/motion";
import { CtaInline } from "../ui/cta-inline";
import { Calculator } from "./calculator";

export function Problem() {
  return (
    <section className="section" id="problema">
      <SectionHead kicker="Poate te-ai surprins gândind așa" title="Nu ești singurul părinte care simte asta." className="px-[18px]" />

      <div className="wrap">
        <Stagger className="mx-auto mt-12 grid max-w-[880px] gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-4">
          {BUBBLES.map((b, i) => (
            <motion.p
              key={b}
              variants={item}
              whileHover={{ y: -3, rotate: i % 2 ? 0.6 : -0.6 }}
              className={`flex items-center gap-3.5 rounded-[22px] border border-line bg-paper px-5 py-[18px] text-[1.04rem] italic leading-snug text-ink-2 shadow-[0_10px_26px_-18px_rgb(30_36_66/.35)] ${
                i % 2 ? "ml-7 rounded-br-md sm:ml-0 sm:translate-y-[18px]" : "mr-7 rounded-bl-md sm:mr-0"
              }`}
            >
              <EBadge e={BUBBLE_EMOJI[i]} className="size-10 rounded-full bg-cream text-[1.25rem] not-italic" />
              <span>„{b}”</span>
            </motion.p>
          ))}
        </Stagger>

        <SectionHead
          className="mt-20 sm:mt-28"
          kicker="Adevărul pe care puțini îl spun"
          title={<>Problema nu e calculatorul. E că îl folosește doar ca să <span className="hl">consume</span>.</>}
          lead={<>Același copil care stă ore pe ecran are deja tot ce îi trebuie: curiozitate, răbdare pentru ce îi place, ușurință cu tehnologia. Trebuie doar să întoarcem ecranul spre <strong className="text-ink">creație</strong>.</>}
        />

        <div className="mt-12 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <Reveal className="rounded-[22px] bg-sand p-6 sm:p-8">
            <h3 className="text-[1.3rem] font-semibold"><E e="📱" className="mr-2" />Copilul care consumă</h3>
            <p className="mb-5 mt-1 text-[0.95rem] text-muted">ce se întâmplă acum, în majoritatea caselor</p>
            <ul className="space-y-3">
              {["Se joacă jocuri făcute de alții", "Se uită la clipuri, unul după altul", "Copiază răspunsuri de la AI"].map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-[3px] grid size-5 shrink-0 place-items-center rounded-full bg-ink/10 text-ink-2"><X className="size-3" strokeWidth={3} aria-hidden /></span>{t}</li>
              ))}
            </ul>
          </Reveal>
          <div className="grid place-items-center text-coral" aria-hidden>
            <ArrowRight className="hidden size-8 md:block" /><ArrowDown className="size-7 md:hidden" />
          </div>
          <Reveal delay={0.1} className="rounded-[22px] bg-mint p-6 sm:p-8">
            <h3 className="text-[1.3rem] font-semibold"><E e="🛠️" className="mr-2" />Copilul care creează</h3>
            <p className="mb-5 mt-1 text-[0.95rem] text-muted">ce urmărim împreună</p>
            <ul className="space-y-3">
              {["Își face propriul joc și îl dă prietenilor", "Își construiește un site cu link adevărat", "Folosește AI-ul ca pe un asistent, cu mintea lui"].map((t) => (
                <li key={t} className="flex gap-3"><span className="mt-[3px] grid size-5 shrink-0 place-items-center rounded-full bg-green/15 text-green"><Check className="size-3" strokeWidth={3} aria-hidden /></span>{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Stagger className="mt-6 grid gap-3 md:grid-cols-3 md:gap-4">
          {[
            ["🤖", "AI-ul intră în toate meseriile.", "Contează cine știe să-l folosească bine."],
            ["🧠", "Programarea învață gândirea:", "pași mici, răbdare, să nu renunți."],
            ["🌱", "Cu cât mai devreme, cu atât mai ușor.", "La 12 ani, învață jucându-se."],
          ].map(([e, b, t]) => (
            <StaggerItem key={b} className="card flex items-start gap-3 p-4 transition-transform hover:-translate-y-0.5 sm:p-5">
              <EBadge e={e} className="size-11 rounded-xl bg-cream text-[1.35rem]" />
              <p className="text-[0.95rem] leading-normal text-ink-2"><b className="text-ink">{b}</b> {t}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-4 rounded-[22px] bg-peach p-6 text-[1.04rem] sm:p-8 sm:text-[1.1rem]">
          <b className="mb-1.5 block font-display text-[1.25rem] font-semibold"><E e="🤔" className="mr-2" />„Dar dacă nu vrea să se facă programator?”</b>
          Nici nu trebuie. Nu formez programatori, formez copii care <strong>înțeleg tehnologia în loc să fie controlați de ea</strong>. Asta îi folosește orice meserie ar alege.
        </Reveal>

        <Calculator />
        <CtaInline>Vrei să vezi cum ar arăta prima oră de creație a <KidGen />?</CtaInline>
      </div>
    </section>
  );
}
