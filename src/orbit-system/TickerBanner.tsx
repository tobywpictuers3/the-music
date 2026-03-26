import { getThemeAssets } from "./theme.assets";
import type { ThemeMode, TickerBannerConfig } from "./orbit.types";

type TickerBannerProps = {
  themeMode: ThemeMode;
  config: TickerBannerConfig;
  visible: boolean;
};

export default function TickerBanner({
  themeMode,
  config,
  visible,
}: TickerBannerProps) {
  if (!config.enabled) return null;

  const assets = getThemeAssets(themeMode);
  const tickerText = `${config.items.join("   ✦   ")}   ✦   ${config.items.join(
    "   ✦   "
  )}`;

  return (
    <>
      <style>
        {`
          @keyframes orbitTickerMarquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}
      </style>

      <div
        className="pointer-events-none fixed inset-x-0 z-[60] transition-all duration-300"
        style={{
          bottom: `${config.bottomOffsetPx}px`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
        aria-hidden={!visible}
      >
        <div
          className="relative overflow-hidden border-y"
          style={{
            height: `${config.heightPx}px`,
            opacity: config.opacity,
            borderColor:
              themeMode === "dark"
                ? "rgba(255,255,255,0.14)"
                : "rgba(45,25,25,0.12)",
            backgroundColor:
              themeMode === "dark"
                ? "rgba(16,16,20,0.42)"
                : "rgba(255,255,255,0.42)",
          }}
        >
          {/* רקע רצפה */}
          <span
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${assets.tickerFloor})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 1,
            }}
          />

          <span
            className="absolute inset-0"
            style={{
              backdropFilter: "blur(4px)",
              background:
                themeMode === "dark"
                  ? "linear-gradient(to right, rgba(0,0,0,0.18), rgba(255,255,255,0.02), rgba(0,0,0,0.18))"
                  : "linear-gradient(to right, rgba(255,255,255,0.18), rgba(255,255,255,0.05), rgba(255,255,255,0.18))",
            }}
          />

          <div className="relative h-full overflow-hidden">
            <div
              className="flex h-full min-w-max items-center whitespace-nowrap"
              style={{
                animationName: "orbitTickerMarquee",
                animationDuration: `${config.loopDurationSec}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                width: "max-content",
              }}
            >
              <span
                className="px-8 text-[clamp(0.95rem,1.25vw,1.08rem)] font-medium tracking-[0.02em]"
                style={{
                  color: themeMode === "dark" ? "#ffffff" : "#1b1b1b",
                }}
              >
                {tickerText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
