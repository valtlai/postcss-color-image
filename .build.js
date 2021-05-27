// $ deno run --allow-read=. --allow-write=. .build.js

await Promise.all([
  Deno.readTextFile("index.js").then((input) => {
    const denoOutput = input.replace(
      'from "postcss-value-parser"',
      'from "https://deno.land/x/postcss_value_parser@v4.1.0/mod.js"',
    );

    const cjsOutput = '"use strict";\n\n' + input
      .replace(/(from "\.\/[^"]+\.)js"/, '$1cjs"')
      .replace(/import ([\w\s{},]+) from ("[^"]+")/g, "const $1 = require($2)")
      .replace("export default", "module.exports =");

    return Promise.all([
      Deno.writeTextFile("mod.js", denoOutput),
      Deno.writeTextFile("index.cjs", cjsOutput),
    ]);
  }),

  Deno.readTextFile("colors.js").then((input) => {
    const output = '"use strict";\n\n' + input
      .replaceAll("export const ", "exports.");

    return Deno.writeTextFile("colors.cjs", output);
  }),
]);
