import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { WA_HELLO } from "@/lib/config";
import { ButtonLink, WaIcon } from "../ui/button";
import { Reveal } from "../ui/motion";
import { Avatar } from "./bits";

/** Secțiunea întunecată de final, în stilul celei de pe pagina principală. */
export function EndCta({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <section className="section bg-ink text-white" aria-label="Lecția gratuită">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
        <Reveal>
          <h2 className="max-w-[640px] text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold text-white">{title}</h2>
          <p className="mt-5 max-w-[560px] text-[1.08rem] leading-relaxed text-[#c3c8dd] sm:text-[1.12rem]">{children}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>a]:sm:whitespace-nowrap">
            <ButtonLink href="/#plan" arrow>Programează lecția gratuită 1:1</ButtonLink>
            <ButtonLink href={WA_HELLO} variant="wa" external><WaIcon /> Scrie‑mi pe WhatsApp</ButtonLink>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem] text-[#c3c8dd]">
            {["Gratuit", "Fără obligații", "45 de minute, online"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5"><Check className="size-4 text-[#5be3a7]" strokeWidth={3} aria-hidden />{t}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl bg-white/[.06] p-6 ring-1 ring-white/10 sm:p-7">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-[#ffb08f]">La lecția gratuită</p>
          <ol className="mt-4 grid gap-4">
            {[
              ["0–10 min", "Ne cunoaștem", "Aflu ce îi place, ce a mai încercat și ce l‑ar entuziasma să construiască."],
              ["10–40 min", "Își face primul joc", "Scrie el codul, cu mâna lui. Eu îl ghidez pas cu pas."],
              ["40–45 min", "Ți‑l arată", "Intri și tu: copilul îți arată jocul și îți explică cum funcționează."],
            ].map(([m, b, t]) => (
              <li key={b} className="grid gap-x-3 gap-y-1 border-t min-[400px]:grid-cols-[88px_1fr] border-white/10 pt-4 first:border-t-0 first:pt-0">
                <span className="pt-0.5 font-mono text-[0.78rem] font-semibold text-[#ffb08f]">{m}</span>
                <span>
                  <b className="block text-white">{b}</b>
                  <span className="mt-0.5 block text-[0.95rem] leading-relaxed text-[#c3c8dd]">{t}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
            <Avatar className="size-11 text-[1rem]" />
            <p className="text-[0.92rem] leading-snug text-[#c3c8dd]"><b className="block text-white">Leonard Pădurean</b>ține el lecția, unu la unu</p>
            <span className="ml-auto font-hand max-[419px]:hidden text-[1.7rem] leading-none text-[#ffb08f]" aria-hidden>Leonard</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
