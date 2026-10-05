import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { html, title } from "@/lib/legal/confidentialitate";

export const metadata: Metadata = { title, alternates: { canonical: "/confidentialitate/" } };
export default function Page() { return <LegalPage html={html} />; }
