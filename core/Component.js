export default class Component {
  constructor({ $target, props, name }) {
    this.$target = $target;
    this.name = name;
    this.$componentBox = document.createElement("div");
    this.setup();
    this.setState(props, false);
    this.didMount();
  }

  init({ $target, props, name }, isUpdate) {
    this.$target = $target;
    this.name = name;
    isUpdate ? this.setState(props) : this.render(false);
  }
  setup() {}
  didMount() {
    this.setEvents();
  }

  render(isUpdate = true) {
    isUpdate ? (this.$componentBox.innerHTML = this.getTemplate()) : null;
    this.$target.appendChild(this.$componentBox);
  }
  getTemplate() {}

  setEvents() {}
  addEvent(eventType, selector, callback) {
    const children = [...this.$componentBox.querySelectorAll(selector)];
    const isTarget = (target) => {
      return children.includes(target) || target.closest(selector);
    };
    this.$componentBox.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
  setState(newState, isUpdate = true) {
    this.state = { ...this.state, ...newState };
    this.render();

    if (isUpdate) {
      const { receiveComponentUpdateCall } = this.state;
      receiveComponentUpdateCall(this);
    }
  }
  getInheritances() {
    return {};
  }
  setTarget($target) {
    this.$target = $target;
  }
}
