# Changelog

## [5.0.0] (2022-10-30)
- BREAKING: Renamed the recognized color `color-contrast()`
  to `contrast-color()` ([csswg-drafts#7557]([csswg-issue-7557]))
- BREAKING: Dropped the support for Node.js 12 and 17
  (so Node.js 14, 16, and 18 or greater are now supported)

## [4.0.0] (2022-01-27)
- BREAKING: Instead of duplicating the color in the output gradient,
  a double-position color stop is now added
  to make the output shorter and more DRY
  - For example, the old output `linear-gradient(red, red)`
    is now `linear-gradient(red 0 0)`
  - For wider browser support, you can use the old behavior
    by setting the new option `compat: true`
- BREAKING: Removed `color-adjust()` as a recognized color,
  because it has been removed from the spec
- Added a new option `preserve: true`
  to keep the original CSS declaration alongside the transformed one
- Changed the license from MIT to ISC

## [3.1.0] (2021-10-20)
- Recognized `oklab()` and `oklch()` as color values
- Deprecated `color-adjust()`, which was removed from the spec
  and which will be removed in the next major version of this package

## [3.0.1] (2021-05-31)
- Updated readme

## [3.0.0] (2021-05-27)
- BREAKING: Dropped the support for Node.js 10 and 15
  (so Node.js 12, 14, and 16 or greater are now supported)
- Added an ESM version for Node.js
- Added support for Deno&nbsp;🦕
- Recognized `color-mix()`, `color-contrast()`, and `color-adjust()`
  as color values

## [2.0.2] (2020-10-23)
- Fixed the `postcss` peer dependency version to be `^8.0.0`

## [2.0.1] (2020-09-22)
- Removed the development fields from `package.json` before publishing

## [2.0.0] (2020-09-17)
- BREAKING: Moved to PostCSS&nbsp;8
- BREAKING: Removed the support for non-lowercase `image` function
- BREAKING: Made `postcss` a peer dependency
- BREAKING: Added support for Node.js 10 and dropped from v13
- Added tests
- Updated the dependencies

## [1.0.0] (2020-05-26)
- Initial release

[csswg-issue-7557]: https://github.com/w3c/csswg-drafts/issues/7557
[5.0.0]: https://github.com/valtlai/postcss-color-image/compare/4.0.0...5.0.0
[4.0.0]: https://github.com/valtlai/postcss-color-image/compare/3.1.0...4.0.0
[3.1.0]: https://github.com/valtlai/postcss-color-image/compare/3.0.1...3.1.0
[3.0.1]: https://github.com/valtlai/postcss-color-image/compare/3.0.0...3.0.1
[3.0.0]: https://github.com/valtlai/postcss-color-image/compare/v2.0.2...3.0.0
[2.0.2]: https://github.com/valtlai/postcss-color-image/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/valtlai/postcss-color-image/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/valtlai/postcss-color-image/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/valtlai/postcss-color-image/releases/tag/v1.0.0
