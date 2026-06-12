/** Scroll a horizontal tab strip without moving the page (avoids scrollIntoView jank). */
export function scrollTabStrip(
  container: HTMLElement | null,
  activeSelector: string
): void {
  if (!container) return;

  const activeEl = container.querySelector(activeSelector) as HTMLElement | null;
  if (!activeEl) return;

  const target =
    activeEl.offsetLeft - container.clientWidth / 2 + activeEl.clientWidth / 2;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isMobile = window.matchMedia("(max-width: 899px)").matches;

  container.scrollTo({
    left: Math.max(0, target),
    behavior: prefersReducedMotion || isMobile ? "auto" : "smooth",
  });
}
