'use strict';

const { name } = require('../package.json');
const postcss = require('postcss');
const parseValue = require('postcss-value-parser');
const isColor = require('./is-color');

module.exports = postcss.plugin(name, () => {
	return (root) => {
		root.walkRules((rule) => {
			rule.walkDecls((decl) => {
				const val = parseValue(decl.value);

				val.walk((node) => {
					if (
						node.type !== 'function' ||
						node.value.toLowerCase() !== 'image' ||
						node.nodes.length !== 1 ||
						!isColor(node.nodes[0])
					) return;

					node.value = 'linear-gradient';
					node.nodes.push({ type: 'div', value: ', ' }, node.nodes[0]);
				});

				decl.value = val.toString();
			});
		});
	};
});
