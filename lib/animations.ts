/** Soft OhhMyAds-style motion presets */
export const EASE_SOFT = "power1.inOut";
export const EASE_OUT = "power2.out";
export const EASE_SMOOTH = "expo.out";

export const REVEAL = {
  y: 48,
  rotateX: 8,
  opacity: 0,
  transformPerspective: 1200,
  transformOrigin: "center top",
};

export const REVEAL_TO = {
  y: 0,
  rotateX: 0,
  opacity: 1,
  duration: 1.1,
  ease: EASE_SOFT,
};

export const SCROLL_SCRUB = 1.2;
