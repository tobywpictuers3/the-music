import { useEffect, useMemo } from "react";
import type { PresenterConfig, PresenterLook } from "./orbit.types";

type HeroCenterPresenterProps = {
  presenter: PresenterConfig;
  activeLook: PresenterLook;
};

const HERO_LOOKS: PresenterLook[] = [
  "default",
  "upperRight",
  "right",
  "lowerRight",
  "lowerLeft",
  "left",
  "upperLeft",
];

export default function HeroCenterPresenter({
  presenter,
  activeLook,
}: HeroCenterPresenterProps) {
  const visibleLook = activeLook === "stageSign" ? "default" : activeLook;

  const currentVisual = useMemo(
    () => presenter.looks[visibleLook],
    [presenter, visibleLook]
  );

  useEffect(() => {
    const preloadTargets = HERO_LOOKS.map((look) => presenter.looks[look].src);

    preloadTargets.forEach((src) => {
      if (src === currentVisual.src) return;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [presenter, currentVisual.src]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[46%]">
        <div
          className="relative"
          style={{
            width: `min(${presenter.sizing.heroMaxWidth}, clamp(170px, 22vw, 260px))`,
            aspectRatio: "0.86 / 1.2",
          }}
        >
          <div className="absolute inset-x-[16%] bottom-[10%] h-[16%] rounded-full bg-black/28 blur-2xl" />
          <div className="absolute inset-[8%] rounded-full bg-white/5 blur-2xl" />

          <img
            key={`${presenter.id}-${visibleLook}`}
            src={currentVisual.src}
            alt={currentVisual.alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-150 ease-out"
            style={{
              willChange: "opacity",
              filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.24))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
