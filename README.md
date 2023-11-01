# PostCSS Solid-Color Image [<img src="https://api.postcss.org/logo.svg" alt="PostCSS" width="90" height="90" align="right">](https://github.com/postcss/postcss)

[![NPM](https://img.shields.io/npm/v/postcss-color-image.svg)](https://www.npmjs.com/package/postcss-color-image)

This PostCSS plugin lets you use a solid color as an image, following the
[CSS Images](https://drafts.csswg.org/css-images-4/#color-images) specification.

```css
.box {
	background: image(red);
}

/* becomes */

.box {
	background: linear-gradient(red 0 0);
}
```

## Install

```
npm install postcss-color-image
```

## Usage

```js
import postcss from 'postcss';
import colorImage from 'postcss-color-image';
// OR
const postcss = require('postcss');
const colorImage = require('postcss-color-image');

await postcss([colorImage]).process(YOUR_CSS);
```

## Options

### `compat: true`

Instead of adding a double-position color stop,
duplicate the color in the output gradient for wider browser support.

```css
.box {
	background: linear-gradient(red, red);
}
```

### `preserve: true`

Keep the original CSS declaration alongside the transformed one.

```css
.box {
	background: linear-gradient(red 0 0);
	background: image(red);
}
```
