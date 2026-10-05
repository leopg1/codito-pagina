"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { AgeKey } from "@/lib/content";

export type Kid = { name: string; g: "m" | "f"; age: AgeKey | "" };
type Ctx = { kid: Kid; setKid: (k: Kid) => void; reset: () => void; age: AgeKey; setAge: (a: AgeKey) => void };

const EMPTY: Kid = { name: "", g: "m", age: "" };
const KidCtx = createContext<Ctx | null>(null);

export function KidProvider({ children }: { children: ReactNode }) {
  const [kid, setKidState] = useState<Kid>(EMPTY);
  const [age, setAge] = useState<AgeKey>("10");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kid");
      if (raw) {
        const k = JSON.parse(raw) as Kid;
        setKidState(k);
        if (k.age) setAge(k.age);
      }
    } catch {}
  }, []);

  const setKid = useCallback((k: Kid) => {
    setKidState(k);
    if (k.age) setAge(k.age);
    try { localStorage.setItem("kid", JSON.stringify(k)); } catch {}
  }, []);

  const reset = useCallback(() => {
    setKidState(EMPTY);
    try { localStorage.removeItem("kid"); } catch {}
  }, []);

  return <KidCtx.Provider value={{ kid, setKid, reset, age, setAge }}>{children}</KidCtx.Provider>;
}

export function useKid() {
  const c = useContext(KidCtx);
  if (!c) throw new Error("useKid must be used inside KidProvider");
  return c;
}

/** Genitiv/dativ: „lui Andrei”, „Mariei”, „Biancăi”, „copilului tău” */
export function genitive(n: string, g: Kid["g"]) {
  if (!n) return "copilului tău";
  if (g === "f" && /a$/i.test(n)) {
    if (/[cg]a$/i.test(n)) return n.slice(0, -1) + "ăi";
    if (/ea$/i.test(n)) return n.slice(0, -1) + "i";
    return n.slice(0, -1) + "ei";
  }
  return "lui " + n;
}

export function KidName({ cap = false }: { cap?: boolean }) {
  const { kid } = useKid();
  return <>{kid.name || (cap ? "Copilul tău" : "copilul tău")}</>;
}

export function KidGen() {
  const { kid } = useKid();
  return <>{genitive(kid.name, kid.g)}</>;
}

export function KidSample() {
  const { kid } = useKid();
  return <>{kid.name || (kid.g === "f" ? "Ioana" : "Andrei")}</>;
}
