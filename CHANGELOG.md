# Changelog

## [3.1.0] (2021-10-20)
- Recognized `oklab()` and `oklch()` as color values
- Deprecated `color-adjust()`, which was removed from the spec
  and which will be removed in the next major version of this package

## [3.0.1] (2021-05-31)
- Updated readme

## [3.0.0] (2021-05-27)
- BREAKING: dropped the support for Node.js 10 and 15
  (so Node.js 12, 14 and 16 or greater are now supported)
- Added an ESM version for Node.js
- Added support for Deno&nbsp;🦕
- Recognized `color-mix()`, `color-contrast()` and `color-adjust()`
  as color values

## [2.0.2] (2020-10-23)
- Fixed the `postcss` peer dependency version to be `^8.0.0`

## [2.0.1] (2020-09-22)
- Removed the development fields from `package.json` before publishing

## [2.0.0] (2020-09-17)
- BREAKING: moved to PostCSS&nbsp;8
- BREAKING: removed the support for non-lowercase `image` function
- BREAKING: made `postcss` a peer dependency
- BREAKING: added support for Node.js 10 and dropped from v13
- Added tests
- Updated the dependencies

## [1.0.0] (2020-05-26)
- Initial release

[3.1.0]: https://github.com/valtlai/postcss-color-image/compare/3.0.1...3.1.0
[3.0.1]: https://github.com/valtlai/postcss-color-image/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/valtlai/postcss-color-image/compare/v2.0.2...3.0.0
[2.0.2]: https://github.com/valtlai/postcss-color-image/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/valtlai/postcss-color-image/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/valtlai/postcss-color-image/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/valtlai/postcss-color-image/releases/tag/v1.0.0
