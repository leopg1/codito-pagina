import { Check } from "lucide-react";
import { CONFIG, WA_HELLO, shareLink } from "@/lib/config";
import { E } from "../ui/emoji";
import { KidName } from "../kid-context";
import { Reveal } from "../ui/motion";
import { ButtonLink, WaIcon } from "../ui/button";

export function Closing() {
  return (
    <section id="final" className="section bg-ink text-center text-white">
      <div className="wrap">
        <Reveal>
          <h2 className="mx-auto max-w-[820px] text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold text-white">
            Peste un an, <KidName /> va fi stat oricum sute de ore în fața unui ecran.
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[1.12rem] text-[#c3c8dd]">
            Întrebarea e <strong className="text-white">ce va avea de arătat pentru ele</strong>. Totul începe cu o lecție gratuită, unu la unu, de 45 de minute.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="#plan" arrow className="whitespace-nowrap">Programează lecția gratuită 1:1</ButtonLink>
          <ButtonLink href={WA_HELLO} variant="wa" external><WaIcon /> Scrie‑mi pe WhatsApp</ButtonLink>
        </Reveal>
        <Reveal delay={0.15} className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.92rem] text-[#c3c8dd]">
          {["Gratuit", "Fără obligații", "Garanție de returnare a banilor"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5"><Check className="size-4 text-[#5be3a7]" strokeWidth={3} />{t}</span>
          ))}
        </Reveal>
        <Reveal delay={0.2} className="mx-auto mt-12 grid max-w-[640px] gap-3 text-left">
          <p className="text-[0.95rem] font-semibold text-white">Nu sunteți hotărâți încă? E în regulă.</p>
          <a href={shareLink(`Uite ce lecții de programare am găsit pentru copil: unu la unu, online, prima lecție e gratuită. Ce zici? ${CONFIG.siteUrl}`)} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-xl bg-white/[.06] px-4 py-3 text-[0.95rem] text-[#d3d8ea] ring-1 ring-white/10 transition hover:bg-white/10">
            <E e="👪" className="text-[1.2rem]" /><span><b className="text-white">Trimite pagina celuilalt părinte</b> pe WhatsApp, ca să decideți împreună.</span>
          </a>
          {CONFIG.workshop.date && (
            <a href="/inscriere/" className="flex items-center gap-3 rounded-xl bg-white/[.06] px-4 py-3 text-[0.95rem] text-[#d3d8ea] ring-1 ring-white/10 transition hover:bg-white/10">
              <E e="🧪" className="text-[1.2rem]" /><span><b className="text-white">Atelier gratuit, {CONFIG.workshop.date}</b>{CONFIG.workshop.note ? `: ${CONFIG.workshop.note}` : ""}. Înscrie copilul aici.</span>
            </a>
          )}
          {CONFIG.whatsappChannel && (
            <a href={CONFIG.whatsappChannel} target="_blank" rel="noopener" className="flex items-center gap-3 rounded-xl bg-white/[.06] px-4 py-3 text-[0.95rem] text-[#d3d8ea] ring-1 ring-white/10 transition hover:bg-white/10">
              <E e="📬" className="text-[1.2rem]" /><span><b className="text-white">Urmărește canalul de WhatsApp:</b> un proiect mic pe săptămână, de făcut acasă cu copilul.</span>
            </a>
          )}
        </Reveal>
        <Reveal delay={0.2} className="mx-auto mt-12 max-w-[640px] border-t border-white/15 pt-7 text-left text-[1.02rem] text-[#c3c8dd]">
          <b className="text-white">P.S.</b> Cel mai rău lucru care se poate întâmpla la lecția gratuită? <KidName cap /> petrece 45 de minute construind primul lui program, în loc să se uite la clipuri. Nu sună chiar rău, nu? 🙂
        </Reveal>
      </div>
    </section>
  );
}
