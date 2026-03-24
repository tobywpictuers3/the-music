/**
 * Homepage Configuration — Single Source of Truth
 *
 * כאן נמצאת כל השליטה הידידותית על:
 * 1. איזה דף שייך לאיזו דמות
 * 2. מיקום הדמויות על הבמה
 * 3. מיקום הכותרת על השלט של כל דמות
 * 4. טקסטים כלליים של דף הבית
 *
 * ===============================
 * איך מזיזים דמות?
 * ===============================
 * stage.left   = ימינה / שמאלה
 * stage.bottom = למעלה / למטה
 * stage.width  = גדול / קטן
 *
 * חשוב:
 * left אצלנו הוא נקודת המרכז-תחתית של הדמות,
 * ולא תחילת המסגרת של קובץ התמונה.
 *
 * ===============================
 * איך מזיזים את הכיתוב שעל השלט?
 * ===============================
 * signBox.top    = למעלה / למטה
 * signBox.left   = ימינה / שמאלה
 * signBox.width  = רוחב אזור הכיתוב
 * signBox.height = גובה אזור הכיתוב
 */

export type StagePlacement = {
  /** נקודת עיגון אופית */
  left: string;
  /** גובה הדמות מהרצפה */
  bottom: string;
  /** רוחב יחסי של כל הדמות */
  width: string;
  /** סדר שכבות */
  zIndex: number;
};

export type SignBox = {
  /** מיקום פנימי של הטקסט בתוך השלט */
  top: string;
  left: string;
  width: string;
  height: string;
};

export type StageCharacter = {
  /** כותרת הדף שמופיעה על השלט */
  title: string;
  /** הנתיב של הדף */
  href: string;
  /**
   * מפתח הדמות
   * חייב להתאים לשמות במפת האימג'ים ב-Index.tsx
   */
  character: "piano" | "eguitar" | "guitar" | "drums" | "saxophone" | "violin";
  /** מיקום הדמות על הבמה */
  stage: StagePlacement;
  /** מיקום הטקסט בתוך השלט של הדמות */
  signBox: SignBox;
  /** טקסט לכרטיסים למטה */
  quote: string;
};

export const STAGE_CHARACTERS: StageCharacter[] = [
  /**
   * 1 — הכי שמאלי, נמוך
   */
  {
    title: "תלמידות",
    href: "/students",
    character: "piano",
    stage: {
      left: "11%",
      bottom: "1.5%",
      width: "18%",
      zIndex: 10,
    },
    signBox: {
      top: "4.5%",
      left: "12%",
      width: "76%",
      height: "18%",
    },
    quote:
      "מרחב שמחבר בין לימוד, תרגול, התקדמות וקשר אישי — בצורה חיה ונעימה.",
  },

  /**
   * 2 — שמאל-מרכז, קצת יותר גבוה
   */
  {
    title: "תזמורות",
    href: "/orchestras",
    character: "eguitar",
    stage: {
      left: "26%",
      bottom: "8%",
      width: "10.25%",
      zIndex: 13,
    },
    signBox: {
      top: "4.5%",
      left: "12%",
      width: "76%",
      height: "18%",
    },
    quote:
      "הרכבים, סגנונות ואפשרויות שמתאימים לאירוע שלכם — בלי להסתבך.",
  },

  /**
   * 3 — ליד 2, מעט גבוה יותר
   */
  {
    title: "אודות",
    href: "/about",
    character: "guitar",
    stage: {
      left: "34.5%",
      bottom: "9.5%",
      width: "10.25%",
      zIndex: 14,
    },
    signBox: {
      top: "4.5%",
      left: "12%",
      width: "76%",
      height: "18%",
    },
    quote:
      "הסיפור, הדרך והאני מאמין של Toby Music — במקום אחד, ברור ומדויק.",
  },

  /**
   * 4 — אמצע, הרחב ביותר
   */
  {
    title: "תווים",
    href: "/sheets",
    character: "drums",
    stage: {
      left: "50.5%",
      bottom: "11%",
      width: "17.5%",
      zIndex: 9,
    },
    signBox: {
      top: "3%",
      left: "12%",
      width: "76%",
      height: "15.5%",
    },
    quote:
      "ספריית תווים מסודרת, נוחה ונעימה לעין — כדי להגיע מהר למה שצריך.",
  },

  /**
   * 5 — ימין-מרכז
   */
  {
    title: "בלוגים",
    href: "/blog",
    character: "saxophone",
    stage: {
      left: "69.5%",
      bottom: "7%",
      width: "10%",
      zIndex: 13,
    },
    signBox: {
      top: "4.5%",
      left: "12%",
      width: "76%",
      height: "18%",
    },
    quote:
      "טיפים, מחשבות, רעיונות והשראה מוזיקלית שנעים לחזור אליה שוב.",
  },

  /**
   * 6 — הכי ימני, נמוך
   */
  {
    title: "צור קשר",
    href: "/contact",
    character: "violin",
    stage: {
      left: "82.5%",
      bottom: "2%",
      width: "9.5%",
      zIndex: 10,
    },
    signBox: {
      top: "4.5%",
      left: "12%",
      width: "76%",
      height: "18%",
    },
    quote:
      "רוצה לשאול, להתייעץ או להזמין? כאן מתחילים שיחה פשוטה ונעימה.",
  },
];

// ── Marquee items ──────────────────────────────────────────────────
export const MARQUEE_ITEMS = [
  "תזמורות",
  "תלמידות",
  "תווים",
  "בלוגים",
  "יצירת קשר",
  "מוזיקה • תוכן • חוויה",
  "אירועים • לימוד • השראה",
  "Toby Music",
];

// ── Guide presenter ────────────────────────────────────────────────
export const GUIDE_PRESENTER = {
  welcomeText:
    "ברוכים הבאים לאתר של טובי. אני אלווה אתכם כאן בסיור באתר. בלחיצה עלי תוכלו לשאול כל מה שתצטרכו אודות הנכתב באתר, אשתדל לענות לכם ככל יכולתי. ניתן גם לבקש הסבר באופן קולי. לשירותכם!",
  floatingLabel: "שאלו את טובי",
};

// ── Hero text ──────────────────────────────────────────────────────
export const HERO_TEXT = {
  subtitle: "המוזיקה מתחילה",
  linkWord: "כאן",
  /**
   * כרגע "כאן" יוריד לאזור המגיש שמתחת לבמה.
   * אם תרצי שיעבור למקום אחר — מחליפים רק את הערך הזה.
   */
  linkHref: "#guide-presenter",
  supportLine: "תזמורות, תלמידות, תווים ותוכן — במקום אחד.",
  sloganPrefix: "אומנות ואמינות —",
  sloganAccent: "זו יצירה",
};
