export type LegacyAvatarKey =
  | "leftMid"
  | "leftSide"
  | "rightMid"
  | "rightSide"
  | "up"
  | "down";

export type PresenterPoseKey =
  | "front"
  | "upRight"
  | "right"
  | "downRight"
  | "downLeft"
  | "left"
  | "upLeft";

export type AvatarKey = PresenterPoseKey | LegacyAvatarKey;

export type OrbitItem = {
  id: string;
  indexLabel: string;
  angle: number;
  orbitTitle: string;
  orbitNote: string;
  sectionId?: string;
  href?: string;
};

export type PresenterAssets = Partial<Record<AvatarKey, string>> & {
  front: string;
};

export type ResolvedPresenterAssets = Record<PresenterPoseKey, string>;

export type OrbitVariant = "inner" | "home";

export type FloatingBubbleMessage = {
  id: string;
  text: string;
};
