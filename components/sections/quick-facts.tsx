import { Bot, Brain, Clock3, Gamepad2, Gift, Globe, Palette, Rocket, Sparkles, UserRound, Users, Wallet } from "lucide-react";
import { PRICES } from "@/lib/config";
import { Stagger, StaggerItem } from "../ui/motion";

const FACTS = [
  { I: UserRound, b: "Lecții 1:1", s: "online, de acasă" },
  { I: Users, b: "9–17 ani", s: "copii și adolescenți" },
  { I: Clock3, b: "90 de minute", s: "săptămânal" },
  { I: Wallet, b: `de la ${PRICES.session}`, s: "fără contract" },
];

const BUILDS = [
  [Gamepad2, "Jocuri proprii"], [Globe, "Site-uri publicate"], [Bot, "Chatbot-uri cu AI"], [Brain, "Gândire logică"],
  [Palette, "Animații din cod"], [Rocket, "Aplicații web"], [Sparkles, "AI folosit corect"],
] as const;

export function QuickFacts() {
  return (
    <div aria-label="Pe scurt">
      <div className="wrap">
        <Stagger className="grid grid-cols-2 overflow-hidden rounded-[22px] border border-line bg-paper shadow-soft lg:grid-cols-5">
          {FACTS.map(({ I, b, s }, k) => (
            <StaggerItem key={b} className={`flex items-center gap-2.5 px-4 py-3.5 sm:gap-3 sm:p-5 ${k % 2 ? "border-l" : ""} ${k > 1 ? "border-t lg:border-t-0" : ""} border-line lg:border-l lg:first:border-l-0`}>
              <span className="hidden size-10 shrink-0 place-items-center rounded-xl bg-cream text-coral-t sm:grid"><I className="size-5" aria-hidden /></span>
              <span className="min-w-0 leading-tight">
                <b className="block font-display text-[0.95rem] sm:text-[1.08rem]">{b}</b>
                <small className="text-[0.76rem] text-muted sm:text-[0.84rem]">{s}</small>
              </span>
            </StaggerItem>
          ))}
          <StaggerItem className="col-span-2 flex items-center gap-2.5 bg-coral p-3.5 text-white sm:gap-3 sm:p-5 lg:col-span-1">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/20 sm:size-10 sm:rounded-xl"><Gift className="size-4 sm:size-5" aria-hidden /></span>
            <span className="leading-tight">
              <b className="block font-display text-[0.95rem] sm:text-[1.08rem]">Prima lecție</b>
              <small className="text-[0.76rem] text-white/90 sm:text-[0.84rem]">gratuită, 45 min</small>
            </span>
          </StaggerItem>
        </Stagger>
      </div>

      {/* ce construiesc copiii: bandă care rulează lent */}
      <div className="relative mt-10 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" aria-hidden>
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...BUILDS, ...BUILDS].map(([I, t], k) => (
            <span key={k} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-paper/70 px-4 py-2 text-[0.92rem] font-medium text-ink-2">
              <I className="size-4 text-coral" /> {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
