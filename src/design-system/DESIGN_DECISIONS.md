# Toby Music — מסמך החלטות עיצוב
**גרסה 2.0 | אפריל 2026**
**"אומנות ואמינות – זו יצירה"**

---

## א. הרציונל המותגי

**הרגש המרכזי:** סמכו עלי (Trust me)  
**המושג המוביל:** יצירה — מכיל בתוכו גם אמנות וגם אמינות  
**שלושת המוצרים:** שיעורי מוזיקה · הופעות ותזמורות · תווי מוזיקה  
**קהל יעד:** תלמידות, קהל הופעות, רוכשי תווים  
**טון:** קלאסי-מודרני. לא ילדותי. לא קליני. חמימות + סמכות.

---

## ב. החלטות צבע

### פלטת המותג — 3 צבעים + ניטרלים חמים

#### אש — הצבע הראשי

| שם | Hex | HSL | שימוש |
|----|-----|-----|-------|
| Fire Bright | `#F3921E` | `hsl(32 92% 54%)` | CTA ראשי, הדגשות |
| Fire Core | `#CF4112` | `hsl(20 88% 44%)` | עיקר הגרדיאנט |
| Fire Deep | `#8E1B08` | `hsl(7 82% 30%)` | עומק, צל, גבולות |

**למה אש?** האש היא הסמל של יצירה — אנרגיה, אמנות, וחום אנושי בו-זמנית.

#### זהב — הצבע המשני

| שם | Hex | שימוש |
|----|-----|-------|
| Gold Light | `#ECC84E` | זוהר, highlight, ניצוץ |
| Gold Main | `#D9A22A` | תוכן פרמיום, כוכבים, הישגים |
| Gold Dark | `#AD7C1F` | טקסט על רקע בהיר |

**למה זהב?** מסמן איכות והישג. מוסיף חגיגיות בלי לדחות.

#### יין — הצבע השלישי

| שם | Hex | שימוש |
|----|-----|-------|
| Wine Deep | `#63101E` | רקעים כהים, אקורד עמוק |
| Wine Main | `#9E2E3F` | כפתור "צרי קשר" |
| Wine Light | `#A8485A` | hover, אקצנטים משניים |

**למה יין?** אמינות ועומק. הבורגונדי מרמז על בגרות מקצועית.

#### ניטרלים — כלל ברזל: תמיד חמים, אף פעם לא אפור קר

| שם | Hex | שימוש |
|----|-----|-------|
| Neutral 950 | `#150E09` | רקע ראשי — dark mode |
| Neutral 900 | `#1E1510` | כרטיסים, פאנלים |
| Neutral 800 | `#272018` | modals, dropdowns |
| Neutral 700 | `#3A2D24` | גבולות |
| Neutral 500 | `#8A7A72` | placeholder, inactive |
| Neutral 200 | `#CEBFB0` | גבולות — light mode |
| Neutral 100 | `#EDE4D9` | כרטיסים — light mode |
| Neutral 50  | `#F8F4EE` | רקע ראשי — light mode |

---

## ג. החלטות טיפוגרפיה

### 3 פונטים — כל אחד עם תפקיד ייחודי

#### Frank Ruhl Libre — הקול הסמכותי
```
שימוש:  כותרות עבריות, H1–H4
משקלים: 300, 400, 500, 700, 900
Google: family=Frank+Ruhl+Libre:wght@300;400;500;700;900
CSS:    font-family: 'Frank Ruhl Libre', 'Playfair Display', Georgia, serif
רציונל: פונט עברי קלאסי עם תחושת ספר מוסיקה היסטורי
```

#### Cormorant Garamond — הקול האלגנטי
```
שימוש:  ציטוטים לטיניים, pull-quotes, מילים באנגלית בהדגשה
משקלים: 300 italic (אלגנטי), 400, 600
Google: family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400
CSS:    font-family: 'Cormorant Garamond', 'Frank Ruhl Libre', Georgia, serif
רציונל: תחושת קונסרבטוריון אירופאי, יוקרה
```

#### Assistant — הקול הנגיש
```
שימוש:  גוף טקסט, UI, ניווט, טפסים, כפתורים
משקלים: 300, 400, 500, 600, 700
Google: family=Assistant:wght@300;400;500;600;700
CSS:    font-family: 'Assistant', system-ui, -apple-system, sans-serif
רציונל: קריא בעברית ובאנגלית, מודרני ונגיש
```

### Google Fonts URL מלא
```
https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700;900&family=Assistant:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&display=swap
```

---

## ד. החלטות מרווח ועיצוב

- **פינות:** תמיד עגלגל. כפתורים = `border-radius: 9999px` (pill). כרטיסים = `14–20px`
- **כיוון:** RTL (`dir="rtl"`) כברירת מחדל
- **dark mode:** ברירת מחדל — `class="dark"` על `<html>`
- **גבולות זוהרים:** gradient border-box בצבעי אש/זהב/יין
- **ריפוד כרטיסים:** `1.5rem` (24px) ברירת מחדל

---

## ה. החלטות תנועה ואנימציה

### עקרון מנחה: "מהיר אבל לא חפוז. חגיגי אבל לא מוגזם."

