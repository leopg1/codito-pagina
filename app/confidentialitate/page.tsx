import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { html, title } from "@/lib/legal/confidentialitate";

export const metadata: Metadata = { title, description: "Cum folosește Codito datele părinților și ale copiilor: ce date colectăm, de ce, cât timp le păstrăm și ce drepturi ai.", alternates: { canonical: "/confidentialitate/" } };
export default function Page() { return <LegalPage html={html} />; }
