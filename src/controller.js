import { elementIsFocusable, visible } from "./helpers"

export default class {
  constructor(element) {
    this.element = element
    this.id = crypto.randomUUID()
    this.pageObserver = new MutationObserver(() => this.makeOutsideElementsInert())
    this.elementObserver = new MutationObserver(() => this.restoreFocus())
  }

  trapFocus() {
    if (this.isTrapped) return

    this.element.dataset.focusTrapId = this.id
    this.element.dataset.focusTrapRoot = true
    this.makeOutsideElementsInert()
    this.element.addEventListener("keydown", this.restrictTabNavigation)
    this.element.focus()
    this.elementObserver.observe(this.element, { childList: true, subtree: true })
    this.pageObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
  }

  releaseFocus() {
    if (!this.isRoot) return

    this.relatedElements.forEach(element => {
      element.removeAttribute("data-focus-trap-id")
      element.inert = false
    });
    this.element.removeEventListener("keydown", this.restrictTabNavigation)
    this.element.removeAttribute("data-focus-trap-root")
    this.elementObserver.disconnect()
    this.pageObserver.disconnect()
  }

  makeOutsideElementsInert() {
    if (this.shouldReleaseFocus()) return this.releaseFocus()

    let currentElement = this.element
    while (currentElement !== document.body) {
      Array.from(currentElement.parentElement?.children || []).filter(sibling => sibling !== currentElement && !sibling.inert && !sibling.hasAttribute("data-focus-trap-id")).forEach(element => {
        element.dataset.focusTrapId = this.id
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

  shouldReleaseFocus() {
    return !this.element.isConnected || !visible(this.element)
  }

  get isTrapped() {
    return this.element.hasAttribute("data-focus-trap-id")
  }

  get isRoot() {
    return this.element.dataset.focusTrapRoot && this.element.dataset.focusTrapId === this.id
  }

  get relatedElements() {
    return document.querySelectorAll(`[data-focus-trap-id="${this.id}"]`)
  }

  get tabbableElements() {
    return Array.from(this.element.querySelectorAll("*")).filter(elementIsFocusable)
  }

  get firstTabbableElement() {
    return this.tabbableElements[0]
  }

  get lastTabbableElement() {
    return this.tabbableElements[this.tabbableElements.length - 1]
  }
}
