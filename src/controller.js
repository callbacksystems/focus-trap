import { FocusObserver, PageObserver } from "observers"
import TabNavigation from "tab_navigation"

export default class Controller {
  id = crypto.randomUUID()
  focusObserver = new FocusObserver(this)
  pageObserver = new PageObserver(this)
  tabNavigation = new TabNavigation(this)

  constructor(element) {
    this.element = element
  }

  trapFocus() {
    if (this.isTrapped) return

    this.element.dataset.focusTrapId = this.id
    this.element.dataset.focusTrapRoot = true
    this.captureFocus()
    this.makeOutsideElementsInert()
    this.focusObserver.start()
    this.pageObserver.start()
    this.tabNavigation.startRestricting()
  }

  releaseFocus() {
    if (!this.isRoot) return

    this.tabNavigation.stopRestricting()
    this.pageObserver.stop()
    this.focusObserver.stop()
    this.element.removeAttribute("data-focus-trap-root")
    this.relatedElements.forEach(element => {
      element.removeAttribute("data-focus-trap-id")
      element.inert = false
    });
  }

  makeOutsideElementsInert() {
    if (!this.isRoot) return

    let currentElement = this.element
    while (currentElement !== document.body) {
      Array.from(currentElement.parentElement?.children || []).filter(sibling => sibling !== currentElement && !sibling.inert && !sibling.hasAttribute("data-focus-trap-id")).forEach(element => {
        element.dataset.focusTrapId = this.id
        element.inert = true
      })
      currentElement = currentElement.parentElement
    }
  }

  captureFocus() {
    if (this.isRoot && !this.element.contains(document.activeElement)) this.element.focus()
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
}
