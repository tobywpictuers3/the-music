import { ANGLE_SECTORS } from "./orbit.constants";
import type {
  PresenterPoseKey,
  PresenterAssets,
  ResolvedPresenterAssets,
  LegacyAvatarKey,
} from "./orbit.types";

/* ── angle helpers ── */

/** Returns degrees 0-360 measured clockwise from 12-o'clock. */
export function angleFromTopClockwise(dx: number, dy: number): number {
  const rad = Math.atan2(dx, -dy); // 0 = up, CW positive
  return ((rad * 180) / Math.PI + 360) % 360;
}

/** Map a clockwise-from-top angle to the matching presenter pose. */
export function resolvePoseFromAngle(angle: number): PresenterPoseKey {
  const norm = ((angle % 360) + 360) % 360;
  for (const sector of ANGLE_SECTORS) {
    if (sector.from <= norm && norm < sector.to) return sector.pose;
  }
  return "front";
}

/* ── presenter asset resolution ── */

const LEGACY_MAP: Record<LegacyAvatarKey, PresenterPoseKey> = {
  leftMid: "left",
  leftSide: "upLeft",
  rightMid: "right",
  rightSide: "upRight",
  up: "upRight",
  down: "downRight",
};

/**
 * Accepts a PresenterAssets bag (which may use legacy keys) and returns a
 * fully-resolved record keyed by every PresenterPoseKey, falling back to
 * `front` for any missing pose.
 */
export function buildResolvedPresenterAssets(
  raw: PresenterAssets
): ResolvedPresenterAssets {
  const result: Partial<Record<PresenterPoseKey, string>> = {
    front: raw.front,
  };

  // Apply legacy mappings first
  for (const [legacy, pose] of Object.entries(LEGACY_MAP) as [
    LegacyAvatarKey,
    PresenterPoseKey,
  ][]) {
    if (raw[legacy] && !result[pose]) {
      result[pose] = raw[legacy];
    }
  }

  // Apply direct pose keys
  const POSES: PresenterPoseKey[] = [
    "front",
    "upRight",
    "right",
    "downRight",
    "downLeft",
    "left",
    "upLeft",
  ];

  for (const pose of POSES) {
    if (raw[pose]) result[pose] = raw[pose];
  }

  // Fill missing poses with front
  for (const pose of POSES) {
    if (!result[pose]) result[pose] = raw.front;
  }

  return result as ResolvedPresenterAssets;
}

/** Given an angle, resolve which asset + pose to use. */
export function resolveAssetByAngle(
  angle: number,
  resolved: ResolvedPresenterAssets
): { pose: PresenterPoseKey; src: string } {
  const pose = resolvePoseFromAngle(angle);
  return { pose, src: resolved[pose] };
}

/* ── preloading ── */

export function preloadImages(srcs: string[]): void {
  for (const src of srcs) {
    const img = new Image();
    img.src = src;
  }
}
