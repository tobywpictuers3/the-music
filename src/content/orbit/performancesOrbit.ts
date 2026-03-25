import type {
  FloatingBubbleMessage,
  OrbitItem,
  PresenterAssets,
} from "@/components/orbit/orbit.types";

import violinImg from "@/assets/homepage/characters/violin.png";

export const performancesOrbitItems: OrbitItem[] = [
  {
    id: "overview",
    indexLabel: "01",
    angle: 336,
    orbitTitle: "מבט",
    orbitNote: "מה כולל דף ההופעות",
    sectionId: "performances-overview-section",
  },
  {
    id: "packages",
    indexLabel: "02",
    angle: 48,
    orbitTitle: "מסלולים",
    orbitNote: "אפשרויות לפי צורך",
    sectionId: "performances-packages-section",
  },
  {
    id: "calendar",
    indexLabel: "03",
    angle: 120,
    orbitTitle: "יומן",
    orbitNote: "אירועים והופעות קרובות",
    sectionId: "performances-calendar-section",
  },
  {
    id: "faq",
    indexLabel: "04",
    angle: 192,
    orbitTitle: "שאלות",
    orbitNote: "דברים שכדאי לדעת מראש",
    sectionId: "performances-faq-section",
  },
  {
    id: "contact",
    indexLabel: "05",
    angle: 264,
    orbitTitle: "יצירת קשר",
    orbitNote: "פנייה להזמנה או בירור",
    sectionId: "performances-contact-section",
  },
];

export const performancesPresenterAssets: PresenterAssets = {
  front: violinImg,
  upRight: violinImg,
  right: violinImg,
  downRight: violinImg,
  downLeft: violinImg,
  left: violinImg,
  upLeft: violinImg,
};

export const performancesFloatingMessages: FloatingBubbleMessage[] = [
  { id: "perf-1", text: "אפשר להתחיל ממבט כללי ואז לרדת לחבילת הופעה שמתאימה לאירוע." },
  { id: "perf-2", text: "אם עוד אין החלטה מלאה, אפשר להתחיל מפנייה קצרה ולהתקדם משם." },
  { id: "perf-3", text: "היומן כאן נועד לתת תחושת כיוון, לא לנעול את ההזמנה." },
];
