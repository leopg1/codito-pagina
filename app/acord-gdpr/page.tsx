import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { html, title } from "@/lib/legal/acord-gdpr";

export const metadata: Metadata = { title, alternates: { canonical: "/acord-gdpr/" } };
export default function Page() { return <LegalPage html={html} />; }
