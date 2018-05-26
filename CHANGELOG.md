# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added

### Changed

### Fixed

## [0.5.0] - 2018-05-26
### Added
- [\#58] Support for setting vertical offset by specifying `top` as a default option.
```js
// Example
<Notification options={{top: '50px'}}/>
```

## [0.4.1] - 2018-05-16
### Changed
- [\#55] Support react 16 as a peer dependency

## [0.4.0] - 2017-10-23
### Added
- [\#26] Support for multiline text/content

### Fixed
- [\#44] Fixed animation positioning for content that's more than 3 lines of height

## [0.3.2] - 2017-08-23
- [\#42] Show queue was not working due to references to non existing variables
- [\#41] Fixed warning when using `color` property.

## [0.3.1] - 2017-08-07
### Added
- [\#19] Support for rendering React elements inside toasts

### Fixed
- [\#39] `createShowQueue` was not working due to an undefined variable

## [0.3.0] - 2017-07-04
### Added
- [\#34] Support for dismissing toasts
- [\#36] Support for overriding default options through `<Notification/>` component, details in "Overriding Defaults" section of README.
  
### Changed
- Temporarily disables support for custom colors, this will be added as part of options parameter.

## [0.2.0] - 2017-02-28
### Added
- [\#22] Support for queueing notifications, deatils in "Queued Notifications" section of README

### Changed
- [\#32] React PropTypes dependency changed for prop-types package.

## [0.1.4] - 2016-12-19
### Added
- [\#20] Support for custom colors

## [0.1.3] - 2016-08-31
### Added
- [\#14] Support for react x.15
- [\#14] Support for persistent notifications by passing -1 to timeout.

## [0.1.2] - 2016-07-19
### Fixed
- [\#8] React 15.x version is raising warning for some CSS properties that don't include units.

[comment]: # (Build Comparison Links)

[unreleased]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.5.0...HEAD
[0.5.0]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.4.1...0.5.0
[0.4.1]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.3.2...0.4.0
[0.3.2]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.3.1...0.3.2
[0.3.1]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.1.4...0.2.0
[0.1.4]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.1.3...0.1.4
[0.1.3]: https://github.com/jesusoterogomez/react-notify-toast/compare/0.1.2...0.1.3
[0.1.2]: https://github.com/jesusoterogomez/react-notify-toast/tree/0.1.2

[comment]: # (Issue Links)

[\#58]: https://github.com/jesusoterogomez/react-notify-toast/issues/58
[\#55]: https://github.com/jesusoterogomez/react-notify-toast/issues/55
[\#39]: https://github.com/jesusoterogomez/react-notify-toast/issues/39
[\#36]: https://github.com/jesusoterogomez/react-notify-toast/issues/36
[\#34]: https://github.com/jesusoterogomez/react-notify-toast/issues/34
[\#32]: https://github.com/jesusoterogomez/react-notify-toast/issues/32
[\#22]: https://github.com/jesusoterogomez/react-notify-toast/issues/22
[\#20]: https://github.com/jesusoterogomez/react-notify-toast/issues/20
[\#19]: https://github.com/jesusoterogomez/react-notify-toast/issues/19
[\#14]: https://github.com/jesusoterogomez/react-notify-toast/issues/14
[\#8]: https://github.com/jesusoterogomez/react-notify-toast/issues/8
