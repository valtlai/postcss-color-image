// node(postcss-value-parser)
import parseValue from "https://deno.land/x/postcss_value_parser@4.2.0/mod.js";

import { colorFunctions, colorWords, hexColorRegex } from "./colors.js";

function isColor(node) {
  const val = node.value.toLowerCase();

  if (node.type === "word") {
    return hexColorRegex.test(val) || colorWords.includes(val);
  }
  if (node.type === "function") {
    return colorFunctions.includes(val);
  }
  return false;
}

function postcssColorImage({ compat = false } = {}) {
  return {
    postcssPlugin: "postcss-color-image",
    Declaration(decl) {
      if (!decl.value.includes("image(")) return; // skip useless parsing

      const val = parseValue(decl.value);

      val.walk((node) => {
        if (
          node.type !== "function" ||
          node.value !== "image" ||
          node.nodes.length !== 1 ||
          !isColor(node.nodes[0])
        ) {
          return;
        }

        node.value = "linear-gradient";

        if (compat) {
          node.nodes.push({ type: "div", value: ", " }, node.nodes[0]);
        } else {
          const sep = { type: "space", value: " " };
          const pos = { type: "word", value: "0" };
          node.nodes.push(sep, pos, sep, pos);
        }
      });

      decl.value = val.toString();
    },
  };
}

postcssColorImage.postcss = true;

export default postcssColorImage;
