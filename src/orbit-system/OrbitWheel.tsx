import { getOrbitItemPosition, getRenderedItemClockAngle } from "./angle.utils";
import { getThemeAssets } from "./theme.assets";
import type {
  OrbitItemConfig,
  OrbitItemId,
  ThemeMode,
} from "./orbit.types";

type OrbitWheelProps = {
  items: OrbitItemConfig[];
  rotationDeg: number;
  activeItemId: OrbitItemId | null;
  themeMode: ThemeMode;
  onItemEnter: (itemId: OrbitItemId) => void;
  onItemLeave: () => void;
  onItemClick?: (item: OrbitItemConfig) => void;
};

export default function OrbitWheel({
  items,
  rotationDeg,
  activeItemId,
  themeMode,
  onItemEnter,
  onItemLeave,
  onItemClick,
}: OrbitWheelProps) {
  const assets = getThemeAssets(themeMode);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {items.map((item) => {
        const renderedAngle = getRenderedItemClockAngle(
          item.baseAngleDeg,
          rotationDeg
        );

        const position = getOrbitItemPosition(renderedAngle, 39);
        const isActive = item.id === activeItemId;

        return (
          <button
            key={item.id}
            type="button"
            className={[
              "absolute z-20 grid h-[clamp(74px,10vw,102px)] w-[clamp(74px,10vw,102px)] place-items-center rounded-full border",
              "overflow-hidden backdrop-blur-[2px] transition-all duration-200",
              isActive
                ? "scale-110 border-white/70 shadow-[0_0_28px_rgba(255,255,255,0.25)]"
                : "scale-100 border-white/35 hover:scale-105",
            ].join(" ")}
            style={{
              ...position,
              backgroundColor:
                themeMode === "dark"
                  ? "rgba(9, 9, 14, 0.36)"
                  : "rgba(255, 255, 255, 0.34)",
            }}
            onMouseEnter={() => onItemEnter(item.id)}
            onMouseLeave={onItemLeave}
            onFocus={() => onItemEnter(item.id)}
            onBlur={onItemLeave}
            onClick={() => onItemClick?.(item)}
            aria-label={`עיגול ${item.label}`}
          >
            {/* רקע כוכבים לעיגול עצמו בלבד */}
            <span
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${assets.orbitStars})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.5,
              }}
            />

            <span
              className="absolute inset-0"
              style={{
                background:
                  themeMode === "dark"
                    ? "linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(0,0,0,0.10))"
                    : "linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
              }}
            />

            <span
              className="relative z-10 text-[clamp(1rem,1.6vw,1.2rem)] font-semibold"
              style={{
                color: themeMode === "dark" ? "#ffffff" : "#1a1a1a",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
