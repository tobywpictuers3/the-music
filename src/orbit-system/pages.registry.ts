/**
 * מקור האמת של דפי האורביט.
 * כאן מוגדרים:
 * - טקסטי ההירו
 * - 5 העיגולים
 * - מהירות הסיבוב
 * - הבועות של המגיש הקבוע
 * - הבאנר הנוסע
 */

import type { OrbitItemConfig, PageConfig, PageId } from "./orbit.types";

function createGenericOrbitItems(): OrbitItemConfig[] {
  return [
    { id: "1", label: "1", baseAngleDeg: 0, targetSectionId: "section-1" },
    { id: "2", label: "2", baseAngleDeg: 72, targetSectionId: "section-2" },
    { id: "3", label: "3", baseAngleDeg: 144, targetSectionId: "section-3" },
    { id: "4", label: "4", baseAngleDeg: 216, targetSectionId: "section-4" },
    { id: "5", label: "5", baseAngleDeg: 288, targetSectionId: "section-5" },
  ];
}

function createBasePage(
  pageId: PageId,
  route: string,
  presenterId: PageConfig["presenterId"]
): PageConfig {
  return {
    pageId,
    route,
    presenterId,
    hero: {
      titleLines: ["כותרת ראשית לדף", "עוד שורת כותרת"],
      introLines: [
        "זהו טקסט דמה נעים לקריאה בתוך אזור שני השליש.",
        "אחר כך תוכלי להחליף אותו לתוכן המדויק של הדף.",
      ],
      headerOffsetPx: 96,
    },
    orbit: {
      items: createGenericOrbitItems(),
      rotationSpeedDegPerSec: 1.15,
      defaultLook: "default",
    },
    stickyGuide: {
      idleLook: "default",
      bubbles: [
        {
          id: "bubble-1",
          text: "זו בועת דמה ראשונה. כאן יופיע הטקסט הקבוע שמלווה את תחילת הגלילה.",
          showFromAfterHeroPx: 30,
          hideAfterHeroPx: 620,
          maxWidthPx: 520,
          offsetX: 20,
          offsetY: -2,
          enterMs: 220,
          exitMs: 180,
        },
        {
          id: "bubble-2",
          text: "זו בועת דמה שנייה. אפשר להחליף לכל דף נוסח אחר, בלי לשנות את המבנה.",
          showFromAfterHeroPx: 760,
          hideAfterHeroPx: 1500,
          maxWidthPx: 540,
          offsetX: 26,
          offsetY: 6,
          enterMs: 220,
          exitMs: 180,
        },
      ],
    },
    tickerBanner: {
      enabled: true,
      items: [
        "טקסט נע לדוגמה",
        "כאן יוגדר תוכן שונה לכל דף",
        "הבאנר מופיע כבר בתחילת הגלילה",
      ],
      heightPx: 94,
      bottomOffsetPx: 32,
      opacity: 0.92,
      loopDurationSec: 34,
    },
  };
}

const basePages: Record<PageId, PageConfig> = {
  home: createBasePage("home", "/", "avatar"),
  contact: createBasePage("contact", "/contact", "avatar"),
  students: createBasePage("students", "/students", "piano"),
  blog: createBasePage("blog", "/blog", "avatar"),
  orchestras: createBasePage("orchestras", "/orchestras", "drums"),
  performances: createBasePage("performances", "/performances", "violin"),
  about: createBasePage("about", "/about", "electricGuitar"),
  sheetMusic: createBasePage("sheetMusic", "/sheet-music", "classicalGuitar"),
};

