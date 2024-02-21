import Controller from './controller'

export class FocusTrap {
  #controller

  constructor(element) {
    this.#controller = new Controller(element)
  }

  trapFocus() {
    this.#controller.trapFocus()
  }

  releaseFocus() {
    this.#controller.releaseFocus()
  }
}
