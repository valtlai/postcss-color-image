// $ deno test --unstable --allow-env=DENO_ENV

import { assertEquals } from "https://deno.land/std@0.122.0/testing/asserts.ts";
import postcss from "https://deno.land/x/postcss@8.4.5/mod.js";
import plugin from "./mod.js";

function test(name, input, expected, opts = {}) {
  Deno.test(name, async () => {
    const result = await postcss([plugin(opts)]).process(input, { from: null });
    assertEquals(result.css, expected);
    assertEquals(result.warnings().length, 0);
  });
}

// Supported values

test(
  "Supports color keyword",
  "x { --y: image(transparent) }",
  "x { --y: linear-gradient(transparent 0 0) }",
);

test(
  "Supports color functions",
  `x {
    --y: image(rgb(255,0,0));
    --z: image(hsl(0deg 100% 50% / 0.5));
    --i: image(rgb(from blue 255 g b));
  }`,
  `x {
    --y: linear-gradient(rgb(255,0,0) 0 0);
    --z: linear-gradient(hsl(0deg 100% 50% / 0.5) 0 0);
    --i: linear-gradient(rgb(from blue 255 g b) 0 0);
  }`,
);

test(
  "Supports color modification functions",
  `x {
    --y: image(color-mix(in lch, red, plum 50%));
    --z: image(color-contrast(snow vs gold, cyan, navy to AA));
  }`,
  `x {
    --y: linear-gradient(color-mix(in lch, red, plum 50%) 0 0);
    --z: linear-gradient(color-contrast(snow vs gold, cyan, navy to AA) 0 0);
  }`,
);

test(
  "Supports hex colors",
  `x {
    --y: image(#ddd);
    --z: image(#ddd8);
    --i: image(#ff22ee);
    --j: image(#ff22ee77);
  }`,
  `x {
    --y: linear-gradient(#ddd 0 0);
    --z: linear-gradient(#ddd8 0 0);
    --i: linear-gradient(#ff22ee 0 0);
    --j: linear-gradient(#ff22ee77 0 0);
  }`,
);

test(
  "Supports within other tokens",
  `x {
    background: green image(orange);
    background: image(pink), image(blue);
    background: cross-fade(image(white) 25%, url(img.jpg) 75%);
  }`,
  `x {
    background: green linear-gradient(orange 0 0);
    background: linear-gradient(pink 0 0), linear-gradient(blue 0 0);
    background: cross-fade(linear-gradient(white 0 0) 25%, url(img.jpg) 75%);
  }`,
);

test(
  "Supports case-insensitivity",
  "x { --y: image(RGB(255,0,0)); --z: image(LinkText) }",
  "x { --y: linear-gradient(RGB(255,0,0) 0 0); --z: linear-gradient(LinkText 0 0) }",
);

// Ignored values

test(
  "Ignores non-lowercase `image` function",
  "x { --y: Image(red) }",
  "x { --y: Image(red) }",
);

test(
  "Ignores invalid values",
  `x { --i: image(notcolor); --j: image(rgb); --k: #22; --f: #55555;
    --g: image('foo.png'); --e: image(red, blue); }`,
  `x { --i: image(notcolor); --j: image(rgb); --k: #22; --f: #55555;
    --g: image('foo.png'); --e: image(red, blue); }`,
);

// Options

test(
  "Duplicates color in output gradient when { compat: true }",
  `x { --y: image(red);
    --z: image(hsl(0deg 100% 50%)); }`,
  `x { --y: linear-gradient(red, red);
    --z: linear-gradient(hsl(0deg 100% 50%), hsl(0deg 100% 50%)); }`,
  { compat: true },
);

test(
  "Keeps original declaration when { preserve: true }",
  `x {
    --y: image(red);
    --z: image(hsl(0deg 100% 50%)); }`,
  `x {
    --y: linear-gradient(red 0 0);
    --y: image(red);
    --z: linear-gradient(hsl(0deg 100% 50%) 0 0);
    --z: image(hsl(0deg 100% 50%)); }`,
  { preserve: true },
);

test(
  "Supports both { compat: true, preserve: true } same site",
  `x {
    --y: image(red);
    --z: image(hsl(0deg 100% 50%)); }`,
  `x {
    --y: linear-gradient(red, red);
    --y: image(red);
    --z: linear-gradient(hsl(0deg 100% 50%), hsl(0deg 100% 50%));
    --z: image(hsl(0deg 100% 50%)); }`,
  { compat: true, preserve: true },
);
