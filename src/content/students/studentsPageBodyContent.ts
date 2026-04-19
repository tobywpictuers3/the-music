export type StudentsIconKey =
  | "music"
  | "mic"
  | "graduation"
  | "clipboard"
  | "calendar"
  | "book"
  | "check"
  | "sparkles"
  | "message"
  | "badgeDollar";

export type StudentsQuoteContent = {
  key: string;
  quote: string;
  name: string;
  context?: string;
};

export type StudentsStudyCardContent = {
  key: string;
  title: string;
  subtitle: string;
  iconKey: StudentsIconKey;
  bullets: string[];
};

export type StudentsProcessItemContent = {
  key: string;
  title: string;
  text: string;
  iconKey: StudentsIconKey;
};

export type StudentsFeatureItemContent = {
  key: string;
  title: string;
  text: string;
  iconKey: StudentsIconKey;
};

export type StudentsPageBodyContent = {
  heroQuote: string;

  topCta: {
    label: string;
  };

  testimonials: StudentsQuoteContent[];

  trackSection: {
    badge: string;
    titleLines: string[];
    description: string;
    sideCardTitleLines: string[];
    sideCardBullets: string[];
    sideCardCtaLabel: string;
    announcerAlt: string;
  };

  commitmentSection: {
    badge: string;
    titleLines: string[];
    importantTitle: string;
    importantText: string;
    resultTitle: string;
    resultText: string;
    presenterAlt: string;
  };

  studiesSection: {
    badge: string;
    title: string;
    description: string;
    imageAlt: string;
    supportTitle: string;
    supportDescription: string;
    supportStudies: string[];
    primaryStudies: StudentsStudyCardContent[];
    orchestraTitle: string;
    orchestraDescription: string;
    orchestraCtaLabel: string;
  };

  beliefSection: {
    label: string;
    titleLines: string[];
    description: string;
    lines: string[];
  };

  processSection: {
    badge: string;
    title: string;
    description: string;
    imageAlt: string;
    items: StudentsProcessItemContent[];
  };

  systemSection: {
    badge: string;
    titleLines: string[];
    description: string;
    features: StudentsFeatureItemContent[];
    modalButtonLabel: string;
    demoImageAlt: string;
    demoButtonLabel: string;
    loginButtonLabel: string;
    modalTitle: string;
    modalDescription: string;
    modalPrimaryButtonLabel: string;
    modalSecondaryButtonLabel: string;
  };

  numbers: Array<{
    value: string;
    label: string;
  }>;

  bottomCta: {
    title: string;
    description: string;
    contactButtonLabel: string;
    demoButtonLabel: string;
    loginButtonLabel: string;
    aboutButtonLabel: string;
  };
};

