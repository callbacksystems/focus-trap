import BaseObserver from "observers/base_observer"

export default class FocusObserver extends BaseObserver {
  start() {
    if (this.started) return

    document.addEventListener("focus", this.captureFocus, { capture: true })
    this.started = true
  }

  stop() {
    if (!this.started) return

    document.removeEventListener("focus", this.captureFocus, { capture: true })
    this.started = false
  }

  captureFocus = () => this.controller.captureFocus()
}
