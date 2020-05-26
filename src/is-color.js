'use strict';

const { functions, keywords } = require('./colors.json');

const hexRE = /^#(?:[a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/;

module.exports = (node) => {
	const val = node.value.toLowerCase();

	if (node.type === 'word') return hexRE.test(val) || keywords.includes(val);
	if (node.type === 'function') return functions.includes(val);
	return false;
};
