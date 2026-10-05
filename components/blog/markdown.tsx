import Link from "next/link";
import type { ReactNode } from "react";
import { slugify } from "@/lib/blog";
import { ButtonLink } from "../ui/button";

/** Text cu **bold**, *italic* și [linkuri](url). Cratimele dintre litere nu se rup la capăt de rând. */
function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)|`([^`]+)`/g;
  let last = 0, m: RegExpExecArray | null, k = key;
  const t = (s: string) => s.replace(/(\p{L})-(\p{L})/gu, "$1‑$2");
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(t(text.slice(last, m.index)));
    if (m[1]) out.push(<strong key={k++}>{inline(m[1], k * 100)}</strong>);
    else if (m[2]) out.push(<em key={k++}>{inline(m[2], k * 100)}</em>);
    else if (m[5]) out.push(<code key={k++}>{m[5]}</code>);
    else {
      const href = m[4];
      const ext = /^https?:/.test(href);
      out.push(ext
        ? <a key={k++} href={href} target="_blank" rel="noopener">{t(m[3])}</a>
        : <Link key={k++} href={href}>{t(m[3])}</Link>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(t(text.slice(last)));
  return out;
}

function CtaBox() {
  return (
    <aside className="not-prose my-10 rounded-2xl border border-line bg-paper p-6 sm:p-7">
      <p className="font-display text-[1.25rem] font-semibold leading-snug text-ink">Vrei să vezi cum ar arăta pentru copilul tău?</p>
      <p className="mt-2 text-[1rem] leading-relaxed text-ink-2">Prima lecție e gratuită: 45 de minute, unu la unu, online. Copilul își face primul program, iar tu primești o evaluare scrisă. Fără obligații.</p>
      <ButtonLink href="/#plan" arrow className="mt-5 w-full sm:w-auto">Vreau lecția gratuită</ButtonLink>
    </aside>
  );
}

/** Randează Markdown-ul simplu al articolelor. */
export function Markdown({ source }: { source: string }) {
  // blocurile de cod (```) nu se despart la rânduri goale
  const blocks: string[] = [];
  source.split(/(```[\s\S]*?```)/).forEach((part) => (part.startsWith("```") ? blocks.push(part) : blocks.push(...part.split(/\n{2,}/))));
  const out: ReactNode[] = [];
  blocks.forEach((b, i) => {
    const block = b.trim();
    if (!block) return;
    if (block === ":::cta") return out.push(<CtaBox key={i} />);
    if (block.startsWith("```")) return out.push(<pre key={i}><code>{block.replace(/^```\w*\n?/, "").replace(/\n?```$/, "")}</code></pre>);
    if (block.startsWith("## ")) { const txt = block.slice(3); return out.push(<h2 key={i} id={slugify(txt)}>{inline(txt)}</h2>); }
    if (block.startsWith("### ")) return out.push(<h3 key={i}>{inline(block.slice(4))}</h3>);
    if (block.startsWith("> ")) return out.push(<blockquote key={i}>{block.split("\n").map((l) => l.replace(/^>\s?/, "")).map((l, j) => <p key={j}>{inline(l)}</p>)}</blockquote>);
    const lines = block.split("\n");
    if (lines.every((l) => /^- /.test(l))) return out.push(<ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.slice(2))}</li>)}</ul>);
    if (lines.every((l) => /^\d+\. /.test(l))) return out.push(<ol key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^\d+\. /, ""))}</li>)}</ol>);
    out.push(<p key={i}>{inline(lines.join(" "))}</p>);
  });
  return <div className="prose-codito">{out}</div>;
}
