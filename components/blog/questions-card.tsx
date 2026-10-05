import Link from "next/link";
import type { Post } from "@/lib/blog";
import { WA_HELLO } from "@/lib/config";
import { WaIcon } from "../ui/button";
import { question } from "./bits";

/** Vizualul din antetul blogului: un fișier „întrebari.txt” cu întrebările părinților, fiecare cu articolul care îi răspunde. */
export function QuestionsCard({ posts }: { posts: Post[] }) {
  const list = posts.slice(0, 6);
  return (
    <div style={{ "--d": ".15s" } as React.CSSProperties} className="rise relative mx-auto w-full max-w-[470px] lg:ml-auto">
      <div className="mb-1.5 ml-1.5 flex items-end gap-1">
        <span className="font-hand text-[1.35rem] font-bold leading-tight text-coral-t min-[380px]:text-[1.45rem]">Ce mă întreabă părinții des</span>
        <svg viewBox="0 0 46 34" className="-mb-3.5 h-[34px] w-[46px] shrink-0 text-coral-d" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 5c14 0 26 6 30 24" />
          <path d="M34 29l-7-6M34 29l3-9" />
        </svg>
      </div>

      <div className="rounded-[26px] bg-ink p-3 shadow-[0_40px_80px_-28px_rgb(30_36_66/.6)] ring-1 ring-white/5">
        <div className="flex items-center gap-3 px-1.5 pb-3.5 pt-1.5 text-[0.8rem] font-medium text-[#c3c8dd]">
          <span className="flex gap-1.5" aria-hidden><i className="size-2.5 rounded-full bg-[#ff5f57]" /><i className="size-2.5 rounded-full bg-[#febc2e]" /><i className="size-2.5 rounded-full bg-[#28c840]" /></span>
          <span className="font-mono text-white">intrebari.txt</span>
          <span className="ml-auto font-mono tabular-nums text-[#8b93b5] max-[379px]:hidden">{list.length} răspunsuri</span>
        </div>
        <ol className="overflow-hidden rounded-2xl bg-night py-2 font-mono text-[0.78rem] leading-snug text-[#d8def5] sm:text-[0.84rem]">
          <li className="flex gap-3 px-3.5 py-2 text-[#6e7aa3] min-[360px]:px-[18px]" aria-hidden>
            <span className="w-4 shrink-0 text-right text-[#454d75]">1</span># întrebări de la părinți
          </li>
          {list.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`} className="group flex min-h-11 items-baseline gap-2.5 px-3 min-[360px]:gap-3 min-[360px]:px-3.5 py-2.5 transition-colors hover:bg-white/[.04] min-[360px]:px-[18px]">
                <span className="w-4 shrink-0 text-right text-[#454d75]" aria-hidden>{i + 2}</span>
                <span className="min-w-0 flex-1 text-[#9be7be] group-hover:text-white">{question(p.slug, p.title)}</span>
                <span className="shrink-0 text-[#8b93b5] transition-colors group-hover:text-[#ffb08f]">
                  {p.minutes} min <span aria-hidden className="inline-block transition-transform max-[359px]:hidden group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </li>
          ))}
          <li className="flex gap-3 px-3.5 py-2 min-[360px]:px-[18px]" aria-hidden>
            <span className="w-4 shrink-0 text-right text-[#454d75]">{list.length + 2}</span>
            <span className="inline-block h-[1.05em] w-2 animate-blink bg-coral align-[-3px]" />
          </li>
        </ol>
      </div>

      <a href={WA_HELLO} target="_blank" rel="noopener" className="mt-4 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 shadow-soft ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lift">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-mint text-wa"><WaIcon className="size-[18px]" /></span>
        <span className="min-w-0 leading-tight">
          <b className="block text-[0.9rem]">Ai altă întrebare?</b>
          <small className="text-[0.8rem] text-muted">Scrie‑mi pe WhatsApp, îți răspund eu.</small>
        </span>
        <span className="ml-auto shrink-0 text-[1.1rem] text-wa" aria-hidden>→</span>
      </a>
    </div>
  );
}
