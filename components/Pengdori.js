import Component from "../core/Component.js";

export default class Pengdori extends Component {
  selectPropsToUse() {
    const { pengdori, changeHeaderName } = this.props;
    this.selfProps = { pengdori, changeHeaderName };
  }
  getTemplate() {
    const { pengdori } = this.selfProps;
    return `<button class="btn">${pengdori ? "true" : "false"}</button>`;
  }

  setEventLinstener() {
    const { changeHeaderName } = this.selfProps;
    this.addEventLinstener("click", ".btn", ({ target }) => {
      changeHeaderName();
    });
  }
}
