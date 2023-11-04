export class FocusTrap {
  constructor(element) {
    this.element = element
    this.trapFocusIdentifier = crypto.randomUUID()
    this.pageObserver = new MutationObserver(() => this.makeOutsideElementsInert())
    this.elementObserver = new MutationObserver(() => this.restoreFocus())
  }

  trapFocus() {
    if (this.isTrapped) return
    this.element.dataset.trapFocusIdentifier = this.trapFocusIdentifier
    this.element.dataset.trapFocusIsRoot = true
    this.makeOutsideElementsInert()
    this.element.addEventListener("keydown", this.restrictTabNavigation)
    this.element.focus()
    this.elementObserver.observe(this.element, { childList: true, subtree: true })
    this.pageObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
  }

  releaseFocus() {
    if (!this.isRoot) return
    document.querySelectorAll(`[data-trap-focus-identifier="${this.trapFocusIdentifier}"]`).forEach(element => {
      element.removeAttribute("data-trap-focus-identifier")
      element.inert = false
    });
    this.element.removeEventListener("keydown", this.restrictTabNavigation)
    this.element.removeAttribute("data-trap-focus-is-root")
    this.elementObserver.disconnect()
    this.pageObserver.disconnect()
  }

  makeOutsideElementsInert() {
    let currentElement = this.element
    while (currentElement != document.body) {
      Array.from(currentElement.parentElement?.children || []).filter(sibling => sibling !== currentElement && !sibling.inert && !sibling.hasAttribute("data-trap-focus-identifier")).forEach(element => {
        element.dataset.trapFocusIdentifier = this.trapFocusIdentifier
        element.inert = true
      })
      currentElement = currentElement.parentElement
    }
  }

  restrictTabNavigation = (event) => {
    if (event.key === "Tab" && this.tabbableElements.length === 0) {
      event.preventDefault()
      event.stopPropagation()
    } else if (event.key === "Tab" && event.shiftKey && document.activeElement === this.firstTabbableElement) {
      event.preventDefault()
      event.stopPropagation()
      this.focusLastTabbableElement()
    } else if (event.key === "Tab" && !event.shiftKey && document.activeElement === this.lastTabbableElement) {
      event.preventDefault()
      event.stopPropagation()
      this.focusFirstTabbableElement()
    }
  }

  restoreFocus() {
    if (!this.element.contains(document.activeElement)) this.element.focus()
  }

  focusFirstTabbableElement() {
    if (this.tabbableElements.length === 0) return
    this.firstTabbableElement.focus()
  }

  focusLastTabbableElement() {
    if (this.tabbableElements.length === 0) return
    this.lastTabbableElement.focus()
  }

  get isTrapped() {
    return this.element.hasAttribute("data-trap-focus-identifier")
  }

  get isRoot() {
    return this.element.dataset.trapFocusIsRoot && this.element.dataset.trapFocusIdentifier === this.trapFocusIdentifier
  }

  get tabbableElements() {
    return Array.from(this.element.querySelectorAll("*")).filter((element) => {
      return element.tabIndex >= 0 && !element.inert && !element.disabled && visible(element)
    })
  }

  get firstTabbableElement() {
    return this.tabbableElements[0]
  }

  get lastTabbableElement() {
    return this.tabbableElements[this.tabbableElements.length - 1]
  }
}

function visible(element) {
  return (
    !(element.hidden || element.closest("[hidden]")) &&
    (!element.type || element.type !== "hidden") &&
    (element.offsetWidth > 0 || element.offsetHeight > 0)
  )
}
