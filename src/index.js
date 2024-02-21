import Controller from './controller'

export default class {
  #controller

  constructor(element) {
    this.#controller = new Controller(element)
  }

  start() {
    this.#controller.trapFocus()
  }

  stop() {
    this.#controller.releaseFocus()
  }
}
