"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CONFIG, WA_HELLO, shareLink, telLink, waLink } from "@/lib/config";
import { KidName, useKid } from "../kid-context";
import { SectionHead } from "../ui/section-head";
import { EASE, Reveal } from "../ui/motion";
import { WaIcon } from "../ui/button";
import { track } from "@/lib/track";
import { E, EBadge } from "../ui/emoji";

type Opt = { v: string; label: string; e: string };
const STEPS: { key: string; q: React.ReactNode; hint: string; opts: Opt[] }[] = [
  { key: "age", q: <>Câți ani are <KidName />?</>, hint: "Alege o variantă", opts: [
    { v: "9–11 ani", label: "9–11 ani", e: "🧒" }, { v: "12–13 ani", label: "12–13 ani", e: "🧑" },
    { v: "14–15 ani", label: "14–15 ani", e: "🧑‍🎓" }, { v: "16–17 ani", label: "16–17 ani", e: "🎓" },
  ] },
  { key: "like", q: "Ce îi place cel mai mult?", hint: "De aici pornim primul proiect", opts: [
    { v: "jocuri", label: "Jocuri (Minecraft, Roblox…)", e: "🎮" }, { v: "clipuri", label: "YouTube, TikTok, clipuri", e: "📱" },
    { v: "creativ", label: "Desen, muzică, ceva creativ", e: "🎨" }, { v: "sport", label: "Sport", e: "⚽" },
    { v: "stiinta", label: "Mate, științe, cum merg lucrurile", e: "🔬" }, { v: "nustiu", label: "Nu știu încă", e: "🤷" },
  ] },
  { key: "exp", q: "A mai încercat să programeze?", hint: "Orice răspuns e perfect", opts: [
    { v: "deloc", label: "Deloc", e: "🌱" }, { v: "puțin (școală / Scratch)", label: "Puțin (la școală, Scratch)", e: "🧩" },
    { v: "da, puțin cod", label: "Da, a scris puțin cod", e: "💻" }, { v: "nu știu", label: "Nu știu sigur", e: "❓" },
  ] },
  { key: "goal", q: "Ce îți dorești cel mai mult?", hint: "Alege ce contează cel mai mult pentru tine", opts: [
    { v: "să-și folosească util timpul pe ecran", label: "Să-și folosească util timpul pe ecran", e: "⏳" },
    { v: "să fie pregătit pentru viitor", label: "Să fie pregătit pentru viitor", e: "🚀" },
    { v: "ajutor la informatica de la școală / bac", label: "Ajutor la informatica de la școală / bac", e: "📚" },
    { v: "să capete încredere în el", label: "Să capete încredere în el", e: "💪" },
  ] },
  { key: "src", q: "De unde ai aflat de Codito?", hint: "Mă ajută să știu unde să mai povestesc despre lecții", opts: [
    { v: "Facebook", label: "Facebook / un grup", e: "📣" }, { v: "un prieten", label: "De la un prieten", e: "👫" },
    { v: "Google", label: "Google", e: "🔎" }, { v: "altundeva", label: "Altundeva", e: "✨" },
  ] },
];

const FIRST: Record<string, string> = {
  jocuri: "propriul joc, cu personaje și niveluri, inspirat din jocurile preferate",
  clipuri: "un site personal + un asistent AI care dă idei de clipuri",
  creativ: "un program care desenează și compune muzică din cod",
  sport: "o aplicație cu statisticile echipei preferate și un quiz de sport",
  stiinta: "o simulare: planete, fizică sau un calculator inteligent",
  nustiu: "un joc simplu în prima lecție, apoi descoperim împreună ce îl pasionează",
};
const LIKE_TXT: Record<string, string> = { jocuri: "jocuri", clipuri: "YouTube / TikTok", creativ: "desen, muzică", sport: "sport", stiinta: "mate, științe", nustiu: "nu știu încă" };