basePages.about = {
  ...basePages.about,
  hero: {
    titleLines: ["כותרת ראשית לדף", "עוד שורת כותרת"],
    introLines: [
      "זהו טקסט דמה נעים לקריאה בתוך אזור שני השליש.",
      "אחר כך תוכלי להחליף אותו לתוכן המדויק של הדף.",
    ],
    headerOffsetPx: 96,
  },
  orbit: {
    ...basePages.about.orbit,
    rotationSpeedDegPerSec: 1.05,
  },
  stickyGuide: {
    idleLook: "default",
    bubbles: [
      {
        id: "about-bubble-1",
        text: "זו בועת דמה ראשונה. כאן יופיע הטקסט שמגיע מיד כשמתחילה הגלילה מההירו.",
        showFromAfterHeroPx: 24,
        hideAfterHeroPx: 640,
        maxWidthPx: 560,
        offsetX: 18,
        offsetY: -4,
        enterMs: 240,
        exitMs: 180,
      },
      {
        id: "about-bubble-2",
        text: "זהו אזור תוכן לבדיקה. כאן ייכנס בהמשך התוכן האמיתי של הדף, וכל חלק יוכל להשתייך לעיגול 1, 2, 3, 4 או 5.",
        showFromAfterHeroPx: 760,
        hideAfterHeroPx: 1600,
        maxWidthPx: 620,
        offsetX: 22,
        offsetY: 2,
        enterMs: 240,
        exitMs: 180,
      },
    ],
  },
  tickerBanner: {
    enabled: true,
    items: [
      "טקסט נע לדוגמה",
      "כאן יוגדר תוכן שונה לכל דף",
      "הבאנר מופיע יחד עם המגיש הקבוע",
      "הגלילה מההירו מפעילה את המערכת מיד",
    ],
    heightPx: 96,
    bottomOffsetPx: 34,
    opacity: 0.92,
    loopDurationSec: 36,
  },
};

basePages.blog = {
  pageId: "blog",
  route: "/blog",
  presenterId: "avatar",
  hero: {
    titleLines: ["במה חיה", "לתוכן, שאלות,", "וקשר עם הקוראות"],
    introLines: [
      "במקום בלוג שבלוני — דף שנכנסים אליו כמו למסלול.",
      "יש כאן מאמרים, שאלות קצרות, קולות מהקהילה, ורעיונות שנולדים מהשיח עם הקוראות.",
    ],
    headerOffsetPx: 96,
  },
  orbit: {
    items: [
      {
        id: "1",
        label: "מוביל",
        baseAngleDeg: 270,
        targetSectionId: "featured",
      },
      {
        id: "2",
        label: "מאמרים",
        baseAngleDeg: 338,
        targetSectionId: "articles",
      },
      {
        id: "3",
        label: "שאלות",
        baseAngleDeg: 52,
        targetSectionId: "quick-questions",
      },
      {
        id: "4",
        label: "קהילה",
        baseAngleDeg: 126,
        targetSectionId: "community",
      },
      {
        id: "5",
        label: "נושאים",
        baseAngleDeg: 202,
        targetSectionId: "requested-topics",
      },
    ],
    rotationSpeedDegPerSec: 1.05,
    defaultLook: "default",
  },
  stickyGuide: {
    idleLook: "default",
    bubbles: [
      {
        id: "blog-bubble-1",
        text: "כאן הבלוג לא נפתח כפיד שטוח, אלא כשער כניסה: קודם במה, אחר כך מסלול קריאה ברור.",
        showFromAfterHeroPx: 40,
        hideAfterHeroPx: 760,
        maxWidthPx: 560,
        offsetX: 18,
        offsetY: -6,
        enterMs: 240,
        exitMs: 180,
      },
      {
        id: "blog-bubble-2",
        text: "בהמשך הדף השאלות, הקהילה והנושאים המבוקשים ממשיכים את המאמרים, ולא יושבים בצד כאזור נפרד.",
        showFromAfterHeroPx: 920,
        hideAfterHeroPx: 1900,
        maxWidthPx: 610,
        offsetX: 22,
        offsetY: 2,
        enterMs: 240,
        exitMs: 180,
      },
    ],
  },
  tickerBanner: {
    enabled: true,
    items: [
      "מאמרים חדשים",
      "שאלות קצרות",
      "קולות מהקהילה",
      "נושאים שביקשו שאכתוב",
      "רשימת התפוצה",
    ],
    heightPx: 96,
    bottomOffsetPx: 34,
    opacity: 0.92,
    loopDurationSec: 36,
  },
};

export const pagesRegistry: Record<PageId, PageConfig> = basePages;

/**
 * דף הדמו המחובר הראשון.
 */
export const orbitDemoPageId: PageId = "about";
