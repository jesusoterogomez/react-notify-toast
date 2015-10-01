'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

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
var Toast = _react2['default'].createClass({
	displayName: 'Toast',

	propTypes: {
		text: _react.PropTypes.string,
		timeout: _react.PropTypes.number,
		type: _react.PropTypes.string,
		style: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.bool])
	},

	getInitialState: function getInitialState() {
		return {
			styleParent: null
		};
	},

	getStyles: function getStyles() {
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
		if (this.props.type) {
			switch (this.props.type) {
				case 'success':
					var successStyle = {
						backgroundColor: colorSuccess,
						color: colorWhite
					};
					styles.content = (0, _objectAssign2['default'])(contentStyle, successStyle);
					break;

				case 'error':
					var errorStyle = {
						backgroundColor: colorError,
						color: colorWhite
					};
					styles.content = (0, _objectAssign2['default'])(contentStyle, errorStyle);
					break;

				case 'warning':
					var warningStyle = {
						backgroundColor: colorWarning,
						color: textColorWarning
					};
					styles.content = (0, _objectAssign2['default'])(contentStyle, warningStyle);
					break;

				default:
					styles.content = contentStyle;
					break;
			}
		} else {
			styles.content = contentStyle;
		}

		styles.container = containerStyle;

		return styles;
	},

	getVisibleState: function getVisibleState(context) {
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
	},

	updateStyle: function updateStyle(base, update) {
		this.setState({ styleParent: (0, _objectAssign2['default'])(base, update) });
	},

	getBaseStyle: function getBaseStyle() {
		this.setState({ styleParent: this.getStyles().container });
	},

	componentDidMount: function componentDidMount() {
		this.getBaseStyle();
		this.getVisibleState(this);
	},

	render: function render() {
		var _props = this.props;
		var text = _props.text;
		var type = _props.type;

		var styles = this.getStyles();
		var styleParent = this.state.styleParent;

		return _react2['default'].createElement(
			'div',
			{ className: 'toast-notification', style: styleParent },
			_react2['default'].createElement(
				'span',
				{ className: type, style: styles.content },
				text
			)
		);
	}
});

/* Private Functions */

/* Render React component */
function renderToast(text, type, timeout) {
	_react2['default'].render(_react2['default'].createElement(Toast, { text: text, timeout: timeout, type: type }), document.getElementById(notificationWrapperId));
}

/* Unmount React component */
function hideToast() {
	_react2['default'].unmountComponentAtNode(document.getElementById(notificationWrapperId));
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
exports['default'] = _react2['default'].createClass({
	displayName: 'repl',

	render: function render() {
		return _react2['default'].createElement('div', { id: notificationWrapperId });
	}
});

/* Export notification functions */
var notify = {
	show: show
};
exports.notify = notify;