### טבלת תזמון

| שם | משך | Easing | שימוש |
|----|-----|--------|-------|
| Fast | `0.18s` | `ease-out` | hover, לחיצות, micro |
| Normal | `0.32s` | `cubic-bezier(0.16, 1, 0.30, 1)` | מעברי UI |
| Slow | `0.55s` | `cubic-bezier(0.22, 1, 0.36, 1)` | כניסת אלמנטים |
| Hero | `1.4s` | `cubic-bezier(0.22, 1, 0.36, 1)` | אנימציית לוגו |
| Breathe | `5s infinite` | `ease-in-out` | זוהר נשימה |

### אנימציית לוגו — 3 שלבים

```
שלב 1 — Pre-reveal (0ms)
  opacity: 0
  filter: blur(8px)
  transform: scale(0.92)

שלב 2 — Reveal (80ms → 1480ms)
  opacity: 0 → 1
  filter: blur(8px) → blur(0)
  transform: scale(0.92) → scale(1)
  easing: cubic-bezier(0.22, 1, 0.36, 1)  [spring bounce]

שלב 3 — Breathe (אינסופי, 5s מחזור)
  0%,100%: filter: drop-shadow(0 0 8px rgba(243,146,30,0.3))
  50%:     filter: drop-shadow(0 0 20px rgba(243,146,30,0.7))
  easing:  ease-in-out
```

### Spark Sweep (ניצוץ)
```
מתחיל: 400ms אחרי תחילת הכניסה
משך:   1.1s
צורה:  פס לבן-זהוב, width 30%, זווית 45°
תנועה: translateX(-100%) → translateX(150%)  [RTL]
opacity: 0 → 0.7 → 0
```

### כיצד להשתמש ב-CSS (כל פלטפורמה)

```css
/* כניסת אלמנט */
.enter {
  animation: tm-slide-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes tm-slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* זוהר נשימה */
.fire-breathe {
  animation: tm-breathe 5s ease-in-out infinite;
}
@keyframes tm-breathe {
  0%,100% { filter: drop-shadow(0 0 6px rgba(243,146,30,0.3)); }
  50%      { filter: drop-shadow(0 0 18px rgba(243,146,30,0.65)); }
}

/* שימר טקסט */
.shimmer-fire {
  background: linear-gradient(90deg, #8E1B08 0%, #F3921E 45%, #ECC84E 55%, #F3921E 65%, #8E1B08 100%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3.5s ease-in-out infinite;
}
@keyframes shimmer {
  0%,100% { background-position: 100% 0; }
  50%      { background-position: 0% 0; }
}
```

---

## ו. שימוש לפי פלטפורמה

### Gmail — חתימה אימייל

```html
<!-- הדבקי כ-HTML בחתימת Gmail -->
<div style="font-family:'Assistant',Arial,sans-serif; direction:rtl;">
  <img src="[URL_LOGO_WHITE]" height="40" alt="Toby Music" />
  <div style="height:2px; background:linear-gradient(90deg,#F3921E,#8E1B08); margin:8px 0;"></div>
  <strong style="color:#F3921E; font-size:15px;">טובי וינברג</strong><br>
  <span style="color:#8A7A72; font-size:13px;">מורה למוזיקה | מנצחת | מלחינה</span><br>
  <a href="mailto:toby@..." style="color:#CF4112;">toby@...</a>
</div>
```

⚠️ **Gmail לא תומך ב-CSS variables** — hex ישירים בלבד תמיד.

---

### Canva

**הגדרת Brand Kit ב-Canva:**
1. Brand Colors להוסיף: `#F3921E`, `#CF4112`, `#8E1B08`, `#D9A22A`, `#ECC84E`, `#9E2E3F`, `#63101E`, `#150E09`, `#F8F4EE`
2. Brand Fonts: Cormorant Garamond (כותרות), Assistant (גוף)
3. לוגו: PNG עם רקע שקוף — גרסה לבנה (על כהה) + שחורה (על בהיר)
4. רקע מומלץ: `#150E09` (כהה) או `#F8F4EE` (בהיר)
5. אנימציה: Canva → "Fade" + "Rise" לרוב האלמנטים

---

### Fillout — טפסים

```css
/* Custom CSS בהגדרות Fillout */
:root {
  --ff-primary: #CF4112;
  --ff-bg: #150E09;
  --ff-surface: #1E1510;
  --ff-text: #EAE0D3;
}
input:focus, textarea:focus {
  border-color: #CF4112 !important;
  box-shadow: 0 0 0 3px rgba(207,65,18,0.2) !important;
}
.btn-submit {
  background: linear-gradient(90deg, #F3921E, #8E1B08) !important;
  border-radius: 9999px !important;
  font-weight: 600 !important;
}
```

---

### טפסי PDF

- **כותרת:** Frank Ruhl Libre Bold, `#F3921E` או `#CF4112`
- **גוף:** Assistant Regular, `#231710` (על לבן) / `#EAE0D3` (על כהה)
- **שדות:** border תחתי בלבד בצבע `#CF4112`, עם כותרת שדה ב-`#8A7A72`
- **כפתור שלח:** מלבן עם פינות עגלגלות, `background: #CF4112`, `color: white`
- **קו מפריד:** gradient `#F3921E → #8E1B08`, גובה 2px
- **כיוון:** RTL. הרווחים נדיבים — לא צפוף.

