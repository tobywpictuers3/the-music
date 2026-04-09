import { useMemo, useState, type ReactNode } from "react";
import InnerPageLayout from "@/components/InnerPageLayout";
import OrbitPageShell from "@/orbit-system/OrbitPageShell";
import type { OrbitItemConfig } from "@/orbit-system/orbit.types";
import AppearOnScroll from "@/components/AppearOnScroll";
import {
  Calendar,
  MapPin,
  Clock,
  FileText,
  Calculator,
  Check,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PackageItem {
  id: string;
  name: string;
  basePrice: number;
  features: string[];
  maxInstruments: number;
}

interface AddonItem {
  id: string;
  name: string;
  price: number;
}

const PACKAGES: PackageItem[] = [
  {
    id: "basic",
    name: "בסיסי",
    basePrice: 2000,
    features: ["הרכב קטן", "שעה אחת", "רפרטואר קלאסי"],
    maxInstruments: 1,
  },
  {
    id: "standard",
    name: "סטנדרט",
    basePrice: 4000,
    features: ["הרכב בינוני", "שעתיים", "רפרטואר מגוון", "הגברה בסיסית"],
    maxInstruments: 2,
  },
  {
    id: "pro",
    name: "מקצועי",
    basePrice: 7000,
    features: ["הרכב גדול", "שלוש שעות", "רפרטואר מותאם", "הגברה מלאה", "תאורה"],
    maxInstruments: 4,
  },
  {
    id: "premium",
    name: "פרימיום",
    basePrice: 12000,
    features: [
      "תזמורת מלאה",
      "ללא הגבלת זמן",
      "רפרטואר בהזמנה",
      "הגברה + תאורה",
      "צילום מקצועי",
      "מנחה",
    ],
    maxInstruments: 6,
  },
];

const ADDONS: AddonItem[] = [
  { id: "photo", name: "צילום מקצועי", price: 800 },
  { id: "video", name: "צילום וידאו", price: 1200 },
  { id: "lighting", name: "תאורה מקצועית", price: 1500 },
  { id: "sound", name: "הגברה משודרגת", price: 1000 },
];

const INSTRUMENTS = [
  { id: "violin", name: "כינור" },
  { id: "cello", name: "צ׳לו" },
  { id: "flute", name: "חליל" },
  { id: "piano", name: "פסנתר" },
  { id: "clarinet", name: "קלרינט" },
  { id: "trumpet", name: "חצוצרה" },
];

const upcomingEvents = [
  {
    title: "קונצרט סוף שנה",
    date: "15 יוני 2026",
    time: "19:00",
    location: "אולם התרבות העירוני",
    description: "הופעת סיום שנה עם כל התלמידות",
  },
  {
    title: "ערב מוסיקה קלאסית",
    date: "28 יולי 2026",
    time: "20:00",
    location: "בית הופרה הישראלי",
    description: "יצירות קלאסיות מובחרות",
  },
  {
    title: "פסטיבל מוסיקה",
    date: "10 אוגוסט 2026",
    time: "18:00",
    location: "פארק הירקון",
    description: "חגיגה מוזיקלית בחיק הטבע",
  },
];

const QuoteBuilder = () => {
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

  const toggle = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  const selectedPkg = PACKAGES.find((p) => p.id === selectedPackageId);
  const maxInstruments = selectedPkg?.maxInstruments ?? 0;

  const total =
    (selectedPkg?.basePrice ?? 0) +
    ADDONS.filter((a) => selectedAddons.includes(a.id)).reduce((s, a) => s + a.price, 0);

  return (
    <div className="space-y-10" dir="rtl">
      <div>
        <h3 className="mb-4 text-xl font-semibold">השוואת חבילות</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-3 text-right font-medium">תכונה</th>
                {PACKAGES.map((p) => (
                  <th key={p.id} className="p-3 text-center font-medium">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3 text-muted-foreground">מחיר בסיס</td>
                {PACKAGES.map((p) => (
                  <td key={p.id} className="p-3 text-center font-bold text-primary">
                    ₪{p.basePrice.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 text-muted-foreground">כלים</td>
                {PACKAGES.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    עד {p.maxInstruments}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">בחרי חבילה</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => {
                    setSelectedPackageId(pkg.id);
                    setSelectedInstruments([]);
                  }}
                  className={`rounded-xl border-2 p-5 text-right transition-all ${
                    selectedPackageId === pkg.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <h4 className="mb-1 text-lg font-bold">{pkg.name}</h4>
                  <p className="mb-3 text-xl font-bold text-primary">
                    ₪{pkg.basePrice.toLocaleString()}
                  </p>
                  <ul className="space-y-1">
                    {pkg.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          {selectedPackageId && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-1 text-lg font-semibold">בחרי כלים</h3>
              <p className="mb-4 text-sm text-muted-foreground">עד {maxInstruments} כלים</p>
              <div className="flex flex-wrap gap-2">
                {INSTRUMENTS.map((inst) => {
                  const selected = selectedInstruments.includes(inst.id);
                  const disabled =
                    !selected && selectedInstruments.length >= maxInstruments;

                  return (
                    <button
                      key={inst.id}
                      disabled={disabled}
                      onClick={() =>
                        setSelectedInstruments(toggle(selectedInstruments, inst.id))
                      }
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        selected
                          ? "bg-primary text-primary-foreground"
                          : disabled
                          ? "cursor-not-allowed bg-muted text-muted-foreground opacity-50"
                          : "bg-muted hover:bg-primary/20"
                      }`}
                    >
                      {inst.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedPackageId && (
            <div>
              <h3 className="mb-4 text-xl font-semibold">הוסיפי תוספות</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ADDONS.map((addon) => {
                  const selected = selectedAddons.includes(addon.id);

                  return (
                    <button
                      key={addon.id}
                      onClick={() => setSelectedAddons(toggle(selectedAddons, addon.id))}
                      className={`flex items-center justify-between rounded-xl border-2 p-4 text-right transition-all ${
                        selected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{addon.name}</p>
                        <p className="text-sm font-bold text-primary">
                          ₪{addon.price.toLocaleString()}
                        </p>
                      </div>
                      {selected && <Check className="h-5 w-5 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-bold">סיכום הצעת מחיר</h3>
            {selectedPkg ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>חבילה: {selectedPkg.name}</span>
                  <span className="font-bold">
                    ₪{selectedPkg.basePrice.toLocaleString()}
                  </span>
                </div>

                {selectedInstruments.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    כלים:{" "}
                    {selectedInstruments
                      .map((id) => INSTRUMENTS.find((i) => i.id === id)?.name)
                      .join(", ")}
                  </p>
                )}

                {ADDONS.filter((a) => selectedAddons.includes(a.id)).map((a) => (
                  <div key={a.id} className="flex justify-between text-sm">
                    <span>{a.name}</span>
                    <span>₪{a.price.toLocaleString()}</span>
                  </div>
                ))}

                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-bold">סה״כ</span>
                  <span className="text-xl font-bold text-primary">
                    ₪{total.toLocaleString()}
                  </span>
                </div>

                <Button className="mt-2 w-full" asChild>
                  <a href="/contact">שלחי הזמנה</a>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">בחרי חבילה כדי להתחיל</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BudgetOption {
  type: "economical" | "recommended" | "premium";
  label: string;
  icon: ReactNode;
  pkg: PackageItem;
  addons: AddonItem[];
  total: number;
  description: string;
}

const BudgetCalculator = () => {
  const [budget, setBudget] = useState(5000);

  const options = useMemo((): BudgetOption[] => {
    const sorted = [...PACKAGES].sort((a, b) => a.basePrice - b.basePrice);
    const within = sorted.filter((p) => p.basePrice <= budget);
    const above = sorted.filter((p) => p.basePrice > budget);
    const result: BudgetOption[] = [];

    if (within.length > 0) {
      const pkg = within[0];
      const remaining = budget - pkg.basePrice;
      const affordable = ADDONS.filter((a) => a.price <= remaining * 0.5).slice(0, 2);

      result.push({
        type: "economical",
        label: "חסכונית",
        icon: <Wallet className="h-5 w-5" />,
        pkg,
        addons: affordable,
        total: pkg.basePrice + affordable.reduce((s, a) => s + a.price, 0),
        description: "הכי משתלם – מקסימום ערך במחיר הנמוך ביותר",
      });
    }

    if (within.length > 0) {
      const pkg = within[within.length - 1];
      let spent = 0;
      const rec: AddonItem[] = [];

      for (const a of [...ADDONS].sort((x, y) => x.price - y.price)) {
        if (spent + a.price <= budget - pkg.basePrice) {
          rec.push(a);
          spent += a.price;
        }
      }

      result.push({
        type: "recommended",
        label: "מומלצת",
        icon: <TrendingUp className="h-5 w-5" />,
        pkg,
        addons: rec,
        total: pkg.basePrice + spent,
        description: "האיזון המושלם – הכי הרבה ערך עבור התקציב שלך",
      });
    }

    const premBudget = budget * 1.3;
    const premPkg =
      above.find((p) => p.basePrice <= premBudget) ??
      within[within.length - 1] ??
      sorted[0];
    const premAddons = ADDONS.slice(0, 3);

    result.push({
      type: "premium",
      label: "פרימיום",
      icon: <Sparkles className="h-5 w-5" />,
      pkg: premPkg,
      addons: premAddons,
      total: premPkg.basePrice + premAddons.reduce((s, a) => s + a.price, 0),
      description: "חוויה מלאה – מעט מעל התקציב אבל שווה כל שקל",
    });

    return result;
  }, [budget]);

  const optionStyle = (t: string) => {
    if (t === "recommended") return "border-primary bg-primary/10 ring-2 ring-primary/20";
    if (t === "premium") return "border-accent/50 bg-accent/5";
    return "border-border bg-card";
  };

  const badgeStyle = (t: string) => {
    if (t === "recommended") return "bg-primary/20 text-primary";
    if (t === "premium") return "bg-accent/20 text-accent-foreground";
    return "bg-secondary text-secondary-foreground";
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-6">
        <Label htmlFor="budget" className="mb-3 block text-base font-semibold">
          מה התקציב שלך?
        </Label>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">₪</span>
            <Input
              id="budget"
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="text-center text-lg font-bold"
              min={1000}
              max={50000}
              step={500}
            />
          </div>

          <Slider
            value={[budget]}
            onValueChange={([v]) => setBudget(v)}
            min={1000}
            max={25000}
            step={500}
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₪1,000</span>
            <span>₪25,000</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {options.map((opt) => (
          <div
            key={opt.type}
            className={`rounded-xl border-2 p-5 transition-all ${optionStyle(opt.type)}`}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-lg bg-background p-1.5">{opt.icon}</div>
              <Badge className={badgeStyle(opt.type)}>{opt.label}</Badge>
            </div>

            <h4 className="mb-1 text-lg font-bold">{opt.pkg.name}</h4>
            <p className="mb-4 text-sm text-muted-foreground">{opt.description}</p>

            <div className="mb-5 space-y-2">
              <p className="text-xs text-muted-foreground">כולל:</p>

              {opt.pkg.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{f}</span>
                </div>
              ))}

              {opt.addons.map((a) => (
                <div key={a.id} className="flex items-center gap-2 text-sm">
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{a.name}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm">סה״כ</span>
                <span className="text-lg font-bold text-primary">
                  ₪{opt.total.toLocaleString()}
                </span>
              </div>

              {opt.total > budget && (
                <p className="mb-3 text-xs text-primary">
                  +₪{(opt.total - budget).toLocaleString()} מעל התקציב
                </p>
              )}

              <Button className="w-full" asChild>
                <a href="/contact">בחרי אופציה זו</a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Orchestras() {
  const [pricingMode, setPricingMode] = useState<"quote" | "budget">("quote");

  function scrollToSection(sectionId?: string) {
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleOrbitItemClick(item: OrbitItemConfig) {
    if (item.id === "2") setPricingMode("quote");
    if (item.id === "3") setPricingMode("budget");
    scrollToSection(item.targetSectionId);
  }

  return (
    <InnerPageLayout
      title="תזמורות"
      description="כאן אפשר להבין מה מתאים לך, לבנות הצעת מחיר, לבדוק תקציב, ולראות הופעות קרובות."
    >
      <OrbitPageShell pageId="orchestras" onOrbitItemClick={handleOrbitItemClick}>
        <div dir="rtl">
          <section
            id="overview-section"
            className="scroll-mt-28 py-12 md:py-16"
          >
            <div className="mx-auto grid max-w-5xl gap-5 px-6 md:grid-cols-3">
              {[
                {
                  title: "התאמה חכמה",
                  text: "אפשר לבחור חבילה, להוסיף תוספות, ולבנות הצעה מדויקת לצורך שלך.",
                },
                {
                  title: "מסלול לפי תקציב",
                  text: "גם אם עוד אין החלטה — התקציב שלך יכול להפוך להמלצה ברורה.",
                },
                {
                  title: "מבט קדימה",
                  text: "לצד ההזמנה עצמה, הדף כולל גם יומן הופעות והמשך קשר מסודר.",
                },
              ].map((card) => (
                <AppearOnScroll key={card.title} delay={0}>
                  <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur-sm">
                    <div className="text-xl font-bold">{card.title}</div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {card.text}
                    </p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </section>

          <section
            id="pricing-section"
            className="scroll-mt-28 bg-muted/30 py-12 md:py-16"
          >
            <div className="mx-auto max-w-5xl px-6">
              <AppearOnScroll delay={0}>
                <div className="mb-10 text-center">
                  <h2 className="mb-3 font-serif text-2xl font-bold tracking-tight md:text-3xl">
                    הזמיני הופעה
                  </h2>
                  <p className="mx-auto max-w-2xl text-base text-muted-foreground">
                    בחרי את המסלול המתאים לך — בנה הצעת מחיר מותאמת או הזיני תקציב ונמליץ
                    לך על האופציות הטובות ביותר.
                  </p>
                </div>
              </AppearOnScroll>

              <AppearOnScroll delay={100}>
                <Tabs
                  value={pricingMode}
                  onValueChange={(value) => {
                    const next = value as "quote" | "budget";
                    setPricingMode(next);
                  }}
                  className="w-full"
                  dir="rtl"
                >
                  <TabsList className="mx-auto mb-10 grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="quote" className="py-2.5 text-sm">
                      <FileText className="ml-2 h-4 w-4" />
                      בניית הצעת מחיר
                    </TabsTrigger>
                    <TabsTrigger value="budget" className="py-2.5 text-sm">
                      <Calculator className="ml-2 h-4 w-4" />
                      יש לי תקציב
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="quote">
                    <QuoteBuilder />
                  </TabsContent>

                  <TabsContent value="budget">
                    <BudgetCalculator />
                  </TabsContent>
                </Tabs>
              </AppearOnScroll>
            </div>
          </section>

          <section
            id="events-section"
            className="scroll-mt-28 py-12 md:py-16"
          >
            <div className="mx-auto max-w-5xl px-6">
              <AppearOnScroll delay={0}>
                <h2 className="mb-10 text-center font-serif text-2xl font-bold tracking-tight md:text-3xl">
                  הופעות קרובות
                </h2>
              </AppearOnScroll>

              <div className="space-y-5">
                {upcomingEvents.map((event, index) => (
                  <AppearOnScroll key={index} delay={index * 100}>
                    <div className="flex flex-col items-start gap-5 rounded-xl border border-border bg-card p-6 shadow-sm md:flex-row">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Calendar className="h-8 w-8 text-primary" />
                      </div>

                      <div className="flex-1">
                        <h3 className="mb-1 text-xl font-bold">{event.title}</h3>
                        <p className="mb-3 text-sm text-muted-foreground">
                          {event.description}
                        </p>

                        <div className="flex flex-wrap gap-5">
                          <div className="flex items-center gap-1.5 text-sm">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AppearOnScroll>
                ))}
              </div>
            </div>
          </section>

          <section
            id="contact-section"
            className="scroll-mt-28 pb-20 pt-4"
          >
            <div className="mx-auto max-w-4xl px-6">
              <div className="rounded-[2rem] border border-border bg-card/70 px-6 py-8 shadow-soft backdrop-blur-sm md:px-10 md:py-10">
                <div className="text-center">
                  <div className="text-2xl font-bold leading-tight md:text-4xl">
                    רוצה להמשיך מכאן?
                  </div>

                  <div className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-lg">
                    אפשר להשאיר פרטים, להתקדם להזמנה, או לחזור שוב להצעת המחיר ולתקציב.
                  </div>

                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <Button
                      size="lg"
                      className="h-12 rounded-2xl px-7 text-sm font-semibold md:text-base"
                      asChild
                    >
                      <a href="/contact">ליצירת קשר</a>
                    </Button>

                    <Button
                      variant="secondary"
                      size="lg"
                      className="h-12 rounded-2xl px-7 text-sm font-semibold md:text-base"
                      onClick={() => {
                        setPricingMode("quote");
                        scrollToSection("pricing-section");
                      }}
                    >
                      חזרה להצעת מחיר
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </OrbitPageShell>
    </InnerPageLayout>
  );
}
