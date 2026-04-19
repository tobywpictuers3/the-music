import type { OrbitPageContentConfig } from "@/orbit-system/orbit.types";

export const CONTACT_PAGE_ORBIT_CONTENT: OrbitPageContentConfig = {
  presenterId: "avatar",
  hero: {
    titleLines: ["לא רק טופס,", "אלא התחלה", "של שיחה נכונה"],
    introLines: [
      "כאן אפשר לפנות לגבי שיעורים, הופעות, שיתופי פעולה, סדנאות וכל שאלה נוספת.",
      "המטרה היא לאסוף את הפרטים החשובים בצורה נעימה, כדי שאוכל לחזור אליכם ברור ומדויק.",
    ],
  },
  orbit: {
    items: [
      {
        id: "1",
        label: "פתיחה",
        eyebrow: "01",
        title: "פתיחה",
        spoiler: "מבוא קצר, היכרות וכיוון ראשוני לפני מילוי הטופס.",
        baseAngleDeg: 336,
        targetSectionId: "contact-intro-section",
      },
      {
        id: "2",
        label: "טופס",
        eyebrow: "02",
        title: "טופס",
        spoiler: "השארת פרטים אישיים בסיסיים לפתיחת פנייה מסודרת.",
        baseAngleDeg: 48,
        targetSectionId: "contact-form-section",
      },
      {
        id: "3",
        label: "נושאים",
        eyebrow: "03",
        title: "נושאים",
        spoiler: "בחירה של תחומי העניין או סוגי הפנייה שברצונך לקדם.",
        baseAngleDeg: 120,
        targetSectionId: "contact-topics-stage",
      },
      {
        id: "4",
        label: "פירוט",
        eyebrow: "04",
        title: "פירוט",
        spoiler: "כמה שורות שיעזרו לי להבין לעומק מה בדיוק צריך.",
        baseAngleDeg: 192,
        targetSectionId: "contact-details-stage",
      },
      {
        id: "5",
        label: "המשך",
        eyebrow: "05",
        title: "המשך",
        spoiler: "שליחת הפנייה, תפוצה והמשך קשר באופן מסודר.",
        baseAngleDeg: 264,
        targetSectionId: "contact-followup-section",
      },
    ],
  },
  stickyGuide: {
    activationRatio: 0.5,
    activationOffsetPx: 0,
    showFromAfterHeroPx: 0,
    bubbles: [
      {
        id: "contact-bubble-1",
        text: "אפשר לבחור כמה נושאים יחד, לא רק אחד.",
        showFromAfterHeroPx: 30,
        hideAfterHeroPx: 520,
      },
      {
        id: "contact-bubble-2",
        text: "כמה שורות ברורות בטופס יעזרו לי לחזור אליכם מדויק יותר.",
        showFromAfterHeroPx: 560,
        hideAfterHeroPx: 1260,
      },
      {
        id: "contact-bubble-3",
        text: "אם הגעתם מדף תלמידות, אפשר להשאיר כבר כאן פנייה לשיעורים פרטיים.",
        showFromAfterHeroPx: 1300,
        hideAfterHeroPx: 2200,
      },
    ],
  },
  tickerBanner: {
    enabled: true,
    items: [
      "שיעורים פרטיים",
      "הופעות",
      "שיתופי פעולה",
      "סדנאות",
      "תזמורות",
      "מדיה ויח״צ",
      "פנייה מסודרת וקצרה",
    ],
    showFromAfterHeroPx: 0,
  },
};
