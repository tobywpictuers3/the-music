import type { ComponentType, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import OrbitPageShell from "@/orbit-system/OrbitPageShell";
import type { OrbitItemConfig, OrbitItemId } from "@/orbit-system/orbit.types";
import AppearOnScroll from "@/components/AppearOnScroll";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BadgeDollarSign,
  BookOpen,
  CalendarRange,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  MessageSquareMore,
  Mic2,
  Music2,
  Quote,
  Smartphone,
  Sparkles,
  Square,
  Volume2,
  X,
} from "lucide-react";

/* =========================================================
   תמונות
   ========================================================= */
import studentsPresenterMain from "@/assets/students/students-presenter-main.png";
import studentsTestimonialsAnnouncer from "@/assets/students/students-testimonials-announcer.png";
import studentsLearningTouch from "@/assets/students/students-learning-touch.webp";
import studentsStudyMaterials from "@/assets/students/students-study-materials.webp";
import studentsStageAtmosphereWide from "@/assets/students/students-stage-atmosphere-wide.webp";
import studentsDemoSystemPreview from "@/assets/students/students-demo-system-preview.webp";

import starsLightTexture from "@/assets/homepage/textures/stars-light.png";
import starsLightRedTexture from "@/assets/homepage/textures/stars-light-red.png";
import starsDarkTexture from "@/assets/homepage/textures/stars-dark.png";
import starsDarkRedTexture from "@/assets/homepage/textures/stars-dark-red.png";
import floorLightTexture from "@/assets/homepage/textures/floor-light.png";
import floorDarkTexture from "@/assets/homepage/textures/floor-dark.png";

type StudyCard = {
  key: string;
  title: string;
  subtitle: string;
  Icon: ComponentType<{ className?: string }>;
  bullets: string[];
};

type QuoteItem = {
  key: string;
  quote: string;
  name: string;
  context?: string;
};

type ProcessItem = {
  key: string;
  title: string;
  text: string;
  Icon: ComponentType<{ className?: string }>;
};

