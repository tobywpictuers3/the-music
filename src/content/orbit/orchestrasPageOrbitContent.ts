import type { OrbitPageContentConfig } from "@/orbit-system/orbit.types";

export const ORCHESTRAS_PAGE_ORBIT_CONTENT: OrbitPageContentConfig = {
  presenterId: "drums",
  hero: {
    titleLines: ["לא רק מחיר,", "אלא מסלול", "להזמנת הופעה"],
    introLines: [
      "כאן אפשר להבין מה מתאים לך, לבנות הצעת מחיר, לבדוק תקציב, ולראות הופעות קרובות.",
      "הדף הזה מחבר בין בחירה מעשית לבין חוויית דף ברורה, עם ניווט מעגלי כמו בשאר האתר.",
    ],
  },
  orbit: {
    items: [
      {
        id: "1",
        label: "סקירה",
        eyebrow: "01",
        title: "סקירה",
        spoiler: "מבט כללי על האפשרויות והדרך להמשיך בלי ללכת לאיבוד.",
        baseAngleDeg: 270,
        targetSectionId: "overview-section",
      },
      {
        id: "2",
        label: "הצעה",
        eyebrow: "02",
        title: "הצעה",
        spoiler: "בניית הצעת מחיר לפי חבילות, כלים ותוספות.",
        baseAngleDeg: 338,
        targetSectionId: "pricing-section",
      },
      {
        id: "3",
        label: "תקציב",
        eyebrow: "03",
        title: "תקציב",
        spoiler: "מסלול הפוך: מתחילים מתקציב ומקבלים כיוון מתאים.",
        baseAngleDeg: 52,
        targetSectionId: "pricing-section",
      },
      {
        id: "4",
        label: "הופעות",
        eyebrow: "04",
        title: "הופעות",
        spoiler: "יומן אירועים קרובים ומבט חי לעולם ההופעות.",
        baseAngleDeg: 126,
        targetSectionId: "events-section",
      },
      {
        id: "5",
        label: "קשר",
        eyebrow: "05",
        title: "קשר",
        spoiler: "יצירת קשר והמשך מסודר מהעמוד אל ההזמנה עצמה.",
        baseAngleDeg: 202,
        targetSectionId: "contact-section",
      },
    ],
  },
  stickyGuide: {
    activationRatio: 0.5,
    activationOffsetPx: 0,
    showFromAfterHeroPx: 0,
    bubbles: [
      {
        id: "orchestras-bubble-1",
        text: "כאן הדף לא מתחיל בטופס, אלא בסקירה ברורה: מה אפשר להזמין, איך בונים הצעה, ואיך להתקדם בלי ללכת לאיבוד.",
        showFromAfterHeroPx: 40,
        hideAfterHeroPx: 760,
      },
      {
        id: "orchestras-bubble-2",
        text: "באזור המחיר אפשר לעבוד בשני מסלולים: לבנות הצעת מחיר ידנית, או להתחיל מתקציב ולקבל כיוון מותאם.",
        showFromAfterHeroPx: 900,
        hideAfterHeroPx: 1900,
      },
    ],
  },
  tickerBanner: {
    enabled: true,
    items: [
      "הצעת מחיר מותאמת",
      "בדיקת תקציב",
      "חבילות ותוספות",
      "הופעות קרובות",
      "יצירת קשר",
    ],
    showFromAfterHeroPx: 0,
  },
};
