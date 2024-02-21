import { visible } from "helpers"

export default class PageObserver {
  mutationObserver = new MutationObserver(() => this.pageChanged())

  constructor(controller) {
    this.controller = controller
  }

  start() {
    if (this.started) return

    this.mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
    this.started = true
  }

  stop() {
    if (!this.started) return

    this.mutationObserver.disconnect()
    this.started = false
  }

  pageChanged() {
    if (this.shouldReleaseFocus()) return this.controller.releaseFocus()

    this.controller.captureFocus()
    this.controller.makeOutsideElementsInert()
  }

  shouldReleaseFocus() {
    return !this.element.isConnected || !visible(this.element)
  }

  get element() {
    return this.controller.element
  }
}
