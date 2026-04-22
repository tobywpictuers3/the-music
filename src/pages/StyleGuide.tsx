import InnerPageLayout from "@/components/InnerPageLayout";
import LogoAnimated from "@/components/brand/LogoAnimated";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-16">
    <h2 className="text-2xl md:text-3xl font-bold font-serif mb-8 pb-3 border-b border-border">
      {title}
    </h2>
    {children}
  </section>
);

const Swatch = ({
  label,
  hex,
  token,
  style,
}: {
  label: string;
  hex: string;
  token: string;
  style: React.CSSProperties;
}) => (
  <div className="space-y-2">
    <div className="h-20 rounded-xl border border-border/40" style={style} />
    <div>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-xs text-muted-foreground font-mono">{token}</p>
      <p className="text-xs text-muted-foreground">{hex}</p>
    </div>
  </div>
);

const CodeBlock = ({ code }: { code: string }) => (
  <pre className="bg-muted rounded-xl p-4 text-xs font-mono overflow-x-auto text-foreground/80 border border-border">
    {code}
  </pre>
);

const StyleGuide = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <InnerPageLayout
      title="מדריך עיצוב — Toby Music Brand System"
      description="ערכת העיצוב הרשמית של Toby Music. כל טוקן, צבע, פונט ואפקט — מוכן לשימוש בכל פלטפורמה."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">

        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold shimmer-brand mb-3">
            אומנות ואמינות
          </h1>
          <p className="text-xl font-serif text-muted-foreground">זו יצירה</p>
        </div>

        <Section title="לוגו ואנימציה">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl card-fire-border p-10 flex flex-col items-center gap-6">
              <p className="text-xs text-muted-foreground mb-2">אנימציית כניסה + זוהר נשימה</p>
              <LogoAnimated isDark={isDark} size="lg" />
              <p className="text-xs text-center text-muted-foreground">
                גרסה ראשית — מצב {isDark ? "כהה" : "בהיר"}
              </p>
            </div>
            <div className="rounded-2xl bg-card border border-border p-8 flex flex-col gap-4">
              <p className="text-sm font-semibold mb-2">שימוש בקוד:</p>
              <CodeBlock
                code={`import LogoAnimated from "@/components/brand/LogoAnimated"

// עם אנימציית כניסה (עמוד ראשי)
<LogoAnimated isDark={isDark} size="lg" />

// רק זוהר קבוע (header)
<LogoAnimated isDark={isDark} size="sm" pulseOnly />

// גדלים: "sm" | "md" | "lg"`}
              />
              <div className="mt-4 space-y-3">
                <p className="text-xs text-muted-foreground font-semibold">CSS classes שמופעלות:</p>
                <div className="space-y-1 text-xs font-mono text-muted-foreground">
                  <p>.logo-animated — wrapper עם overflow:hidden</p>
                  <p>.logo-pre-reveal — מצב לפני אנימציה (opacity:0, blur)</p>
                  <p>.logo-revealed — מפעיל toby-logo-reveal + toby-logo-breathe</p>
                  <p>.logo-revealed::after — ניצוץ שעובר על הלוגו</p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="פלטת צבעים">
          <div className="space-y-10">
            <div>
              <h3 className="text-lg font-serif font-bold mb-1 text-fire-bright">
                Fire — אומנות, אנרגיה, תשוקה
              </h3>
              <p className="text-sm text-muted-foreground mb-4">הצבע הראשי. גרדיאנט האש מגדיר את הזהות הוויזואלית.</p>
              <div className="grid grid-cols-3 gap-4">
                <Swatch label="Fire Bright" hex="#F3921E" token="--fire-bright" style={{ background: "hsl(32 92% 54%)" }} />
                <Swatch label="Fire Core"   hex="#CF4112" token="--fire-core"   style={{ background: "hsl(20 88% 44%)" }} />
                <Swatch label="Fire Deep"   hex="#8E1B08" token="--fire-deep"   style={{ background: "hsl(7 82% 30%)" }} />
              </div>
              <div className="mt-4 h-12 rounded-xl" style={{ background: "linear-gradient(90deg, hsl(32 92% 54%), hsl(20 88% 44%), hsl(7 82% 30%))" }} />
              <p className="text-xs text-muted-foreground mt-1">Gradient Fire — שימוש: כפתורים ראשיים, גבולות זוהרים, טקסט מודגש</p>
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold mb-1 shimmer-gold">Gold — איכות, הישג, יוקרה</h3>
              <p className="text-sm text-muted-foreground mb-4">צבע משני. מסמן תוכן מיוחד, הישגים, ופיצ'רים פרמיום.</p>
              <div className="grid grid-cols-3 gap-4">
                <Swatch label="Gold Light" hex="#ECC84E" token="--gold-light" style={{ background: "hsl(46 90% 72%)" }} />
                <Swatch label="Gold Main"  hex="#D9A22A" token="--gold-main"  style={{ background: "hsl(42 80% 58%)" }} />
                <Swatch label="Gold Dark"  hex="#AD7C1F" token="--gold-dark"  style={{ background: "hsl(38 65% 44%)" }} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold mb-1" style={{ color: "hsl(349 52% 52%)" }}>Wine — אמינות, עומק, מקצועיות</h3>
              <p className="text-sm text-muted-foreground mb-4">צבע שלישי. כפתורי פעולה כמו "צרי קשר", מסגרות אמינות.</p>
              <div className="grid grid-cols-3 gap-4">
                <Swatch label="Wine Light" hex="#A8485A" token="--wine-light" style={{ background: "hsl(352 46% 52%)" }} />
                <Swatch label="Wine Main"  hex="#9E2E3F" token="--wine-main"  style={{ background: "hsl(349 52% 42%)" }} />
                <Swatch label="Wine Deep"  hex="#63101E" token="--wine-deep"  style={{ background: "hsl(346 60% 24%)" }} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold mb-4">ניטרלים — תמיד חמים (אף פעם לא אפור קר)</h3>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {[
                  { l: "950", c: "hsl(18 20% 7%)",  h: "#150E09" },
                  { l: "900", c: "hsl(18 16% 11%)", h: "#1E1510" },
                  { l: "800", c: "hsl(20 14% 15%)", h: "#272018" },
                  { l: "700", c: "hsl(22 16% 22%)", h: "#3A2D24" },
                  { l: "500", c: "hsl(24 10% 50%)", h: "#8A7A72" },
                  { l: "200", c: "hsl(28 20% 80%)", h: "#CEBFB0" },
                  { l: "100", c: "hsl(30 22% 94%)", h: "#EDE4D9" },
                  { l: "50",  c: "hsl(34 28% 97%)", h: "#F8F4EE" },
                ].map((n) => (
                  <div key={n.l} className="space-y-1">
                    <div className="h-12 rounded-lg border border-border/30" style={{ background: n.c }} />
                    <p className="text-xs text-center font-mono text-muted-foreground">{n.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="טיפוגרפיה">
          <div className="space-y-8 bg-card border border-border rounded-2xl p-8">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-mono mb-3">font-family: Frank Ruhl Libre — כותרות עבריות</p>
              <h1 className="text-5xl font-bold font-serif">כותרת ראשית</h1>
              <h2 className="text-4xl font-bold font-serif">כותרת משנה</h2>
              <h3 className="text-3xl font-bold font-serif">כותרת שלישית</h3>
            </div>
            <div className="border-t border-border pt-6 space-y-1">
              <p className="text-xs text-muted-foreground font-mono mb-3">font-family: Cormorant Garamond — תצוגה אלגנטית (לטינית)</p>
              <p className="text-5xl font-display font-light italic">Art &amp; Reliability</p>
              <p className="text-3xl font-display">That's Creation</p>
            </div>
            <div className="border-t border-border pt-6 space-y-2">
              <p className="text-xs text-muted-foreground font-mono mb-3">font-family: Assistant — גוף טקסט</p>
              <p className="text-lg">גוף גדול — טקסט מבוא ותוכן מודגש, 18px</p>
              <p className="text-base">גוף רגיל — תוכן אתר סטנדרטי, 16px</p>
              <p className="text-sm text-muted-foreground">גוף קטן — כיתובים ומטאדאטה, 14px</p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="text-xs text-muted-foreground font-mono mb-4">אפקטי טקסט</p>
              <div className="space-y-3">
                <h3 className="text-3xl font-bold font-serif shimmer-fire">טקסט אש נוצץ</h3>
                <h3 className="text-3xl font-bold font-serif shimmer-gold">טקסט זהב נוצץ</h3>
                <h3 className="text-3xl font-bold font-serif shimmer-brand">טקסט מותג מלא</h3>
              </div>
            </div>
          </div>
        </Section>

        <Section title="כפתורים">
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="px-6 py-2.5 rounded-full font-semibold text-sm bg-fire-h text-foreground shadow-glow-fire hover:shadow-glow-fire-i transition-all">
                ראשי — אש
              </button>
              <Button className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-wine">
                אקצנט — יין
              </Button>
              <Button className="rounded-full bg-gold text-foreground hover:bg-gold/90">
                זהב
              </Button>
              <Button variant="outline" className="rounded-full border-fire-core text-fire-core hover:bg-fire-core/10">
                קו מתאר
              </Button>
              <Button variant="ghost" className="rounded-full">רוח</Button>
            </div>
          </div>
        </Section>

        <Section title="כרטיסים">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-card border border-border p-6 card-hover">
              <h3 className="text-lg font-bold font-serif mb-2">כרטיס בסיסי</h3>
              <p className="text-sm text-muted-foreground">שימוש: תוכן כללי, בלוג, שירותים.</p>
              <p className="text-xs font-mono text-muted-foreground/60 mt-3">.bg-card .border-border</p>
            </div>
            <div className="rounded-2xl card-fire-border p-6">
              <h3 className="text-lg font-bold font-serif mb-2 shimmer-fire">כרטיס אש</h3>
              <p className="text-sm text-muted-foreground">שימוש: תוכן מודגש, שירות מומלץ.</p>
              <p className="text-xs font-mono text-muted-foreground/60 mt-3">.card-fire-border</p>
            </div>
            <div className="rounded-2xl card-gold-border p-6">
              <h3 className="text-lg font-bold font-serif mb-2 shimmer-gold">כרטיס זהב</h3>
              <p className="text-sm text-muted-foreground">שימוש: תוכן פרמיום, הישגים.</p>
              <p className="text-xs font-mono text-muted-foreground/60 mt-3">.card-gold-border</p>
            </div>
          </div>
        </Section>

        <Section title="גרדיאנטים">
          <div className="space-y-4">
            {[
              { name: "Fire (135°)",        cls: "bg-fire",   code: "bg-fire" },
              { name: "Fire Horizontal",    cls: "bg-fire-h", code: "bg-fire-h" },
              { name: "Gold",               cls: "bg-gold",   code: "bg-gold" },
              { name: "Brand (Fire to Wine)", cls: "bg-brand", code: "bg-brand" },
            ].map((g) => (
              <div key={g.name} className="space-y-1">
                <div className={`h-12 rounded-xl ${g.cls}`} />
                <div className="flex justify-between">
                  <p className="text-sm">{g.name}</p>
                  <p className="text-xs font-mono text-muted-foreground">Tailwind: {g.code}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="קבצי מערכת העיצוב">
          <div className="rounded-2xl bg-card border border-border p-6">
            <div className="space-y-3 text-sm">
              {[
                { file: "src/index.css",                         desc: "כל CSS variables + utility classes — מקור האמת לאתר" },
                { file: "tailwind.config.ts",                    desc: "tokens ל-Tailwind (fire/gold/wine, fonts, shadows)" },
                { file: "src/design-system/brand-tokens.css",    desc: "קובץ נייד — copy-paste לכל פלטפורמה" },
                { file: "src/design-system/tokens.json",         desc: "JSON tokens — ל-Figma Tokens Studio, Style Dictionary" },
                { file: "src/design-system/DESIGN_DECISIONS.md", desc: "מסמך החלטות עיצוב ותנועה לכל הפלטפורמות" },
                { file: "src/components/brand/LogoAnimated.tsx", desc: "קומפוננטת לוגו עם אנימציית ניצוץ + נשימה" },
              ].map((f) => (
                <div key={f.file} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-3 rounded-xl bg-muted/50">
                  <code className="text-fire-core font-mono text-xs flex-shrink-0">{f.file}</code>
                  <p className="text-muted-foreground text-xs">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

      </div>
    </InnerPageLayout>
  );
};

export default StyleGuide;
