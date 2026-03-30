/**
 * קובע:
 * - מתי המגיש הקבוע מופיע
 * - מתי הבאנר מופיע
 * - איזו בועה פעילה כרגע
 *
 * כאן החישוב הוא מתחילת הגלילה מההירו,
 * ולא רק אחרי שההירו נגמר.
 */

import { useEffect, useMemo, useState, type RefObject } from "react";
import type { BubbleConfig } from "./orbit.types";

type UseStickyGuideStateArgs = {
  heroRef: RefObject<HTMLElement | null>;
  bubbles: BubbleConfig[];
  headerOffsetPx: number;
};

export function useStickyGuideState({
  heroRef,
  bubbles,
  headerOffsetPx,
}: UseStickyGuideStateArgs) {
  const [afterHeroScrollPx, setAfterHeroScrollPx] = useState(0);

  useEffect(() => {
    const update = () => {
      const heroEl = heroRef.current;
      if (!heroEl) return;

      const heroStartY = Math.max(heroEl.offsetTop - headerOffsetPx, 0);
      const currentScrollY = window.scrollY;
      const delta = Math.max(currentScrollY - heroStartY, 0);

      setAfterHeroScrollPx(delta);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headerOffsetPx, heroRef]);

  const stickyVisible = afterHeroScrollPx > 24;
  const bannerVisible = stickyVisible;

  const activeBubble = useMemo(() => {
    return (
      bubbles.find(
        (bubble) =>
          afterHeroScrollPx >= bubble.showFromAfterHeroPx &&
          afterHeroScrollPx <= bubble.hideAfterHeroPx
      ) ?? null
    );
  }, [afterHeroScrollPx, bubbles]);

  return {
    stickyVisible,
    bannerVisible,
    afterHeroScrollPx,
    activeBubble,
  };
}
