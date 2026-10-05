import { ShieldCheck } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";
import { E } from "../ui/emoji";

const ONLINE: [string, string, string][] = [
  ["👀", "Văd fiecare rând pe care îl scrie", "Cu ecranul partajat, observ greșeala în clipa în care apare, mai repede decât dacă aș sta lângă el."],
  ["💻", "Lucrează pe calculatorul lui", "Tot ce construiește rămâne la el. Între lecții poate continua singur, cu programele pe care le știe deja."],
  ["🚗", "Fără drum și fără trafic", "90 de minute de lecție înseamnă 90 de minute, nu o după-amiază întreagă cu tot cu drumul."],
];

const SAFE: [string, string][] = [
  ["Nu vorbesc cu copilul în privat.", "Toate mesajele sunt pe un grup de WhatsApp în care ești și tu."],
  ["Poți intra oricând la lecție.", "Fără să anunți. Linkul de Google Meet îl primești și tu."],
  ["Nu înregistrez și nu fac poze", "fără acordul tău scris."],
  ["Datele copilului rămân la mine.", "Folosesc doar prenumele și vârsta, ca să pregătesc lecțiile. Nu le dau nimănui."],
];

export function Trust() {
  return (
    <section id="siguranta" className="section">
      <div className="wrap grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <h2 className="text-[clamp(1.7rem,3.6vw,2.35rem)] font-semibold">Merge și online? Mai bine decât crezi.</h2>
            <p className="mt-4 text-[1.06rem] leading-relaxed text-ink-2">Mulți părinți se întreabă asta, și e normal. La programare, online e chiar avantajul, pentru că totul se întâmplă oricum pe calculator.</p>
          </Reveal>
          <Stagger as="dl" className="mt-8">
            {ONLINE.map(([e, b, p]) => (
              <StaggerItem key={b} className="grid grid-cols-[auto_1fr] gap-x-3.5 border-t border-line py-4">
                <E e={e} className="row-span-2 mt-0.5 text-[1.35rem]" />
                <dt className="font-semibold text-ink">{b}</dt>
                <dd className="mt-0.5 leading-relaxed text-ink-2">{p}</dd>
              </StaggerItem>
            ))}
          </Stagger>
          {CONFIG.lessonClip && (
            <Reveal className="mt-6 overflow-hidden rounded-2xl bg-ink ring-1 ring-line">
              <video src={CONFIG.lessonClip} controls playsInline preload="none" className="aspect-video w-full" aria-label="Fragment dintr-o lecție reală" />
              <p className="px-4 py-3 text-[0.88rem] text-[#c3c8dd]">Un fragment dintr-o lecție reală, filmat de pe ecran.</p>
            </Reveal>
          )}
        </div>

        <Reveal className="self-start rounded-2xl bg-mint/60 p-7 ring-1 ring-[#c6e9d6] sm:p-9">
          <h2 className="flex items-center gap-2.5 text-[clamp(1.5rem,3vw,1.95rem)] font-semibold"><E e="🛡️" /> Siguranța copilului</h2>
          <p className="mt-3 leading-relaxed text-ink-2">Regulile mele, aceleași pentru fiecare familie. Sunt scrise și în <a href="/termeni/" className="font-semibold text-coral-t underline underline-offset-2">termenii și condițiile</a> pe care le primești.</p>
          <ul className="mt-6 grid gap-4">
            {SAFE.map(([b, t]) => (
              <li key={b} className="flex gap-3 leading-relaxed text-ink-2">
                <ShieldCheck className="mt-1 size-[18px] shrink-0 text-green" aria-hidden />
                <span><b className="text-ink">{b}</b> {t}</span>
              </li>
            ))}
          </ul>
          {CONFIG.integrityCert && (
            <p className="mt-6 flex items-center gap-2 border-t border-[#c6e9d6] pt-5 font-semibold text-green">
              <ShieldCheck className="size-5" aria-hidden /> Am certificat de integritate comportamentală, cerut de lege pentru cei care lucrează cu copii.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
