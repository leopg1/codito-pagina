"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { KidGen } from "../kid-context";
import { SectionHead } from "../ui/section-head";
import { Reveal } from "../ui/motion";
import { E } from "../ui/emoji";

const rnd = () => 1 + Math.floor(Math.random() * 100);

export function Demo() {
  const [secret, setSecret] = useState(rnd);
  const [tries, setTries] = useState(0);
  const [msg, setMsg] = useState("Scrie un număr și apasă „Încearcă”");
  const [won, setWon] = useState(false);
  const [val, setVal] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const guess = (e: React.FormEvent) => {
    e.preventDefault();
    const v = parseInt(val, 10);
    if (!(v >= 1 && v <= 100)) { setMsg("Un număr între 1 și 100 🙂"); return; }
    const t = tries + 1; setTries(t);
    if (v < secret) setMsg(`${v}? Mai mare! ⬆️`);
    else if (v > secret) setMsg(`${v}? Mai mic! ⬇️`);
    else { setMsg(`🎉 Ai ghicit în ${t} încercări!`); setWon(true); }
    input.current?.select();
  };
  const again = () => { setSecret(rnd()); setTries(0); setWon(false); setVal(""); setMsg("Scrie un număr și apasă „Încearcă”"); input.current?.focus(); };

  return (
    <section id="cum" className="section bg-ink text-white">
      <div className="wrap relative">
        <SectionHead dark kicker="Încearcă și tu" title="Ce poate face un copil după doar 2 lecții?" lead="Ceva de genul ăsta. Joacă‑te puțin: e un joc adevărat, scris în doar 11 rânduri de cod." />

        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
          <Reveal className="flex flex-col overflow-hidden rounded-2xl bg-[#262d52] text-center text-white ring-1 ring-white/10 shadow-[0_30px_60px_-30px_rgb(0_0_0/.5)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 font-sans text-[0.78rem] font-medium text-[#a3aac4]">
              <span className="flex items-center gap-2"><i className="size-2 rounded-full bg-[#5be3a7] shadow-[0_0_0_3px_rgb(91_227_167/.2)]" /> joc.py · rulează</span>
              <span>consolă</span>
            </div>
            <div className="flex flex-1 flex-col justify-center p-7 sm:p-9">
            <h3 className="flex items-center justify-center gap-2 text-[1.3rem] font-semibold text-white">
              <E e="🎯" /> Jocul <KidGen />
            </h3>
            <p className="mt-1 text-[#c3c8dd]">M-am gândit la un număr între 1 și 100. Îl ghicești?</p>
            <div className="my-5 grid min-h-[3.4em] place-items-center rounded-2xl bg-night/60 px-4 py-3 font-mono text-[1rem] text-[#9be7be]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span key={msg} initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  {msg}
                  {won && <small className="mt-1 block font-sans text-[0.88rem] text-[#c3c8dd]">Exact asta simte și copilul când îi merge primul program.</small>}
                </motion.span>
              </AnimatePresence>
            </div>
            <form onSubmit={guess} className="flex justify-center gap-2.5">
              <input
                ref={input} type="number" min={1} max={100} inputMode="numeric" placeholder="?" value={val} onChange={(e) => setVal(e.target.value)} disabled={won}
                aria-label="Numărul tău"
                className="w-28 rounded-2xl border-2 border-white/15 bg-night px-3 py-3 text-center font-display text-[1.6rem] font-bold text-white outline-none transition placeholder:text-white/30 focus:border-coral disabled:opacity-50"
              />
              <button disabled={won} className="rounded-full bg-coral px-6 font-semibold text-white shadow-coral transition hover:bg-coral-d disabled:opacity-50">Încearcă</button>
            </form>
            <div className="mt-4 text-[0.9rem] text-[#a3aac4]">Încercări: {tries}</div>
            {won && (
              <button onClick={again} className="mx-auto mt-3 inline-flex items-center gap-1.5 font-semibold text-[#ffb08f] underline-offset-4 hover:underline">
                <RotateCcw className="size-4" /> Joacă din nou
              </button>
            )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="overflow-x-auto rounded-2xl bg-night p-6 font-mono text-[0.78rem] leading-[1.8] text-[#d8def5] ring-1 ring-white/5 sm:p-7 sm:text-[0.9rem]">
            <div className="mb-3.5 flex justify-between gap-2 font-sans text-[0.78rem] font-medium text-[#8e97ba]">
              <span>joc.py · scris de copil, lecția 2</span><span>Python 🐍</span>
            </div>
            <pre className="whitespace-pre">
<K>import</K> random{"\n\n"}numar = random.randint(<N>1</N>, <N>100</N>){"\n\n"}<K>while</K> <K>True</K>:{"\n"}    ghicit = int(input(<S>&quot;Ghicește: &quot;</S>)){"\n"}    <K>if</K> ghicit &lt; numar:{"\n"}        print(<S>&quot;Mai mare! ⬆️&quot;</S>){"\n"}    <K>elif</K> ghicit &gt; numar:{"\n"}        print(<S>&quot;Mai mic! ⬇️&quot;</S>){"\n"}    <K>else</K>:{"\n"}        print(<S>&quot;🎉 Ai ghicit!&quot;</S>){"\n"}        <K>break</K>
            </pre>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-8 max-w-[620px] text-center text-[0.98rem] leading-relaxed text-[#a3aac4]">
          Python e limbajul folosit de Google, NASA și în inteligența artificială. Și se poate învăța de la 9 ani.
        </Reveal>
      </div>
    </section>
  );
}

const K = ({ children }: { children: React.ReactNode }) => <span className="text-[#ff9e7a]">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-[#9be7be]">{children}</span>;
const N = ({ children }: { children: React.ReactNode }) => <span className="text-[#93b6ff]">{children}</span>;
