'use strict';

const { name: postcssPlugin } = require('../package.json');
const parseValue = require('postcss-value-parser');
const isColor = require('./is-color');

module.exports = () => {
	return {
		postcssPlugin,
		Declaration(decl) {
			if (!decl.value.includes('image(')) return; // skip useless parsing

			const val = parseValue(decl.value);

			val.walk((node) => {
				if (
					node.type !== 'function' ||
					node.value !== 'image' ||
					node.nodes.length !== 1 ||
					!isColor(node.nodes[0])
				) return;

				node.value = 'linear-gradient';
				node.nodes.push({ type: 'div', value: ', ' }, node.nodes[0]);
			});

			decl.value = val.toString();
		}
	};
};

module.exports.postcss = true;
