import type Lenis from "@studio-freight/lenis";

const SCROLL_EASE = (t: number) => 1 - Math.pow(1 - t, 4);

export function scrollToSection(
  id: string,
  lenis: Lenis | null,
  offset = -88
): void {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      duration: 1.4,
      easing: SCROLL_EASE,
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
}
