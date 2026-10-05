import { CONFIG } from "./config";

export type Topic = {
  slug: string;
  title: string; // <title> și h1
  description: string; // meta description
  eyebrow: string;
  lead: string;
  why: [string, string][]; // de ce / pentru cine
  learn: string[];
  build: string[];
  faq: [string, string][];
};

const p = CONFIG.price;

export const TOPICS: Topic[] = [
  {
    slug: "curs-python-copii",
    title: "Curs de Python pentru copii, online, unu la unu",
    description: `Lecții de Python pentru copii și adolescenți de 9–17 ani, online, 1:1, cu același profesor. 90 de minute pe săptămână, ${p.month / 4} lei lecția. Prima lecție e gratuită.`,
    eyebrow: "Python pentru copii",
    lead: "Python e limbajul cu care se scriu jocuri, site-uri și aplicații cu inteligență artificială. Se citește aproape ca engleza, așa că un copil de 10 ani își face primul joc chiar din prima lecție.",
    why: [
      ["De ce Python", "E limbajul folosit de Google, NASA și în aproape toate proiectele de inteligență artificială. Se învață ușor la început și rămâne util toată viața."],
      ["De ce unu la unu", "Copilul nu așteaptă după o grupă de 10. Avansăm exact în ritmul lui și pornim de la ce îl pasionează."],
      ["De la ce vârstă", "De la 9 ani, fără experiență. Pentru cei mari, mergem direct spre aplicații reale și AI."],
    ],
    learn: ["Variabile, condiții, bucle și funcții, explicate cu exemple din jocuri", "Să găsească singur greșelile și să le repare", "Grafică, animații și jocuri cu scor și niveluri", "Cum folosește corect AI-ul ca asistent, fără să copieze"],
    build: ["Un joc de ghicit și un quiz, chiar din primele lecții", "Un joc cu personaje, scor și niveluri", "Un chatbot sau un asistent AI pentru hobby-ul lui"],
    faq: [
      ["Copilul meu n-a programat niciodată. Poate începe direct cu Python?", "Da. Pornim de la zero, cu pași mici. Pentru copiii de 9–10 ani explic totul cu desene și exemple din jocurile lor."],
      ["Ce îi trebuie copilului?", "Un laptop sau un calculator, internet și, ideal, căști. Programele le instalăm împreună în prima lecție și sunt gratuite."],
      ["Cât durează până face ceva singur?", "Primul program îl scrie în prima lecție. După aproximativ o lună face jocuri mici fără ajutor."],
    ],
  },
  {
    slug: "programare-copii-online",
    title: "Lecții de programare pentru copii, online, 1:1",
    description: `Programare pentru copii și adolescenți de 9–17 ani: lecții online unu la unu, 90 de minute, cu raport pentru părinte după fiecare lecție. De la ${p.month / 4} lei lecția. Prima lecție e gratuită.`,
    eyebrow: "Programare pentru copii",
    lead: "Copilul stă oricum ore întregi în fața ecranului. La lecțiile Codito folosește timpul ăsta ca să construiască: jocuri, site-uri și aplicații pe care le arată cu mândrie familiei.",
    why: [
      ["Unu la unu, online", "Un singur copil, un singur profesor, 90 de minute. Cu camera pornită și ecranul partajat, văd fiecare rând pe care îl scrie."],
      ["Același profesor mereu", "Codito nu e o școală cu profesori care se schimbă. Eu țin fiecare lecție, deci știu exact unde a rămas copilul."],
      ["Știi mereu ce face", "După fiecare lecție primești pe WhatsApp un raport scurt, pe înțelesul oricui, cu o poză cu ce a construit."],
    ],
    learn: ["Gândire logică: pași, ordine, cauză și efect", "Python, apoi site-uri și aplicații web", "Inteligență artificială folosită corect", "Răbdare: să caute singur o greșeală și să nu renunțe"],
    build: ["Jocuri inspirate din Minecraft și Roblox, făcute de el", "Site-ul lui personal, publicat pe internet", "O aplicație cu AI, prezentată familiei la final"],
    faq: [
      ["Online chiar funcționează pentru un copil de 9–10 ani?", "Da. Lecțiile nu sunt prelegeri: copilul scrie cod tot timpul, iar eu schimb ritmul imediat ce văd că obosește. Poți asista oricând."],
      ["Cât costă?", `${p.month} lei pe lună pentru 4 lecții de 90 de minute (${p.month / 4} lei lecția), pentru primele familii. Fără contract, te oprești oricând.`],
      ["Primesc factură?", "Da. Codito funcționează legal, prin PFA, și primești factură pentru fiecare plată."],
    ],
  },
  {
    slug: "inteligenta-artificiala-copii",
    title: "Inteligență artificială pentru copii și adolescenți",
    description: "Lecții online 1:1 în care copiii de 9–17 ani învață să folosească AI-ul corect și își construiesc propriile aplicații cu inteligență artificială. Prima lecție e gratuită.",
    eyebrow: "AI pentru copii",
    lead: "Copiii folosesc deja ChatGPT, de multe ori ca să copieze temele. La Codito învață cum funcționează AI-ul, cum să-l folosească pentru a înțelege mai bine și cum să-și construiască propriile aplicații cu el.",
    why: [
      ["De ce acum", "AI-ul intră în toate meseriile. Va conta cine știe să-l folosească bine și să verifice ce spune."],
      ["Gândire critică, înainte de toate", "Învață întâi să gândească singur, apoi să folosească AI-ul ca asistent. Niciodată invers."],
      ["Proiecte reale", "Nu doar vorbim despre AI: copilul își face propriul asistent pentru hobby-ul lui."],
    ],
    learn: ["Ce e și ce nu e inteligența artificială, pe înțelesul copiilor", "Cum ceri o explicație corect și cum verifici răspunsul", "Bazele programării în Python, ca să construiască cu AI", "Reguli de siguranță: ce date nu dai niciodată unui AI"],
    build: ["Un chatbot pentru sportul, jocul sau muzica preferată", "Un asistent care îl ajută să învețe, fără să-i facă temele", "Pentru adolescenți: o aplicație web cu AI integrat"],
    faq: [
      ["Nu e periculos ca un copil să folosească AI?", "Riscul mare e să-l folosească singur, fără reguli. La lecții învață exact ce nu se face: să copieze, să dea date personale, să creadă orice răspuns."],
      ["De la ce vârstă?", "De la 9 ani pentru bazele AI-ului și primele proiecte. De la 13–14 ani construim aplicații mai serioase."],
      ["Trebuie să știe deja programare?", "Nu. Învățăm programarea și AI-ul împreună, de la zero."],
    ],
  },
  {
    slug: "pregatire-bac-informatica",
    title: "Pregătire online la informatică: C++ pentru liceu și BAC",
    description: "Meditații online 1:1 la informatică pentru liceeni: C++, algoritmi și subiecte de BAC, explicate răbdător. Lecții de 90 de minute, prima lecție gratuită.",
    eyebrow: "Informatică pentru liceu și BAC",
    lead: "La informatică, mulți elevi se blochează la algoritmi și învață pe de rost. În lecțiile 1:1 lucrăm pe subiecte reale de BAC până când elevul înțelege de ce funcționează o soluție și o poate scrie singur.",
    why: [
      ["Pentru cine", "Elevi de liceu (clasele IX–XII) la profilul mate-info sau științe, care vor o notă mai bună la școală sau la BAC."],
      ["Cum lucrăm", "Pornim de la ce face la școală. Explic pe tabla grafică, apoi elevul scrie singur codul, cu mine lângă el."],
      ["Plus un proiect al lui", "Pentru motivație, combinăm pregătirea cu un proiect personal în Python sau o aplicație web."],
    ],
    learn: ["C++: variabile, structuri, vectori, matrice, șiruri de caractere", "Algoritmi de bază: căutare, sortare, recursivitate", "Subiecte de BAC rezolvate pas cu pas, cu greșelile tipice", "Cum își verifică singur programul înainte să-l predea"],
    build: ["Rezolvări complete pentru subiectele I, II și III", "Un caiet cu algoritmii de bază, scris de el", "Opțional: un proiect personal pentru portofoliu"],
    faq: [
      ["Ajutați și la temele de la școală?", "Da. Putem lucra pe ce face la clasă, ca să nu rămână în urmă, și în paralel pregătim BAC-ul."],
      ["Cât de des?", `De obicei o lecție de 90 de minute pe săptămână (${p.month} lei pe lună). Înainte de BAC putem face și două lecții pe săptămână. Pentru ajutor punctual, o lecție individuală costă ${p.single} lei.`],
      ["Garantați o notă?", "Nimeni cinstit nu poate garanta o notă. Garantez în schimb că elevul înțelege ce scrie și că primești, după fiecare lecție, un raport clar despre progres."],
    ],
  },
];
