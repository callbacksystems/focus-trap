export function elementIsFocusable(element) {
  const inertDisabledOrHidden = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])"
  return !!element && element.closest(inertDisabledOrHidden) == null && element.tabIndex >= 0 && typeof element.focus == "function"
}
