"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarPlus, Check, Loader2 } from "lucide-react";
import { CONFIG, shareLink, waLink } from "@/lib/config";
import { track } from "@/lib/track";
import { E } from "../ui/emoji";

const W = CONFIG.workshop;
const START = new Date(W.start).getTime();
const END = START + W.minutes * 60_000;

/** Starea atelierului, calculată din config și din ora curentă. */
export function useWorkshopState() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const full = W.taken >= W.total;
  const past = now != null && now > END;
  return { now, full, past, open: !full && !past };
}

/** Locurile ocupate, din config. Bara apare doar după primul loc ocupat cu adevărat. */
export function Seats({ dark = false }: { dark?: boolean }) {
  const left = Math.max(0, W.total - W.taken);
  return (
    <div className={clsx("rounded-xl p-4", dark ? "bg-white/[.06] ring-1 ring-white/10" : "bg-cream ring-1 ring-line")}>
      <div className="flex items-baseline justify-between gap-3 text-[0.95rem] font-semibold">
        <span className={dark ? "text-white" : "text-ink"}>{W.taken > 0 ? "Locuri ocupate" : "Locuri în grupă"}</span>
        <span className={clsx("whitespace-nowrap tabular-nums", dark ? "text-[#ffb08f]" : "text-coral-t")}>
          {W.taken > 0 ? `${W.taken} din ${W.total}` : `${W.total} în total`}
        </span>
      </div>
      <div className="mt-2.5 flex gap-1.5" aria-hidden>
        {Array.from({ length: W.total }, (_, i) => (
          <i key={i} className={clsx("h-2.5 flex-1 rounded-md", i < W.taken ? "bg-coral" : dark ? "bg-white/15" : "bg-mint")} />
        ))}
      </div>
      <p className={clsx("mt-2.5 text-[0.86rem]", dark ? "text-[#c3c8dd]" : "text-muted")}>
        {left === 0 ? "Toate locurile s‑au ocupat." : left === 1 ? "A mai rămas un singur loc." : <>Mai sunt {left} locuri.<span className="max-sm:hidden"> Se ocupă în ordinea înscrierilor.</span></>}
      </p>
    </div>
  );
}

