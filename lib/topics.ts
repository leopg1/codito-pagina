import { CONFIG } from "./config";

export type TopicVisual = "python" | "game" | "ai" | "bac";

export type Topic = {
  slug: string;
  title: string; // <title> și h1
  description: string; // meta description
  eyebrow: string; // nume scurt (breadcrumb, footer, linkuri)
  lead: string;
  why: [string, string, string?][]; // [titlu, text, emoji]
  learn: string[];
  build: string[];
  faq: [string, string][];

  /* ===== pentru pagina redesenată ===== */
  accent: string; // bucata din titlu colorată coral (trebuie să existe în title)
  hand: string; // eticheta scrisă de mână de deasupra titlului
  visual: TopicVisual; // mockup-ul din dreapta hero-ului
  emoji: string; // pentru linkurile dintre pagini
  short: string; // o frază, pentru linkurile dintre pagini
  whyTitle: string;
  whyLead: string;
  quote?: string; // citat scurt, cu bordură coral
  learnLead: string;
  project: { e: string; title: string; text: string };
  lesson: [string, string, string, string][]; // [minute, emoji, titlu, text]
  closing: string;
  blog: string[]; // slugurile articolelor recomandate
};

const p = CONFIG.price;

export const TOPICS: Topic[] = [
  {
    slug: "curs-python-copii",
    title: "Curs de Python pentru copii, online, unu la unu",
    description: `Lecții de Python pentru copii și adolescenți, online, 1:1, cu același profesor. 90 de minute pe săptămână, ${p.month / 4} lei lecția. Prima lecție e gratuită.`,
    eyebrow: "Python pentru copii",
    lead: "Python e limbajul cu care se scriu jocuri, site‑uri și aplicații cu inteligență artificială. Se citește aproape ca engleza, așa că un copil își face primul program chiar din prima lecție.",
    why: [
      ["Un limbaj adevărat, de la început", "Python e folosit de Google, NASA și în aproape toate proiectele de inteligență artificială. Se învață ușor la început și rămâne util toată viața.", "🐍"],
      ["Unu la unu, în ritmul lui", "Copilul nu așteaptă după o grupă de 10. Dacă prinde repede, mergem mai departe. Dacă se blochează, explic altfel, până se leagă.", "🎯"],
      ["Pornim de la ce îl pasionează", "Fotbal, Minecraft, dinozauri sau muzică: proiectele sunt despre lumea lui, așa că are motiv să revină la ele și între lecții.", "⚽"],
      ["Pentru începători și pentru cei care vor mai mult", "Cine n‑a programat niciodată pornește de la zero. Cine a mai făcut Scratch sau ceva Python merge direct spre aplicații reale și AI.", "🚀"],
    ],
    learn: ["Variabile, condiții, bucle și funcții, explicate cu exemple din jocuri", "Să găsească singur greșelile și să le repare", "Grafică, animații și jocuri cu scor și niveluri", "Cum folosește corect AI‑ul ca asistent, fără să copieze"],
    build: ["Un joc de ghicit și un quiz, chiar din primele lecții", "Un joc cu personaje, scor și niveluri", "Un chatbot sau un asistent AI pentru hobby‑ul lui"],
    faq: [
      ["Copilul meu n‑a programat niciodată. Poate începe direct cu Python?", "Da. Pornim de la zero, cu pași mici. Pentru cei mici explic totul cu desene și cu exemple din jocurile lor."],
      ["Ce îi trebuie copilului?", "Un laptop sau un calculator, internet și, ideal, căști. Programele le instalăm împreună în prima lecție și sunt gratuite."],
      ["Cât durează până face ceva singur?", "Primul program îl scrie în prima lecție. După aproximativ o lună face jocuri mici fără ajutor."],
      ["Nu e mai bine să înceapă cu Scratch?", "Scratch e bun pentru primii pași, dar mulți copii îl depășesc repede. Python le dă acces la proiecte adevărate, iar într‑o lecție 1:1 pot învăța sintaxa fără să se simtă copleșiți. Dacă la lecția gratuită văd că Scratch i s‑ar potrivi mai bine, îți spun."],
    ],
    accent: "Python",
    hand: "Primul limbaj adevărat, de la zero",
    visual: "python",
    emoji: "🐍",
    short: "Primul limbaj adevărat, de la zero, cu proiecte despre ce îi place.",
    whyTitle: "De ce Python și de ce unu la unu",
    whyLead: "Un copil învață programare cel mai repede când scrie el codul, cu cineva lângă el care vede fiecare rând.",
    quote: "Când îi merge primul program, copilul se uită altfel la calculator. Momentul ăsta se întâmplă de obicei chiar la prima lecție.",
    learnLead: "Fiecare concept nou apare într‑un proiect. Copilul nu memorează definiții: le folosește imediat, în ceva ce vrea să termine.",
    project: { e: "🏆", title: "Un quiz despre pasiunea lui", text: "Un proiect obișnuit din primele lecții: un quiz care pune întrebări, verifică răspunsurile și ține scorul. Copilul alege subiectul și scrie singur întrebările, apoi îl dă familiei să‑l încerce." },
    lesson: [
      ["0–10", "👋", "Ne salutăm", "Ce a mai încercat acasă și ce ar vrea să construiască."],
      ["10–35", "✏️", "Un concept nou", "Bucle, liste sau funcții, desenate pe tableta grafică, cu exemple din jocuri."],
      ["35–80", "🐍", "Scrie Python", "Codul îl scrie el, rând cu rând. Când apare o eroare, o citim împreună și o repară singur."],
      ["80–90", "🎉", "Rulează și explică", "Pornește programul și îmi explică, cu cuvintele lui, cum funcționează."],
    ],
    closing: "Primul lui program în Python poate fi gata chiar la lecția gratuită.",
    blog: ["scratch-sau-python-cu-ce-sa-inceapa-copilul", "la-ce-varsta-poate-incepe-copilul-programarea", "cum-alegi-un-curs-de-programare-pentru-copil"],
  },
  {
    slug: "programare-copii-online",
    title: "Lecții de programare pentru copii, online, 1:1",
    description: `Lecții online de programare pentru copii, unu la unu, 90 de minute, cu raport pentru părinte după fiecare lecție. Prima lecție e gratuită.`,
    eyebrow: "Programare pentru copii",
    lead: "Copilul stă oricum ore întregi în fața ecranului. La lecțiile Codito folosește timpul ăsta ca să construiască: jocuri, site‑uri și aplicații pe care le arată cu mândrie familiei.",
    why: [
      ["Unu la unu, online", "Un singur copil, un singur profesor, 90 de minute. Cu camera pornită și ecranul partajat, văd fiecare rând pe care îl scrie.", "👀"],
      ["Același profesor mereu", "Codito nu e o școală cu profesori care se schimbă. Eu țin fiecare lecție, deci știu exact unde a rămas copilul.", "🤝"],
      ["Știi mereu ce face", "După fiecare lecție primești pe WhatsApp un raport scurt, pe înțelesul oricui, cu o poză cu ce a construit.", "📲"],
      ["Fără drum și fără trafic", "Lucrează de acasă, pe calculatorul lui. Tot ce construiește rămâne la el, iar între lecții poate continua singur.", "🏠"],
    ],
    learn: ["Gândire logică: pași, ordine, cauză și efect", "Python, apoi site‑uri și aplicații web", "Inteligență artificială folosită corect", "Răbdare: să caute singur o greșeală și să nu renunțe"],
    build: ["Jocuri inspirate din Minecraft și Roblox, făcute de el", "Site‑ul lui personal, publicat pe internet", "O aplicație cu AI, prezentată familiei la final"],
    faq: [
      ["Online chiar funcționează pentru un copil?", "Da. Lecțiile nu sunt prelegeri: copilul scrie cod tot timpul, iar eu schimb ritmul imediat ce văd că obosește. Poți asista oricând."],
      ["Cât costă?", `${p.month} lei pe lună pentru 4 lecții de 90 de minute (${p.month / 4} lei lecția), pentru primele familii. Fără contract, te oprești oricând.`],
      ["Primesc factură?", "Da. Codito funcționează legal, prin PFA, și primești factură pentru fiecare plată."],
      ["Pot să asist și eu la lecții?", "Oricând. Poți sta lângă copil sau doar să intri câteva minute. Linkul lecției îl primești și tu, iar toate mesajele sunt pe un grup de WhatsApp în care ești și tu."],
    ],
    accent: "programare",
    hand: "Timpul de ecran, folosit ca să construiască",
    visual: "game",
    emoji: "🎮",
    short: "Jocuri, site‑uri și aplicații, construite de el, unu la unu.",
    whyTitle: "Cum lucrăm, pe scurt",
    whyLead: "Patru lucruri care rămân la fel pentru fiecare familie, de la prima lecție până la ultima.",
    quote: "Un copil care își face propriul joc se uită altfel la jocurile celorlalți: începe să întrebe cum sunt făcute.",
    learnLead: "Copilul pornește de la jocuri, pentru că acolo e deja motivația. De acolo ajunge la site‑uri și aplicații adevărate.",
    project: { e: "⭐", title: "Un joc cu personaj, stele și niveluri", text: "Personajul se mișcă din săgeți, adună stele, evită inamicii și trece la nivelul următor. Copilul desenează harta, alege regulile și scrie codul. La final, tot familia îl joacă." },
    lesson: [
      ["0–10", "👋", "Ce ai mai făcut?", "Vorbim despre ce a lucrat între lecții și ce îl entuziasmează."],
      ["10–35", "🧩", "Ideea zilei", "Scor, niveluri sau coliziuni: un singur concept nou, desenat pe tabletă."],
      ["35–80", "🛠️", "Construiește jocul", "Scrie cod cu mâna lui, cu o pauză scurtă la mijloc. Eu ghidez, el scrie."],
      ["80–90", "🎮", "Îl joacă", "Testăm jocul împreună și notăm ce adaugă data viitoare."],
    ],
    closing: "Orele de ecran de săptămâna asta pot deveni primul lui joc.",
    blog: ["timpul-pe-ecran-din-consum-in-creatie", "cum-alegi-un-curs-de-programare-pentru-copil", "la-ce-varsta-poate-incepe-copilul-programarea"],
  },
  {
    slug: "inteligenta-artificiala-copii",
    title: "Inteligență artificială pentru copii și adolescenți",
    description: "Lecții online 1:1 în care copiii învață să folosească AI‑ul corect și își fac propriile aplicații cu inteligență artificială. Prima lecție e gratuită.",
    eyebrow: "AI pentru copii",
    lead: "Copiii folosesc deja ChatGPT, de multe ori ca să copieze temele. La Codito învață cum funcționează AI‑ul, cum să‑l folosească pentru a înțelege mai bine și cum să‑și construiască propriile aplicații cu el.",
    why: [
      ["De ce acum", "AI‑ul intră în toate meseriile. Va conta cine știe să‑l folosească bine și să verifice ce spune.", "⏳"],
      ["Gândire critică, înainte de toate", "Învață întâi să gândească singur, apoi să folosească AI‑ul ca asistent. Niciodată invers.", "🧠"],
      ["Proiecte reale", "Copilul își face propriul asistent pentru hobby‑ul lui și înțelege, din interior, de ce un AI poate greși.", "🤖"],
      ["Reguli clare de siguranță", "Ce date nu dai niciodată unui AI, cum recunoști un răspuns inventat și când e mai bine să întrebi un om.", "🛡️"],
    ],
    learn: ["Ce e și ce nu e inteligența artificială, pe înțelesul copiilor", "Cum ceri o explicație corect și cum verifici răspunsul", "Bazele programării în Python, ca să construiască cu AI", "Reguli de siguranță: ce date nu dai niciodată unui AI"],
    build: ["Un chatbot pentru sportul, jocul sau muzica preferată", "Un asistent care îl ajută să învețe, fără să‑i facă temele", "Pentru adolescenți: o aplicație web cu AI integrat"],
    faq: [
      ["Nu e periculos ca un copil să folosească AI?", "Riscul mare e să‑l folosească singur, fără reguli. La lecții învață exact ce nu se face: să copieze, să dea date personale, să creadă orice răspuns."],
      ["De la ce vârstă?", "Bazele AI‑ului și primele proiecte se potrivesc oricărui copil care citește bine și folosește deja un calculator. Adolescenții merg mai departe, spre aplicații mai serioase."],
      ["Trebuie să știe deja programare?", "Nu. Învățăm programarea și AI‑ul împreună, de la zero."],
      ["O să‑și facă temele cu AI‑ul?", "Una dintre primele reguli pe care le învață e că AI‑ul explică, iar tema o face el. Asistentul pe care și‑l construiește are chiar regula asta scrisă în cod."],
    ],
    accent: "Inteligență artificială",
    hand: "Întâi gândește singur, apoi întreabă AI‑ul",
    visual: "ai",
    emoji: "🤖",
    short: "AI folosit corect, plus asistentul lui, construit de la zero.",
    whyTitle: "De ce merită învățat acum",
    whyLead: "AI‑ul nu dispare. Întrebarea e dacă copilul îl folosește ca să gândească mai bine sau ca să nu mai gândească deloc.",
    quote: "Un copil care și‑a construit propriul chatbot nu mai crede orbește ce îi spune un AI. A văzut cu ochii lui cum se poate înșela.",
    learnLead: "Jumătate gândire critică, jumătate programare. La final, copilul înțelege ce e în spatele unui chatbot, pentru că a construit unul.",
    project: { e: "📚", title: "Un asistent care îl ajută să învețe", text: "Copilul scrie regulile asistentului: să explice pas cu pas, să pună întrebări, să nu dea rezultatul direct. Apoi îl testează pe lecțiile lui de la școală și îl îmbunătățește când greșește." },
    lesson: [
      ["0–10", "👋", "O întrebare reală", "Pornim de la ceva ce a întrebat un chatbot și verificăm împreună răspunsul."],
      ["10–35", "🧠", "Cum funcționează", "O idee despre AI, pe înțelesul lui: de ce greșește uneori, ce face un prompt bun."],
      ["35–80", "🤖", "Construiește asistentul", "Scrie în Python regulile și comportamentul asistentului lui."],
      ["80–90", "🔍", "Testul de adevăr", "Încercăm să‑l păcălim și vedem dacă răspunde corect sau inventează."],
    ],
    closing: "Să folosească AI‑ul bine se învață. Prima lecție e gratuită.",
    blog: ["copilul-foloseste-chatgpt-la-teme", "timpul-pe-ecran-din-consum-in-creatie", "scratch-sau-python-cu-ce-sa-inceapa-copilul"],
  },
  {
    slug: "pregatire-bac-informatica",
    title: "Pregătire online la informatică: C++ și BAC",
    description: "Meditații online 1:1 la informatică pentru liceeni: C++, algoritmi și subiecte de BAC, explicate răbdător. Lecții de 90 de minute, prima lecție gratuită.",
    eyebrow: "Informatică pentru liceu și BAC",
    lead: "La informatică, mulți elevi se blochează la algoritmi și învață pe de rost. În lecțiile 1:1 lucrăm pe subiecte reale de BAC până când elevul înțelege de ce funcționează o soluție și o poate scrie singur.",
    why: [
      ["Pentru cine", "Elevi de liceu (clasele IX–XII) la profilul mate‑info sau științe, care vor o notă mai bună la școală sau la BAC.", "🎓"],
      ["Cum lucrăm", "Pornim de la ce face la școală. Explic pe tableta grafică, apoi elevul scrie singur codul, cu mine lângă el.", "✏️"],
      ["Greșelile, înainte de examen", "Testăm fiecare program cu exemple alese special ca să scoată la iveală greșelile tipice: variabile neinițializate, bucle care nu se opresc, cazuri limită.", "🔍"],
      ["Plus un proiect al lui", "Pentru motivație, combinăm pregătirea cu un proiect personal în Python sau o aplicație web.", "💡"],
    ],
    learn: ["C++: variabile, structuri, vectori, matrice, șiruri de caractere", "Algoritmi de bază: căutare, sortare, recursivitate", "Subiecte de BAC rezolvate pas cu pas, cu greșelile tipice", "Cum își verifică singur programul înainte să‑l predea"],
    build: ["Rezolvări complete pentru subiectele I, II și III", "Un caiet cu algoritmii de bază, scris de el", "Opțional: un proiect personal pentru portofoliu"],
    faq: [
      ["Ajutați și la temele de la școală?", "Da. Putem lucra pe ce face la clasă, ca să nu rămână în urmă, și în paralel pregătim BAC‑ul."],
      ["Cât de des?", `De obicei o lecție de 90 de minute pe săptămână (${p.month} lei pe lună). Înainte de BAC putem face și două lecții pe săptămână. Pentru ajutor punctual, o lecție individuală costă ${p.single} lei.`],
      ["Garantați o notă?", "Nimeni cinstit nu poate garanta o notă. Garantez în schimb că elevul înțelege ce scrie și că primești, după fiecare lecție, un raport clar despre progres."],
      ["Lucrați și cu Pascal?", "Lucrăm în C++, limbajul pe care îl predau. Pentru proiectul personal folosim de obicei Python. Dacă la școală se face Pascal, îmi spui la lecția gratuită și vedem împreună ce e mai potrivit pentru elev."],
    ],
    accent: "C++ și BAC",
    hand: "Pentru liceu și BAC, unu la unu",
    visual: "bac",
    emoji: "🎓",
    short: "C++, algoritmi și subiecte de BAC, explicate răbdător.",
    whyTitle: "Cum arată pregătirea",
    whyLead: "Un elev care înțelege un algoritm îl poate rescrie oricând. Unul care l‑a memorat se blochează la prima schimbare din enunț.",
    quote: "La examen nu primești niciodată exact problema exersată. De aceea lucrăm până când elevul poate explica fiecare rând.",
    learnLead: "Materia de liceu, în ordinea în care apare la școală, cu subiectele de BAC ca reper. Teoria vine mereu împreună cu un program scris de el.",
    project: { e: "📓", title: "Caietul lui de algoritmi", text: "Fiecare algoritm învățat ajunge într‑un caiet scris de elev: ideea, codul și greșeala tipică de evitat. Înainte de BAC, recapitularea se face din caietul lui, nu dintr‑o culegere." },
    lesson: [
      ["0–10", "📚", "Ce s‑a făcut la clasă", "Lămurim ce a rămas neclar de la școală sau din tema de acasă."],
      ["10–35", "✏️", "Algoritmul, pe tablă", "Desenăm pașii pe tableta grafică, înainte să scriem vreun rând de cod."],
      ["35–80", "💻", "Scrie el, în C++", "Rezolvă o problemă în stilul BAC și o testăm cu exemple care caută greșelile."],
      ["80–90", "📝", "Recapitulare", "Ce greșeli să evite la examen și ce exersează până data viitoare."],
    ],
    closing: "Vedeți cum lucrăm pe o problemă de BAC, la o lecție gratuită.",
    blog: ["cum-alegi-un-curs-de-programare-pentru-copil", "copilul-foloseste-chatgpt-la-teme"],
  },
];
