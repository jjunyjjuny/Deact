import Deact from "./Deact.js";

export default class Model extends Deact {
  constructor($target) {
    super();
    this.$target = $target;
    this.$self = document.createElement("div");
    this.selfProps = null;
    this._createApp();
  }
  async _createApp() {
    await this.setup();
    this._render();
    this.mountChilrenComponents();
  }
  async setup() {
    this.state = {};
  }

  _render() {
    if (this._isDiffProps) {
      this.$self.innerHTML = this.getTemplate();
      this.$target.innerHTML = this.$self.innerHTML;
    }
    this._reRenderChildren();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this._render();
  }
}
