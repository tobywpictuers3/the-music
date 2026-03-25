import type { PresenterPoseKey } from "./orbit.types";

export type AngleSector = {
  from: number;
  to: number;
  pose: PresenterPoseKey;
};

export const ORBIT_SETTINGS = {
  sizeByVariant: {
    inner: {
      zoneMaxWidth: 780,
      zoneHeight: { base: 560, md: 660, lg: 740 },
      radius: { base: 168, md: 218, lg: 252 },
      itemSize: { base: 154, md: 198, lg: 222 },
      avatarSize: { base: 248, md: 320, lg: 388 },
      spinSeconds: 420,
    },
    home: {
      zoneMaxWidth: 920,
      zoneHeight: { base: 620, md: 720, lg: 820 },
      radius: { base: 192, md: 252, lg: 296 },
      itemSize: { base: 142, md: 178, lg: 202 },
      avatarSize: { base: 236, md: 304, lg: 360 },
      spinSeconds: 360,
    },
  },

  activeScale: 1.04,
  avatarFloatSeconds: 10,
  avatarSwitchMs: 120,

  compactRail: {
    collapsedOffsetPx: 92,
    expandedOffsetPx: 300,
    bubbleHoldMs: 2000,
    bubbleFadeMs: 6000,
    bubbleLoopMs: 15000,
  },
} as const;

/**
 * זוויות לפי ההגדרה שלך:
 * 12→2 = מעלה ימין
 * 2→4 = ימין
 * 4→6 = מטה ימין
 * 6→8 = מטה שמאל
 * 8→10 = שמאל
 * 10→12 = מעלה שמאל
 *
 * כאן 0° הוא "12 בשעון", והכיוון הוא עם כיוון השעון.
 */
export const ANGLE_SECTORS: AngleSector[] = [
  { from: 330, to: 360, pose: "upRight" },
  { from: 0, to: 30, pose: "upRight" },
  { from: 30, to: 90, pose: "right" },
  { from: 90, to: 150, pose: "downRight" },
  { from: 150, to: 210, pose: "downLeft" },
  { from: 210, to: 270, pose: "left" },
  { from: 270, to: 330, pose: "upLeft" },
];
