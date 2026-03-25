import CircleOrbit from "@/components/orbit/CircleOrbit";
import type {
OrbitItem,
PresenterAssets,
} from "@/components/orbit/orbit.types";

import red3 from "@/assets/red3.png";
import lightStage from "@/assets/homepage/stage/lightstage.png";
import darkStage from "@/assets/homepage/stage/darkstage.png";

type InnerPageOrbitHeroProps = {
eyebrow: string;
title: string[];
intro: string[];
support?: ReactNode;
orbitItems: OrbitItem[];
presenterAssets: PresenterAssets;
activeOrbitId?: string | null;
onOrbitItemClick?: (item: OrbitItem) => void;
presenterAlt?: string;
reverse?: boolean;
className?: string;
center?: ReactNode;
};

function cn(...classes: Array<string | false | null | undefined>) {
return classes.filter(Boolean).join(" ");
}

export default function InnerPageOrbitHero({
eyebrow,
title,
intro,
support,
orbitItems,
presenterAssets,
activeOrbitId = null,
onOrbitItemClick,
presenterAlt = "מגישת הדף",
reverse = false,
className = "",
center,
}: InnerPageOrbitHeroProps) {
const textBlock = (
<div className={cn(reverse && "lg:order-2", "max-w-2xl space-y-5")}>
<div className="text-xs font-medium tracking-[0.34em] text-primary/85">
{eyebrow}
</div>

  <h1 className="bg-gradient-to-b from-foreground via-foreground to-primary/85 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
    {title.map((line, index) => (
      <span key={`${line}-${index}`}>
        {line}
        {index < title.length - 1 && <br />}
      </span>
    ))}
  </h1>

  <div className="space-y-3 text-lg leading-loose text-foreground/92 md:text-xl">
    {intro.map((line, index) => (
      <p key={`${line}-${index}`}>{line}</p>
    ))}
  </div>

  {support}
</div>

);

const orbitBlock = (
<div className={cn(reverse && "lg:order-1")}>
<CircleOrbit items={orbitItems} presenterAssets={presenterAssets} centerTextureSrc={red3} presenterAlt={presenterAlt} selectedId={activeOrbitId} onItemClick={onOrbitItemClick} center={center} />
</div>
);

return (
<section className={cn("relative isolate bg-background", className)}>
{/* =====================================================
STAGE IMAGE
התמונה נשמרת מלאה, בלי חיתוך ובלי object-cover
===================================================== */}
<div className="relative z-0 w-full">
<img src={lightStage} alt="" aria-hidden="true" className="block w-full h-auto select-none dark:hidden" />
<img src={darkStage} alt="" aria-hidden="true" className="hidden w-full h-auto select-none dark:block" />

    {/* מעבר תחתון עדין ופשוט */}
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(72px,9vw,130px)]"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 46%, hsl(var(--background) / 0.16) 74%, hsl(var(--background)) 100%)",
      }}
    />
  </div>

  {/* =====================================================
      DESKTOP OVERLAY
      בדסקטופ התוכן יושב מעל התמונה
      ===================================================== */}
  <div className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
    <div className="mx-auto flex h-full max-w-7xl items-center px-6 xl:px-8">
      <div
        className={cn(
          "pointer-events-auto grid w-full grid-cols-[1.02fr_0.98fr] gap-10 xl:gap-14",
          reverse && "grid-cols-[0.98fr_1.02fr]"
        )}
      >
        {textBlock}
        {orbitBlock}
      </div>
    </div>
  </div>

  {/* =====================================================
      MOBILE / TABLET
      במסכים קטנים התוכן יורד מתחת לתמונה
      ===================================================== */}
  <div className="relative z-10 lg:hidden">
    <div className="mx-auto max-w-7xl px-6 py-8 md:py-10">
      <div className="grid grid-cols-1 gap-10">
        {textBlock}
        {orbitBlock}
      </div>
    </div>
  </div>
</section>

);
}
