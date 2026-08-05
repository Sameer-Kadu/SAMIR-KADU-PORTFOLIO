/** Scrolls a module into view, honouring the reduced-motion preference. */
export function scrollToModule(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  // Move keyboard focus with the viewport so tabbing continues from the new
  // position rather than the top of the document.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
