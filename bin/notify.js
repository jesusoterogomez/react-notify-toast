'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.notify = undefined;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var notificationWrapperId = 'notification-wrapper';
var defaultTimeout = 5000; // ms
var animationDuration = 300; // ms

/* Colors */
var colorWhite = 'white';
var colorError = '#E85742';
var colorSuccess = '#55CA92';
var colorWarning = '#F5E273';
var textColorWarning = '#333333';

/* React Notification Component */

var Toast = (function (_React$Component) {
	_inherits(Toast, _React$Component);

	function Toast() {
		var _temp, _this, _ret;

		_classCallCheck(this, Toast);

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, Object.getPrototypeOf(Toast).apply(this, arguments)), _this), _this.state = {
			styleParent: null
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Toast, [{
		key: 'getStyles',
		value: function getStyles() {
			var styles = {};

			var containerStyle = {
				position: 'fixed',
				width: '50%',
				margin: '0 auto',
				right: '0',
				top: '-100px',
				left: '0',
				textAlign: 'center',
				zIndex: '999',
				pointerEvents: 'none',
				transition: 'all ' + animationDuration + 'ms ease',
				transform: 'translateY(0px)',
				// Vendor Prefixes
				msTransition: 'all ' + animationDuration + 'ms ease',
				msTransform: 'translateY(0px)',
				WebkitTransition: 'all ' + animationDuration + 'ms ease',
				WebkitTransform: 'translateY(0px)',
				OTransition: 'all ' + animationDuration + 'ms ease',
				OTransform: 'translateY(0px)',
				MozTransition: 'all ' + animationDuration + 'ms ease',
				MozTransform: 'translateY(0px)'
			};

			var contentStyle = {
				cursor: 'pointer',
				display: 'inline',
				width: 'auto',
				borderRadius: '0 0 4px 4px',
				backgroundColor: 'white',
				padding: '10px 30px',
				pointerEvents: 'all'
			};

			/* If type is set, merge toast action styles with base */
			switch (this.props.type) {
				case 'success':
					var successStyle = {
						backgroundColor: colorSuccess,
						color: colorWhite
					};
					styles.content = (0, _objectAssign2.default)({}, contentStyle, successStyle);
					break;

				case 'error':
					var errorStyle = {
						backgroundColor: colorError,
						color: colorWhite
					};
					styles.content = (0, _objectAssign2.default)({}, contentStyle, errorStyle);
					break;

				case 'warning':
					var warningStyle = {
						backgroundColor: colorWarning,
						color: textColorWarning
					};
					styles.content = (0, _objectAssign2.default)({}, contentStyle, warningStyle);
					break;

				default:
					styles.content = (0, _objectAssign2.default)({}, contentStyle);
					break;
			}

			styles.container = containerStyle;

			return styles;
		}
	}, {
		key: 'getVisibleState',
		value: function getVisibleState(context) {
			var base = this.getStyles().container;

			// Show
			var stylesShow = {
				transform: 'translateY(108px)',
				msTransform: 'translateY(108px)',
				WebkitTransform: 'translateY(108px)',
				OTransform: 'translateY(108px)',
				MozTransform: 'translateY(108px)'
			};

			setTimeout(function () {
				context.updateStyle(base, stylesShow);
			}, 100); // wait 100ms after the component is called to animate toast.

			// Hide after timeout
			var stylesHide = {
				transform: 'translateY(-108px)',
				msTransform: 'translateY(-108px)',
				WebkitTransform: 'translateY(-108px)',
				OTransform: 'translateY(-108px)',
				MozTransform: 'translateY(-108px)'
			};

			setTimeout(function () {
				context.updateStyle(base, stylesHide);
			}, this.props.timeout);
		}
	}, {
		key: 'updateStyle',
		value: function updateStyle(base, update) {
			this.setState({ styleParent: (0, _objectAssign2.default)({}, base, update) });
		}
	}, {
		key: 'getBaseStyle',
		value: function getBaseStyle() {
			this.setState({ styleParent: this.getStyles().container });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.getBaseStyle();
			this.getVisibleState(this);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props;
			var text = _props.text;
			var type = _props.type;

			var styles = this.getStyles();
			var styleParent = this.state.styleParent;

			return _react2.default.createElement(
				'div',
				{ className: 'toast-notification', style: styleParent },
				_react2.default.createElement(
					'span',
					{ className: type, style: styles.content },
					text
				)
			);
		}
	}]);

	return Toast;
})(_react2.default.Component);

/* Private Functions */

/* Render React component */

Toast.propTypes = {
	text: _react.PropTypes.string,
	timeout: _react.PropTypes.number,
	type: _react.PropTypes.string,
	style: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.bool])
};
function renderToast(text, type, timeout) {
	_reactDom2.default.render(_react2.default.createElement(Toast, { text: text, timeout: timeout, type: type }), document.getElementById(notificationWrapperId));
}

/* Unmount React component */
function hideToast() {
	_reactDom2.default.unmountComponentAtNode(document.getElementById(notificationWrapperId));
}

/* Public functions */

/* Show Animated Toast Message */
function show(text, type, timeout) {
	if (!document.getElementById(notificationWrapperId).hasChildNodes()) {
		var renderTimeout = timeout;

		// Use default timeout if not set.
		if (!renderTimeout) {
			renderTimeout = defaultTimeout;
		}

		// Render Component with Props.
		renderToast(text, type, renderTimeout);

		// Unmount react component after the animation finished.
		setTimeout(function () {
			hideToast();
		}, renderTimeout + animationDuration);
	}
}

/* Export notification container */

var _class = (function (_React$Component2) {
	_inherits(_class, _React$Component2);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement('div', { id: notificationWrapperId });
		}
	}]);

	return _class;
})(_react2.default.Component);

/* Export notification functions */

exports.default = _class;
var notify = exports.notify = {
	show: show
};