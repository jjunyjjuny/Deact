export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this._setup();
  }
  async _setup() {
    await this.init();
    this._render();
    this.setEventListener();
  }
  mountChildren() {}
  getTemplate() {
    return "";
  }
  init() {
    this.state = {};
  }
  _render() {
    this.$target.innerHTML = this.getTemplate();
    this.mountChildren();
  }
  setEventListener() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this._render();
    this.didMount();
  }
  didMount() {}
  addEventListener(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];

    this.$target.addEventListener(eventType, (e) => {
      if (!this.isTarget(e.target, children, selector)) return false;
      callback(e);
    });
  }
  _isTarget(target, children, selector) {
    return children.includes(target) || target.closest(selector);
  }
}
