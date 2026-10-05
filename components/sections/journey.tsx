"use client";

import clsx from "clsx";
import { E, EBadge } from "../ui/emoji";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { LEVELS, TRACKS, type AgeKey } from "@/lib/content";
import { KidName, useKid } from "../kid-context";
import { SectionHead } from "../ui/section-head";
import { EASE, Reveal } from "../ui/motion";
import { CtaInline } from "../ui/cta-inline";

const AGES: [AgeKey, string][] = [["10", "9–12 ani"], ["13", "13–14 ani"], ["15", "15–17 ani"]];

export function Journey() {
  const { age, setAge } = useKid();
  const line = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: line, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="traseu" className="section">
      <SectionHead kicker="Drumul, pas cu pas" title={<>Ce va construi <KidName /> în primele 3 luni</>} className="px-[18px]" />

      <div className="wrap"><Personalizer /></div>

      <div className="narrow">
        <Reveal className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Vârsta">
          {AGES.map(([k, l]) => (
            <button
              key={k} role="tab" aria-selected={age === k} onClick={() => setAge(k)}
              className={clsx("relative rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-colors", age === k ? "text-white" : "bg-paper text-ink-2 ring-1 ring-line hover:ring-coral")}
            >
              {age === k && <motion.span layoutId="agePill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{l}</span>
            </button>
          ))}
        </Reveal>

        <div ref={line} className="relative mt-10 grid gap-5">
          <div aria-hidden className="absolute bottom-6 left-[23px] top-6 w-[3px] rounded bg-line sm:left-[31px]" />
          <motion.div aria-hidden style={{ scaleY }} className="absolute bottom-6 left-[23px] top-6 w-[3px] origin-top rounded bg-gradient-to-b from-coral to-sun sm:left-[31px]" />
          <AnimatePresence mode="popLayout">
            {TRACKS[age].map(([t, d, p], i) => (
              <motion.div
                key={age + i}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
                className="relative grid grid-cols-[48px_1fr] items-start gap-3.5 sm:grid-cols-[64px_1fr] sm:gap-5"
              >
                <div className={clsx("z-[1] grid size-12 place-items-center rounded-full border-[3px] border-coral text-center text-[0.6rem] font-bold uppercase leading-none tracking-wide sm:size-16 sm:text-[0.7rem]", i === 2 ? "bg-coral text-white" : "bg-paper text-coral-t")}>
                  <span><b className="block font-display text-[1.15rem] sm:text-[1.4rem]">{i + 1}</b>luna</span>
                </div>
                <div className="card p-5 sm:p-7">
                  <h3 className="text-[1.25rem] font-semibold">{t}</h3>
                  <p className="mt-2 text-ink-2">{d}</p>
                  <div className="mt-4 flex gap-2.5 rounded-xl bg-cream px-4 py-3 text-[0.95rem] text-ink-2">
                    <E e="👀" className="mt-0.5 text-[1.1rem]" /><span><b className="text-ink">Ce vezi tu:</b> {p}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <p className="mt-8 text-center text-muted">Planul se adaptează la ce îi place și la ritmul lui. Nu există două trasee identice.</p>

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
    <Reveal className="relative mt-10 grid items-center gap-6 overflow-hidden rounded-[28px] bg-ink p-6 text-white sm:p-9 md:grid-cols-[1fr_1.3fr]">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(circle,rgb(240_100_58/.45),transparent_70%)]" />
      <div className="relative">
        <h3 className="flex items-center gap-2 text-[1.35rem] font-semibold text-white sm:text-[1.55rem]"><E e="✨" /> Vezi traseul pentru copilul tău</h3>
        <p className="mt-2 text-[0.98rem] text-[#c3c8dd]">Scrie-i prenumele și vârsta: planul de mai jos și restul paginii se potrivesc cu el sau cu ea.</p>
      </div>
      <div className="relative">
        <AnimatePresence mode="wait">
          {kid.name ? (
            <motion.p key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[1.05rem]">
              Gata! Mai jos e traseul pentru <b className="text-sun">{kid.name}</b>. 🙂
              <button onClick={() => { reset(); setName(""); }} className="ml-2 text-[0.9rem] text-[#c3c8dd] underline underline-offset-4 hover:text-white">schimbă</button>
            </motion.p>
          ) : (
            <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -8 }} className="flex flex-wrap gap-2.5" autoComplete="off">
              <input
                value={name} onChange={(e) => { setName(e.target.value); setErr(false); }} placeholder="Prenumele copilului" maxLength={24} aria-label="Prenumele copilului"
                className={clsx("min-w-0 flex-[1_1_100%] rounded-2xl bg-white/[.07] px-4 py-3.5 text-white outline-none ring-1 transition placeholder:text-white/45", err ? "ring-2 ring-coral" : "ring-white/15 hover:ring-white/30 focus:bg-white/10 focus:ring-2 focus:ring-coral")}
              />
              <div className="flex flex-[1_1_170px] rounded-2xl bg-white/[.07] p-1 ring-1 ring-white/15" role="group" aria-label="Băiat sau fată">
                {(["m", "f"] as const).map((v) => (
                  <button key={v} type="button" onClick={() => setG(v)} aria-pressed={g === v}
                    className={clsx("flex-1 rounded-xl py-2.5 text-[0.95rem] font-semibold transition", g === v ? "bg-white/15 text-white ring-1 ring-white/20" : "text-[#a3aac4] hover:text-white")}>
                    {v === "m" ? "Băiat" : "Fată"}
                  </button>
                ))}
              </div>
              <select value={age} onChange={(e) => setAgeLocal(e.target.value as AgeKey)} aria-label="Vârsta"
                className="select select-dark min-w-0 flex-[1_1_150px] rounded-2xl bg-white/[.07] px-4 py-3.5 text-white outline-none ring-1 ring-white/15 transition hover:ring-white/30 focus:ring-2 focus:ring-coral">
                <option value="">Vârsta…</option>
                {AGES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
              <button className="w-full rounded-full bg-coral py-4 font-semibold text-white shadow-coral transition hover:bg-coral-d">Arată-mi traseul</button>
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
    <Reveal className="card mt-12 p-5 text-left sm:p-8">
      <h3 className="text-[1.25rem] font-semibold sm:text-[1.45rem]">Programa completă: de unde pornește și până unde ajunge</h3>
      <p className="mt-2 text-[0.98rem] text-ink-2">Trei niveluri. Copilul începe de unde e acum și urcă în ritmul lui. Durata e orientativă, la o lecție pe săptămână.</p>

      <div className="mt-5 grid gap-2.5">
        {LEVELS.map((l) => {
          const isOpen = open === l.n;
          return (
            <div key={l.n} className={clsx("overflow-hidden rounded-[18px] border transition-colors", isOpen ? "border-coral/40 bg-cream" : "border-line bg-cream/60")}>
              <button onClick={() => setOpen(isOpen ? null : l.n)} aria-expanded={isOpen} className="flex w-full items-center gap-3.5 px-4 py-4 text-left sm:px-5">
                <span className={clsx("grid size-9 shrink-0 place-items-center rounded-full font-display font-bold text-white transition-colors", isOpen ? "bg-coral" : "bg-ink")}>{l.n}</span>
                <span className="min-w-0">
                  <b className="block font-display text-[1.15rem] font-semibold">{l.name} <E e={["🧭", "🔨", "🚀"][l.n - 1]} className="ml-0.5 text-[1rem]" /></b>
                  <small className="text-[0.86rem] text-muted">{l.meta}</small>
                </span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="ml-auto text-coral"><Plus className="size-6" aria-hidden /></motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
                    <div className="grid gap-x-6 gap-y-1 px-4 pb-5 sm:grid-cols-2 sm:px-5">
                      <List title="Ce învață" items={l.learn} />
                      <List title="Ce construiește" items={l.build} />
                      <div className="mt-3 rounded-2xl bg-paper px-4 py-3.5 sm:col-span-2">
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
      <div className="mt-4 rounded-2xl bg-mint px-4 py-3.5 text-[0.93rem] leading-relaxed text-[#245b45]">
        <E e="💚" className="mr-1.5" /><b className="text-ink">La fiecare nivel, mereu:</b> gândire logică · AI folosit corect · prezentarea proiectului în fața familiei · raport pentru părinte după fiecare lecție
      </div>
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
