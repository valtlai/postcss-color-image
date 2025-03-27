import parseValue from 'postcss-value-parser';
import { colorFunctions, colorWords, hexColorRegExp } from './colors.js';

function isColor(node) {
	const value = node.value.toLowerCase();

	if (node.type === 'word') {
		return hexColorRegExp.test(value) || colorWords.includes(value);
	}
	if (node.type === 'function') {
		return colorFunctions.includes(value);
	}
	return false;
}

function postcssColorImage({ compat = false, preserve = false } = {}) {
	return {
		postcssPlugin: 'postcss-color-image',
		Declaration(declaration) {
			// Skip useless parsing
			if (!declaration.value.includes('image(')) {
				return;
			}

			const value = parseValue(declaration.value);

			value.walk((node) => {
				if (
					node.type !== 'function' ||
					node.value !== 'image' ||
					node.nodes.length !== 1 ||
					!isColor(node.nodes[0])
				) {
					return;
				}

				node.value = 'linear-gradient';

				if (compat) {
					node.nodes.push({ type: 'div', value: ', ' }, node.nodes[0]);
				} else {
					const separator = { type: 'space', value: ' ' };
					const position = { type: 'word', value: '0' };
					node.nodes.push(separator, position, separator, position);
				}
			});

			if (preserve) {
				declaration.cloneBefore({ value: value.toString() });
			} else {
				declaration.value = value.toString();
			}
		},
	};
}

postcssColorImage.postcss = true;

export default postcssColorImage;
