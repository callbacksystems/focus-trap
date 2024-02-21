export function elementIsTabbable(element) {
  const inertDisabledOrHidden = "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])"
  return !!element && element.closest(inertDisabledOrHidden) == null && element.tabIndex >= 0 && typeof element.focus == "function"
}

export function visible(element) {
  return (
    !(element.hidden || element.closest("[hidden]")) &&
    (!element.type || element.type !== "hidden") &&
    (element.offsetWidth > 0 || element.offsetHeight > 0)
  )
}
