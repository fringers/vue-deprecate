import Vue, { PluginObject } from 'vue';
import { checkComponent } from '@/components';
import { checkProps } from '@/properties';

interface VueDeprecateOptions {
  enabledOnProduction: boolean;
}

const defaultOptions: VueDeprecateOptions = {
  enabledOnProduction: false,
}

const VueDeprecate: PluginObject<VueDeprecateOptions> = {
  install: function (vue: typeof Vue, options: VueDeprecateOptions = defaultOptions) {
    vue.mixin({
      created: function () {
        if (process.env.NODE_ENV === 'production' && options && !options.enabledOnProduction) {
          return;
        }

        // TODO: fix typings
        checkComponent(this as Vue);
        checkProps(this as Vue);
      }
    })
  }
};

export default VueDeprecate;
