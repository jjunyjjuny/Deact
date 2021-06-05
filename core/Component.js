import Deact from "./Deact.js";

export default class Component extends Deact {
  constructor($newtarget, newProps, tagName) {
    super();
    this.$target = null;
    this.selfProps = null;
    this.$self = document.createElement(tagName);
    this._render($newtarget, newProps);
    this.setEventLinstener();
  }

  componentDidMount() {}
  setEventLinstener() {}

  _render($newTarget, newProps) {
    this._setProps(newProps);
    const isDiffTarget = this._isDiffTarget($newTarget);
    const isDiffProps = this._isDiffProps;
    if (!isDiffTarget && !isDiffProps) {
      this._reRenderChildren();
      return;
    }

    if (isDiffTarget) {
      this.$target = $newTarget;
      this.$target.appendChild(this.$self);
    }

    if (isDiffProps) {
      this.$self.innerHTML = this.getTemplate();
      this.children = [];
      this.mountChilrenComponents();
    }
    this.componentDidMount();
    this._reRenderChildren();
  }
  _isDiffTarget($newTarget) {
    return this.$target !== $newTarget;
  }

  _setProps(newProps) {
    this.props = newProps;
  }
  addEventListener(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    this.$target.addEventListener(eventType, (e) => {
      if (!this._isTarget(children, e.target, selector)) return false;
      callback(e);
    });
  }
  _isTarget(children, target, selector) {
    return children.includes(target) || target.closest(selector);
  }
}
