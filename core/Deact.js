export default class Deact {
    constructor() {
      this.children = [];
    }
    setSelfProps() {
      this.selfProps = {};
    }
    getTemplate() {}
    mountChilrenComponents() {}
    createComponent(Constructor, targetSelector, getProps, tagName = 'div') {
      const $target = this.$target.querySelector(targetSelector);
      const props = getProps();
      const component = new Constructor($target, props, tagName);
      this.addToChildren(targetSelector, getProps, component);
    }
    get _isDiffProps() {
      const prevProps = this.selfProps;
      this.setSelfProps();
      const nextProps = this.selfProps;
      return JSON.stringify(prevProps) !== JSON.stringify(nextProps);
    }
    
    addToChildren(targetSelector, getProps, component) {
      this.children.push({ targetSelector, getProps, component });
    }
  
    _reRenderChildren() {
      this.children.forEach(({ targetSelector, getProps, component }) => {
        const $target = this.$target.querySelector(targetSelector);
        component._render($target, getProps());
      });
    }
    deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  }
  