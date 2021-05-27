// $ deno test --unstable --allow-env=NODE_ENV

import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import postcss from "https://deno.land/x/postcss@8.3.0/mod.js";
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
  "x { --y: linear-gradient(transparent, transparent) }",
);

test(
  "Supports color functions",
  `x {
    --y: image(rgb(255,0,0));
    --z: image(hsl(0deg 100% 50% / 0.5));
  }`,
  `x {
    --y: linear-gradient(rgb(255,0,0), rgb(255,0,0));
    --z: linear-gradient(hsl(0deg 100% 50% / 0.5), hsl(0deg 100% 50% / 0.5));
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
    --y: linear-gradient(#ddd, #ddd);
    --z: linear-gradient(#ddd8, #ddd8);
    --i: linear-gradient(#ff22ee, #ff22ee);
    --j: linear-gradient(#ff22ee77, #ff22ee77);
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
    background: green linear-gradient(orange, orange);
    background: linear-gradient(pink, pink), linear-gradient(blue, blue);
    background: cross-fade(linear-gradient(white, white) 25%, url(img.jpg) 75%);
  }`,
);

test(
  "Supports case-insensitivity",
  "x { --y: image(RGB(255,0,0)); --z: image(LinkText) }",
  "x { --y: linear-gradient(RGB(255,0,0), RGB(255,0,0)); --z: linear-gradient(LinkText, LinkText) }",
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
