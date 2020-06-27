function getOptions(component) {
  if (!component.$vnode) {
    return;
  }

  return component.$vnode.componentOptions.Ctor.options;
}

function checkComponent (component) {
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

function checkProps (component) {
  const options = getOptions(component);
  if (!options || !options.props || typeof options.props !== 'object') {
    return;
  }

  const propsData = component.$options.propsData;

  Object.keys(options.props).forEach(key => {
      const value = options.props[key];
      if (!propsData[key] || !value.deprecated) {
        return;
      }

      if (typeof value.deprecated === "string") {
        printDeprecated(value.deprecated);
      } else {
        printDeprecated('Property ' + key +  ' in component ' + options.name + ' is deprecated');
      }
    }
  )
}


function printDeprecated (messag) {
  console.warn('[DEPRECATED] ' + message);
}

const VueDeprecate = {
  install: function (Vue) {
    Vue.mixin({
      created: function () {
        checkComponent(this);
        checkProps(this);
      }
    })
  }
};

export default VueDeprecate;
