<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200"
      src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>StyleText Loader</h1>
</div>

# styletext-loader

get CSS text and support css module.

## Getting Started

To begin, you'll need to install `styletext-loader`:

```console
npm install --save-dev styletext-loader
```

It's recommended to combine `styletext-loader` with the [`css-loader`](https://github.com/webpack-contrib/css-loader)

Then add the loader to your `webpack` config. For example:

**style.css**

```css
body {
  background: green;
}
```

**component.js**

```js
import { cssText, styles} from './style.css';
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['styletext-loader', 'css-loader'],
      },
    ],
  },
};
```

## Options

|       Name       |         Type         |  Default   | Description                                              |
| :--------------: | :------------------: | :--------: | :------------------------------------------------------- |
|  **`esModule`**  |     `{Boolean}`      |  `false`   | Use ES modules syntax                                    |


### `esModule`

Type: `Boolean`
Default: `false`

By default, `styletext-loader` generates JS modules that use the CommonJS modules syntax.
There are some cases in which using ES modules is beneficial, like in the case of [module concatenation](https://webpack.js.org/plugins/module-concatenation-plugin/) and [tree shaking](https://webpack.js.org/guides/tree-shaking/).

You can enable a ES module syntax using:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'styletext-loader',
            options: { esModule: true },
          },
          {
            loader: 'css-loader',
            options: { modules: false,esModule:true }
          },
        ]
      },
    ],
  },
};
```


