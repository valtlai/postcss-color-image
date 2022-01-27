# PostCSS Solid-Color Image [<img src="https://api.postcss.org/logo.svg" alt="PostCSS" width="90" height="90" align="right">](https://github.com/postcss/postcss)

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

## Usage

### Deno

Import the module from [deno.land/x](https://deno.land/x/postcss_color_image):

```js
import postcss from "https://deno.land/x/postcss@8.3.10/mod.js";
import colorImage from "https://deno.land/x/postcss_color_image@3.1.0/mod.js";

await postcss([colorImage]).process(YOUR_CSS);
```

### Node.js

Install the [npm package](https://www.npmjs.com/package/postcss-color-image):

```sh
npm install postcss-color-image
```

Then import or require it:

```js
import postcss from "postcss";
import colorImage from "postcss-color-image";
// OR
const postcss = require("postcss");
const colorImage = require("postcss-color-image");

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
