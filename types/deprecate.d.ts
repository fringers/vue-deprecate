import Vue, { PluginObject } from 'vue';

export declare interface VueDeprecateOptions {}

interface VueDeprecate extends PluginObject<VueDeprecateOptions> {
  enabledOnProduction?: boolean;
}

declare const VueDeprecate: VueDeprecate

export default VueDeprecate

