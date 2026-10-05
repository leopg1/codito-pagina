# Codito · site

Site-ul Codito (lecții 1:1 de programare și AI pentru copii și adolescenți), făcut cu **Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + Motion**. Se exportă ca site static (folderul `out/`), deci se poate găzdui gratuit.

## Pornire locală

```bash
npm install
npm run dev
```

Site-ul se deschide la http://localhost:3000.

## Ce modifici cel mai des

| Ce | Unde |
|---|---|
| Telefon, WhatsApp, prețuri, locuri libere, program, certificat de integritate, date firmă | `lib/config.ts` |
| Întrebări frecvente, planul pe 3 luni, programa, gândurile părinților | `lib/content.ts` |
| Termeni, confidențialitate, acord GDPR | `lib/legal/*.ts` (dacă schimbi prețurile, actualizează și secțiunea 5 din termeni) |
| Poza ta | pune un fișier `public/poza.jpg` (pătrat, minimum 600×600). Apare automat în hero și în secțiunea despre tine. |
| Imaginea de previzualizare pentru Facebook | `public/og.png` (sursa: `design/og.html`) |

## Build și publicare

```bash
npm run build
```

Rezultatul e în folderul `out/`. Variante gratuite de găzduire:

- **Netlify**: „Add new site” → „Deploy manually” → tragi folderul `out/`. Sau legi repository-ul, cu comanda de build `npm run build` și folderul de publicare `out`.
- **Cloudflare Pages**: build command `npm run build`, output directory `out`.

Apoi legi domeniul `codito.ro` din setările găzduirii (DNS) și activezi HTTPS (automat la ambele).

## Structură

```
app/                 pagini (/, /termeni, /confidentialitate, /acord-gdpr), layout, sitemap, robots
components/sections/ secțiunile paginii principale
components/site/     meniu, subsol, butoane fixe
components/ui/       butoane, animații, titluri
lib/                 configurare, conținut, texte legale
```
