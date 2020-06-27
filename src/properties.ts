import Vue from 'vue';
import { printDeprecated } from '@/logger';
import { getComponentOptions } from '@/helpers';

export const checkProps = (component: Vue) => {
  const options = getComponentOptions(component);
  if (!options || !options.props || typeof options.props !== 'object') {
    return;
  }

  const propsData = component.$options.propsData as any;
  if (!propsData) {
    return
  }

  Object.keys(options.props).forEach(key => {
      const value = options.props[key];
      if (!propsData[key] || !value.deprecated) {
        return;
      }

      if (typeof value.deprecated === "string") {
        printDeprecated(value.deprecated);
      } else {
        printDeprecated(`Property ${key} in component ${options.name} is deprecated`);
      }
    }
  )
}
