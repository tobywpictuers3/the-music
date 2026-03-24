import { useEffect, useState } from "react";
import { GUIDE_PRESENTER } from "@/config/homepage";
import presenterImg from "@/assets/homepage/presenter/presenter.png";

/**
 * GuidePresenter
 *
 * מה הקומפוננטה עושה:
 * 1. בתחילת הדף — מופיעה גדולה מתחת לבמה
 * 2. אחרי שעוברים את ההירו — עוברת לפינה
 * 3. בלחיצה על המגיש בפינה — נפתחת שוב בועת העזרה
 *
 * חשוב:
 * ההפעלה של floating מבוססת על ההירו (#home-hero),
 * ולא על הסקשן של המגיש עצמו.
 */
export default function GuidePresenter() {
  const [isFloating, setIsFloating] = useState(false);
  const [bubbleOpen, setBubbleOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home-hero");

      /**
       * ברירת מחדל אם משום מה ההירו לא נמצא:
       * נעבור ל-floating אחרי בערך מסך אחד
       */
      let threshold = window.innerHeight * 0.85;

      /**
       * אם ההירו קיים:
       * כל עוד המשתמש עדיין "בתוך" ההירו — המגיש לא יצוף
       * כשהוא עבר אותו — המגיש עובר לפינה
       */
      if (hero) {
        threshold = Math.max(hero.offsetHeight - 120, 260);
      }

      const shouldFloat = window.scrollY > threshold;
      setIsFloating(shouldFloat);

      /**
       * כשחוזרים לראש העמוד:
       * סוגרים את הבועה הצפה
       */
      if (!shouldFloat) {
        setBubbleOpen(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* ======================================================
          גרסה גדולה — מתחת לבמה
      ====================================================== */}
      <section
        id="guide-presenter"
        className="relative z-10 px-4 py-12 md:px-8 md:py-16"
        dir="rtl"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          {/* ==================================================
              גודל המגיש במצב ההתחלתי
              שליטה כאן:
              w-[190px] / md:w-[250px] / lg:w-[290px]
          ================================================== */}
          <img
            src={presenterImg}
            alt="טובי — המדריך שלכם"
            className="w-[190px] drop-shadow-[0_18px_35px_rgba(0,0,0,0.14)] md:w-[250px] lg:w-[290px]"
          />

          {/* ==================================================
              בועת הדיבור הגדולה
          ================================================== */}
          <div className="relative max-w-3xl rounded-[30px] border border-border bg-card p-6 text-card-foreground shadow-lg md:p-8">
            {/* זנב הבועה */}
            <div className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 border-l border-t border-border bg-card" />

            {/* טקסט הבועה */}
            <p className="relative z-10 text-base leading-8 md:text-lg">
              {GUIDE_PRESENTER.welcomeText}
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          גרסה צפה — בפינה
          ברגע שעברנו את ההירו
      ====================================================== */}
      {isFloating && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 md:bottom-6 md:right-6">
          {bubbleOpen && (
            <div
              className="relative mb-2 max-w-[320px] rounded-2xl border border-border bg-card p-4 text-sm leading-7 text-card-foreground shadow-xl"
              dir="rtl"
            >
              {/* כפתור סגירה */}
              <button
                onClick={() => setBubbleOpen(false)}
                className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                aria-label="סגור"
              >
                ✕
              </button>

              {/* זנב הבועה הקטנה */}
              <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-r border-b border-border bg-card" />

              <p>{GUIDE_PRESENTER.welcomeText}</p>
            </div>
          )}

          {/* ==================================================
              כפתור המגיש הצף
              שינוי גודל כאן:
              h-16 w-16
          ================================================== */}
          <button
            onClick={() => setBubbleOpen((prev) => !prev)}
            className="group relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/40 bg-card shadow-xl transition hover:scale-110"
            aria-label={GUIDE_PRESENTER.floatingLabel}
          >
            <img
              src={presenterImg}
              alt=""
              className="h-full w-full object-cover object-top"
            />
          </button>

          {/* טקסט מתחת למגיש הצף */}
          <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground shadow backdrop-blur">
            {GUIDE_PRESENTER.floatingLabel}
          </span>
        </div>
      )}
    </>
  );
}
