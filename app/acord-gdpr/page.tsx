import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { html, title } from "@/lib/legal/acord-gdpr";

export const metadata: Metadata = { title, description: "Formularul de acord al părintelui privind datele copilului, pentru lecțiile online de programare Codito.", alternates: { canonical: "/acord-gdpr/" }, openGraph: { type: "website", url: "/acord-gdpr/", siteName: "Codito", locale: "ro_RO", title, images: ["/og.png"] } };
export default function Page() { return <LegalPage html={html} />; }
