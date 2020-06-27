import Vue, { PluginObject } from 'vue';

function getOptions(component: Vue) {
  if (!component.$vnode) {
    return;
  }

  return (component.$vnode.componentOptions?.Ctor as any).options;
}

function checkComponent (component: Vue) {
  const options = getOptions(component);
  if (!options || !options.deprecated) {
    return;
  }

  if (typeof options.deprecated === "string") {
    printDeprecated(options.deprecated);
  } else {
    printDeprecated('Component ' + options.name + ' is deprecated');
  }
}

function checkProps (component: Vue) {
  const options = getOptions(component);
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


function printDeprecated (message: string) {
  console.warn(`[DEPRECATED] ${message}`);
}

interface VueDeprecateOptions {

}

const VueDeprecate: PluginObject<VueDeprecateOptions> = {
  install: function (vue: typeof Vue, options?: VueDeprecateOptions) {
    vue.mixin({
      created: function () {
        // TODO: fix typings
        checkComponent(this as Vue);
        checkProps(this as Vue);
      }
    })
  }
};

export default VueDeprecate;
