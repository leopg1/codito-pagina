import { CONFIG } from "./config";

export type AgeKey = "10" | "13" | "15";

/** Cratimă care nu se rupe la capăt de rând („AI-ul”, „să-și”, „Joacă-te”). */
export const nb = (t: string) => t.replace(/(\p{L})-(\p{L})/gu, "$1\u2011$2").replace(/(\d)–(\d)/g, "$1\u2060–\u2060$2");
const nbDeep = <T,>(v: T): T =>
  (typeof v === "string" ? nb(v) : Array.isArray(v) ? v.map(nbDeep) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, nbDeep(x)])) : v) as T;

export const BUBBLE_EMOJI = ["📱", "🎮", "🤔", "🤖", "💸", "🤷‍♀️"];

export const BUBBLES = nbDeep([
  "Stă ore întregi pe telefon. Măcar de-ar învăța ceva de acolo.",
  "Îi place calculatorul, dar doar se joacă.",
  "Oare ce meserie o să aibă peste 10 ani, cu inteligența artificială asta?",
  "Folosește ChatGPT la teme. Nu știu dacă îl ajută sau îl strică.",
  "Am mai dat bani pe meditații și nu am văzut niciun rezultat.",
  "Eu nu mă pricep la calculatoare, deci nu am cum să-l ajut.",
]);

export const TRACKS: Record<AgeKey, [string, string, string][]> = nbDeep({
  "10": [
    ["Primele programe", "Pornim de la ce îl pasionează (Minecraft, Roblox, YouTube). Învață să dea comenzi calculatorului, pas cu pas, și face un joc de ghicit și un quiz despre subiectul lui preferat.", "Primul lui joc, jucat de toată familia."],
    ["Joc cu grafică", "Personaje care se mișcă, scor, niveluri, în stilul jocurilor pe care le joacă. Aici învață, fără să-și dea seama, logică și puțină matematică.", "Un joc „adevărat”, cu imagini și sunet."],
    ["Proiectul lui, publicat", "Termină jocul ales de el și îl pune pe internet. Prima întâlnire cu AI-ul: cum îi ceri o explicație, nu temele gata făcute.", "Un link pe care îl trimite prietenilor. Și o prezentare doar pentru voi."],
  ],
  "13": [
    ["Bazele, făcute bine", "Python de la zero, cu proiecte mici în fiecare lecție: un calculator inteligent, un joc, un mic chatbot.", "Primele programe care chiar fac ceva util."],
    ["Propriul site", "Își construiește site-ul personal, cu pasiunile lui, și îl publică pe internet, cu adresă reală.", "Site-ul lui, deschis de pe orice telefon."],
    ["Aplicație cu inteligență artificială", "Face un asistent AI pentru hobby-ul lui (sport, jocuri, muzică) și învață regulile folosirii corecte a AI-ului.", "O aplicație AI făcută de el, prezentată la final."],
  ],
  "15": [
    ["Gândește ca un programator", "Python serios și cum se lucrează corect cu AI-ul: întâi înțelegi, apoi folosești. Opțional, C++ pentru școală sau bac.", "Rezolvă singur probleme care înainte îl blocau."],
    ["O aplicație web reală", "Aplicație cu conturi, bază de date și interfață, exact cum se fac în industrie.", "O aplicație completă, funcțională, online."],
    ["Proiect de portofoliu", "Integrează AI într-un proiect ales de el și îl publică pe GitHub, „CV-ul” programatorilor.", "Un portofoliu cu care iese în evidență la liceu, facultate, primul job."],
  ],
});

export const LEVELS = nbDeep([
  {
    n: 1, name: "Explorator", meta: "9–12 ani sau începători · aproximativ 4–6 luni",
    learn: ["Cum „gândește” un calculator: pași, ordine, logică", "Bazele Python: variabile, condiții, bucle, funcții, liste", "Grafică și animații din cod", "Să găsească singur greșelile și să le repare"],
    build: ["Jocuri: ghicitori, quiz-uri, jocuri cu personaje și scor", "Jocuri inspirate din Minecraft și Roblox, făcute de el", "Desene și animații generate din cod", "Primul lui proiect, publicat cu link"],
    outcome: "scrie singur programe mici, să explice cum funcționează și să ducă un proiect de la idee până la final.",
  },
  {
    n: 2, name: "Constructor", meta: "12–15 ani sau după nivelul 1 · aproximativ 4–6 luni",
    learn: ["Python mai serios: fișiere, date, proiecte mai mari", "Cum se face un site: HTML, CSS și puțin JavaScript", "Cum folosește aplicația lui date reale de pe internet", "AI folosit corect: cum îi ceri explicații, cum verifici ce spune"],
    build: ["Site-ul lui personal, publicat pe internet", "Un chatbot sau asistent AI pentru hobby-ul lui", "Aplicații cu date reale: vreme, sport, jocuri"],
    outcome: "construiască și să publice un site și o aplicație mică, folosind AI-ul ca asistent, nu ca să copieze.",
  },
  {
    n: 3, name: "Creator", meta: "14–17 ani sau după nivelul 2 · 6 luni și mai mult",
    learn: ["Aplicații web complete: conturi, bază de date, interfață", "Integrarea inteligenței artificiale în propriile aplicații", "Git și GitHub: cum lucrează programatorii adevărați", "Opțional: C++ și algoritmi pentru informatica de liceu, bac sau olimpiadă"],
    build: ["O aplicație web reală, cu AI integrat", "Proiecte de portofoliu, publicate pe GitHub"],
    outcome: "gândească și să lucreze ca un programator junior și are un portofoliu cu care iese în evidență.",
  },
]);