type FeatureItem = {
  key: string;
  title: string;
  text: string;
  Icon: ComponentType<{ className?: string }>;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* =========================================================
   קישורים
   ========================================================= */
const CONTACT_STUDENTS_HREF = "/contact?from=students&topic=lessons_private";
const STUDENTS_APP_HREF = "https://tobymusic.lovable.app";
const STUDENTS_DEMO_HREF = "/students-demo";
const EDUCATIONAL_ORCHESTRA_HREF = "/educational-orchestra";
const ABOUT_TEACHING_HREF = "/about#teaching";

/* =========================================================
   טקסטים
   ========================================================= */
const HERO_PIANO_QUOTE =
  "כאן לא בונים רק שיעור טוב, אלא דרך יציבה ומוזיקלית שנשארת לאורך זמן — עם רמה, רצף, הקשבה וליווי אמיתי.";

const FLOATING_BUBBLES_BY_SECTION: Record<string, string> = {
  "studies-section":
    "כאן תחומי הלימוד מקבלים צורה ברורה: מה מרכזי, מה משלים, ואיך הכל מסתדר למסלול אחד שמחזיק תלמידה לאורך זמן.",
  "belief-section":
    "מבחינתי מוסיקה לא נבנית מקיצורי דרך. עומק, רגישות ומשמעת יכולים לחיות יחד — וזה מה שמאפשר התקדמות אמיתית.",
  "process-section":
    "כאן כבר רואים את התהליך בפועל: שיעור, תרגול, חומרים ורצף. לא רק השראה — אלא דרך עבודה שמתקדמת באמת.",
  "system-section":
    "המערכת לא מחליפה את השיעור — היא מחזיקה את הלמידה גם בין המפגשים, בצורה ברורה, נגישה ונעימה לעין.",
};

const TESTIMONIALS: QuoteItem[] = [
  {
    key: "t1",
    quote:
      "למדתי אצל טובי חליל צד ארבע שנים בערך, ובזכותה ממש התקדמתי בקריאת תווים.",
    name: "בת שבע",
    context: "חליל צד",
  },
  {
    key: "t2",
    quote:
      "טובי מורה מדהימה וסבלנית, מקצוענית במיוחד, וכל שיעור היה חוויה מיוחדת שפתחה שערים לתחומים נוספים במוזיקה.",
    name: "מירי",
    context: "חליל צד ותזמורת",
  },
  {
    key: "t3",
    quote:
      "החוויה הייתה הרבה מעבר לשיעורי נגינה. עברתי התקדמות מקצועית משמעותית בתוך תהליך לימוד מובנה וברור.",
    name: "תמר",
    context: "חליל צד",
  },
  {
    key: "t4",
    quote:
      "השיעורים מונגשים בצורה מעניינת וחווייתית, ומעבר לידע המקצועי מקבלים הבנה עמוקה ונרחבת בחומר.",
    name: "ריקי",
    context: "תאוריה",
  },
  {
    key: "t5",
    quote:
      "להיות תלמידה של טובי זה הרבה מעבר לללמוד מוזיקה. טובי אישיות מיוחדת, נעימה, חכמה וענווה.",
    name: "נעמי",
    context: "חליל צד ותזמורת",
  },
  {
    key: "t6",
    quote:
      "כל השבוע חיכיתי לשיעור פסנתר; הייתה אווירה נעימה, זורמת ולא מלחיצה — ממש חוויה.",
    name: "קרייני",
    context: "פסנתר",
  },
  {
    key: "t7",
    quote:
      "טובי מוסרת את השיעור שלה עם כל הלב, עם אכפתיות להתקדמות ולהבנה שלך, וזה מורגש בכל שלב.",
    name: "תמר",
    context: "חליל צד ותזמורת",
  },
  {
    key: "t8",
    quote:
      "מעל לשלוש שנים שאני זוכה להיות תלמידה שלך, וכל דקה איתך שווה בשבילי זהב.",
    name: "דסי",
    context: "פסנתר",
  },
];

const PRIMARY_STUDIES: StudyCard[] = [
  {
    key: "piano",
    title: "פסנתר",
    subtitle: "קריאה, טכניקה, הבעה ונגינה יציבה לאורך זמן.",
    Icon: Music2,
    bullets: [
      "עבודה יסודית על טכניקות מגוונות של נגינה",
      "ישיבה נכונה, משקל ויציבה משוחררת",
      "פיתוח יכולת קריאה מהדף — prima vista",
      "פיתוח קואורדינציה מורכבת והבעה מוסיקלית",
      "פירוקי פסנתר, ליווי שירים ופיתוח שמיעה מעשית",
    ],
  },
  {
    key: "flute",
    title: "חליל צד",
    subtitle: "צליל נקי, נשימה נכונה ושליטה מדויקת בכלי.",
    Icon: Mic2,
    bullets: [
      "עבודה על איכות הצליל ואמבז'ור מדויק",
      "פיתוח מערכת הנשימה וטווחי נשיפה",
      "דגש על יציבה נכונה והתאמה אנטומית",
      "טכניקות ארטיקולציה, שליטה ודיוק",
      "פיתוח נגינה בטוחה, נקייה ומסודרת",
    ],
  },
];

const SUPPORT_STUDIES = [
  "תיאוריה",
  "פיתוח שמיעה",
  "סולפז׳",
  "קריאת תווים",
  "קצב",
  "הקשבה מוסיקלית",
];

const BELIEF_LINES = [
  "מוסיקה נבנית מתוך עומק והשקעה, לא בקיצורי דרך.",
  "יחס אישי אינו סותר דרישות גבוהות — הוא מאפשר אותן.",
  "התקדמות אמיתית נוצרת מתוך רצף, אימון ותוכנית עבודה.",
  "רגישות, בהירות ומשמעת יכולות ללכת יחד.",
  "אני מחפשת תהליך נכון, לא רושם רגעי.",
];

const HOW_IT_WORKS: ProcessItem[] = [
  {
    key: "lesson",
    title: "שיעור שבועי",
    text: "השיעור נותן כיוון, תיקון ותוכנית עבודה ברורה לשבוע.",
    Icon: GraduationCap,
  },
  {
    key: "practice",
    title: "אימון בין שיעורים",
    text: "ההתקדמות בפועל נבנית באימון המסודר שבין המפגשים.",
    Icon: ClipboardList,
  },
  {
    key: "tracking",
    title: "מעקב ורצף",
    text: "יש מסגרת שמחזיקה את התהליך ולא נותנת לדברים להתפזר.",
    Icon: CalendarRange,
  },
  {
    key: "materials",
    title: "חומרים מסודרים",
    text: "עזרים, משימות ותכנים נגישים לתלמידה במקום אחד.",
    Icon: BookOpen,
  },
  {
    key: "fit",
    title: "התאמה למסלול",
    text: "מתאים למי שמכניסה את הלימוד לסדר היום בקביעות — לא רק כפעילות מזדמנת.",
    Icon: CheckCircle2,
  },
];

const APP_FEATURES: FeatureItem[] = [
  {
    key: "schedule",
    title: "סדר שבועי ברור",
    text: "מה קורה עכשיו, מה לתרגל השבוע ומהו הצעד הבא בתהליך.",
    Icon: CalendarRange,
  },
  {
    key: "practice",
    title: "מעקב אימון והתקדמות",
    text: "התלמידה יודעת מה לתרגל ומה כבר התקדם בפועל.",
    Icon: ClipboardList,
  },
  {
    key: "tools",
    title: "עזרים וחומרי לימוד",
    text: "תרגילים, משימות וכלים שימושיים במקום אחד.",
    Icon: Sparkles,
  },
  {
    key: "communication",
    title: "תקשורת מורה–תלמידה",
    text: "שאלות, הבהרות והמשכיות גם בין השיעורים.",
    Icon: MessageSquareMore,
  },
  {
    key: "payments",
    title: "סדר ותשלומים",
    text: "מעטפת מסודרת, ברורה ונגישה שגם מחזיקה את הצד המנהלי.",
    Icon: BadgeDollarSign,
  },
];

const NUMBERS = [
  { value: "26", label: "שנות הוראת מוסיקה" },
  { value: "9", label: "כלי נגינה ברמה מעולה" },
  { value: "מאות", label: "תלמידות פרטיות לאורך השנים" },
  { value: "אלפי", label: "בוגרות קורסים קבוצתיים" },
  { value: "5", label: "תזמורות לימודיות עשירות" },
  { value: "20", label: "קונצרטים לתלמידות" },
];

const STUDENTS_SECTION_ORBIT_MAP: Array<{
  sectionId: string;
  orbitId: OrbitItemId;
}> = [
  { sectionId: "track-section", orbitId: "1" },
  { sectionId: "studies-section", orbitId: "2" },
  { sectionId: "belief-section", orbitId: "3" },
  { sectionId: "process-section", orbitId: "4" },
  { sectionId: "system-section", orbitId: "5" },
];

/* =========================================================
   רכיבי עזר
   ========================================================= */

type AudioIconButtonProps = {
  speaking: boolean;
  onClick: () => void;
  className?: string;
};

function AudioIconButton({
  speaking,
  onClick,
  className,
}: AudioIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={speaking ? "עצירת השמעה" : "השמעה"}
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/75 text-white ring-1 ring-white/10 transition hover:-translate-y-[1px] hover:bg-black",
        className
      )}
    >
      {speaking ? (
        <Square className="h-4 w-4 text-primary" />
      ) : (
        <Volume2 className="h-5 w-5 text-primary" />
      )}
    </button>
  );
}

type ThemedTextureSurfaceProps = {
  children: ReactNode;
  lightTexture: string;
  darkTexture: string;
  className?: string;
  innerClassName?: string;
  roundedNone?: boolean;
  ringClassName?: string;
  overlayLightClass?: string;
  overlayDarkClass?: string;
};

function ThemedTextureSurface({
  children,
  lightTexture,
  darkTexture,
  className,
  innerClassName,
  roundedNone = false,
  ringClassName = "ring-1 ring-white/8 shadow-[0_18px_50px_rgba(0,0,0,0.22)]",
  overlayLightClass = "bg-black/38",
  overlayDarkClass = "bg-black/56",
}: ThemedTextureSurfaceProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        roundedNone ? "rounded-none" : "rounded-[2rem]",
        ringClassName,
        className
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center dark:hidden"
        style={{ backgroundImage: `url(${lightTexture})` }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-center dark:block"
        style={{ backgroundImage: `url(${darkTexture})` }}
      />
      <div className={cn("absolute inset-0 dark:hidden", overlayLightClass)} />
      <div
        className={cn("absolute inset-0 hidden dark:block", overlayDarkClass)}
      />
      <div className={cn("relative", innerClassName)}>{children}</div>
    </div>
  );
}

