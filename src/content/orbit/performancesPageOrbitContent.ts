import type { OrbitPageContentConfig } from "@/orbit-system/orbit.types";

export const PERFORMANCES_PAGE_ORBIT_CONTENT: OrbitPageContentConfig = {
  presenterId: "violin",
  hero: {
    titleLines: ["לא רק לוח זמנים", "אלא מסלול", "להזמנת הופעה"],
    introLines: [
      "כאן אפשר לקבל מבט על עולם ההופעות, להבין איזה מסלול יכול להתאים לאירוע, ולפתוח שיחה מסודרת.",
      "המטרה היא לחבר בין חוויה מוזיקלית לבין בהירות: מה מתאים, מה שואלים, ואיך ממשיכים.",
    ],
  },
  orbit: {
    items: [
      {
        id: "1",
        label: "סקירה",
        eyebrow: "01",
        title: "סקירה",
        spoiler: "מבט כללי על עולם ההופעות והכיוונים האפשריים.",
        baseAngleDeg: 270,
        targetSectionId: "performances-overview-section",
      },
      {
        id: "2",
        label: "מסלולים",
        eyebrow: "02",
        title: "מסלולים",
        spoiler: "אפשרויות נפוצות להרכבים, התאמות וסוגי אירועים.",
        baseAngleDeg: 338,
        targetSectionId: "performances-packages-section",
      },
      {
        id: "3",
        label: "יומן",
        eyebrow: "03",
        title: "יומן",
        spoiler: "מועדים קרובים, הופעות ואירועים לדוגמה.",
        baseAngleDeg: 52,
        targetSectionId: "performances-calendar-section",
      },
      {
        id: "4",
        label: "שאלות",
        eyebrow: "04",
        title: "שאלות",
        spoiler: "תשובות קצרות לנקודות שבדרך כלל עולות לפני פנייה.",
        baseAngleDeg: 126,
        targetSectionId: "performances-faq-section",
      },
      {
        id: "5",
        label: "קשר",
        eyebrow: "05",
        title: "קשר",
        spoiler: "פנייה מסודרת כדי לבדוק התאמה לאירוע שלך.",
        baseAngleDeg: 202,
        targetSectionId: "performances-contact-section",
      },
    ],
  },
  stickyGuide: {
    activationRatio: 0.5,
    activationOffsetPx: 0,
    showFromAfterHeroPx: 0,
    bubbles: [
      {
        id: "performances-bubble-1",
        text: "דף ההופעות כאן נועד לעשות סדר: לא רק להראות שיש הופעות, אלא לעזור להבין איזה כיוון מתאים לאירוע ואיך ניגשים לזה.",
        showFromAfterHeroPx: 40,
        hideAfterHeroPx: 760,
      },
      {
        id: "performances-bubble-2",
        text: "אחרי הסקירה מגיעים למסלולים, ליומן, ולשאלות החשובות לפני פנייה — כך שהקשר נפתח ממקום הרבה יותר ברור.",
        showFromAfterHeroPx: 900,
        hideAfterHeroPx: 1900,
      },
    ],
  },
  tickerBanner: {
    enabled: true,
    items: [
      "מסלולי הופעה",
      "יומן אירועים",
      "שאלות נפוצות",
      "פנייה מסודרת",
      "התאמה לאירוע",
    ],
    showFromAfterHeroPx: 0,
  },
};
