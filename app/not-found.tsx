import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Pagina nu există", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-coral-t">404</p>
        <h1 className="mt-2 text-4xl font-semibold">Pagina nu există</h1>
        <p className="mt-3 text-ink-2">Poate a fost mutată. Hai înapoi la pagina principală.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-cta px-6 py-3.5 font-semibold text-white">Înapoi la Codito</Link>
      </div>
    </main>
  );
}
