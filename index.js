import parseValue from "postcss-value-parser";
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

function postcssColorImage() {
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
        node.nodes.push({ type: "div", value: ", " }, node.nodes[0]);
      });

      decl.value = val.toString();
    },
  };
}

postcssColorImage.postcss = true;

export default postcssColorImage;
