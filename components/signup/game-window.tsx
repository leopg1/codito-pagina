import { E } from "../ui/emoji";

const K = ({ children }: { children: React.ReactNode }) => <span className="text-[#ff9e7a]">{children}</span>;
const S = ({ children }: { children: React.ReactNode }) => <span className="text-[#9be7be]">{children}</span>;
const N = ({ children }: { children: React.ReactNode }) => <span className="text-[#93b6ff]">{children}</span>;

/** Ce construiește copilul în lecție: codul jocului de ghicit și jocul pornit, în consolă. */
export function GameWindow({ minutes }: { minutes: number }) {
  return (
    <figure className="relative mx-auto w-full max-w-[560px] lg:mx-0" aria-label="Exemplu de joc scris de copil în lecție">
      <figcaption className="mb-1.5 ml-1.5 flex items-end gap-1">
        <span className="font-hand text-[1.35rem] font-bold leading-none text-coral-t min-[380px]:text-[1.45rem]">Ceva de genul ăsta scrie copilul</span>
        <svg viewBox="0 0 46 34" className="-mb-3.5 h-[34px] w-[46px] shrink-0 text-coral-d" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 5c14 0 26 6 30 24" />
          <path d="M34 29l-7-6M34 29l3-9" />
        </svg>
      </figcaption>

      <div className="rounded-[26px] bg-ink p-2.5 shadow-[0_40px_80px_-28px_rgb(30_36_66/.6)] ring-1 ring-white/5 min-[360px]:p-3">
        <div className="flex items-center justify-between gap-3 px-1.5 pb-3 pt-1 text-[0.8rem] font-medium text-[#c3c8dd]">
          <span className="flex items-center gap-2 font-semibold text-white">
            <span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" /></span>
            joc.py
          </span>
          <span className="whitespace-nowrap font-mono tabular-nums text-[#8e97ba]">min {Math.round(minutes * 0.75)}</span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-[1.2fr_.8fr]">
          <div className="overflow-x-auto rounded-2xl bg-night px-3 py-4 font-mono text-[0.64rem] leading-[1.8] text-[#d8def5] min-[360px]:px-4 min-[360px]:text-[0.72rem] sm:text-[0.74rem] lg:text-[0.66rem] xl:text-[0.74rem]">
            <pre className="whitespace-pre" aria-hidden>
<K>import</K> random{"\n\n"}numar = random.randint(<N>1</N>, <N>100</N>){"\n\n"}<K>while</K> <K>True</K>:{"\n"}    ghicit = int(input(<S>&quot;Ghicește: &quot;</S>)){"\n"}    <K>if</K> ghicit &lt; numar:{"\n"}        print(<S>&quot;Mai mare! ⬆️&quot;</S>){"\n"}    <K>elif</K> ghicit &gt; numar:{"\n"}        print(<S>&quot;Mai mic! ⬇️&quot;</S>){"\n"}    <K>else</K>:{"\n"}        print(<S>&quot;🎉 Ai ghicit!&quot;</S>){"\n"}        <K>break</K>
            </pre>
          </div>

          <div className="flex flex-col rounded-2xl bg-[#262d52] px-4 py-4 font-mono text-[0.7rem] leading-[1.75] text-[#c3c8dd] min-[360px]:text-[0.74rem] sm:text-[0.72rem] lg:text-[0.68rem] xl:text-[0.74rem]" aria-hidden>
            <span className="mb-2 flex items-center gap-2 font-sans text-[0.74rem] font-medium text-[#a3aac4]">
              <i className="size-2 rounded-full bg-[#5be3a7] shadow-[0_0_0_3px_rgb(91_227_167/.2)]" /> rulează
            </span>
            {[["50", "Mai mic! ⬇️"], ["25", "Mai mare! ⬆️"], ["37", "🎉 Ai ghicit!"]].map(([n, r]) => (
              <span key={n} className="flex flex-wrap gap-x-2 sm:block">
                <span className="block">Ghicește: <b className="font-semibold text-white">{n}</b></span>
                <span className="text-[#6e7aa3] sm:hidden">→</span>
                <span className="block text-[#9be7be]">{r}</span>
              </span>
            ))}
            <span className="mt-auto pt-2 max-sm:hidden"><i className="inline-block h-[1.05em] w-[0.55em] translate-y-[3px] bg-coral" /></span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 shadow-soft ring-1 ring-line">
        <E e="🎮" className="shrink-0 text-[1.5rem]" />
        <span className="min-w-0 leading-tight">
          <b className="block text-[0.92rem]">La final, vi‑l arată</b>
          <small className="text-[0.82rem] text-muted">și îl puteți juca împreună</small>
        </span>
        <span className="ml-auto shrink-0 font-mono text-[0.75rem] font-semibold text-green">min {minutes} ✓</span>
      </div>
    </figure>
  );
}
