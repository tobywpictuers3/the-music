/**
 * עוזר לדף הבית.
 * במקום להגדיר את דמויות הבמה בכמה מקומות,
 * דף הבית יכול לקחת מכאן:
 * - route
 * - presenterId
 * - תמונת stageSign
 */

import { pagesRegistry } from "./pages.registry";
import { presentersRegistry } from "./presenters.registry";

export function getHomepageStageEntries() {
  const order = [
    "students",
    "blogs",
    "orchestras",
    "performances",
    "about",
    "sheetMusic",
    "contact",
  ] as const;

  return order.map((pageId) => {
    const page = pagesRegistry[pageId];
    const presenter = presentersRegistry[page.presenterId];

    return {
      pageId: page.pageId,
      route: page.route,
      presenterId: page.presenterId,
      label: page.hero.titleLines[0],
      signImage: presenter.looks.stageSign.src,
      signAlt: presenter.looks.stageSign.alt,
      sizing: presenter.sizing.stageWidth,
      maxSizing: presenter.sizing.stageMaxWidth,
    };
  });
}
