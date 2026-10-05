import { Check } from "lucide-react";
import { WA_HELLO } from "@/lib/config";
import { KidName } from "../kid-context";
import { Reveal } from "../ui/motion";
import { ButtonLink, WaIcon } from "../ui/button";

export function Closing() {
  return (
    <section id="final" className="section relative overflow-hidden bg-ink text-center text-white">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(240_100_58/.22),transparent_60%)]" />
      <div className="wrap relative">
        <Reveal>
          <span className="kicker justify-center !text-[#ffb08f]">Un ultim gând</span>
          <h2 className="mx-auto mt-4 max-w-[820px] text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold text-white">
            Peste un an, <KidName /> va fi stat oricum sute de ore în fața unui ecran.
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[1.12rem] text-[#c3c8dd]">
            Singura întrebare e: <strong className="text-white">ce va avea de arătat pentru ele?</strong> Totul începe cu o lecție gratuită, unu la unu, de 45 de minute.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="#plan" arrow>Programează lecția gratuită 1:1</ButtonLink>
          <ButtonLink href={WA_HELLO} variant="wa" external><WaIcon /> Scrie-mi pe WhatsApp</ButtonLink>
        </Reveal>
        <Reveal delay={0.15} className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.92rem] text-[#c3c8dd]">
          {["Gratuit", "Fără obligații", "Garanție de returnare a banilor"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5"><Check className="size-4 text-[#5be3a7]" strokeWidth={3} />{t}</span>
          ))}
        </Reveal>
        <Reveal delay={0.2} className="mx-auto mt-14 max-w-[640px] border-t border-white/15 pt-7 text-left text-[1.02rem] text-[#c3c8dd]">
          <b className="mb-1 block font-hand text-[1.8rem] leading-none text-sun">P.S.</b>
          Cel mai rău lucru care se poate întâmpla la lecția gratuită? <KidName cap /> petrece 45 de minute construind primul lui program, în loc să se uite la clipuri. Nu sună chiar rău, nu? 🙂
        </Reveal>
      </div>
    </section>
  );
}
