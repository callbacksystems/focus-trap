import { elementIsTabbable } from "helpers"

export default class TabNavigation {
  constructor(controller) {
    this.controller = controller
  }

  startRestricting() {
    if (this.started) return

    this.element.addEventListener("keydown", this.restrict)
    this.started = true
  }

  stopRestricting() {
    if (!this.started) return

    this.element.removeEventListener("keydown", this.restrict)
    this.started = false
  }

  restrict = (event) => {
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

  focusFirstTabbableElement() {
    if (this.tabbableElements.length === 0) return

    this.firstTabbableElement.focus()
  }

  focusLastTabbableElement() {
    if (this.tabbableElements.length === 0) return

    this.lastTabbableElement.focus()
  }

  get element() {
    return this.controller.element
  }

  get tabbableElements() {
    return Array.from(this.element.querySelectorAll("*")).filter(elementIsTabbable)
  }

  get firstTabbableElement() {
    return this.tabbableElements[0]
  }

  get lastTabbableElement() {
    return this.tabbableElements[this.tabbableElements.length - 1]
  }
}
