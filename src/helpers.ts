import Vue from 'vue';

export const getComponentOptions = (component: Vue) => {
  if (!component.$vnode) {
    return;
  }

  return (component.$vnode.componentOptions?.Ctor as any).options;
}
