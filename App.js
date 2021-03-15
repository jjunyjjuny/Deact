import Deact from "./core/Deact.js";
import { _ } from "./utils/dom.js";
import Child from "./components/Child.js";
import Child2 from "./components/Child2.js";
export default class App extends Deact {
  getTemplate() {
    return `
            <div class="parent">
                <div class="child"></div>
                <div class="child2"></div>
            <div>
        `;
  }
  mount() {
    const child = _.$(".child", this.$target);
    new Child(child);
    
    const child2 = _.$(".child2", this.$target);
    new Child2(child);
  }
}
