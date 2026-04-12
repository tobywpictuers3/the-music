import { ReactNode } from "react";
import darkStage from "@/assets/homepage/stage/darkstage.png";
import lightStage from "@/assets/homepage/stage/lightstage.png";

type InnerPageHeroProps = {
  eyebrow?: string;
  title: string | string[];
  intro?: string[];
  presenter?: ReactNode;
  circle: ReactNode;
  reverse?: boolean;
  className?: string;
};

export default function InnerPageHero({
  eyebrow,
  title,
  intro = [],
  presenter,
  circle,
  reverse = false,
  className = "",
}: InnerPageHeroProps) {
  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <section
      className={`relative overflow-hidden pb-20 pt-4 md:pb-28 md:pt-6 lg:pb-36 lg:pt-8 ${className}`}
      dir="rtl"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src={lightStage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center dark:hidden"
        />

        <img
          src={darkStage}
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover object-center dark:block"
        />

        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/45 to-transparent dark:from-background/22" />

        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background: `
              radial-gradient(circle at top center, hsl(var(--gold-light) / 0.18), transparent 34%),
              linear-gradient(
                to bottom,
                hsl(var(--background) / 0.08) 0%,
                hsl(var(--background) / 0.04) 44%,
                hsl(var(--background) / 0) 72%,
                hsl(var(--background)) 100%
              )
            `,
          }}
        />

        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background: `
              radial-gradient(circle at top center, hsl(var(--primary) / 0.12), transparent 32%),
              linear-gradient(
                to bottom,
                hsl(0 0% 0% / 0.16) 0%,
                hsl(0 0% 0% / 0.08) 46%,
                hsl(0 0% 0% / 0) 72%,
                hsl(var(--background)) 100%
              )
            `,
          }}
        />

        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background/34 to-transparent dark:from-background/26" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background/34 to-transparent dark:from-background/26" />

        <div className="absolute inset-0 shadow-[inset_0_0_110px_hsl(20_18%_8%_/_0.08)] dark:shadow-[inset_0_0_130px_hsl(0_0%_0%_/_0.24)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`grid min-h-[760px] grid-cols-1 gap-10 lg:min-h-[940px] lg:grid-cols-[1fr_1.08fr] lg:items-center md:min-h-[860px] ${
            reverse
              ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
              : ""
          }`}
        >
          <div className="relative z-10">
            <div className="max-w-2xl space-y-5">
              {eyebrow && (
                <div className="text-xs font-medium tracking-[0.34em] text-primary/90">
                  {eyebrow}
                </div>
              )}

              <div className="space-y-4">
                <h1 className="bg-gradient-to-b from-foreground via-foreground to-primary/82 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl">
                  {titleLines.map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      {index < titleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h1>

                {intro.length > 0 && (
                  <div className="space-y-3 text-lg leading-loose text-foreground/90 md:text-xl dark:text-foreground/84">
                    {intro.map((line, index) => (
                      <p key={`${line}-${index}`}>{line}</p>
                    ))}
                  </div>
                )}
              </div>

              {presenter && <div className="pt-2">{presenter}</div>}
            </div>
          </div>

          <div className="relative z-10 flex justify-center lg:justify-center">
            {circle}
          </div>
        </div>
      </div>
    </section>
  );
}
