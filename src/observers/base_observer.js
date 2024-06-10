export default class BaseObserver {
  started = false

  constructor(controller) {
    this.controller = controller
  }

  get element() { 
    return this.controller.element
  }
}
