import type { ReactNode } from "react";
import CircleOrbit from "@/components/orbit/CircleOrbit";
import type {
  OrbitItem,
  PresenterAssets,
} from "@/components/orbit/orbit.types";

import red3 from "@/assets/red3.png";
import lightStage from "@/assets/homepage/stage/lightstage.png";
import darkStage from "@/assets/homepage/stage/darkstage.png";

type FloatingBubbleMessage = {
  id: string;
  text: string;
};

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

  // נשמרים כדי לא לשבור דפים שכבר עודכנו למבנה החדש יותר
  heroId?: string;
  compactLabel?: string;
  floatingMessages?: FloatingBubbleMessage[];
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
  heroId,
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
      <CircleOrbit
        items={orbitItems}
        presenterAssets={presenterAssets}
        lightTextureSrc={red3}
        presenterAlt={presenterAlt}
        selectedId={activeOrbitId}
        onItemClick={onOrbitItemClick}
        center={center}
      />
    </div>
  );

  return (
    <section
      id={heroId}
      className={cn("relative isolate bg-background", className)}
    >
      <div className="relative z-0 w-full">
        <img
          src={lightStage}
          alt=""
          aria-hidden="true"
          className="block w-full h-auto select-none dark:hidden"
        />
        <img
          src={darkStage}
          alt=""
          aria-hidden="true"
          className="hidden w-full h-auto select-none dark:block"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(90px,12vw,180px)] bg-gradient-to-b from-transparent via-background/[0.08] to-background dark:via-background/[0.1] dark:to-background" />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(70px,9vw,140px)] backdrop-blur-[1.5px]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9))",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9))",
          }}
        />
      </div>

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
