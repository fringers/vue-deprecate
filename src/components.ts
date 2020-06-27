import Vue from 'vue';
import { printDeprecated } from '@/logger';
import { getComponentOptions } from '@/helpers';

export const checkComponent = (component: Vue) => {
  const options = getComponentOptions(component);
  if (!options || !options.deprecated) {
    return;
  }

  if (typeof options.deprecated === "string") {
    printDeprecated(options.deprecated);
  } else {
    printDeprecated('Component ' + options.name + ' is deprecated');
  }
}
