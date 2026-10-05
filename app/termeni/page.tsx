import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { html, title } from "@/lib/legal/termeni";

export const metadata: Metadata = { title, description: "Termenii și condițiile lecțiilor Codito: prețuri, programare, reprogramări, garanția „merită sau nu plătești” și siguranța copilului.", alternates: { canonical: "/termeni/" }, openGraph: { type: "website", url: "/termeni/", siteName: "Codito", locale: "ro_RO", title, images: ["/og.png"] } };
export default function Page() { return <LegalPage html={html} />; }
