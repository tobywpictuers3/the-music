/**
 * כל הטיפוסים של המערכת.
 * כאן מגדירים את "השפה" שכל שאר הקבצים משתמשים בה.
 */

export type ThemeMode = "light" | "dark";

export type PresenterLook =
  | "default"
  | "upperRight"
  | "right"
  | "lowerRight"
  | "lowerLeft"
  | "left"
  | "upperLeft"
  | "stageSign";

export type PresenterId =
  | "avatar"
  | "piano"
  | "saxophone"
  | "drums"
  | "violin"
  | "electricGuitar"
  | "classicalGuitar";

export type PageId =
  | "home"
  | "contact"
  | "students"
  | "blogs"
  | "orchestras"
  | "performances"
  | "about"
  | "sheetMusic";

export type OrbitItemId = "1" | "2" | "3" | "4" | "5";

export type PresenterVisual = {
  src: string;
  alt: string;
};

export type PresenterConfig = {
  id: PresenterId;
  label: string;

  /**
   * כל 8 המצבים של הדמות:
   * ברירת מחדל + 6 זוויות + מצב שלט לדף הבית
   */
  looks: Record<PresenterLook, PresenterVisual>;

  /**
   * שליטה מרוכזת בגדלים.
   * אפשר לשנות כאן, וכל המערכת תתעדכן.
   */
  sizing: {
    heroWidth: string;
    heroMaxWidth: string;
    stickyWidth: string;
    stickyMaxWidth: string;
    stageWidth: string;
    stageMaxWidth: string;
  };
};

export type OrbitItemConfig = {
  id: OrbitItemId;

  /**
   * כרגע שם גנרי 1..5.
   * בהמשך מחליפים לטקסט אמיתי לפי תוכן הדף.
   */
  label: string;

  /**
   * זווית בסיס של הפריט במסלול.
   * 0 = שעה 12
   * 90 = שעה 3
   * 180 = שעה 6
   * 270 = שעה 9
   */
  baseAngleDeg: number;

  /**
   * אפשר לחבר בלחיצה לסקשן בדף.
   */
  targetSectionId?: string;
};

export type BubbleConfig = {
  id: string;
  text: string;

  /**
   * מתי הבועה מופיעה אחרי סוף ההירו.
   * 0 = הרגע שבו נגמר ההירו.
   */
  showFromAfterHeroPx: number;
  hideAfterHeroPx: number;

  /**
   * כיווני מיקום עדינים לכל בועה.
   */
  offsetX?: number;
  offsetY?: number;

  maxWidthPx?: number;
  enterMs?: number;
  exitMs?: number;
};

export type TickerBannerConfig = {
  enabled: boolean;
  items: string[];

  /**
   * גובה ומיקום של הבאנר.
   */
  heightPx: number;
  bottomOffsetPx: number;

  /**
   * שקיפות כללית של הבאנר.
   */
  opacity: number;

  /**
   * זמן לופ של הטקסט הנוסע.
   */
  loopDurationSec: number;
};

export type PageConfig = {
  pageId: PageId;
  route: string;
  presenterId: PresenterId;

  hero: {
    titleLines: string[];
    introLines: string[];

    /**
     * גובה ה-header המרחף.
     * רק התוכן נדחף למטה, לא הרקע של ההירו.
     */
    headerOffsetPx: number;
  };

  orbit: {
    items: OrbitItemConfig[];
    rotationSpeedDegPerSec: number;
    defaultLook: "default";
  };

  stickyGuide: {
    idleLook: "default";
    bubbles: BubbleConfig[];
  };

  tickerBanner: TickerBannerConfig;
};
