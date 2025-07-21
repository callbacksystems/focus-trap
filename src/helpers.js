export function elementIsTabbable(element) {
  const inertOrDisabled = "[inert], :disabled"
  return !!element && element.checkVisibility() && element.closest(inertOrDisabled) == null && element.tabIndex >= 0 && typeof element.focus == "function"
}