export function Quiz() {
  const { kid } = useKid();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [ans, setAns] = useState<Record<string, string>>({});
  const done = step >= STEPS.length;

  const pick = (key: string, v: string) => {
    setAns((a) => ({ ...a, [key]: v }));
    setDir(1);
    if (step === STEPS.length - 1) track("Formular completat", { age: ans.age || v, like: ans.like || "" });
    setTimeout(() => setStep((s) => s + 1), 220);
  };

  const young = /^9/.test(ans.age || "");
  const msg = useMemo(
    () =>
      `Bună, Leonard! Am completat planul de pe site-ul Codito și aș vrea să programăm lecția gratuită.\n\n` +
      (kid.name ? `🧒 Copil: ${kid.name}\n` : "") +
      `🎂 Vârsta: ${ans.age || "-"}\n🎮 Îi place: ${LIKE_TXT[ans.like] || "-"}\n💻 A mai programat: ${ans.exp || "-"}\n🎯 Îmi doresc: ${ans.goal || "-"}\n📣 Am aflat de la: ${ans.src || "-"}\n\nCând ai disponibilitate?`,
    [ans, kid.name]
  );

  return (
    <section id="plan" className="section bg-[#fff1e8]">
      <div className="wrap">
        <SectionHead
          kicker="Rezervă lecția gratuită 1:1"
          title={<>Hai să pregătim prima lecție pentru <KidName /></>}
          lead="5 întrebări simple, ca să pregătesc lecția exact pentru el. La final îmi trimiți răspunsurile pe WhatsApp și alegem împreună ora."
        />

        <Reveal className="mx-auto mt-8 grid max-w-[720px] gap-3 sm:grid-cols-2">
          {[["🗓️", "Când țin lecții", CONFIG.schedule], ["⚡", "Cât de repede răspund", CONFIG.reply]].map(([e, b, t]) => (
            <div key={b} className="flex items-start gap-3 text-[0.92rem] leading-snug text-ink-2">
              <E e={e} className="mt-0.5 text-[1.25rem]" />
              <span><b className="block text-[0.95rem] text-ink">{b}</b>{t.split(" · ").map((x) => <span key={x} className="block">{x}</span>)}</span>
            </div>
          ))}
        </Reveal>

        <Reveal className="mx-auto mt-6 max-w-[720px] overflow-hidden rounded-2xl bg-paper p-6 shadow-lift sm:p-9">
          <div className="mb-7 h-2 overflow-hidden rounded-full bg-sand" aria-hidden>
            <motion.div className="h-full rounded-full bg-coral" animate={{ width: `${(Math.min(step + 1, STEPS.length + 1) / (STEPS.length + 1)) * 100}%` }} transition={{ duration: 0.4, ease: EASE }} />
          </div>

          <AnimatePresence mode="wait" custom={dir}>
            {!done ? (
              <motion.div key={step} custom={dir}
                initial={{ opacity: 0, x: 30 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 * dir }} transition={{ duration: 0.3, ease: EASE }}>
                <h3 className="text-[1.3rem] font-semibold sm:text-[1.45rem]">{STEPS[step].q}</h3>
                <p className="mb-5 mt-1 text-[0.95rem] text-muted">{STEPS[step].hint} · {step + 1} din {STEPS.length}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {STEPS[step].opts.map(({ v, label, e }) => (
                    <button key={v} onClick={() => pick(STEPS[step].key, v)}
                      className={clsx("group flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left text-[1rem] font-medium transition",
                        ans[STEPS[step].key] === v ? "border-coral bg-peach" : "border-line bg-cream hover:-translate-y-0.5 hover:border-coral")}>
                      <EBadge e={e} className="size-10 rounded-xl bg-paper text-[1.3rem] transition group-hover:scale-110" />
                      {label}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button onClick={() => { setDir(-1); setStep((s) => s - 1); }} className="mt-5 inline-flex items-center gap-1.5 text-[0.95rem] text-muted hover:text-coral-t">
                    <ArrowLeft className="size-4" /> Înapoi
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: EASE }}>
                <h3 className="flex items-center gap-2 text-[1.45rem] font-semibold sm:text-[1.6rem]"><E e="🎉" /> Planul recomandat pentru <KidName /></h3>
                <div className="my-5 grid gap-3 rounded-xl bg-cream p-5 sm:p-6">
                  {[
                    ["🎯", "Primul proiect", `${FIRST[ans.like] || FIRST.nustiu}.`],
                    ["🧭", "Punct de pornire", ans.exp === "deloc" || ans.exp === "nu știu" ? "de la zero, cu pași mici și un program care merge chiar din prima lecție." : "vedem în lecția gratuită ce știe deja și continuăm de acolo, fără repetări plictisitoare."],
                    ["⏱️", "Ritm recomandat", `o lecție pe săptămână, de 90 de minute, ${young ? "cu pauze scurte și multă practică" : "cu o pauză scurtă la mijloc"}.`],
                    ["💡", "Ce urmărim", `${ans.goal || "progres vizibil"}, cu un raport pentru tine după fiecare lecție.`],
                  ].map(([e, b, t]) => (
                    <div key={b} className="flex gap-3 leading-normal"><E e={e} className="mt-0.5 text-[1.2rem]" /><span><b>{b}:</b> {t}</span></div>
                  ))}
                </div>
                <a href={waLink(msg)} target="_blank" rel="noopener" className="flex w-full items-center justify-center gap-2.5 rounded-full bg-wa px-6 py-4 font-semibold text-white shadow-[0_12px_28px_-10px_rgb(37_211_102/.65)] transition hover:-translate-y-0.5 hover:bg-[#1ebe5a]">
                  <WaIcon /> Rezervă lecția gratuită pe WhatsApp
                </a>
                <p className="mt-3 text-center text-[0.86rem] text-muted">
                  Se deschide WhatsApp cu mesajul gata scris. Doar apeși „Trimite”. Trimițând mesajul, ești de acord cu <a href="/termeni/" className="text-coral-t underline">termenii</a> și <a href="/confidentialitate/" className="text-coral-t underline">politica de confidențialitate</a>.
                </p>
                <div className="mt-6 border-t border-line pt-5">
                  <b className="mb-3 block font-display text-[1.05rem] font-semibold">Ce urmează după ce trimiți mesajul</b>
                  <ol className="grid gap-3">
                    {[["Îți scriu în maximum 2 ore", "și alegem împreună ora lecției."], ["Primești linkul de Google Meet", "și o listă scurtă: laptop, căști, 2 minute de pregătire."], ["Lecția gratuită, 45 de minute.", "La final, copilul îți arată ce a construit și primești părerea mea, în scris."]].map(([b, t], k) => (
                      <li key={b} className="flex gap-3 text-[0.95rem] leading-normal text-ink-2">
                        <span className="grid size-[26px] shrink-0 place-items-center rounded-full bg-ink font-display text-[0.8rem] font-bold text-white">{k + 1}</span>
                        <span><b className="text-ink">{b}</b> {t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <a href={shareLink(`Uite ce lecții de programare am găsit pentru ${kid.name || "copil"}: prima e gratuită, 45 de minute, unu la unu. Ce zici? ${CONFIG.siteUrl}`)} target="_blank" rel="noopener" className="mt-5 flex items-center justify-center gap-2 rounded-full border-2 border-line px-5 py-3 text-[0.95rem] font-semibold text-ink-2 transition hover:border-coral hover:text-coral-t">
                  <E e="👪" /> Decideți împreună? Trimite pagina celuilalt părinte
                </a>
                <button onClick={() => { setAns({}); setDir(-1); setStep(0); }} className="mt-5 text-[0.9rem] text-muted underline-offset-4 hover:text-coral-t hover:underline">Reia întrebările</button>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
        <p className="mt-5 text-center leading-relaxed text-ink-2">
          Preferi să vorbim direct? <a href={WA_HELLO} target="_blank" rel="noopener" className="font-semibold text-coral-t underline underline-offset-4">Scrie-mi pe WhatsApp</a>
          {" "}sau sună-mă: <a href={telLink} className="whitespace-nowrap font-semibold text-coral-t underline underline-offset-4">{CONFIG.phone}</a>
          {CONFIG.calUrl && <>. Sau <a href={CONFIG.calUrl} target="_blank" rel="noopener" className="font-semibold text-coral-t underline underline-offset-4">alege singur o oră în calendar</a></>}
        </p>
      </div>
    </section>
  );
}
