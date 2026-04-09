import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { getThemeAssets } from "./theme.assets";
import type { BubbleConfig, ThemeMode } from "./orbit.types";

type SpeechBubbleLayerProps = {
  bubble: BubbleConfig | null;
  themeMode: ThemeMode;
};

export default function SpeechBubbleLayer({
  bubble,
  themeMode,
}: SpeechBubbleLayerProps) {
  const assets = getThemeAssets(themeMode);

  const [dismissedBubbleId, setDismissedBubbleId] = useState<string | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const fullTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const currentBubbleIdRef = useRef<string | null>(null);

  function clearTimers() {
    if (fullTimerRef.current) {
      window.clearTimeout(fullTimerRef.current);
      fullTimerRef.current = null;
    }

    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }

  function startLifecycle() {
    clearTimers();
    setIsFading(false);
    setIsRendered(true);

    fullTimerRef.current = window.setTimeout(() => {
      setIsFading(true);
    }, 2000);

    fadeTimerRef.current = window.setTimeout(() => {
      setIsRendered(false);
      setIsFading(false);
    }, 5000);
  }

  function closeImmediately() {
    clearTimers();
    setIsRendered(false);
    setIsFading(false);

    if (bubble?.id) {
      setDismissedBubbleId(bubble.id);
    }
  }

  useEffect(() => {
    if (!bubble) {
      clearTimers();
      setIsRendered(false);
      setIsFading(false);
      currentBubbleIdRef.current = null;
      return;
    }

    const isNewBubble = currentBubbleIdRef.current !== bubble.id;

    if (isNewBubble) {
      currentBubbleIdRef.current = bubble.id;
      setDismissedBubbleId(null);
      startLifecycle();
      return;
    }

    if (dismissedBubbleId === bubble.id) {
      setIsRendered(false);
      setIsFading(false);
      return;
    }

    if (!isRendered && !isFading) {
      startLifecycle();
    }

    return () => {
      clearTimers();
    };
  }, [bubble, dismissedBubbleId, isRendered, isFading]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  if (!bubble) return null;
  if (dismissedBubbleId === bubble.id) return null;
  if (!isRendered && !isFading) return null;

  const transitionMs = isFading ? 3000 : bubble.enterMs ?? 180;
  const bubbleWidth = Math.min(bubble.maxWidthPx ?? 360, 360);

  return (
    <div
      className="absolute left-[calc(100%+18px)] bottom-[122px] z-50"
      style={{
        transform: `translate(${bubble.offsetX ?? 0}px, ${bubble.offsetY ?? 0}px)`,
      }}
      onMouseEnter={() => {
        clearTimers();
        setIsFading(false);
      }}
      onMouseLeave={() => {
        startLifecycle();
      }}
    >
      <div
        className="relative overflow-visible rounded-[24px] border px-5 py-5 shadow-[0_22px_54px_rgba(0,0,0,0.24)] backdrop-blur-sm"
        style={{
          width: `min(${bubbleWidth}px, 23vw)`,
          minWidth: "280px",
          minHeight: "220px",
          borderColor:
            themeMode === "dark"
              ? "rgba(255,255,255,0.20)"
              : "rgba(120,30,30,0.18)",
          backgroundColor:
            themeMode === "dark"
              ? "rgba(92, 18, 32, 0.80)"
              : "rgba(158, 41, 55, 0.74)",
          opacity: isFading ? 0 : 1,
          transform: isFading ? "translateY(8px)" : "translateY(0px)",
          transition: `opacity ${transitionMs}ms linear, transform ${transitionMs}ms linear`,
        }}
      >
        <span
          className="absolute inset-0 rounded-[24px]"
          style={{
            backgroundImage: `url(${assets.bubbleStarsRed})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.42,
          }}
        />

        <button
          type="button"
          onClick={closeImmediately}
          aria-label="סגירת בועה"
          className="absolute left-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/28 text-white ring-1 ring-white/10 transition hover:bg-black/40"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-10 flex min-h-[180px] flex-col justify-center text-right">
          <div
            className="text-[0.98rem] leading-8"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 14px rgba(0,0,0,0.24)",
            }}
          >
            {bubble.text}
          </div>
        </div>

        <span
          className="absolute bottom-7 -left-3 h-5 w-5 rotate-45 rounded-[4px]"
          style={{
            backgroundColor:
              themeMode === "dark"
                ? "rgba(92, 18, 32, 0.86)"
                : "rgba(158, 41, 55, 0.82)",
          }}
        />
      </div>
    </div>
  );
}