export const FAQ: [string, string][] = nbDeep<[string, string][]>([
  ["Copilul meu nu a programat niciodată. Poate să înceapă?", "Da, e chiar ideal. Pornim de la zero, cu pași mici. În prima lecție scrie deja un program care funcționează. Pentru că lucrăm unu la unu, mergem exact în ritmul lui."],
  ["Ce se întâmplă după lecția gratuită? O să fiu sunat insistent?", "Nu. În aceeași zi îți trimit evaluarea, în scris: de unde pornește copilul, ce i s-ar potrivi și cum ar arăta prima lună. Dacă vreți să continuați, îmi scrieți voi și stabilim ziua și ora fixă din săptămână. Dacă nu, nu mai primiți niciun mesaj de la mine."],
  ["Online chiar funcționează? Nu se plictisește?", "Lecțiile nu sunt „prelegeri”. Copilul scrie, încearcă, greșește și repară tot timpul. Lucrăm cu camera pornită și cu ecranul partajat, iar eu explic desenând pe o tabletă grafică. Fiind doar noi doi, văd imediat când îi scade atenția și schimb ritmul."],
  ["Pot să asist și eu la lecții?", "Oricând. Poți sta lângă copil la orice lecție sau doar să intri câteva minute. Comunicarea cu copilul are loc doar pe un grup de WhatsApp în care ești și tu."],
  ["Ce îi trebuie copilului?", "Un laptop sau un calculator (nu trebuie să fie nou sau performant), internet și, ideal, căști cu microfon. Atât. Toate programele pe care le folosim sunt gratuite."],
  ["Nu e prea mult 90 de minute?", "Pentru proiecte adevărate, o oră se termină exact când copilul „s-a încălzit”. Avem o pauză scurtă la mijloc, iar cu cei de 9–11 ani alternăm des: explic puțin, construiește, testăm împreună. Așa timpul trece repede."],
  ["Ce se întâmplă dacă lipsim la o lecție?", "Dacă anunți cu cel puțin 24 de ore înainte, o mutăm în altă zi din aceeași lună, fără costuri. Programul e flexibil: după-amiaza, seara sau în weekend."],
  ["Cum plătesc? Primesc factură?", "Plata se face prin transfer bancar, la începutul fiecărei luni. Lucrez cu PFA, deci primești factură pentru fiecare plată. Fără contract pe termen lung: te poți opri oricând."],
  ["Ce înseamnă „familie fondatoare”?", `Sunt primele ${CONFIG.founding.total} familii care încep lecțiile. Ele plătesc ${CONFIG.price.month} lei pe lună și păstrează prețul ăsta ${CONFIG.founding.lockMonths} luni, chiar dacă prețul crește pentru familiile care vin după. În schimb, îți cer o părere sinceră după prima lună, bună sau rea.`],
  ["Aveți reduceri?", `Da: ${CONFIG.discounts.sibling}% pentru al doilea copil din familie și ${CONFIG.discounts.prepay3}% dacă plătești 3 luni deodată. Dacă recomanzi Codito unei alte familii și ea începe lecțiile, primiți amândoi câte o lecție gratuită.`],
  ["Pot face lecțiile cadou?", "Da. Îți pregătesc un voucher pentru o lună de lecții (4 lecții), cu numele copilului, pe care îl poți tipări sau trimite. E un cadou bun de ziua lui sau de sărbători. Scrie-mi pe WhatsApp și îl primești în aceeași zi."],
  ["Ajutați și la informatica de la școală sau la bac?", "Da. Predau și C++, limbajul folosit la liceu. Putem combina pregătirea pentru școală cu un proiect personal care îl ține motivat."],
  ["Cum sunt protejate datele copilului?", "Folosesc datele doar ca să programăm și să ținem lecțiile. Nu le dau nimănui și nu fac poze sau înregistrări fără acordul tău scris. Detalii în politica de confidențialitate."],
  ["Locuim în străinătate. Putem lucra?", "Sigur. Totul e online și predau în română, deci e potrivit și pentru familiile de români din diaspora. Ne adaptăm la fusul orar."],
]);

/* ===== Dovezi: se afișează automat pe pagină doar când adaugi elemente ===== */

/** Păreri reale de la părinți, cu acordul lor. Ex.: { name: "Ana, mama lui Matei", detail: "Matei, 11 ani · 2 luni de lecții", text: "..." } */
export const TESTIMONIALS: { name: string; detail: string; text: string }[] = [];

/** Proiecte reale ale copiilor, cu acordul părinților. Imaginea în /public/proiecte/. Ex.: { title: "Jocul cu dragoni", kid: "Matei, 11 ani", img: "/proiecte/matei.png", link: "https://..." } */
export const PROJECTS: { title: string; kid: string; img: string; link?: string; note?: string }[] = [];
