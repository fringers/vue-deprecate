import Vue from 'vue'

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    deprecated?: boolean | string;
  }

  interface PropOptions<T=any> {
    deprecated?: boolean | string;
  }
}
