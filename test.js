import assert from 'node:assert';
import test from 'node:test';
import postcss from 'postcss';
import plugin from './index.js';

function runTest(name, input, expected, options = {}) {
	test(name, async () => {
		const result = await postcss([plugin(options)]).process(input, {
			from: undefined,
		});
		assert.equal(result.css, expected);
		assert.equal(result.warnings().length, 0);
	});
}

// Supported values

runTest(
	'supports color keyword',
	'x { --y: image(transparent) }',
	'x { --y: linear-gradient(transparent 0 0) }',
);

runTest(
	'supports color functions',
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

runTest(
	'supports color modification functions',
	`x {
		--y: image(color-mix(in lch, red, plum 50%));
		--z: image(contrast-color(snow vs gold, cyan, navy to AA));
	}`,
	`x {
		--y: linear-gradient(color-mix(in lch, red, plum 50%) 0 0);
		--z: linear-gradient(contrast-color(snow vs gold, cyan, navy to AA) 0 0);
	}`,
);

runTest(
	'supports hex colors',
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

runTest(
	'supports within other tokens',
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

runTest(
	'supports case-insensitivity',
	`x {
		--x: image(#A1B2C3);
		--y: image(RGB(255,0,0));
		--z: image(LinkText);
	}`,
	`x {
		--x: linear-gradient(#A1B2C3 0 0);
		--y: linear-gradient(RGB(255,0,0) 0 0);
		--z: linear-gradient(LinkText 0 0);
	}`,
);

// Ignored values

runTest(
	'ignores non-lowercase `image` function',
	'x { --y: Image(red) }',
	'x { --y: Image(red) }',
);

runTest(
	'ignores invalid values',
	`x { --i: image(notcolor); --j: image(rgb); --k: #22; --f: #55555;
		--g: image('foo.png'); --e: image(red, blue); }`,
	`x { --i: image(notcolor); --j: image(rgb); --k: #22; --f: #55555;
		--g: image('foo.png'); --e: image(red, blue); }`,
);

// Options

runTest(
	'duplicates color in output gradient when { compat: true }',
	`x { --y: image(red);
		--z: image(hsl(0deg 100% 50%)); }`,
	`x { --y: linear-gradient(red, red);
		--z: linear-gradient(hsl(0deg 100% 50%), hsl(0deg 100% 50%)); }`,
	{ compat: true },
);

runTest(
	'keeps original declaration when { preserve: true }',
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

runTest(
	'supports both { compat: true, preserve: true } same site',
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
