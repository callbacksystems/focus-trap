import BaseObserver from "observers/base_observer"

export default class PageObserver extends BaseObserver {
  #mutationObserver = new MutationObserver((mutations) => this.#pageChanged(mutations))

  start() {
    if (this.started) return

    this.#mutationObserver.observe(document.body, { childList: true, subtree: true, attributes: true })
    this.started = true
  }

  stop() {
    if (!this.started) return

    this.#mutationObserver.disconnect()
    this.started = false
  }

  #pageChanged(mutations) {
    if (this.#shouldReleaseFocus) return this.controller.releaseFocus()

    this.controller.captureFocus()
    if (this.#areChangesOutsideElementFrom(mutations)) this.controller.makeOutsideElementsInert()
  }

  #areChangesOutsideElementFrom(mutations) {
    return mutations.some(({ target }) => !this.element.contains(target))
  }

  get #shouldReleaseFocus() {
    return !this.element.isConnected || !this.element.checkVisibility()
  }
}
