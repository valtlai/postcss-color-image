import parseValue from "npm:postcss-value-parser@4.2.0";

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

function postcssColorImage({ compat = false, preserve = false } = {}) {
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

      if (preserve) {
        decl.cloneBefore({ value: val.toString() });
      } else {
        decl.value = val.toString();
      }
    },
  };
}

postcssColorImage.postcss = true;

export default postcssColorImage;
