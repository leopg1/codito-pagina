/* ============ CONFIGURARE: modifici doar aici ============ */
export const CONFIG = {
  siteUrl: "https://codito.ro",
  whatsapp: "40787427001", // fără + și fără spații
  phone: "+40 787 427 001",
  spotsTotal: 5, // locuri la preț de început
  spotsTaken: 0, // actualizează cinstit când se ocupă
  price: { month: 440, monthOld: 640, single: 150 }, // lei · 440 = 4 × 110
  schedule: "Luni–Vineri 15:00–21:00 · Sâmbătă 9:00–14:00",
  reply: "pe WhatsApp, în maximum 2 ore · zilnic, între 9:00 și 21:00",
  integrityCert: false, // pune true după ce obții certificatul de integritate comportamentală
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
  monthOld: `${CONFIG.price.monthOld} lei`,
  single: `${CONFIG.price.single} lei`,
  session: `${session} lei`,
  hour: `${Math.round(session / 1.5)} lei pe oră`,
  day: `${Math.round(CONFIG.price.month / 30)} lei`,
};

export const SPOTS_FREE = Math.max(0, CONFIG.spotsTotal - CONFIG.spotsTaken);

export const waLink = (text: string) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

export const WA_HELLO = waLink(
  "Bună, Leonard! Am văzut site-ul Codito și aș vrea mai multe detalii despre lecțiile de programare pentru copilul meu."
);

export const telLink = `tel:${CONFIG.phone.replace(/\s/g, "")}`;
