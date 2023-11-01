# PostCSS Solid-Color Image [<img src="https://api.postcss.org/logo.svg" alt="PostCSS" width="90" height="90" align="right">](https://github.com/postcss/postcss)

[![deno.land](https://deno.land/badge/postcss_color_image/version)](https://deno.land/x/postcss_color_image)
[![License](https://img.shields.io/npm/l/postcss-color-image.svg)](LICENSE.md)

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

## ❌ Deprecated

The dedicated Deno version of this module is deprecated
and will not receive any updates anymore.
Please use the following instead:

```js
import colorImage from "npm:postcss-color-image@VERSION";
```

## Usage

```js
import postcss from "npm:postcss";
import colorImage from "https://deno.land/x/postcss_color_image@5.0.1/mod.js";

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
