import React, { useEffect, useMemo, useRef, useState } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import InnerPageOrbitHero from "@/components/brand/InnerPageOrbitHero";
import AppearOnScroll from "@/components/AppearOnScroll";
import { useToast } from "@/hooks/use-toast";
import {
  contactFloatingMessages,
  contactOrbitItems,
  contactPresenterAssets,
} from "@/content/orbit/contactOrbit";

type TopicKey =
  | "lessons_private"
  | "performing"
  | "workshops"
  | "orchestra_production"
  | "orchestra_management"
  | "collaboration"
  | "media_pr"
  | "other";

const Contact = () => {
  const { toast } = useToast();
  const [activeOrbitId, setActiveOrbitId] = useState<string>("form");

  const topics = useMemo(
    () =>
      [
        { key: "lessons_private", label: "שיעורים פרטיים" },
        { key: "performing", label: "הופעה" },
        { key: "workshops", label: "סדנאות" },
        { key: "orchestra_production", label: "הפקת תזמורת" },
        { key: "orchestra_management", label: "ניהול תזמורת קיימת" },
        { key: "collaboration", label: "שיתופי פעולה" },
        { key: "media_pr", label: 'מדיה / יח״צ' },
        { key: "other", label: "אחר" },
      ] as const,
    []
  );

  const [topicOpen, setTopicOpen] = useState(false);
  const formTopRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState({
    topics: [] as TopicKey[],
    otherTopic: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    detailsByTopic: {} as Partial<Record<TopicKey, string>>,
    newsletterOptIn: true,
  });

  const didPrefillRef = useRef(false);
  useEffect(() => {
    if (didPrefillRef.current) return;
    try {
      const sp = new URLSearchParams(window.location.search);
      const from = sp.get("from");
      const topicParam = sp.get("topic");
      const ref = document.referrer || "";
      const fromStudents = from === "students" || ref.includes("/students");

      let preTopic: TopicKey | null = null;
      if (topicParam && topics.some((t) => t.key === topicParam)) {
        preTopic = topicParam as TopicKey;
      } else if (fromStudents) {
        preTopic = "lessons_private";
      }

      if (preTopic) {
        setForm((prev) => {
          if (prev.topics.includes(preTopic!)) return prev;
          return {
            ...prev,
            topics: [preTopic!],
            detailsByTopic: {
              ...prev.detailsByTopic,
              [preTopic!]: prev.detailsByTopic[preTopic!] ?? "",
            },
          };
        });
        if (fromStudents) {
          window.setTimeout(
            () => formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
            140
          );
        }
      }
      didPrefillRef.current = true;
    } catch {
      // ignore
    }
  }, [topics]);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [flash, setFlash] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasOther = form.topics.includes("other");
  const topicsChosen = form.topics.length > 0;
  const requiredPersonalFilled =
    form.firstName.trim() && form.lastName.trim() && form.email.trim();
  const detailsStageEnabled = topicsChosen && !!requiredPersonalFilled;

  const displayTopicLabel = (k: TopicKey) =>
    topics.find((x) => x.key === k)?.label ?? k;

  const pulseField = (name: string) => {
    setFlash((p) => ({ ...p, [name]: true }));
    setTimeout(() => setFlash((p) => ({ ...p, [name]: false })), 650);
  };

  const markTouched = (name: string) =>
    setTouched((p) => ({ ...p, [name]: true }));

  const isEmailValid = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const toggleTopic = (key: TopicKey) => {
    setForm((prev) => {
      const exists = prev.topics.includes(key);
      const nextTopics = exists
        ? prev.topics.filter((t) => t !== key)
        : [...prev.topics, key];
      const nextDetails = { ...prev.detailsByTopic };
      if (!nextTopics.includes(key)) delete nextDetails[key];
      return {
        ...prev,
        topics: nextTopics,
        otherTopic: nextTopics.includes("other") ? prev.otherTopic : "",
        detailsByTopic: nextDetails,
      };
    });
  };

  const setField = (name: string, value: any) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const setTopicDetails = (key: TopicKey, value: string) =>
    setForm((prev) => ({
      ...prev,
      detailsByTopic: { ...prev.detailsByTopic, [key]: value },
    }));

  const topicPrompt = (key: TopicKey) => {
    const prompts: Record<
      TopicKey,
      { title: string; hint: string; placeholder: string }
    > = {
      lessons_private: {
        title: "שיעורים פרטיים",
        hint: "מוזמנות לכתוב מה תרצו ללמוד (חליל צד / פסנתר קלאסי), גיל, רקע קודם וכל פרט שיכול לעזור לי להבין את הצורך.",
        placeholder: "כתבו כאן את הפרטים שנראים לכם רלוונטיים…",
      },
      performing: {
        title: "הופעה",
        hint: "מוזמנים לציין תאריך, סוג אירוע/מופע, סגנון, משך, מיקום וצרכים טכניים.",
        placeholder: "כתבו כאן… אפשר להוסיף כל פרט נוסף.",
      },
      workshops: {
        title: "סדנאות",
        hint: "כתבו נושא, קהל יעד, משך רצוי ומה תרצו שהמשתתפים יצאו איתו בסוף.",
        placeholder: "כתבו כאן… אפשר להוסיף כל פרט נוסף.",
      },
      media_pr: {
        title: 'מדיה / יח״צ',
        hint: "כתבו מה סוג הפנייה, מה צריך ממני, מה הדד־ליין והיכן זה צפוי להתפרסם.",
        placeholder: "כתבו כאן את הבקשה והדד־ליין…",
      },
      collaboration: {
        title: "שיתופי פעולה",
        hint: "איזה רעיון לשיתוף פעולה אתם מציעים? מוזמנים לפרט.",
        placeholder: "כתבו כאן את הרעיון…",
      },
      orchestra_production: {
        title: "הפקת תזמורת",
        hint: "כתבו סוג אירוע, סגנון, תאריך, מיקום, משך, והרכב מועדף.",
        placeholder: "כתבו כאן… אפשר להוסיף דרישות/אילוצים.",
      },
      orchestra_management: {
        title: "ניהול תזמורת קיימת",
        hint: "כתבו גודל הרכב, רמת נגנים, תדירות חזרות, מטרות ומיקום.",
        placeholder: "כתבו כאן… אפשר להוסיף מצב נוכחי/יעדים.",
      },
      other: {
        title: form.otherTopic?.trim()
          ? `אחר: ${form.otherTopic.trim()}`
          : "אחר",
        hint: "כתבו בקצרה מה הנושא ומה תרצו לקדם/לברר.",
        placeholder: "כתבו כאן… אפשר להוסיף כל פרט נוסף.",
      },
    };
    return prompts[key];
  };

  const validateAll = () => {
    if (form.topics.length === 0) {
      pulseField("topics");
      toast({
        title: "נושא חסר",
        description: "בחרו לפחות נושא אחד.",
        variant: "destructive",
      });
      return false;
    }
    if (hasOther && !form.otherTopic.trim()) {
      pulseField("otherTopic");
      toast({
        title: "חסר נושא קצר",
        description: 'בחרתם "אחר" — כתבו כותרת קצרה.',
        variant: "destructive",
      });
      return false;
    }
    if (!form.firstName.trim()) {
      pulseField("firstName");
      return false;
    }
    if (!form.lastName.trim()) {
      pulseField("lastName");
      return false;
    }
    if (!form.email.trim() || !isEmailValid(form.email)) {
      pulseField("email");
      return false;
    }
    for (const k of form.topics) {
      if (!(form.detailsByTopic[k] ?? "").trim()) {
        pulseField(`details.${k}`);
        toast({
          title: "עוד שורה קטנה",
          description: `הוסיפו פירוט קצר בנושא: ${displayTopicLabel(k)}.`,
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const fieldBase =
    "w-full text-base leading-relaxed h-14 px-4 bg-card border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all placeholder:text-muted-foreground";
  const textareaBase =
    "w-full text-base leading-relaxed p-4 bg-card border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20 transition-all placeholder:text-muted-foreground resize-y";
  const errorRing = "border-destructive ring-2 ring-destructive/20";
  const flashRing = "border-destructive ring-2 ring-destructive/30 animate-pulse";

  const fieldClass = (name: string, invalid: boolean) => {
    if (flash[name]) return `${fieldBase} ${flashRing}`;
    if (invalid) return `${fieldBase} ${errorRing}`;
    return fieldBase;
  };

  const textareaClass = (name: string, invalid: boolean) => {
    if (flash[name]) return `${textareaBase} ${flashRing}`;
    if (invalid) return `${textareaBase} ${errorRing}`;
    return textareaBase;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched((p) => ({
      ...p,
      topics: true,
      otherTopic: true,
      firstName: true,
      lastName: true,
      email: true,
      ...Object.fromEntries(form.topics.map((k) => [`details.${k}`, true])),
    }));
    if (!validateAll()) return;
    setIsSubmitting(true);
    try {
      toast({
        title: "הטופס עדיין לא נשלח",
        description:
          "הפרטים נשארו בטופס כדי שלא יאבדו. כרגע צריך לפנות ישירות באימייל או בטלפון.",
        variant: "destructive",
      });
    } catch {
      toast({
        title: "לא נשלח",
        description: "משהו השתבש. נסו שוב בעוד רגע.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId?: string, orbitId?: string) => {
    if (orbitId) setActiveOrbitId(orbitId);
    if (!sectionId) return;

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const heroSupport = (
    <div className="flex flex-wrap gap-3 pt-2">
      <a
        href="#contact-form-section"
        className="inline-flex items-center justify-center rounded-full border border-border bg-background/80 px-5 py-3 text-sm font-medium transition-colors hover:bg-muted"
      >
        לטופס
      </a>
      <a
        href="#contact-followup-section"
        className="inline-flex items-center justify-center rounded-full border border-primary/25 bg-primary/10 px-5 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
      >
        איך זה ממשיך
      </a>
    </div>
  );

  return (
    <InnerPageLayout
      title="יצירת קשר"
      description="מוזמנים להשאיר פרטים, ואני אחזור אליכם בצורה מסודרת ומדויקת."
    >
      <div dir="rtl">
        <InnerPageOrbitHero
          heroId="contact-hero"
          eyebrow="צור קשר"
          title={["לא רק טופס", "אלא התחלה", "של שיחה נכונה"]}
          intro={[
            "כאן אפשר לפנות לגבי שיעורים, הופעות, שיתופי פעולה, סדנאות וכל שאלה נוספת.",
            "המטרה היא לאסוף את הפרטים החשובים בצורה נעימה, כדי שאוכל לחזור אליכם ברור ומדויק.",
          ]}
          support={heroSupport}
          orbitItems={contactOrbitItems}
          presenterAssets={contactPresenterAssets}
          activeOrbitId={activeOrbitId}
          presenterAlt="מגישת דף יצירת קשר"
          onOrbitItemClick={(item) => scrollToSection(item.sectionId, item.id)}
          compactLabel="צור קשר"
          floatingMessages={contactFloatingMessages}
        />

        <div className="relative w-full pb-12 md:pb-20 lg:pb-32 px-4 sm:px-6">
          <div id="contact-intro-section" className="max-w-6xl mx-auto flex flex-col items-center">
            <div className="relative flex items-start justify-between flex-col lg:flex-row lg:w-full gap-12 lg:gap-16">
              <div className="w-full lg:w-1/2 py-8 md:py-12">
                <AppearOnScroll delay={80}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight mb-6">
                    נעים להכיר
                  </h2>
                </AppearOnScroll>

                <AppearOnScroll delay={120}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { title: "אודות", desc: "רקע, גישה וסגנון עבודה", href: "/about" },
                      { title: "שיעורים", desc: "מה לומדים ואיך זה עובד", href: "/students" },
                    ].map((c) => (
                      <a
                        key={c.title}
                        href={c.href}
                        className="group rounded-2xl border border-border bg-card p-5 hover:bg-muted/40 transition-all hover-sparkle"
                      >
                        <div className="text-lg font-semibold mb-1">{c.title}</div>
                        <div className="text-sm text-muted-foreground">{c.desc}</div>
                        <div className="text-xs mt-3 opacity-70 group-hover:opacity-100 transition-opacity">
                          לקריאה ↗
                        </div>
                      </a>
                    ))}
                  </div>
                </AppearOnScroll>

                <AppearOnScroll delay={180}>
                  <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
                    <div className="text-xl font-semibold mb-2">מה קורה אחרי הפנייה?</div>
                    <div className="space-y-3 text-base leading-8 text-muted-foreground">
                      <p>אני עוברת על הפנייה, מסדרת לעצמי תמונה ברורה, וחוזרת בצורה מסודרת.</p>
                      <p>אם צריך — ממשיכים לשיחה, תיאום, או המשך בירור לפי מה שכתבתם.</p>
                    </div>
                  </div>
                </AppearOnScroll>

                <AppearOnScroll delay={220}>
                  <div id="contact-followup-section" className="mt-6 rounded-3xl border border-border bg-card p-6 md:p-8">
                    <div className="text-lg font-semibold mb-2">תפוצה</div>
                    <p className="text-base leading-8 text-muted-foreground">
                      מי שבוחרת יכולה להצטרף גם לתפוצה, לצד תכנים מקצועיים קצרים ושיתופים מהשטח.
                      <span className="text-muted-foreground">
                        {" "}
                        (מסודר וענייני — אפשר לצאת בכל רגע)
                      </span>
                    </p>
                  </div>
                </AppearOnScroll>
              </div>

              <div
                ref={formTopRef}
                id="contact-form-section"
                className="w-full lg:w-[44%] max-w-3xl py-8 md:py-12"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AppearOnScroll delay={0}>
                    <div
                      className={`rounded-2xl border bg-card p-6 md:p-7 transition-all ${
                        flash.topics ? flashRing : "border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold leading-tight">
                            נושא<span className="text-destructive">*</span>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            ניתן לסמן כמה אפשרויות
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setTopicOpen((p) => !p);
                            markTouched("topics");
                            setActiveOrbitId("topics");
                          }}
                          className="h-12 px-5 rounded-xl border border-border bg-background text-base font-medium hover:opacity-90 transition-all"
                          aria-expanded={topicOpen}
                        >
                          {topicOpen ? "סגור" : "בחירת נושא"}
                        </button>
                      </div>

                      {topicsChosen ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {form.topics.map((k) => (
                            <span
                              key={k}
                              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-sm"
                            >
                              {k === "other" && form.otherTopic.trim()
                                ? `אחר: ${form.otherTopic.trim()}`
                                : displayTopicLabel(k)}
                              <button
                                type="button"
                                className="opacity-70 hover:opacity-100 transition-opacity"
                                onClick={() => toggleTopic(k)}
                                aria-label={`הסרה: ${displayTopicLabel(k)}`}
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p
                          className={`mt-4 text-sm text-muted-foreground ${
                            touched.topics && !topicsChosen ? "text-destructive" : ""
                          }`}
                        >
                          בחרו לפחות נושא אחד כדי להמשיך.
                        </p>
                      )}

                      {topicOpen && (
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {topics.map((t) => {
                            const checked = form.topics.includes(t.key);
                            return (
                              <button
                                key={t.key}
                                type="button"
                                onClick={() => {
                                  toggleTopic(t.key);
                                  setActiveOrbitId("topics");
                                }}
                                className={`text-right w-full rounded-xl border px-4 py-4 transition-all hover:opacity-90 ${
                                  checked
                                    ? "border-primary bg-primary/10 ring-2 ring-ring/15"
                                    : "border-border bg-background"
                                }`}
                                aria-pressed={checked}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <span className="text-base">{t.label}</span>
                                  <span
                                    className={`inline-flex h-5 w-5 items-center justify-center rounded border ${
                                      checked
                                        ? "border-primary bg-primary"
                                        : "border-border bg-card"
                                    }`}
                                    aria-hidden="true"
                                  >
                                    {checked && (
                                      <span className="h-2.5 w-2.5 rounded-sm bg-primary-foreground" />
                                    )}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {hasOther && (
                        <div className="mt-5">
                          <label className="block text-sm mb-2">
                            כותרת קצרה<span className="text-destructive">*</span>{" "}
                            <span className="text-muted-foreground">(עד 20 תווים)</span>
                          </label>
                          <input
                            id="otherTopic"
                            name="otherTopic"
                            type="text"
                            maxLength={20}
                            value={form.otherTopic}
                            onChange={(e) => setField("otherTopic", e.target.value)}
                            onBlur={() => {
                              markTouched("otherTopic");
                              if (!form.otherTopic.trim()) pulseField("otherTopic");
                            }}
                            className={fieldClass(
                              "otherTopic",
                              !!touched.otherTopic && hasOther && !form.otherTopic.trim()
                            )}
                            placeholder="כותרת קצרה"
                          />
                        </div>
                      )}
                    </div>
                  </AppearOnScroll>

                  {topicsChosen && (
                    <AppearOnScroll delay={120}>
                      <div
                        className="rounded-2xl border border-border bg-card p-6 md:p-7"
                        onMouseEnter={() => setActiveOrbitId("form")}
                      >
                        <h3 className="text-lg font-semibold mb-4">פרטים</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm mb-2">
                              שם פרטי<span className="text-destructive">*</span>
                            </label>
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              value={form.firstName}
                              onChange={(e) => setField("firstName", e.target.value)}
                              onBlur={() => {
                                markTouched("firstName");
                                if (!form.firstName.trim()) pulseField("firstName");
                              }}
                              className={fieldClass(
                                "firstName",
                                !!touched.firstName && !form.firstName.trim()
                              )}
                              placeholder="שם פרטי"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">
                              שם משפחה<span className="text-destructive">*</span>
                            </label>
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              value={form.lastName}
                              onChange={(e) => setField("lastName", e.target.value)}
                              onBlur={() => {
                                markTouched("lastName");
                                if (!form.lastName.trim()) pulseField("lastName");
                              }}
                              className={fieldClass(
                                "lastName",
                                !!touched.lastName && !form.lastName.trim()
                              )}
                              placeholder="שם משפחה"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                          <div>
                            <label className="block text-sm mb-2">
                              אימייל<span className="text-destructive">*</span>
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={(e) => setField("email", e.target.value)}
                              onBlur={() => {
                                markTouched("email");
                                if (!form.email.trim() || !isEmailValid(form.email))
                                  pulseField("email");
                              }}
                              className={fieldClass(
                                "email",
                                !!touched.email &&
                                  (!form.email.trim() || !isEmailValid(form.email))
                              )}
                              placeholder="כתובת אימייל"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm mb-2">
                              טלפון <span className="text-muted-foreground">(לא חובה)</span>
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={form.phone}
                              onChange={(e) => setField("phone", e.target.value)}
                              className={fieldBase}
                              placeholder="אם נוח לשיחה"
                            />
                          </div>
                        </div>
                      </div>
                    </AppearOnScroll>
                  )}

                  {detailsStageEnabled && (
                    <AppearOnScroll delay={200}>
                      <div
                        className="rounded-2xl border border-border bg-card p-6 md:p-7"
                        onMouseEnter={() => setActiveOrbitId("details")}
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          פירוט קצר<span className="text-destructive">*</span>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-5">
                          {form.topics.length > 1
                            ? "פניתם לגבי כמה נושאים — כתבו כמה שורות לגבי כל נושא."
                            : "כמה פרטים יעזרו לי להבין ולחזור אליכם בצורה מדויקת."}
                        </p>
                        <div className="space-y-5">
                          {form.topics.map((k) => {
                            const p = topicPrompt(k);
                            const val = form.detailsByTopic[k] ?? "";
                            const invalid = !!touched[`details.${k}`] && !val.trim();
                            return (
                              <div key={k} className="space-y-2">
                                <div className="text-base font-semibold">{p.title}</div>
                                <div className="text-xs text-muted-foreground leading-relaxed">
                                  {p.hint}
                                </div>
                                <textarea
                                  value={val}
                                  onChange={(e) => setTopicDetails(k, e.target.value)}
                                  onBlur={() => {
                                    markTouched(`details.${k}`);
                                    if (!val.trim()) pulseField(`details.${k}`);
                                  }}
                                  className={textareaClass(`details.${k}`, invalid)}
                                  placeholder={p.placeholder}
                                  rows={5}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </AppearOnScroll>
                  )}

                  <AppearOnScroll delay={260}>
                    <div
                      className="rounded-2xl border border-border bg-card p-6 md:p-7"
                      onMouseEnter={() => setActiveOrbitId("followup")}
                    >
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={form.newsletterOptIn}
                          onChange={(e) => setField("newsletterOptIn", e.target.checked)}
                          className="mt-1 h-5 w-5"
                        />
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          אני רוצה להצטרף לתפוצה (עדכונים + תכנים קצרים). אפשר לצאת בכל רגע.
                        </span>
                      </label>
                    </div>
                  </AppearOnScroll>

                  <AppearOnScroll delay={320}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full h-14 rounded-2xl text-lg font-semibold transition-all bg-accent text-accent-foreground hover:bg-accent/90 ${
                        isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "שולח…" : "שליחה"}
                    </button>
                  </AppearOnScroll>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
};

export default Contact;