function StarSurface(
  props: Omit<ThemedTextureSurfaceProps, "lightTexture" | "darkTexture">
) {
  return (
    <ThemedTextureSurface
      lightTexture={starsLightTexture}
      darkTexture={starsDarkTexture}
      {...props}
    />
  );
}

function StarRedSurface(
  props: Omit<ThemedTextureSurfaceProps, "lightTexture" | "darkTexture">
) {
  return (
    <ThemedTextureSurface
      lightTexture={starsLightRedTexture}
      darkTexture={starsDarkRedTexture}
      overlayLightClass="bg-black/45"
      overlayDarkClass="bg-black/60"
      {...props}
    />
  );
}

function FloorSurface(
  props: Omit<ThemedTextureSurfaceProps, "lightTexture" | "darkTexture">
) {
  return (
    <ThemedTextureSurface
      lightTexture={floorLightTexture}
      darkTexture={floorDarkTexture}
      overlayLightClass="bg-black/20"
      overlayDarkClass="bg-black/20"
      ringClassName="ring-1 ring-white/10 shadow-[0_18px_44px_rgba(0,0,0,0.22)]"
      {...props}
    />
  );
}

function GoldSparkles() {
  return (
    <>
      <span
        className="students-sparkle"
        style={{ top: 14, right: 18, animationDelay: "0.1s" }}
        aria-hidden="true"
      />
      <span
        className="students-sparkle"
        style={{ top: 28, left: 24, width: 7, height: 7, animationDelay: "0.9s" }}
        aria-hidden="true"
      />
      <span
        className="students-sparkle"
        style={{ bottom: 22, right: 28, width: 6, height: 6, animationDelay: "1.5s" }}
        aria-hidden="true"
      />
      <span
        className="students-sparkle"
        style={{ bottom: 14, left: 16, width: 5, height: 5, animationDelay: "2.1s" }}
        aria-hidden="true"
      />
    </>
  );
}

