/* ============ CONFIGURARE: modifici doar aici ============ */
export const CONFIG = {
  siteUrl: "https://codito.ro",
  whatsapp: "40787427001", // fără + și fără spații
  phone: "+40 787 427 001",
  price: {
    month: 440, // lei · 440 = 4 × 110 · prețul familiilor fondatoare
    later: 560, // prețul lunar de după primele familii fondatoare
    single: 150,
  },
  founding: { total: 5, taken: 0, lockMonths: 12 }, // actualizează „taken” cinstit, când se ocupă un loc
  discounts: { sibling: 10, prepay3: 5 }, // procente: frați, plată pe 3 luni
  schedule: "Luni–Vineri 15:00–21:00 · Sâmbătă 9:00–14:00",
  reply: "pe WhatsApp, în maximum 2 ore · zilnic, între 9:00 și 21:00",
  integrityCert: false, // pune true după ce obții certificatul de integritate comportamentală

  /* Se afișează automat doar după ce le completezi (vezi README) */
  photo: "/poza.jpg", // ex. "/poza.jpg" · poza ta (pune fișierul în /public)
  video: "", // ex. "/prezentare.mp4" · video de 60–90 s cu tine (pune fișierul în /public)
  videoPoster: "", // ex. "/prezentare.jpg" · imaginea afișată înainte de pornirea videoului
  lessonClip: "", // ex. "/fragment-lectie.mp4" · 20–30 s dintr‑o lecție reală, filmat de pe ecran
  calUrl: "", // ex. "https://cal.com/codito/lectie-gratuita" · calendar pentru rezervare
  googleReviewsUrl: "", // linkul către recenziile Google Business
  whatsappChannel: "", // linkul canalului de WhatsApp (proiecte de făcut acasă)
  workshop: { date: "sâmbătă, 10 octombrie, ora 14:00", note: "atelier online de 60 de minute pentru copii de 9\u2060–\u206014 ani, doar 5 locuri" }, // ex. { date: "Sâmbătă, 15 noiembrie, 11:00", note: "atelier gratuit online, 8–10 copii" }
  plausibleDomain: "", // ex. "codito.ro" · statistici fără cookie‑uri (plausible.io)

  company: {
    name: "Pădurean Gabriel-Leonard PFA",
    cui: "54354457",
    regCom: "F2026016431005",
    address: "Bd. Bucureștii Noi nr. 136, parter, ap. 5, Sector 1, București, 012366",
  },
};
/* ========================================================= */

const session = CONFIG.price.month / 4;
export const PRICES = {
  month: `${CONFIG.price.month} lei`,
  later: `${CONFIG.price.later} lei`,
  single: `${CONFIG.price.single} lei`,
  session: `${session} lei`,
  hour: `${Math.round(session / 1.5)} lei pe oră`,
  hourN: Math.round(session / 1.5),
  day: `${Math.round(CONFIG.price.month / 30)} lei`,
};

export const FOUNDING_FREE = Math.max(0, CONFIG.founding.total - CONFIG.founding.taken);

export const waLink = (text: string) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

export const WA_HELLO = waLink(
  "Bună, Leonard! Am văzut site‑ul Codito și aș vrea mai multe detalii despre lecțiile de programare pentru copilul meu."
);

export const telLink = `tel:${CONFIG.phone.replace(/\s/g, "")}`;

/** Link de WhatsApp fără destinatar: părintele alege cui trimite (ex. celuilalt părinte). */
export const shareLink = (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`;
