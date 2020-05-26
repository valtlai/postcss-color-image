# PostCSS Solid-Color Image [<img src="https://api.postcss.org/logo.svg" alt="PostCSS" width="90" height="90" align="right">](https://github.com/postcss/postcss)

[![NPM](https://img.shields.io/npm/v/postcss-color-image.svg)](https://www.npmjs.com/package/postcss-color-image)
[![License](https://img.shields.io/npm/l/postcss-color-image.svg)](LICENSE)

This PostCSS plugin lets you use a solid color as an image, following the
[CSS Images](https://drafts.csswg.org/css-images-4/#color-images)
specification.

```css
.box {
   background: image(red);
}

/* becomes */

.box {
   background: linear-gradient(red, red);
}
```

## Usage

Add the package in your project:

```sh
npm install postcss-color-image --save-dev
```

Use it as a PostCSS plugin
(see the [instructions](https://github.com/postcss/postcss#usage))
or directly:

```js
const colorImage = require('postcss-color-image');

colorImage.process(YOUR_CSS /*, processOptions, pluginOptions */);
```
