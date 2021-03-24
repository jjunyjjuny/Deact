import Component from "../core/Component.js";
import Pengdori from "./Pengdori.js";

export default class Raccoon extends Component {
  selectPropsToUse() {
    const { raccoon } = this.props;
    this.selfProps = { raccoon };
  }
  getTemplate() {
    const { raccoon } = this.props;
    return `<h1>${raccoon}</h1>

          ${raccoon.map((rara) => this.C(Raccoon, rara)).join("")}

            <div class="pengdori">
            컴포넌트 자식 
            </div>`;
  }
  mountComponents() {
    this.createComponent(Pengdori, ".pengdori", () => {
      const { pengdori, changeHeaderName } = this.props;
      return { pengdori, changeHeaderName };
    });
  }
}

// getTemplate 연쇄.
// render는 isDiffProps로 true가 나오는 순간에 getTemplate 호출
// 추가 삭제도 고려해야한다. 