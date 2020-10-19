# vue-deprecate

![Node.js CI](https://github.com/fringers/vue-deprecate/workflows/Node.js%20CI/badge.svg?branch=master)

## Installation

```
npm install vue-deprecate
```

## Setup

### Default setup

```js
import Vue from 'vue';
import VueDeprecate from 'vue-deprecate';

Vue.use(VueDeprecate);
```


### Nuxt.js setup

Create file `plugins/vue-deprecate.js`:
```js
import Vue from 'vue'
import VueDeprecate from 'vue-deprecate';

Vue.use(VueDeprecate);
```
Then add the file path inside the `plugins` key of `nuxt.config.js`:
```js
export default {
  plugins: ['@/plugins/vue-deprecate.js']
}
```

## Usage

Deprecate component:
```js
{
  name: 'ExampleComponent',
  deprecated: true,  // this component is deprecated
  data: function () {
    return {
      count: 0
    }
  },
  template: '<div>this is deprecated component {{ count }}</div>'
}
```

Add custom message:
```js
{
  name: 'ExampleComponent',
  deprecated: 'ExampleComponent is deprecated. Use another component.',  // this component is deprecated
  data: function () {
    return {
      count: 0
    }
  },
  template: '<div>this is deprecated component {{ count }}</div>'
}
```

Deprecate property:
```js
{
  name: 'ExampleComponent',
  props: {
    title: String,
    header: {
      type: String,
      deprecated: true, // this property is deprecated
    },
  },
  data: function () {
      return {
        count: 0
      }
  },
  template: '<div>this is component {{ count }}</div>'
};
```

### Usage with property decorators (like vue-property-decorator/nuxt-property-decorator)

```js
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  deprecated: true,
})
export default class Test extends Vue {
}
```


## Features

You can:
- mark components as deprecated
- mark component properties as deprecated

A warning with the name of component and/or property is displayed in the console when using deprecated components or properties. 