---

### Lovable (האתר)

✅ **כן — כל האתר קיבל את השינויים אוטומטית.**

האדריכלות: כל קומפוננטות shadcn/ui + Tailwind משתמשות ב-`hsl(var(--primary))`, `hsl(var(--accent))` וכו'. עדכון `src/index.css` שינה את כל האתר בבת אחת — ללא נגיעה בקומפוננטות בודדות.

קבצי המקור:
```
src/index.css              ← מקור האמת — כל CSS variables
tailwind.config.ts         ← mappings ל-Tailwind classes
src/design-system/brand-tokens.css  ← קובץ נייד לפלטפורמות אחרות
src/design-system/tokens.json       ← ל-Figma / Style Dictionary
```

---

### פלטפורמות עתידיות (Webflow, Framer, Notion, וכו')

1. הדבקי את `brand-tokens.css` בהגדרות ה-CSS של הפלטפורמה
2. הוסיפי את Google Fonts `<link>` ל-`<head>`
3. הוסיפי `class="dark"` ל-`<html>` לברירת מחדל כהה
4. השתמשי ב-`var(--tm-*)` variables בכל מקום

---

## ז. 2 פרומפטים להנפשת לוגו + סלוגן ב-GIF

### אפשרות 1: "האש יוצרת" — סגנון אנרגטי-אמנותי

**כלים מומלצים:** Kling AI · Pika Labs · RunwayML · Adobe Firefly

```
Create a 3-second seamless looping GIF animation.

Scene: Deep warm-black background (#150E09).

0.0–0.3s:
A single glowing ember/spark appears from the right side.
Color: bright orange (#F3921E), warm trail fading to deep red (#8E1B08).

0.3–1.2s:
The spark travels right-to-left in a gentle arc, leaving a fire trail.
The trail subtly forms a sound-wave or treble-clef shape as it moves.

1.2–2.0s:
The spark reaches center — a burst of warm orange+gold light (#F3921E + #ECC84E).
From the burst, the Toby Music logo materializes — fading from blur to sharp,
as if crystallized from fire. Warm fire halo glow around logo.

2.0–2.8s:
Below the logo, Hebrew text appears right-to-left:
"אומנות ואמינות – זו יצירה"
in gold (#D9A22A), elegant serif font, letter by letter.

2.8–3.0s:
Everything settles into a gentle breathing glow.
The logo pulses softly. Loop cross-fades back to start.

Style: cinematic, warm, professional. NOT cartoonish.
Dark mode background. Aspect ratio: 1:1 or 16:9.
Resolution: 800×800px minimum.
```

---

### אפשרות 2: "הזהב מתגלה" — סגנון אלגנטי-קלאסי

**כלים מומלצים:** Canva Pro Animations · Adobe Express · Remotion (code)

```
Create a 4-second elegant reveal animation as a GIF.

Scene: Rich dark warm background like aged parchment in shadow (#1E1510).

0.0–0.5s:
Complete darkness. A faint golden shimmer (#ECC84E) appears at top-right,
like candlelight catching the edge of something hidden.

0.5–1.8s:
A horizontal golden light sweep moves slowly right-to-left across the frame.
Center color: champagne gold (#ECC84E), fading to transparent at edges.
As the light passes, it "reveals" the Toby Music logo —
as if unveiling a painting beneath velvet. Soft warm glow around logo.

1.8–2.8s:
Logo fully visible with soft gold halo.
Below it, first line fades in:
"אומנות ואמינות"
in deep gold (#AD7C1F), elegant Cormorant Garamond style, centered.
Then second line appears:
"זו יצירה"
slightly smaller, lighter gold, like a museum caption.

2.8–3.5s:
A second shimmer sweep passes left-to-right over the composition —
like light reflecting off polished gold.

3.5–4.0s:
Fade to gentle breathing state. Warm glow pulses slowly.
Cross-fade loop back to darkness.

Style: classical, prestigious, concert hall meets conservatory.
Dark warm background essential. Aspect ratio: 1:1 or 16:9.
```

---

## ח. מה לא לעשות

| ❌ אסור | ✅ במקום זה |
|---------|------------|
| אפורים קרים (`#808080`) | ניטרלים חמים (`#8A7A72`) |
| יותר מ-2 צבעי מותג על אותו אלמנט | אש ראשי, זהב/יין משני |
| פונטים נוספים מחוץ לשלושה | Frank Ruhl / Cormorant / Assistant בלבד |
| פינות חדות (0px radius) | תמיד עגלגל |
| ניאון כחול/ירוק/סגול | פלטת אש-זהב-יין בלבד |
| אנימציות מהירות מדי (<0.15s) | מינימום `0.18s` |
| טקסט לבן טהור (`#FFFFFF`) על כהה | `#EAE0D3` (חמים) |

---

*מסמך זה מעודכן לגרסה 2.0. כל שינוי עתידי בטוקנים יתועד כאן.*
