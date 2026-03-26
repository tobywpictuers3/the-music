import SpeechBubbleLayer from "./SpeechBubbleLayer";
import type {
  BubbleConfig,
  PresenterConfig,
  ThemeMode,
} from "./orbit.types";

type StickyGuideProps = {
  presenter: PresenterConfig;
  themeMode: ThemeMode;
  visible: boolean;
  activeBubble: BubbleConfig | null;
  bannerHeightPx: number;
  bannerBottomOffsetPx: number;
};

export default function StickyGuide({
  presenter,
  themeMode,
  visible,
  activeBubble,
  bannerHeightPx,
  bannerBottomOffsetPx,
}: StickyGuideProps) {
  return (
    <div
      className="pointer-events-none fixed left-[clamp(10px,2vw,28px)] z-[70] transition-all duration-300"
      style={{
        bottom: `${bannerHeightPx + bannerBottomOffsetPx + 16}px`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
      }}
      aria-hidden={!visible}
    >
      <div className="relative">
        <img
          src={presenter.looks.default.src}
          alt={presenter.looks.default.alt}
          className="h-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.22)]"
          style={{
            width: presenter.sizing.stickyWidth,
            maxWidth: presenter.sizing.stickyMaxWidth,
          }}
        />

        <SpeechBubbleLayer bubble={activeBubble} themeMode={themeMode} />
      </div>
    </div>
  );
}
