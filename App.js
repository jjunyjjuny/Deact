import Deact from "./core/Deact.js";
import Raccoon from "./components/Raccoon.js";
import { _ } from "./utils/dom.js";
export default class App extends Deact {
  setup() {
    this.state = {
      sample: "sample",
      dd: "DD",
      raccoon: "raccoon",
      pengdori: true,
    };
  }
  setPropsFromState() {
    const { sample, dd } = this.state;
    this.props = {
      sample,
      dd,
    };
  }
  getTemplate() {
    const { sample, dd } = this.props;
    return `
            <header>${dd}의 ${sample} Page</header>
            <div id="raccoon"></div>
        `;
  }
  mountComponents() {
    this.createComponent(Raccoon, "#raccoon", () => {
      const { raccoon, pengdori } = this.state;
      return {
        raccoon,
        pengdori,
        changeHeaderName: this.changeHeaderName.bind(this),
      };
    });
  }
  changeHeaderName() {
    const { pengdori } = this.state;
    this.updateState({ pengdori: !pengdori });
  }
}
