/** Move the page only when an opened desk object would start behind the
 * fixed header. Never scroll the clipped painting stage itself. */
export function revealDeskObject(region: HTMLElement | null): void {
  if (!region) return;
  const rect = region.getBoundingClientRect();
  const fits = rect.height <= window.innerHeight - 120;
  const delta =
    rect.top < 96
      ? rect.top - 96
      : fits && rect.bottom > window.innerHeight - 24
        ? rect.bottom - window.innerHeight + 24
        : 0;
  if (delta) window.scrollTo({ top: Math.max(0, window.scrollY + delta) });
}