/** Numărătoare inversă până la începutul lecției (dată reală, din config). */
export function Countdown() {
  const { now, past } = useWorkshopState();
  if (now == null || past) return null;
  if (now >= START) return <p className="font-semibold text-green">Lecția e în desfășurare acum.</p>;
  const s = Math.floor((START - now) / 1000);
  const parts: [number, string][] = [[Math.floor(s / 86400), "zile"], [Math.floor((s % 86400) / 3600), "ore"], [Math.floor((s % 3600) / 60), "minute"], [s % 60, "secunde"]];
  return (
    <div aria-label="Timp rămas până la lecție">
      <p className="text-[0.86rem] font-semibold uppercase tracking-[0.08em] text-muted">Începe în</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {parts.map(([v, l]) => (
          <div key={l} className="rounded-xl bg-paper px-2 py-2.5 text-center ring-1 ring-line">
            <b className="block font-display text-[1.6rem] leading-none tabular-nums text-ink">{String(v).padStart(2, "0")}</b>
            <small className="mt-1 block text-[0.78rem] text-muted">{l}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function gcalHref() {
  const f = (t: number) => new Date(t).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: "Lecție gratuită de programare (Codito)", dates: `${f(START)}/${f(END)}`, details: "Linkul de conectare îl primești cu o zi înainte. Copilul are nevoie de un laptop sau calculator." });
  return `https://calendar.google.com/calendar/render?${q}`;
}

function icsHref() {
  const f = (t: number) => new Date(t).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Codito//RO", "BEGIN:VEVENT",
    `UID:codito-${START}@codito.ro`, `DTSTAMP:${f(Date.now())}`, `DTSTART:${f(START)}`, `DTEND:${f(END)}`,
    "SUMMARY:Lecție gratuită de programare (Codito)",
    "DESCRIPTION:Linkul de conectare îl primești cu o zi înainte. Copilul are nevoie de un laptop sau calculator.",
    "BEGIN:VALARM", "TRIGGER:-PT1H", "ACTION:DISPLAY", "DESCRIPTION:Lecția de programare începe într-o oră", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export function SignupForm() {
  const { full, past } = useWorkshopState();
  const waitlist = full || past;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [bad, setBad] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  useEffect(() => {
    if (state !== "done") return;
    document.getElementById("formular")?.scrollIntoView({ block: "start" });
    doneRef.current?.focus({ preventScroll: true });
  }, [state]);

  const digits = phone.replace(/\D/g, "");
  const valid = name.trim().length >= 2 && digits.length >= 9 && !!age && ok;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) {
      const [field, msg] = name.trim().length < 2 ? ["parinte", "Scrie\u2011ți prenumele, te rog."] : digits.length < 9 ? ["telefon", "Numărul de telefon pare incomplet."] : !age ? ["varsta", "Scrie vârsta copilului."] : ["acord", "Bifează acordul, ca să te pot contacta."];
      setErr(msg); setBad(field);
      document.getElementById(field)?.focus();
      return;
    }
    setErr(""); setBad("");
    const what = waitlist ? "lista pentru următoarea lecție gratuită" : `lecția gratuită din ${W.date}`;
    const data = { parinte: name.trim(), telefon: phone.trim(), varsta_copil: `${age} ani`, pentru: what };
    track(waitlist ? "Listă de așteptare" : "Înscriere atelier", { age });
    if (CONFIG.formspree) {
      setState("sending");
      try {
        const r = await fetch(CONFIG.formspree, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...data, _subject: `Înscriere Codito: ${name.trim()} (${age} ani)` }) });
        if (!r.ok) throw new Error();
        setState("done");
      } catch {
        setState("idle");
        setErr("N\u2011a mers trimiterea. Încearcă din nou sau scrie-mi pe WhatsApp.");
      }
    } else {
      window.open(waLink(`Bună, Leonard! Vreau să mă înscriu la ${what}.\n\nNumele meu: ${data.parinte}\nTelefon: ${data.telefon}\nVârsta copilului: ${data.varsta_copil}`), "_blank", "noopener");
      setState("done");
    }
  };

  if (state === "done") {
    return (
      <div ref={doneRef} tabIndex={-1} className="text-center outline-none" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-[2rem]"><E e="🎉" /></span>
        <h2 className="mt-4 text-[1.6rem] font-semibold">Gata, {name.trim().split(" ")[0]}!</h2>
        <p className="mx-auto mt-2 max-w-[34ch] leading-relaxed text-ink-2">
          {waitlist ? "Te anunț primul când stabilesc data următoarei lecții gratuite." : "Am primit înscrierea. Te contactez în aceeași zi ca să confirm locul copilului."}
        </p>
        {!waitlist && (
          <div className="mt-6 grid justify-items-center gap-1">
            <a href={gcalHref()} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-line px-5 font-semibold text-ink-2 transition hover:border-coral hover:text-coral-t">
              <CalendarPlus className="size-5" aria-hidden /> Adaugă în calendar
            </a>
            <a href={icsHref()} download="lectie-codito.ics" className="py-2 text-[0.85rem] text-muted underline underline-offset-2">sau descarcă pentru alt calendar</a>
          </div>
        )}
        <a href={shareLink(`Am înscris copilul la o lecție gratuită de programare, ${W.date}. Mai sunt locuri, dacă vrei și tu: ${CONFIG.siteUrl}/inscriere/`)} target="_blank" rel="noopener" className="mt-1 inline-block py-2.5 text-[0.95rem] font-semibold text-coral-t underline underline-offset-4">
          Trimite și altui părinte
        </a>
      </div>
    );
  }

  return (
    <>
    <Seats />
    <form onSubmit={submit} noValidate className="mt-6 grid gap-5">
      <div>
        <h2 className="text-[1.45rem] font-semibold leading-tight">{waitlist ? "Lasă\u2011mi datele pentru următoarea lecție" : "Înscrie\u2011ți copilul"}</h2>
        <p className="mt-1 text-[0.95rem] text-muted">Durează 30 de secunde. Te contactez eu.</p>
      </div>

      <label className="grid gap-1.5">
        <span className="text-[0.95rem] font-semibold">Prenumele tău</span>
        <input id="parinte" aria-invalid={bad === "parinte" || undefined} aria-describedby={bad === "parinte" ? "form-err" : undefined} value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" placeholder="ex. Andreea"
          className="h-[52px] rounded-xl border-2 border-line bg-paper px-4 text-[1.05rem] outline-none transition placeholder:text-muted/70 focus:border-coral aria-[invalid=true]:border-coral" />
      </label>

      <label className="grid gap-1.5">
        <span className="text-[0.95rem] font-semibold">Telefonul tău</span>
        <input id="telefon" aria-invalid={bad === "telefon" || undefined} aria-describedby={bad === "telefon" ? "form-err" : undefined} value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx"
          className="h-[52px] rounded-xl border-2 border-line bg-paper px-4 text-[1.05rem] outline-none transition placeholder:text-muted/70 focus:border-coral aria-[invalid=true]:border-coral" />
        <span className="text-[0.82rem] text-muted">Te sun sau îți scriu pe WhatsApp, cum preferi.</span>
      </label>

      <label className="grid gap-1.5">
        <span className="text-[0.95rem] font-semibold">Câți ani are copilul?</span>
        <input id="varsta" aria-invalid={bad === "varsta" || undefined} aria-describedby={bad === "varsta" ? "form-err" : undefined} value={age} onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))} type="text" inputMode="numeric" autoComplete="off" enterKeyHint="done" placeholder="ex. 10"
          className="h-[52px] w-32 rounded-xl border-2 border-line bg-paper px-4 text-[1.05rem] outline-none transition placeholder:text-muted/70 focus:border-coral aria-[invalid=true]:border-coral" />
      </label>

      <label className="-mx-2 flex min-h-11 cursor-pointer items-start gap-3 rounded-lg px-2 py-2 text-[0.88rem] leading-snug text-ink-2">
        <input id="acord" aria-invalid={bad === "acord" || undefined} aria-describedby={bad === "acord" ? "form-err" : undefined} type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[#F0643A] aria-[invalid=true]:outline aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-offset-2 aria-[invalid=true]:outline-coral" />
        <span>Sunt de acord să fiu contactat pentru această lecție. Datele nu ajung la nimeni altcineva (<a href="/confidentialitate/" target="_blank" rel="noopener" className="py-1 font-semibold text-coral-t underline">confidențialitate</a>).</span>
      </label>

      {err && <p id="form-err" className="rounded-lg bg-peach px-3 py-2 text-[0.92rem] font-medium text-coral-t" role="alert">{err}</p>}

      <button type="submit" disabled={state === "sending"}
        className="group inline-flex h-[58px] items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-cta px-5 text-[1rem] font-semibold min-[360px]:px-6 min-[360px]:text-[1.08rem] text-white shadow-coral transition hover:-translate-y-0.5 hover:bg-cta-d disabled:opacity-70">
        {state === "sending" ? <Loader2 className="size-5 animate-spin" aria-hidden /> : null}
        {waitlist ? "Anunță-mă" : "Rezervă locul gratuit"}
        {state !== "sending" && <ArrowRight className="size-5 transition-transform group-hover:translate-x-1 max-[359px]:hidden" aria-hidden />}
      </button>
      <p className="-mt-2 flex items-center justify-center gap-1.5 text-center text-[0.85rem] text-muted"><Check className="size-4 text-green" strokeWidth={3} aria-hidden /> Gratuit. Fără card, fără obligații.</p>
      <p className="-mt-2 text-center text-[0.88rem] text-muted">Preferi WhatsApp? <a href={waLink(`Bună, Leonard! Vreau să înscriu copilul la lecția gratuită din ${W.date}.`)} target="_blank" rel="noopener" className="inline-block py-2.5 font-semibold text-coral-t underline underline-offset-2">Scrie‑mi direct</a></p>
    </form>
    </>
  );
}
