"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { LEVELS, TRACKS, type AgeKey } from "@/lib/content";
import { KidName, useKid } from "../kid-context";
import { EASE, Reveal } from "../ui/motion";
import { CtaInline } from "../ui/cta-inline";
import { E } from "../ui/emoji";

const AGES: [AgeKey, string][] = [["10", "9–12 ani"], ["13", "13–14 ani"], ["15", "15–17 ani"]];

export function Journey() {
  const { age, setAge } = useKid();
  const line = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: line, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="traseu" className="section">
      <div className="wrap grid gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <h2 className="text-[clamp(1.9rem,4.2vw,2.95rem)] font-semibold">Ce va construi <KidName /> în primele 3 luni</h2>
            <p className="mt-4 text-[1.1rem] leading-relaxed text-ink-2">Un plan concret, lună cu lună. Alege vârsta sau scrie‑i prenumele și planul se potrivește.</p>
          </Reveal>
          <Personalizer />
          <Reveal className="mt-6 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap" role="tablist" aria-label="Vârsta">
            {AGES.map(([k, l]) => (
              <button
                key={k} role="tab" aria-selected={age === k} onClick={() => setAge(k)}
                className={clsx("relative whitespace-nowrap rounded-full px-3 py-2.5 text-[0.92rem] font-semibold transition-colors sm:px-5 sm:text-[0.95rem]", age === k ? "text-white" : "bg-paper text-ink-2 ring-1 ring-line hover:ring-coral")}
              >
                {age === k && <motion.span layoutId="agePill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </Reveal>
        </div>

        <div>
          <div ref={line} className="relative grid gap-5">
            <div aria-hidden className="absolute bottom-6 left-[23px] top-6 w-[2px] rounded bg-line sm:left-[27px]" />
            <motion.div aria-hidden style={{ scaleY }} className="absolute bottom-6 left-[23px] top-6 w-[2px] origin-top rounded bg-coral sm:left-[27px]" />
            <AnimatePresence mode="popLayout">
              {TRACKS[age].map(([t, d, p], i) => (
                <motion.div
                  key={age + i}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative grid grid-cols-[52px_1fr] items-start gap-3.5 sm:grid-cols-[56px_1fr] sm:gap-5"
                >
                  <div className={clsx("z-[1] grid size-[52px] place-items-center rounded-full border-2 border-coral text-center text-[0.7rem] font-bold uppercase leading-none tracking-wide sm:size-14 sm:text-[0.64rem]", i === 2 ? "bg-cta text-white border-cta" : "bg-cream text-coral-t")}>
                    <span><b className="block font-display text-[1.15rem] sm:text-[1.3rem]">{i + 1}</b>luna</span>
                  </div>
                  <div className="border-b border-line pb-6 pt-2">
                    <h3 className="text-[1.3rem] font-semibold">{t}</h3>
                    <p className="mt-2 leading-relaxed text-ink-2">{d}</p>
                    <p className="mt-3 text-[0.95rem] text-ink-2"><b className="text-coral-t">Ce vezi tu:</b> {p}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <p className="mt-6 pl-[62px] text-[0.95rem] text-muted sm:pl-[76px]">Planul se adaptează la ce îi place și la ritmul lui. Nu există două trasee identice.</p>
        </div>
      </div>

      <div className="wrap">
        <Curriculum />
        <CtaInline>Totul începe cu o singură lecție, gratuită.</CtaInline>
      </div>
    </section>
  );
}

function Personalizer() {
  const { kid, setKid, reset } = useKid();
  const [name, setName] = useState("");
  const [g, setG] = useState<"m" | "f">("m");
  const [age, setAgeLocal] = useState<AgeKey | "">("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let n = name.trim().replace(/[^\p{L}\s-]/gu, "").slice(0, 24);
    if (!n) { setErr(true); return; }
    n = n.charAt(0).toUpperCase() + n.slice(1);
    setKid({ name: n, g, age });
  };

  return (
    <Reveal className="mt-8 rounded-2xl bg-ink p-5 text-white sm:p-6">
      <h3 className="flex items-start gap-2 text-[1.15rem] font-semibold text-white"><E e="✨" className="mt-0.5 shrink-0" /> Vezi planul pentru copilul tău</h3>
      <div className="mt-4">
        <AnimatePresence mode="wait">
          {kid.name ? (
            <motion.p key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[1.05rem]">
              Gata. Planul e acum pentru <b className="text-sun">{kid.name}</b>.
              <button onClick={() => { reset(); setName(""); }} className="ml-2 py-2 text-[0.9rem] text-[#c3c8dd] underline underline-offset-4 hover:text-white">schimbă</button>
            </motion.p>
          ) : (
            <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} className="flex flex-wrap gap-2.5" autoComplete="off">
              <input
                value={name} onChange={(e) => { setName(e.target.value); setErr(false); }} placeholder="Prenumele copilului" maxLength={24} aria-label="Prenumele copilului"
                className={clsx("min-w-0 flex-[1_1_100%] rounded-xl bg-white/[.07] px-4 py-3 text-white outline-none ring-1 transition placeholder:text-white/45", err ? "ring-2 ring-coral" : "ring-white/15 hover:ring-white/30 focus:bg-white/10 focus:ring-2 focus:ring-coral")}
              />
              <div className="flex flex-[1_1_170px] rounded-xl bg-white/[.07] p-1 ring-1 ring-white/15" role="group" aria-label="Băiat sau fată">
                {(["m", "f"] as const).map((v) => (
                  <button key={v} type="button" onClick={() => setG(v)} aria-pressed={g === v}
                    className={clsx("min-h-11 flex-1 rounded-lg py-2.5 text-[0.95rem] font-semibold transition", g === v ? "bg-white/15 text-white ring-1 ring-white/20" : "text-[#a3aac4] hover:text-white")}>
                    {v === "m" ? "Băiat" : "Fată"}
                  </button>
                ))}
              </div>
              <select value={age} onChange={(e) => setAgeLocal(e.target.value as AgeKey)} aria-label="Vârsta"
                className="select select-dark min-w-0 flex-[1_1_150px] rounded-xl bg-white/[.07] px-4 py-3 text-white outline-none ring-1 ring-white/15 transition hover:ring-white/30 focus:ring-2 focus:ring-coral">
                <option value="">Vârsta…</option>
                {AGES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
              <button className="w-full rounded-full bg-cta py-3.5 font-semibold text-white transition hover:bg-cta-d">Arată‑mi planul</button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function Curriculum() {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <Reveal className="mt-20 border-t border-line pt-14 sm:mt-24">
      <h3 className="max-w-[760px] text-[clamp(1.6rem,3.4vw,2.3rem)] font-semibold">Programa completă: de unde pornește și până unde ajunge</h3>
      <p className="mt-3 max-w-[680px] text-[1.05rem] leading-relaxed text-ink-2">Trei niveluri. Copilul începe de unde e acum și urcă în ritmul lui. Durata e orientativă, la o lecție pe săptămână.</p>

      <div className="mt-8 grid gap-2.5">
        {LEVELS.map((l) => {
          const isOpen = open === l.n;
          return (
            <div key={l.n} className={clsx("overflow-hidden rounded-2xl border transition-colors", isOpen ? "border-coral/40 bg-paper" : "border-line bg-paper")}>
              <button onClick={() => setOpen(isOpen ? null : l.n)} aria-expanded={isOpen} className="flex w-full items-center gap-3.5 px-4 py-4 text-left sm:px-5">
                <span className={clsx("grid size-9 shrink-0 place-items-center rounded-full font-display font-bold text-white transition-colors", isOpen ? "bg-cta" : "bg-ink")}>{l.n}</span>
                <span className="min-w-0">
                  <b className="block font-display text-[1.15rem] font-semibold">{l.name} <E e={["🧭", "🔨", "🚀"][l.n - 1]} className="ml-0.5 text-[1rem]" /></b>
                  <small className="mt-0.5 block text-[0.86rem] leading-snug text-muted">{l.meta}</small>
                </span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="ml-auto text-coral"><Plus className="size-6" aria-hidden /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                    <div className="grid gap-x-6 gap-y-1 px-4 pb-5 sm:grid-cols-2 sm:px-5">
                      <List title="Ce învață" items={l.learn} />
                      <List title="Ce construiește" items={l.build} />
                      <div className="mt-3 rounded-xl bg-cream px-4 py-3.5 sm:col-span-2">
                        <h4 className="text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-coral-t">La final știe să…</h4>
                        <p className="mt-1.5 text-[0.95rem] text-ink-2">{l.outcome}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-2">
        <E e="💚" /> <b className="text-ink">La fiecare nivel, mereu:</b> gândire logică · AI folosit corect · prezentarea proiectului în fața familiei · raport pentru părinte după fiecare lecție
      </p>
    </Reveal>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-2 mt-2 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-coral-t">{title}</h4>
      <ul className="grid gap-2">
        {items.map((t) => (
          <li key={t} className="relative pl-[18px] text-[0.95rem] leading-normal text-ink-2 before:absolute before:left-0.5 before:top-[.6em] before:size-1.5 before:rounded-full before:bg-coral">{t}</li>
        ))}
      </ul>
    </div>
  );
}