type SpeechBubbleProps = {
  children: ReactNode;
  tail?: "left" | "right";
  className?: string;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function SpeechBubble({
  children,
  tail = "right",
  className,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: SpeechBubbleProps) {
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <FloorSurface className={cn("px-5 py-5 md:px-6 md:py-6", className)}>
        <GoldSparkles />

        <span
          className={cn(
            "absolute top-1/2 z-10 -translate-y-1/2 border-y-[16px] border-y-transparent",
            tail === "right"
              ? "-right-5 border-l-[28px] border-l-[#7a5734]"
              : "-left-5 border-r-[28px] border-r-[#7a5734]"
          )}
        />

        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/18 ring-1 ring-white/10">
            <Quote className="h-5 w-5 text-primary" />
          </div>

          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="סגירת בועה"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white ring-1 ring-white/10 transition hover:bg-black/50"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="rounded-[1.3rem] bg-black/10 px-4 py-3 backdrop-blur-[2px] dark:bg-black/12">
          <div className="text-base leading-8 text-foreground/95 md:text-lg">
            {children}
          </div>
        </div>
      </FloorSurface>
    </div>
  );
}

type FloatingPresenterProps = {
  visible: boolean;
  bubbleVisible: boolean;
  bubbleFading: boolean;
  text: string;
  speaking: boolean;
  onSpeak: () => void;
  onClose: () => void;
  onBubbleMouseEnter: () => void;
  onBubbleMouseLeave: () => void;
};

function FloatingPresenter({
  visible,
  bubbleVisible,
  bubbleFading,
  text,
  speaking,
  onSpeak,
  onClose,
  onBubbleMouseEnter,
  onBubbleMouseLeave,
}: FloatingPresenterProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-24 right-5 z-50 hidden transition-all duration-300 xl:block",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto flex items-end gap-4 transition-transform duration-300",
          bubbleVisible ? "-translate-x-6" : "translate-x-0"
        )}
      >
        <div
          className={cn(
            "transition-all",
            bubbleVisible
              ? bubbleFading
                ? "translate-y-2 opacity-0 [transition-duration:8000ms]"
                : "translate-y-0 opacity-100 duration-300"
              : "pointer-events-none translate-y-4 opacity-0 duration-300"
          )}
        >
          <SpeechBubble
            tail="right"
            onClose={onClose}
            className="max-w-[360px]"
            onMouseEnter={onBubbleMouseEnter}
            onMouseLeave={onBubbleMouseLeave}
          >
            <div className="students-glow-text text-right text-lg">“{text}”</div>
          </SpeechBubble>
        </div>

        <div className="flex flex-col items-center gap-3">
          <AudioIconButton speaking={speaking} onClick={onSpeak} />
          <img
            src={studentsPresenterMain}
            alt="מגישה מלווה"
            className="h-auto w-[120px] object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.26)]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default function Students() {
  const [openSmartSystem, setOpenSmartSystem] = useState(false);
  const [tIndex, setTIndex] = useState(0);
  const [activeOrbitId, setActiveOrbitId] = useState<OrbitItemId>("1");
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  const [showMiniPresenter, setShowMiniPresenter] = useState(false);
  const [floatingBubbleText, setFloatingBubbleText] = useState("");
  const [floatingBubbleVisible, setFloatingBubbleVisible] = useState(false);
  const [floatingBubbleFading, setFloatingBubbleFading] = useState(false);

  const testimonialPauseRef = useRef(false);
  const floatingFadeStartTimerRef = useRef<number | null>(null);
  const floatingHideTimerRef = useRef<number | null>(null);
  const floatingHoverSpeakTimerRef = useRef<number | null>(null);
  const floatingBubbleHoverRef = useRef(false);

  function stopSpeech() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeakingKey(null);
  }

  function speakText(key: string, text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "he-IL";
    utterance.rate = 0.96;
    utterance.pitch = 1;

    utterance.onend = () =>
      setSpeakingKey((current) => (current === key ? null : current));
    utterance.onerror = () =>
      setSpeakingKey((current) => (current === key ? null : current));

    setSpeakingKey(key);
    synth.speak(utterance);
  }

  function toggleSpeech(key: string, text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    if (speakingKey === key && synth.speaking) {
      stopSpeech();
      return;
    }

    speakText(key, text);
  }

  function clearFloatingAutoFadeTimers() {
    if (floatingFadeStartTimerRef.current) {
      window.clearTimeout(floatingFadeStartTimerRef.current);
      floatingFadeStartTimerRef.current = null;
    }

    if (floatingHideTimerRef.current) {
      window.clearTimeout(floatingHideTimerRef.current);
      floatingHideTimerRef.current = null;
    }
  }

  function clearFloatingBubbleTimers() {
    clearFloatingAutoFadeTimers();

    if (floatingHoverSpeakTimerRef.current) {
      window.clearTimeout(floatingHoverSpeakTimerRef.current);
      floatingHoverSpeakTimerRef.current = null;
    }
  }

  function scheduleFloatingBubbleFade() {
    if (floatingBubbleHoverRef.current) return;

    clearFloatingAutoFadeTimers();
    setFloatingBubbleFading(false);

    floatingFadeStartTimerRef.current = window.setTimeout(() => {
      setFloatingBubbleFading(true);
    }, 2000);

    floatingHideTimerRef.current = window.setTimeout(() => {
      setFloatingBubbleVisible(false);
      setFloatingBubbleFading(false);
    }, 10000);
  }

  function openFloatingBubble(text: string) {
    setFloatingBubbleText(text);
    setFloatingBubbleVisible(true);
    setFloatingBubbleFading(false);
    scheduleFloatingBubbleFade();
  }

  function closeFloatingBubble() {
    clearFloatingBubbleTimers();
    stopSpeech();
    setFloatingBubbleVisible(false);
    setFloatingBubbleFading(false);
  }

  function handleFloatingBubbleMouseEnter(currentText: string) {
    floatingBubbleHoverRef.current = true;
    clearFloatingAutoFadeTimers();
    setFloatingBubbleFading(false);

    if (floatingHoverSpeakTimerRef.current) {
      window.clearTimeout(floatingHoverSpeakTimerRef.current);
    }

    floatingHoverSpeakTimerRef.current = window.setTimeout(() => {
      speakText("floating-presenter-auto", currentText);
    }, 2000);
  }

  function handleFloatingBubbleMouseLeave() {
    floatingBubbleHoverRef.current = false;

    if (floatingHoverSpeakTimerRef.current) {
      window.clearTimeout(floatingHoverSpeakTimerRef.current);
      floatingHoverSpeakTimerRef.current = null;
    }

    scheduleFloatingBubbleFade();
  }

  useEffect(() => {
    return () => {
      stopSpeech();
      clearFloatingBubbleTimers();
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (testimonialPauseRef.current) return;
      setTIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8500);

    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    function onScroll() {
      setShowMiniPresenter(window.scrollY > 540);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (showMiniPresenter && !floatingBubbleText) {
      openFloatingBubble(FLOATING_BUBBLES_BY_SECTION["studies-section"]);
    }
  }, [showMiniPresenter, floatingBubbleText]);

  useEffect(() => {
    const sectionIds = Object.keys(FLOATING_BUBBLES_BY_SECTION);

    const nodes = sectionIds
      .map((id) => {
        const el = document.getElementById(id);
        return el ? { id, el } : null;
      })
      .filter(Boolean) as Array<{ id: string; el: HTMLElement }>;

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const matched = nodes.find((item) => item.el === visible.target);
        if (!matched) return;

        const text = FLOATING_BUBBLES_BY_SECTION[matched.id];
        if (text && showMiniPresenter) {
          openFloatingBubble(text);
        }
      },
      {
        threshold: 0.34,
        rootMargin: "-8% 0px -18% 0px",
      }
    );

    nodes.forEach((item) => observer.observe(item.el));
    return () => observer.disconnect();
  }, [showMiniPresenter]);

  function scrollToSection(sectionId?: string, orbitId?: OrbitItemId) {
    if (orbitId) setActiveOrbitId(orbitId);
    if (!sectionId) return;

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  useEffect(() => {
    const elements = STUDENTS_SECTION_ORBIT_MAP
      .map((item) => {
        const el = document.getElementById(item.sectionId);
        return el ? { ...item, el } : null;
      })
      .filter(Boolean) as Array<{
      sectionId: string;
      orbitId: OrbitItemId;
      el: HTMLElement;
    }>;

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const matched = elements.find(({ el }) => el === visible.target);
        if (matched) {
          setActiveOrbitId(matched.orbitId);
        }
      },
      {
        threshold: [0.15, 0.35, 0.6],
        rootMargin: "-28% 0px -42% 0px",
      }
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const currentTestimonial = TESTIMONIALS[tIndex] ?? TESTIMONIALS[0];
  const currentFloatingText =
    floatingBubbleText || FLOATING_BUBBLES_BY_SECTION["studies-section"];

  function handleOrbitItemClick(item: OrbitItemConfig) {
    scrollToSection(item.targetSectionId, item.id);
  }

  return (
    <InnerPageLayout
      title="תלמידות"
      description="מסלול מוסיקלי יסודי, אנושי ומסודר לתלמידות — עם שיעור, תרגול, רצף ומערכת תומכת."
    >
      <main dir="rtl" className="pb-24">
        <style>{`
          @keyframes studentsFadeIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes studentsFlipIn {
            from {
              opacity: 0;
              transform: perspective(900px) rotateY(14deg) translateY(12px);
            }
            to {
              opacity: 1;
              transform: perspective(900px) rotateY(0deg) translateY(0);
            }
          }

          @keyframes studentsTicker {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          @keyframes studentsTwinkle {
            0%, 100% {
              opacity: 0.25;
              transform: scale(0.8) rotate(0deg);
            }
            50% {
              opacity: 1;
              transform: scale(1.25) rotate(20deg);
            }
          }

          @keyframes studentsGradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .students-fade-in {
            animation: studentsFadeIn 420ms ease-out;
          }

          .students-flip-in {
            animation: studentsFlipIn 650ms cubic-bezier(0.19, 1, 0.22, 1);
            transform-style: preserve-3d;
          }

          .students-marquee-track {
            width: max-content;
            animation: studentsTicker 82s linear infinite;
          }

          .students-glow-text {
            text-shadow:
              0 0 10px rgba(243, 199, 115, 0.18),
              0 4px 20px rgba(0, 0, 0, 0.34);
          }

          .students-section-title {
            color: rgba(246, 214, 150, 0.98);
            text-shadow:
              0 0 10px rgba(240, 198, 116, 0.20),
              0 2px 18px rgba(0, 0, 0, 0.35);
            transition:
              transform 220ms ease,
              text-shadow 220ms ease,
              color 220ms ease;
          }

          .students-section-title:hover {
            transform: translateY(-1px);
            color: #f7dca8;
            text-shadow:
              0 0 18px rgba(240, 198, 116, 0.30),
              0 6px 24px rgba(0, 0, 0, 0.38);
          }

          .students-gold-frame {
            position: relative;
          }

          .students-gold-frame::before {
            content: "";
            position: absolute;
            inset: 0;
            padding: 1px;
            border-radius: inherit;
            background: linear-gradient(135deg, rgba(255,236,190,0.8), rgba(219,171,82,0.55), rgba(255,236,190,0.8));
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
          }

          .students-sparkle {
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            background: radial-gradient(circle, rgba(255,245,212,0.98) 0%, rgba(249,214,135,0.88) 34%, rgba(255,245,212,0) 72%);
            box-shadow: 0 0 10px rgba(255, 231, 170, 0.7);
            animation: studentsTwinkle 2.8s ease-in-out infinite;
            pointer-events: none;
          }

          .students-gradient-btn {
            background: linear-gradient(135deg, rgba(216,160,72,0.96), rgba(167,29,49,0.96), rgba(233,191,117,0.96));
            background-size: 200% 200%;
            animation: studentsGradientShift 8s ease infinite;
            box-shadow: 0 14px 28px rgba(122, 54, 20, 0.28);
          }
        `}</style>

        <OrbitPageShell
          pageId="students"
          onOrbitItemClick={handleOrbitItemClick}
          controlledActiveItemId={activeOrbitId}
          disableStickyGuide
        >
          <div className="pb-16">
            <div className="mx-auto max-w-6xl space-y-10 px-6 md:space-y-14">
              <AppearOnScroll delay={18}>
                <section className="-mt-1 flex justify-center">
                  <Button asChild size="lg" className="h-12 rounded-2xl px-7 text-sm font-semibold md:text-base">
                    <a href={CONTACT_STUDENTS_HREF}>לבדיקת התאמה למסלול</a>
                  </Button>
                </section>
              </AppearOnScroll>

              <AppearOnScroll delay={24}>
                <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden">
                  <StarRedSurface roundedNone ringClassName="shadow-none" className="py-3 md:py-4">
                    <div className="students-marquee-track flex items-center gap-5 px-4 md:gap-6">
                      {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map(
                        (item, index) => (
                          <div
                            key={`${item.key}-${index}`}
                            className="shrink-0 rounded-full bg-black/24 px-5 py-2.5 text-sm font-semibold text-foreground/95 ring-1 ring-white/10 backdrop-blur-sm md:px-7 md:py-3 md:text-lg"
                          >
                            <span className="students-glow-text font-black text-primary">
                              {item.name}
                            </span>
                            <span className="mx-3 text-foreground/45">—</span>
                            <span>{item.quote}</span>
                          </div>
                        )
                      )}
                    </div>
                  </StarRedSurface>
                </section>
              </AppearOnScroll>

              <AppearOnScroll delay={54}>
                <section
                  id="track-section"
                  className="scroll-mt-28 pt-2"
                  onMouseEnter={() => setActiveOrbitId("1")}
                  onMouseLeave={() => {
                    testimonialPauseRef.current = false;
                  }}
                >
                  <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium ring-1 ring-primary/15 md:text-sm">
                      <Quote className="h-4 w-4 text-primary" />
                      מה אומרות התלמידות
                    </div>

                    <h2 className="students-section-title mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                      שיעור שהופך לדרך,
                      <span className="mt-2 block text-foreground">ולא לעוד מפגש חולף</span>
                    </h2>

                    <p className="students-glow-text mt-4 text-base leading-relaxed text-foreground/82 md:text-xl">
                      ההמלצות לא נועדו רק להרשים — אלא להמחיש איך נראית למידה שיש בה רצף,
                      בהירות, יחס אישי ועומק מקצועי גם יחד.
                    </p>
                  </div>

                  <div className="mt-10 grid items-center gap-8 xl:grid-cols-[1.08fr_420px_0.92fr]">
                    <StarRedSurface className="students-gold-frame overflow-hidden px-6 py-6 md:px-8 md:py-8">
                      <GoldSparkles />
                      <div
                        className="students-flip-in text-right"
                        key={currentTestimonial.key}
                        onMouseEnter={() => {
                          testimonialPauseRef.current = true;
                        }}
                        onMouseLeave={() => {
                          testimonialPauseRef.current = false;
                        }}
                      >
                        <div className="students-glow-text text-2xl font-semibold leading-relaxed md:text-[2rem]">
                          “{currentTestimonial.quote}”
                        </div>

                        <div className="mt-6 text-base text-foreground/84 md:text-lg">
                          <span className="font-black text-primary">
                            {currentTestimonial.name}
                          </span>
                          {currentTestimonial.context && (
                            <>
                              <span className="mx-2 opacity-50">|</span>
                              <span>{currentTestimonial.context}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          {TESTIMONIALS.map((item, i) => (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => setTIndex(i)}
                              className={cn(
                                "h-3.5 w-3.5 rounded-full transition-all",
                                i === tIndex
                                  ? "scale-110 bg-primary shadow-[0_0_10px_rgba(230,191,110,0.65)]"
                                  : "bg-transparent ring-1 ring-primary/40 hover:bg-primary/30"
                              )}
                              aria-label={`המלצה ${i + 1}`}
                            />
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="secondary"
                            className="h-12 rounded-2xl px-5 text-sm font-semibold md:text-base"
                            onClick={() =>
                              setTIndex(
                                (prev) =>
                                  (prev - 1 + TESTIMONIALS.length) %
                                  TESTIMONIALS.length
                              )
                            }
                          >
                            <ChevronRight className="ml-2 h-5 w-5" />
                            הקודם
                          </Button>

                          <Button
                            className="h-12 rounded-2xl px-5 text-sm font-semibold md:text-base"
                            onClick={() =>
                              setTIndex((prev) => (prev + 1) % TESTIMONIALS.length)
                            }
                          >
                            הבא
                            <ChevronLeft className="mr-2 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </StarRedSurface>

                    <div className="flex justify-center">
                      <img
                        src={studentsTestimonialsAnnouncer}
                        alt="סמל דף התלמידות"
                        className="h-auto w-full max-w-[320px] object-contain drop-shadow-[0_30px_68px_rgba(0,0,0,0.34)] md:max-w-[420px] xl:max-w-[500px]"
                        loading="lazy"
                      />
                    </div>

                    <StarSurface className="overflow-hidden px-6 py-6 md:px-8 md:py-8">
                      <div className="space-y-4 text-right">
                        <div className="students-section-title text-2xl font-black leading-tight md:text-4xl">
                          מסלול מקצועי, אנושי
                          <span className="mt-2 block text-foreground">ועם רף ברור</span>
                        </div>

                        <ul className="space-y-2.5 text-base leading-relaxed text-foreground/92 md:text-lg">
                          <li>לתלמידות שמוכנות לתהליך ולא רק להתנסות.</li>
                          <li>למי שמחפשת ליווי, סדר ומסגרת מחזיקה.</li>
                          <li>למי שחשוב לה יחס אישי יחד עם דרישה מקצועית.</li>
                        </ul>

                        <Button asChild className="h-12 rounded-2xl px-5 text-sm font-semibold md:text-base">
                          <a href={CONTACT_STUDENTS_HREF}>
                            בדיקת התאמה למסלול
                            <ArrowLeft className="mr-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </StarSurface>
                  </div>
                </section>
              </AppearOnScroll>

              <AppearOnScroll delay={92}>
                <section className="pt-1">
                  <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium ring-1 ring-primary/15 md:text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      כך נראה תהליך נכון
                    </div>

                    <h2 className="students-section-title mt-4 text-3xl font-black leading-tight md:text-5xl">
                      צורת העבודה שלי מתאימה למי שמוכנה
                      <span className="mt-2 block text-foreground">להתמסר לתהליך אמיתי</span>
                    </h2>
                  </div>

                  <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_1.02fr]">
                    <div className="flex items-end justify-center gap-4">
                      <div className="flex flex-col items-center gap-4">
                        <AudioIconButton
                          speaking={speakingKey === "hero-piano"}
                          onClick={() => toggleSpeech("hero-piano", HERO_PIANO_QUOTE)}
                        />

                        <img
                          src={studentsPresenterMain}
                          alt="סמל דף התלמידות"
                          className="h-auto w-full max-w-[420px] object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.30)] md:max-w-[560px]"
                          loading="eager"
                        />
                      </div>

                      <SpeechBubble tail="left" className="max-w-[520px] self-center">
                        <div className="students-glow-text text-right text-lg md:text-xl">
                          “{HERO_PIANO_QUOTE}”
                        </div>
                      </SpeechBubble>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <StarSurface className="px-5 py-5 md:px-6 md:py-6">
                        <div className="text-base font-bold md:text-lg">מה חשוב לי במיוחד</div>
                        <div className="mt-2 text-sm leading-relaxed text-foreground/82 md:text-base">
                          עומק, עקביות, שקט מקצועי ובהירות שמאפשרת לתלמידה להתקדם מתוך ביטחון.
                        </div>
                      </StarSurface>

                      <StarSurface className="px-5 py-5 md:px-6 md:py-6">
                        <div className="text-base font-bold md:text-lg">מה יוצא מזה בפועל</div>
                        <div className="mt-2 text-sm leading-relaxed text-foreground/82 md:text-base">
                          מסלול שמחזיק לאורך זמן, עם רמה, מסגרת, ליווי ודרך עבודה מסודרת.
                        </div>
                      </StarSurface>
                    </div>
                  </div>
                </section>
              </AppearOnScroll>

              <AppearOnScroll delay={110}>
                <section
                  id="studies-section"
                  className="scroll-mt-28 pt-2"
                  onMouseEnter={() => setActiveOrbitId("2")}
                >
                  <div className="mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium ring-1 ring-primary/15 md:text-sm">
                      <Music2 className="h-4 w-4 text-primary" />
                      מה לומדים כאן
                    </div>

                    <h2 className="students-section-title mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
                      תחומי הלימוד
                    </h2>

                    <div className="mt-4 text-base leading-relaxed text-muted-foreground md:text-xl">
                      השיעורים נבנים מתוך עומק מקצועי, התאמה אישית ומסלול התקדמות ברור.
                      התוכן ממורכז ונקי — כדי שהעין תבין מיד מה מרכזי, ומה משלים את הדרך.
                    </div>
                  </div>

                  <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.02fr_0.98fr]">
                    <div className="space-y-6">
                      <img
                        src={studentsLearningTouch}
                        alt="חוויית למידה ונגינה"
                        className="h-auto min-h-[360px] w-full rounded-[2.25rem] object-cover object-center shadow-[0_22px_60px_rgba(0,0,0,0.18)]"
                        loading="lazy"
                      />

                      <StarSurface className="px-6 py-6 md:px-7 md:py-7">
                        <div className="students-section-title text-2xl font-black md:text-3xl">
                          מקצועות משלימים
                        </div>

                        <div className="mt-3 text-base leading-relaxed text-foreground/82 md:text-lg">
                          תיאוריה, קריאת תווים, סולפז׳, הקשבה, קצב ופיתוח שמיעה —
                          שכבה שמעמיקה את היציבות ואת ההבנה המוסיקלית של התלמידה.
                        </div>

                        <div className="mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start">
                          {SUPPORT_STUDIES.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-black/18 px-3.5 py-2 text-sm ring-1 ring-white/10 md:text-base"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </StarSurface>
                    </div>

                    <div className="grid items-start gap-5 md:grid-cols-2">
                      {PRIMARY_STUDIES.map(({ key, title, subtitle, Icon, bullets }) => (
                        <StarSurface
                          key={key}
                          className="flex h-full flex-col px-6 py-6 md:px-7 md:py-7"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="students-section-title text-2xl font-black md:text-3xl">
                                {title}
                              </div>
                              <div className="mt-2 text-base text-foreground/80">
                                {subtitle}
                              </div>
                            </div>

                            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                              <Icon className="h-7 w-7 text-primary" />
                            </span>
                          </div>

                          <ul className="mt-6 space-y-3">
                            {bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-3 text-base">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                <span className="leading-relaxed text-foreground/82">
                                  {bullet}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </StarSurface>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <a href={EDUCATIONAL_ORCHESTRA_HREF} className="block">
                      <div className="relative overflow-hidden rounded-[2.25rem] px-8 py-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:px-10 md:py-10">
                        <div
                          className="absolute inset-0 bg-cover bg-center opacity-[0.16] dark:hidden"
                          style={{ backgroundImage: `url(${starsLightTexture})` }}
                        />
                        <div
                          className="absolute inset-0 hidden bg-cover bg-center opacity-[0.18] dark:block"
                          style={{ backgroundImage: `url(${starsDarkTexture})` }}
                        />
                        <div className="absolute inset-0 bg-black/78" />
                        <GoldSparkles />

                        <div className="relative">
                          <div className="students-section-title text-3xl font-black md:text-4xl">
                            תזמורות לימודיות
                          </div>
                          <div className="students-glow-text mx-auto mt-3 max-w-3xl text-lg leading-relaxed text-foreground/92 md:text-2xl">
                            מסגרת שמפתחת הקשבה, אחריות, קצב ויכולת להשתלב בתוך מרקם מוסיקלי.
                          </div>
                          <div className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-primary md:text-lg">
                            לעמוד התזמורות
                            <ArrowLeft className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </section>
              </AppearOnScroll>

              <AppearOnScroll delay={130}>
                <section
                  id="belief-section"
                  className="scroll-mt-28 pt-2"
                  onMouseEnter={() => setActiveOrbitId("3")}
                >
                  <div
                    className="relative overflow-hidden rounded-[2.4rem] shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
                    style={{
                      backgroundImage: `url(${studentsStageAtmosphereWide})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="relative grid items-start gap-8 px-6 py-8 md:px-10 md:py-12 lg:grid-cols-[1.02fr_0.98fr]">
                      <div className="space-y-5 lg:order-2">
                        <div className="w-full max-w-[640px] rounded-[1.9rem] bg-black/42 px-6 py-6 shadow-[0_16px_40px_rgba(0,0,0,0.30)] backdrop-blur-sm md:px-8 md:py-8">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 ring-1 ring-primary/20">
                              <Quote className="h-6 w-6 text-primary" />
                            </span>
                            <div className="text-sm font-medium text-foreground/82 md:text-base">
                              הדרך שלי
                            </div>
                          </div>

                          <div className="students-section-title mt-6 text-3xl font-black leading-tight md:text-5xl">
                            לא עבודה טכנית,
                            <span className="mt-2 block text-foreground">אלא חתימת דרך</span>
                          </div>

                          <div className="students-glow-text mt-5 text-base leading-relaxed text-foreground/90 md:text-lg">
                            כאן הדגש הוא על קו ברור, רמת ציפייה גבוהה והחזקת תהליך לאורך זמן —
                            עם רקע תומך מאחורי הטקסט בלבד, כדי לשמור על קריאות ונוכחות בלי לחנוק את התמונה.
                          </div>
                        </div>

                        <div className="grid gap-3">
                          {BELIEF_LINES.map((belief, idx) => (
                            <div
                              key={belief}
                              className="flex items-center gap-4 rounded-2xl bg-black/34 px-5 py-4 shadow-[0_14px_28px_rgba(0,0,0,0.22)] backdrop-blur-sm"
                            >
                              <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/16 text-sm font-bold text-primary ring-1 ring-primary/18">
                                {idx + 1}
                              </div>
                              <div className="text-sm leading-relaxed text-foreground/90 md:text-base">
                                {belief}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="min-h-[500px] lg:order-1" />
                    </div>
                  </div>
                </section>
              </AppearOnScroll>

              <AppearOnScroll delay={150}>
                <section
                  id="process-section"
                  className="scroll-mt-28 pt-2"
                  onMouseEnter={() => setActiveOrbitId("4")}
                >
                  <div className="grid items-start gap-8 lg:grid-cols-[0.96fr_1.04fr]">
                    <img
                      src={studentsStudyMaterials}
                      alt="חומרי לימוד וסביבת עבודה"
                      className="h-auto min-h-[380px] w-full rounded-[2.25rem] object-cover object-center shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
                      loading="lazy"
                    />

                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium ring-1 ring-primary/15 md:text-sm">
                        <ClipboardList className="h-4 w-4 text-primary" />
                        איך זה עובד בפועל
                      </div>

                      <h2 className="students-section-title mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
                        שיעור, תרגול, רצף ומעקב
                      </h2>

                      <div className="students-glow-text mt-4 max-w-3xl text-base leading-relaxed text-foreground/82 md:text-xl">
                        כאן לא לומדים רק בתוך השיעור. השיעור נותן כיוון ברור,
                        והתהליך ממשיך בין המפגשים — עם מסגרת, חומרים, משימות ודרך עבודה שמחזיקה את ההתקדמות.
                      </div>

                      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {HOW_IT_WORKS.map(({ key, title, text, Icon }) => (
                          <StarSurface key={key} className="px-5 py-5 md:px-6 md:py-6">
                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                              <Icon className="h-6 w-6 text-primary" />
                            </span>

                            <div className="students-section-title mt-4 text-lg font-black md:text-xl">
                              {title}
                            </div>
                            <div className="mt-2 text-sm leading-relaxed text-foreground/82 md:text-base">
                              {text}
                            </div>
                          </StarSurface>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </AppearOnScroll>

              <AppearOnScroll delay={170}>
                <section
                  id="system-section"
                  className="scroll-mt-28 pt-2"
                  onMouseEnter={() => setActiveOrbitId("5")}
                >
                  <div className="grid items-start gap-8 lg:grid-cols-[1.04fr_0.96fr]">
                    <div className="space-y-4">
                      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium ring-1 ring-primary/15 md:text-sm">
                        <Smartphone className="h-4 w-4 text-primary" />
                        מערכת התלמידות
                      </div>

                      <h2 className="students-section-title text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                        מערכת שממשיכה את הלמידה
                        <span className="mt-2 block text-foreground">גם בין השיעורים</span>
                      </h2>

                      <div className="students-glow-text max-w-3xl text-base leading-relaxed text-foreground/82 md:text-xl">
                        זה האזור הנכון להפנות ממנו לדמו ולכניסה. כאן כבר מבינים מהי המעטפת,
                        ולכן אפשר לראות איך זה נראה בפועל — בלי להעמיס על ההחלטה.
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        {APP_FEATURES.map(({ key, title, text, Icon }) => (
                          <div
                            key={key}
                            className="flex items-start gap-4 rounded-2xl bg-card/62 px-4 py-4 ring-1 ring-border/70"
                          >
                            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                              <Icon className="h-5 w-5 text-primary" />
                            </span>

                            <span className="min-w-0">
                              <span className="students-section-title block text-sm font-black md:text-base">
                                {title}
                              </span>
                              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground md:text-base">
                                {text}
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>

                      <div>
                        <Button
                          type="button"
                          variant="secondary"
                          className="h-12 rounded-2xl px-6 text-sm font-semibold md:text-base"
                          onClick={() => setOpenSmartSystem(true)}
                        >
                          מה כוללת המערכת
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <img
                        src={studentsDemoSystemPreview}
                        alt="תצוגה מקדימה של מערכת התלמידות"
                        className="h-auto min-h-[420px] w-full rounded-[2.25rem] object-cover object-center shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
                        loading="lazy"
                      />

                      <div className="grid gap-3 sm:grid-cols-2">
                        <a
                          href={STUDENTS_DEMO_HREF}
                          title="מעבר לדף ההדגמה של המערכת, כולל צילומי מסך והסברים חזותיים."
                          className="students-gradient-btn students-gold-frame relative inline-flex min-h-[66px] items-center justify-center rounded-[1.6rem] px-6 py-4 text-center text-base font-black text-white transition-transform hover:-translate-y-[2px]"
                        >
                          <GoldSparkles />
                          <span>להדגמה</span>
                        </a>

                        <a
                          href={STUDENTS_APP_HREF}
                          target="_blank"
                          rel="noreferrer"
                          title="מעבר ישיר לתוכנת התלמידות הפעילה."
                          className="students-gradient-btn students-gold-frame relative inline-flex min-h-[66px] items-center justify-center rounded-[1.6rem] px-6 py-4 text-center text-base font-black text-white transition-transform hover:-translate-y-[2px]"
                        >
                          <GoldSparkles />
                          <span>לכניסה</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </AppearOnScroll>

              <AppearOnScroll delay={190}>
                <section>
                  <StarRedSurface className="overflow-hidden px-5 py-5 md:px-7 md:py-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-center md:gap-x-10">
                      {NUMBERS.map((item) => (
                        <div key={item.label}>
                          <div className="students-section-title inline-block text-2xl font-black md:text-4xl">
                            {item.value}
                          </div>
                          <div className="mt-1 text-xs text-foreground/78 md:text-sm">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </StarRedSurface>
                </section>
              </AppearOnScroll>

              <AppearOnScroll delay={220}>
                <section className="flex justify-center">
                  <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] bg-card/72 px-6 py-8 shadow-soft ring-1 ring-border backdrop-blur-sm md:px-10 md:py-10">
                    <div className="text-center">
                      <div className="students-section-title text-2xl font-black leading-tight md:text-4xl">
                        יש לך שאלות?
                      </div>

                      <div className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-lg">
                        אפשר לפנות דרך דף צור קשר, לראות את הדמו של המערכת,
                        להיכנס ישירות לתוכנה, או להכיר גם את צד ההוראה שמאחורי הדרך הזו.
                      </div>

                      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                        <Button asChild size="lg" className="h-12 rounded-2xl px-7 text-sm font-semibold md:text-base">
                          <a href={CONTACT_STUDENTS_HREF}>צור קשר</a>
                        </Button>

                        <Button asChild variant="secondary" size="lg" className="h-12 rounded-2xl px-7 text-sm font-semibold md:text-base">
                          <a href={STUDENTS_DEMO_HREF}>להדגמה</a>
                        </Button>

                        <Button asChild variant="secondary" size="lg" className="h-12 rounded-2xl px-7 text-sm font-semibold md:text-base">
                          <a href={STUDENTS_APP_HREF} target="_blank" rel="noreferrer">
                            לכניסה
                          </a>
                        </Button>

                        <Button asChild variant="secondary" size="lg" className="h-12 rounded-2xl px-7 text-sm font-semibold md:text-base">
                          <a href={ABOUT_TEACHING_HREF}>להכיר אותי</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>
              </AppearOnScroll>
            </div>
          </div>
        </OrbitPageShell>

        <FloatingPresenter
          visible={showMiniPresenter}
          bubbleVisible={floatingBubbleVisible}
          bubbleFading={floatingBubbleFading}
          text={currentFloatingText}
          speaking={speakingKey === "floating-presenter" || speakingKey === "floating-presenter-auto"}
          onSpeak={() => toggleSpeech("floating-presenter", currentFloatingText)}
          onClose={closeFloatingBubble}
          onBubbleMouseEnter={() => handleFloatingBubbleMouseEnter(currentFloatingText)}
          onBubbleMouseLeave={handleFloatingBubbleMouseLeave}
        />

        <Dialog open={openSmartSystem} onOpenChange={setOpenSmartSystem}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>מה כוללת מערכת התלמידות</DialogTitle>
              <DialogDescription>
                מעטפת שממשיכה את הלמידה גם בין השיעורים, ומחזיקה את התהליך בצורה מסודרת וברורה.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 pt-2">
              {APP_FEATURES.map(({ key, title, text, Icon }) => (
                <div
                  key={key}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card/60 px-4 py-4"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/15">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold md:text-base">{title}</div>
                    <div className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button asChild className="rounded-2xl">
                <a href={STUDENTS_APP_HREF} target="_blank" rel="noreferrer">
                  כניסה לתוכנה
                </a>
              </Button>

              <Button asChild variant="secondary" className="rounded-2xl">
                <a href={STUDENTS_DEMO_HREF}>לצפייה בדמו</a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </InnerPageLayout>
  );
}
