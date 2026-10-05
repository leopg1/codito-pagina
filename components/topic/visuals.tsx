import type { CSSProperties, ReactNode } from "react";
import type { TopicVisual } from "@/lib/topics";
import { E } from "../ui/emoji";

/* Mockup-urile din hero-ul paginilor de curs. Statice (fără JavaScript), în stilul hero-visual.tsx. */

const K = ({ children }: { children: ReactNode }) => <span className="text-[#ff9e7a]">{children}</span>; // cuvinte cheie
const S = ({ children }: { children: ReactNode }) => <span className="text-[#9be7be]">{children}</span>; // text
const N = ({ children }: { children: ReactNode }) => <span className="text-[#93b6ff]">{children}</span>; // numere, funcții
const C = ({ children }: { children: ReactNode }) => <span className="text-[#6e7aa3]">{children}</span>; // comentarii

export function TopicVisualBox({ kind }: { kind: TopicVisual }) {
  const v = VISUALS[kind];
  return (
    <div style={{ "--d": ".15s" } as CSSProperties} className="rise relative mx-auto w-full max-w-[470px] lg:ml-auto" aria-label={v.label} role="img">
      <div className="mb-1.5 ml-1.5 flex items-end gap-1" aria-hidden>
        <span className="font-hand text-[1.25rem] font-bold leading-tight text-coral-t min-[360px]:text-[1.4rem] sm:text-[1.45rem]">{v.note}</span>
        <svg viewBox="0 0 46 34" className="-mb-3.5 h-[34px] w-[46px] shrink-0 text-coral-d" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 5c14 0 26 6 30 24" /><path d="M34 29l-7-6M34 29l3-9" />
        </svg>
      </div>
      <div aria-hidden>{v.body}</div>
    </div>
  );
}

/** Rama întunecată, ca fereastra de apel din hero-ul principal. */
function Frame({ title, right, children }: { title: string; right: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-[26px] bg-ink p-3 shadow-[0_40px_80px_-28px_rgb(30_36_66/.6)] ring-1 ring-white/5">
      <div className="flex items-center justify-between gap-3 px-1.5 pb-3.5 pt-1.5 text-[0.8rem] font-medium text-[#c3c8dd]">
        <span className="flex min-w-0 items-center gap-2 font-semibold text-white">
          <i className="size-2 shrink-0 rounded-full bg-[#ff5a4f] shadow-[0_0_0_3px_rgb(255_90_79/.25)]" /> <span className="truncate">{title}</span>
        </span>
        <span className="shrink-0 font-mono tabular-nums">{right}</span>
      </div>
      {children}
    </div>
  );
}

/** Editor de cod cu numerotarea rândurilor. */
function Code({ file, lang, lines, output }: { file: string; lang: string; lines: ReactNode[]; output?: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-night">
      <div className="flex items-center justify-between border-b border-white/[.06] px-3.5 py-2 text-[0.72rem] font-medium text-[#8e97ba] min-[360px]:px-[18px]">
        <span className="rounded-md bg-white/[.07] px-2 py-1 font-mono text-[#d8def5]">{file}</span>
        <span>{lang}</span>
      </div>
      <pre className="overflow-hidden whitespace-pre px-2.5 pb-3.5 pt-3 font-mono text-[0.68rem] leading-[1.75] text-[#d8def5] min-[360px]:px-3.5 min-[360px]:text-[0.72rem] sm:text-[0.8rem]">
        {lines.map((l, i) => (
          <div key={i}><span className="inline-block w-[1.9em] select-none pr-2 text-right text-[#3d4670]">{i + 1}</span>{l}</div>
        ))}
      </pre>
      {output && <div className="border-t border-dashed border-[#2a3156] px-3.5 py-3 font-mono text-[0.7rem] leading-[1.7] text-[#9be7be] min-[360px]:px-[18px] sm:text-[0.78rem]">{output}</div>}
    </div>
  );
}

