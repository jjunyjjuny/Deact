export default class Deact {
  constructor($target) {
    this.$target = $target;
    this.inheritances = {};
    this.familyTree = {};
    this.render();
  }
  render() {
    this.$target.innerHTML = this.getTemplate();
    this.familyTree = this.mount();
    this.didMount();
  }

  getTemplate() {}
  mount() {}
  didMount() {}
  renderComponenets($component, $target) {
    $target.appendChild($component.$target);
  }
  branch(componentName, Constructor, props, ...children) {
    this.combineProps(componentName, props);
    const component = new Constructor(this.getInheritances(componentName));
    const inheritances = component.getInheritances();
    this.setInheritances(inheritances);
    return {
      [componentName]: {
        component,
        children: children.reduce((acc, child) => {
          return { ...acc, ...this.branch(...child) };
        }, {}),
      },
    };
  }
  combineProps(componentName, newProps) {
    this.inheritances[componentName].props = {
      ...this.inheritances[componentName].props,
      ...newProps,
      ...{
        receiveComponentUpdateCall: this.receiveComponentUpdateCall.bind(this),
      },
    };
  }
  setInheritances(inheritances) {
    this.inheritances = { ...this.inheritances, ...inheritances };
  }
  getInheritances(componentName) {
    return this.inheritances[componentName] ?? {};
  }
  receiveComponentUpdateCall(component) {
    const inheritances = component.getInheritances();
    for (const inheritance in inheritances) {
      const { $target, props, name } = inheritances[inheritance];
      const prevProps = JSON.stringify(this.inheritances[name].props);

      this.combineProps(name, props);
      this.setTarget(name, $target);

      const nextProps = JSON.stringify(this.inheritances[name].props);
      const component = this.findComponentInTree(name, this.familyTree);
      const isUpdate = this.shouldComponentUpdate(prevProps, nextProps);
      component.init({ $target, nextProps, name }, isUpdate);
    }
  }
  setTarget(componentName, $newTarget) {
    this.inheritances[componentName].$target = $newTarget;
  }
  shouldComponentUpdate(prev, next) {
    return prev !== next;
  }
  findComponentInTree(name, tree) {
    if (tree[name]) {
      return tree[name]["component"];
    }
    for (const branch in tree) {
      const result = this.findComponentInTree(name, tree[branch]["children"]);
      if (result) {
        return result;
      }
    }
  }
  isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && JSON.stringify(obj) === "{}";
  }
  getChildrenOfTargetComponent(targetComponent, tree) {
    if (tree.length === 0) return;
    if (!Object.keys(tree).includes(targetComponent.name)) {
      Object.keys(tree).getChildrenOfTargetComponent(targetComponent, tree);
    }
    const branch = tree[targetComponent.name];
    if (branch.component === targetComponent) return branch.children;
    branch.children.forEach((child) => {
      return getChildrenOfTargetComponent(targetComponent, child);
    });
  }
}
