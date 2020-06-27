# vue-deprecate

## Installation

```
npm install vue-deprecate
```

## Setup
```js
import Vue from 'vue';
import VueDeprecate from 'vue-deprecate';

Vue.use(VueDeprecate);
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

## Features

You can:
- mark components as deprecated
- mark component properties as deprecated

A warning with the name of component and/or property is displayed in the console when using deprecated components or properties. 


