export type AgeKey = "10" | "13" | "15";

/** Cratimă care nu se rupe la capăt de rând („AI-ul”, „să-și”, „Joacă-te”). */
export const nb = (t: string) => t.replace(/(\p{L})-(\p{L})/gu, "$1\u2011$2");
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
    ["Primele programe", "Învață să dea comenzi calculatorului, pas cu pas. Face un joc de ghicit și un quiz despre subiectul lui preferat.", "Primul lui joc, jucat de toată familia."],
    ["Joc cu grafică", "Personaje care se mișcă, scor, niveluri. Aici învață, fără să-și dea seama, logică și puțină matematică.", "Un joc „adevărat”, cu imagini și sunet."],
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
    build: ["Jocuri: ghicitori, quiz-uri, jocuri cu personaje și scor", "Desene și animații generate din cod", "Primul lui proiect, publicat cu link"],
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
  ["Ce se întâmplă după lecția gratuită?", "Îți trimit o părere scurtă, în scris: de unde pornește copilul și ce i s-ar potrivi. Dacă vreți să continuați, stabilim ziua și ora fixă din săptămână. Dacă nu, nu mai primiți niciun mesaj de la mine. Promit."],
  ["Online chiar funcționează? Nu se plictisește?", "Lecțiile nu sunt „prelegeri”. Copilul scrie, încearcă, greșește și repară tot timpul. Lucrăm cu camera pornită și cu ecranul partajat, iar eu explic desenând pe o tabletă grafică. Fiind doar noi doi, văd imediat când îi scade atenția și schimb ritmul."],
  ["Eu nu mă pricep deloc la calculatoare. E o problemă?", "Deloc. Nu trebuie să știi nimic tehnic. Instalăm totul împreună cu copilul în prima lecție, iar rapoartele mele sunt scrise pe înțelesul oricui, fără termeni complicați."],
  ["Pot să asist și eu la lecții?", "Oricând. Poți sta lângă copil la orice lecție sau doar să intri câteva minute. Comunicarea cu copilul are loc doar pe un grup de WhatsApp în care ești și tu."],
  ["Ce îi trebuie copilului?", "Un laptop sau un calculator (nu trebuie să fie nou sau performant), internet și, ideal, căști cu microfon. Atât. Toate programele pe care le folosim sunt gratuite."],
  ["Nu e prea mult 90 de minute?", "Pentru proiecte adevărate, o oră se termină exact când copilul „s-a încălzit”. Avem și o pauză scurtă la mijloc. Pentru cei de 9–11 ani putem face lecții de 60 de minute."],
  ["Ce se întâmplă dacă lipsim la o lecție?", "Dacă anunți cu cel puțin 24 de ore înainte, o mutăm în altă zi din aceeași lună, fără costuri. Programul e flexibil: după-amiaza, seara sau în weekend."],
  ["Cum plătesc? Primesc factură?", "Plata se face prin transfer bancar, la începutul fiecărei luni. Lucrez cu PFA, deci primești factură pentru fiecare plată. Fără contract pe termen lung: te poți opri oricând."],
  ["Ajutați și la informatica de la școală sau la bac?", "Da. Predau și C++, limbajul folosit la liceu. Putem combina pregătirea pentru școală cu un proiect personal care îl ține motivat."],
  ["Ce e Codito? Cine ține lecțiile?", "Codito e numele lecțiilor mele 1:1. Nu e o școală cu mulți profesori: sunt eu, Leonard, la fiecare lecție, cu fiecare copil. Așa știu exact unde a rămas copilul tău și ce îl motivează."],
  ["Cum sunt protejate datele copilului?", "Folosesc datele doar ca să programăm și să ținem lecțiile. Nu le dau nimănui și nu fac poze sau înregistrări fără acordul tău scris. Detalii în politica de confidențialitate."],
  ["Locuim în străinătate. Putem lucra?", "Sigur. Totul e online și predau în română, deci e potrivit și pentru familiile de români din diaspora. Ne adaptăm la fusul orar."],
]);
