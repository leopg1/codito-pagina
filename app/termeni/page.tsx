import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { html, title } from "@/lib/legal/termeni";

export const metadata: Metadata = { title, description: "Termenii și condițiile lecțiilor Codito: prețuri, programare, reprogramări, garanția „merită sau nu plătești” și siguranța copilului.", alternates: { canonical: "/termeni/" } };
export default function Page() { return <LegalPage html={html} />; }