/** Cartonașul alb de sub mockup (ca „Raport trimis părintelui”). */
function Note({ e, title, sub, right, tone = "bg-mint" }: { e: string; title: string; sub: string; right?: string; tone?: string }) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 shadow-soft ring-1 ring-line">
      <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${tone}`}><E e={e} className="text-[1.05rem]" /></span>
      <span className="min-w-0 leading-tight">
        <b className="block text-[0.85rem] min-[360px]:text-[0.9rem]">{title}</b>
        <small className="text-[0.78rem] text-muted">{sub}</small>
      </span>
      {right && <span className="ml-auto shrink-0 font-mono max-[359px]:hidden text-[0.72rem] text-green">{right}</span>}
    </div>
  );
}

/* ===== Python: un quiz scris de copil ===== */
const python = (
  <>
    <Frame title="Lecția 3 · Python" right="41:08">
      <Code
        file="quiz.py" lang="Python 🐍"
        lines={[
          <>scor = <N>0</N></>,
          <>quiz = {"{"}<S>&quot;2 + 2 × 2 = ?&quot;</S>: <S>&quot;6&quot;</S>,</>,
          <>        <S>&quot;Capitala Italiei?&quot;</S>: <S>&quot;roma&quot;</S>{"}"}</>,
          <><K>for</K> q, corect <K>in</K> quiz.items():</>,
          <>    r = <N>input</N>(q + <S>&quot; &quot;</S>)</>,
          <>    <K>if</K> r.lower() == corect:</>,
          <>        scor += <N>1</N></>,
          <>        <N>print</N>(<S>&quot;Corect! ✅&quot;</S>)</>,
          <><N>print</N>(<S>f&quot;Scor: </S>{"{"}scor{"}"}<S>/</S>{"{"}<N>len</N>(quiz){"}"}<S>&quot;</S>)<i className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[3px] animate-blink bg-coral" /></>,
        ]}
        output={<><span className="text-[#8e97ba]">▶ python quiz.py</span><br />Capitala Italiei? <span className="text-white">Roma</span><br />Corect! ✅ · Scor: 2/2</>}
      />
    </Frame>
    <Note e="💾" title="Salvat pe calculatorul lui" sub="îl poate arăta și modifica acasă" right="quiz.py" />
  </>
);

/* ===== Programare: un joc cu personaj, monede și niveluri ===== */
const MAP = [
  "🧱 · · · · · ⭐ · · ·",
  "· · 🧱 🧱 · · · · 👾 ·",
  "🧑‍🚀 · · ⭐ · · · · · ⭐",
  "· · 🧱 · · · · 🧱 🧱 ·",
  "· · · · ⭐ · · 🧱 · 🚪",
].map((r) => r.split(" "));

const game = (
  <>
    <Frame title="Lecția 9 · jocul lui" right="67:30">
      <div className="overflow-hidden rounded-2xl bg-night">
        <div className="flex items-center justify-between border-b border-white/[.06] px-3.5 py-2.5 text-[0.75rem] font-semibold text-[#d8def5] min-[360px]:px-[18px]">
          <span className="flex items-center gap-1.5"><E e="🏆" className="text-[0.85rem]" /> Scor <b className="font-mono text-sun">40</b></span>
          <span className="text-[#8e97ba]">Nivelul 2</span>
          <span className="tracking-[-0.1em]"><E e="❤️" className="text-[0.75rem]" /><E e="❤️" className="text-[0.75rem]" /><E e="🤍" className="text-[0.75rem]" /></span>
        </div>
        <div className="grid grid-cols-10 gap-[3px] p-2.5 min-[360px]:p-3.5">
          {MAP.flatMap((row, r) => row.map((c, k) => (
            <span key={`${r}-${k}`} className={`grid aspect-square place-items-center rounded-[5px] text-[0.8rem] min-[360px]:text-[0.95rem] sm:text-[1.1rem] ${c === "🧱" ? "bg-[#3a3266]" : c === "🧑‍🚀" ? "bg-coral/25 ring-1 ring-coral/60" : "bg-white/[.04]"}`}>
              {c === "·" || c === "🧱" ? null : <E e={c} />}
            </span>
          )))}
        </div>
        <pre className="overflow-hidden whitespace-pre border-t border-dashed border-[#2a3156] px-3.5 py-3 font-mono text-[0.68rem] leading-[1.75] text-[#d8def5] min-[360px]:px-[18px] min-[360px]:text-[0.72rem] sm:text-[0.8rem]">
          <C># joc.py · scris de el</C>{"\n"}<K>if</K> erou.colliderect(stea):{"\n"}    scor += <N>10</N>{"\n"}    stea = stea_noua()
        </pre>
      </div>
    </Frame>
    <Note e="📲" title="Raport trimis părintelui" sub="cu o captură din jocul lui" right="20:14 ✓✓" />
  </>
);

/* ===== AI: chat cu asistentul construit de copil ===== */
const ai = (
  <>
    <Frame title="Lecția 5 · asistentul lui" right="58:42">
      <div className="overflow-hidden rounded-2xl bg-night">
        <pre className="overflow-hidden whitespace-pre border-b border-white/[.06] px-3.5 py-3 font-mono text-[0.68rem] leading-[1.75] text-[#d8def5] min-[360px]:px-[18px] min-[360px]:text-[0.72rem] sm:text-[0.8rem]">
          <C># asistent.py · regulile lui</C>{"\n"}reguli = (<S>&quot;Nu rezolva tema. &quot;</S>{"\n"}          <S>&quot;Explică pas cu pas.&quot;</S>)
        </pre>
        <div className="grid gap-2.5 px-3 py-4 text-[0.8rem] leading-snug min-[360px]:px-4 sm:text-[0.86rem]">
          <Bubble me>Cât face 3/8 + 2/8? E la temă.</Bubble>
          <Bubble>Rezultatul îl afli tu, eu te ajut. <E e="🍕" /> O pizza are 8 felii. Iei 3, apoi încă 2. Câte felii ai luat?</Bubble>
          <Bubble me>5! Deci 5/8.</Bubble>
          <Bubble>Exact. Acum încearcă singur exercițiul următor.</Bubble>
        </div>
        <div className="mx-3 mb-3 flex items-center justify-between rounded-full bg-white/[.06] px-4 py-2.5 text-[0.76rem] text-[#8e97ba] min-[360px]:mx-4">
          Scrie un mesaj… <span className="grid size-6 place-items-center rounded-full bg-cta text-[0.7rem] text-white">↑</span>
        </div>
      </div>
    </Frame>
    <Note e="🛡️" title="Regula nr. 1 de la lecții" sub="niciun AI nu primește date personale" />
  </>
);

function Bubble({ me = false, children }: { me?: boolean; children: ReactNode }) {
  return me ? (
    <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-cta px-3.5 py-2 text-white">{children}</p>
  ) : (
    <p className="flex max-w-[88%] items-start gap-2">
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#5be3a7]/15 text-[0.75rem]"><E e="🤖" /></span>
      <span className="rounded-2xl rounded-tl-md bg-[#262d52] px-3.5 py-2 text-[#d8def5]">{children}</span>
    </p>
  );
}

/* ===== BAC: o problemă în stilul subiectului al III-lea ===== */
const bac = (
  <>
    <div className="relative z-[1] -mb-4 mx-2 -rotate-[0.8deg] rounded-xl bg-paper px-4 py-3.5 text-[0.84rem] leading-snug text-ink-2 shadow-lift ring-1 ring-line sm:mx-4 sm:text-[0.9rem]">
      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-coral-t">În stilul subiectului III de BAC</span>
      <p className="mt-1">Se citește un număr natural <b className="font-mono text-ink">n</b>. Afișați suma cifrelor pare ale lui <b className="font-mono text-ink">n</b>.</p>
      <p className="mt-1 font-mono text-[0.75rem] text-muted">Exemplu: 2738 → 10</p>
    </div>
    <Frame title="Pregătire BAC · C++" right="49:20">
      <Code
        file="suma.cpp" lang="C++"
        lines={[
          <><K>#include</K> <S>&lt;iostream&gt;</S></>,
          <><K>using namespace</K> std;</>,
          <><K>int</K> <N>main</N>() {"{"}</>,
          <>    <K>int</K> n, s = <N>0</N>;</>,
          <>    cin &gt;&gt; n;</>,
          <>    <K>while</K> (n &gt; <N>0</N>) {"{"}</>,
          <>        <K>int</K> c = n % <N>10</N>;</>,
          <>        <K>if</K> (c % <N>2</N> == <N>0</N>) s += c;</>,
          <>        n = n / <N>10</N>;</>,
          <>    {"}"}</>,
          <>    cout &lt;&lt; s;</>,
          <>{"}"}</>,
        ]}
        output={<><span className="text-[#8e97ba]">▶ intrare:</span> <span className="text-white">2738</span>  <span className="text-[#8e97ba]">ieșire:</span> <span className="text-white">10</span> ✓</>}
      />
    </Frame>
    <Note e="⚠️" title="Greșeala tipică, prinsă la timp" sub="s trebuie pornit de la 0, altfel suma e greșită" tone="bg-peach" />
  </>
);

const VISUALS: Record<TopicVisual, { note: string; label: string; body: ReactNode }> = {
  python: { note: "Un program din lecția 3", label: "Exemplu: un quiz în Python scris de copil la lecție", body: python },
  game: { note: "Jocul lui, scris de el", label: "Exemplu: un joc cu personaj, stele și niveluri, făcut de copil", body: game },
  ai: { note: "Asistentul lui, cu regulile lui", label: "Exemplu: un asistent AI construit de copil, care explică fără să rezolve tema", body: ai },
  bac: { note: "Un subiect, rezolvat pas cu pas", label: "Exemplu: o problemă în stilul BAC rezolvată în C++", body: bac },
};