export const STUDENTS_PAGE_BODY_CONTENT: StudentsPageBodyContent = {
  heroQuote:
    "כאן לא בונים רק שיעור טוב, אלא דרך יציבה ומוזיקלית שנשארת לאורך זמן — עם רמה, רצף, הקשבה וליווי אמיתי.",

  topCta: {
    label: "לבדיקת התאמה למסלול",
  },

  testimonials: [
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
  ],

  trackSection: {
    badge: "מה אומרות התלמידות",
    titleLines: ["שיעור שהופך לדרך,", "ולא לעוד מפגש חולף"],
    description:
      "ההמלצות לא נועדו רק להרשים — אלא להמחיש איך נראית למידה שיש בה רצף, בהירות, יחס אישי ועומק מקצועי גם יחד.",
    sideCardTitleLines: ["מסלול מקצועי, אנושי", "ועם רף ברור"],
    sideCardBullets: [
      "לתלמידות שמוכנות לתהליך ולא רק להתנסות.",
      "למי שמחפשת ליווי, סדר ומסגרת מחזיקה.",
      "למי שחשוב לה יחס אישי יחד עם דרישה מקצועית.",
    ],
    sideCardCtaLabel: "בדיקת התאמה למסלול",
    announcerAlt: "סמל דף התלמידות",
  },

  commitmentSection: {
    badge: "כך נראה תהליך נכון",
    titleLines: [
      "צורת העבודה שלי מתאימה למי שמוכנה",
      "להתמסר לתהליך אמיתי",
    ],
    importantTitle: "מה חשוב לי במיוחד",
    importantText:
      "עומק, עקביות, שקט מקצועי ובהירות שמאפשרת לתלמידה להתקדם מתוך ביטחון.",
    resultTitle: "מה יוצא מזה בפועל",
    resultText:
      "מסלול שמחזיק לאורך זמן, עם רמה, מסגרת, ליווי ודרך עבודה מסודרת.",
    presenterAlt: "סמל דף התלמידות",
  },

  studiesSection: {
    badge: "מה לומדים כאן",
    title: "תחומי הלימוד",
    description:
      "השיעורים נבנים מתוך עומק מקצועי, התאמה אישית ומסלול התקדמות ברור.",
    imageAlt: "חוויית למידה ונגינה",
    supportTitle: "מקצועות משלימים",
    supportDescription:
      "תיאוריה, קריאת תווים, סולפז׳, הקשבה, קצב ופיתוח שמיעה — שכבה שמעמיקה את היציבות ואת ההבנה המוסיקלית של התלמידה.",
    supportStudies: [
      "תיאוריה",
      "פיתוח שמיעה",
      "סולפז׳",
      "קריאת תווים",
      "קצב",
      "הקשבה מוסיקלית",
    ],
    primaryStudies: [
      {
        key: "piano",
        title: "פסנתר",
        subtitle: "קריאה, טכניקה, הבעה ונגינה יציבה לאורך זמן.",
        iconKey: "music",
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
        iconKey: "mic",
        bullets: [
          "עבודה על איכות הצליל ואמבז'ור מדויק",
          "פיתוח מערכת הנשימה וטווחי נשיפה",
          "דגש על יציבה נכונה והתאמה אנטומית",
          "טכניקות ארטיקולציה, שליטה ודיוק",
          "פיתוח נגינה בטוחה, נקייה ומסודרת",
        ],
      },
    ],
    orchestraTitle: "תזמורות לימודיות",
    orchestraDescription:
      "מסגרת שמפתחת הקשבה, אחריות, קצב ויכולת להשתלב בתוך מרקם מוסיקלי.",
    orchestraCtaLabel: "לעמוד התזמורות",
  },

  beliefSection: {
    label: "הדרך שלי",
    titleLines: ["לא עבודה טכנית,", "אלא חתימת דרך"],
    description:
      "כאן הדגש הוא על קו ברור, רמת ציפייה גבוהה והחזקת תהליך לאורך זמן — עם עומק, בהירות, רגישות וסדר.",
    lines: [
      "מוסיקה נבנית מתוך עומק והשקעה, לא בקיצורי דרך.",
      "יחס אישי אינו סותר דרישות גבוהות — הוא מאפשר אותן.",
      "התקדמות אמיתית נוצרת מתוך רצף, אימון ותוכנית עבודה.",
      "רגישות, בהירות ומשמעת יכולות ללכת יחד.",
      "אני מחפשת תהליך נכון, לא רושם רגעי.",
    ],
  },

  processSection: {
    badge: "איך זה עובד בפועל",
    title: "שיעור, תרגול, רצף ומעקב",
    description:
      "כאן לא לומדים רק בתוך השיעור. השיעור נותן כיוון ברור, והתהליך ממשיך בין המפגשים — עם מסגרת, חומרים, משימות ודרך עבודה שמחזיקה את ההתקדמות.",
    imageAlt: "חומרי לימוד וסביבת עבודה",
    items: [
      {
        key: "lesson",
        title: "שיעור שבועי",
        text: "השיעור נותן כיוון, תיקון ותוכנית עבודה ברורה לשבוע.",
        iconKey: "graduation",
      },
      {
        key: "practice",
        title: "אימון בין שיעורים",
        text: "ההתקדמות בפועל נבנית באימון המסודר שבין המפגשים.",
        iconKey: "clipboard",
      },
      {
        key: "tracking",
        title: "מעקב ורצף",
        text: "יש מסגרת שמחזיקה את התהליך ולא נותנת לדברים להתפזר.",
        iconKey: "calendar",
      },
      {
        key: "materials",
        title: "חומרים מסודרים",
        text: "עזרים, משימות ותכנים נגישים לתלמידה במקום אחד.",
        iconKey: "book",
      },
      {
        key: "fit",
        title: "התאמה למסלול",
        text: "מתאים למי שמכניסה את הלימוד לסדר היום בקביעות — לא רק כפעילות מזדמנת.",
        iconKey: "check",
      },
    ],
  },

  systemSection: {
    badge: "מערכת התלמידות",
    titleLines: ["מערכת שממשיכה את הלמידה", "גם בין השיעורים"],
    description:
      "זה האזור הנכון להפנות ממנו לדמו ולכניסה. כאן כבר מבינים מהי המעטפת, ולכן אפשר לראות איך זה נראה בפועל.",
    features: [
      {
        key: "schedule",
        title: "סדר שבועי ברור",
        text: "מה קורה עכשיו, מה לתרגל השבוע ומהו הצעד הבא בתהליך.",
        iconKey: "calendar",
      },
      {
        key: "practice",
        title: "מעקב אימון והתקדמות",
        text: "התלמידה יודעת מה לתרגל ומה כבר התקדם בפועל.",
        iconKey: "clipboard",
      },
      {
        key: "tools",
        title: "עזרים וחומרי לימוד",
        text: "תרגילים, משימות וכלים שימושיים במקום אחד.",
        iconKey: "sparkles",
      },
      {
        key: "communication",
        title: "תקשורת מורה–תלמידה",
        text: "שאלות, הבהרות והמשכיות גם בין השיעורים.",
        iconKey: "message",
      },
      {
        key: "payments",
        title: "סדר ותשלומים",
        text: "מעטפת מסודרת, ברורה ונגישה שגם מחזיקה את הצד המנהלי.",
        iconKey: "badgeDollar",
      },
    ],
    modalButtonLabel: "מה כוללת המערכת",
    demoImageAlt: "תצוגה מקדימה של מערכת התלמידות",
    demoButtonLabel: "להדגמה",
    loginButtonLabel: "לכניסה",
    modalTitle: "מה כוללת מערכת התלמידות",
    modalDescription:
      "מעטפת שממשיכה את הלמידה גם בין השיעורים, ומחזיקה את התהליך בצורה מסודרת וברורה.",
    modalPrimaryButtonLabel: "כניסה לתוכנה",
    modalSecondaryButtonLabel: "לצפייה בדמו",
  },

  numbers: [
    { value: "26", label: "שנות הוראת מוסיקה" },
    { value: "9", label: "כלי נגינה ברמה מעולה" },
    { value: "מאות", label: "תלמידות פרטיות לאורך השנים" },
    { value: "אלפי", label: "בוגרות קורסים קבוצתיים" },
    { value: "5", label: "תזמורות לימודיות עשירות" },
    { value: "20", label: "קונצרטים לתלמידות" },
  ],

  bottomCta: {
    title: "יש לך שאלות?",
    description:
      "אפשר לפנות דרך דף צור קשר, לראות את הדמו של המערכת, להיכנס ישירות לתוכנה, או להכיר גם את צד ההוראה שמאחורי הדרך הזו.",
    contactButtonLabel: "צור קשר",
    demoButtonLabel: "להדגמה",
    loginButtonLabel: "לכניסה",
    aboutButtonLabel: "להכיר אותי",
  },
};
