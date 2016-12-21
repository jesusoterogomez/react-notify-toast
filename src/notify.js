import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

let notificationWrapperId = 'notification-wrapper';
let defaultTimeout = 5000; // ms
let animationDuration = 300; // ms

/* Colors */
const colorWhite = 'white';
const colorError = '#E85742';
const colorSuccess = '#55CA92';
const colorWarning = '#F5E273';
const textColorWarning = '#333333';

/* React Notification Component */
class Toast extends React.Component {
	static propTypes = {
		text: PropTypes.string,
		timeout: PropTypes.number,
		type: PropTypes.string,
		color: PropTypes.object,
		style: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
		position: PropTypes.string,
		zIndex: PropTypes.string
	};

	state = {
		styleParent: null
	};

	getStyles() {
		let styles = {};

		const containerStyle = {
			position: 'fixed',
			width: '50%',
			margin: '0 auto',
			right: '0px',
			left: '0px',
			textAlign: 'center',
			zIndex: this.props.zIndex || '999',
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

		const contentStyle = {
			cursor: 'pointer',
			display: 'inline',
			borderRadius: '0 0 4px 4px',
			width: 'auto',
			backgroundColor: 'white',
			padding: '10px 30px',
			pointerEvents: 'all'
		};
		
		switch (this.props.position) {
			case 'top':
				containerStyle.top = '-100px';
				break;
			case 'bottom':
				// Move notification to bottom
				containerStyle.bottom = '8px';  
				// Hide notification under bottom of screen
				containerStyle.transform = 'translateY(36px)';
				containerStyle.msTransform = 'translateY(36px)';
				containerStyle.WebkitTransform = 'translateY(36px)';
				containerStyle.OTransform = 'translateY(36px)';
				containerStyle.MozTransform = 'translateY(36px)';
				// Override border radius to be top corners instead
				contentStyle.borderRadius = '4px 4px 0 0';
				break;
			default:
				containerStyle.top = '-100px';
				break;
		}


		/* If type is set, merge toast action styles with base */
		switch (this.props.type) {
			case 'success':
				const successStyle = {
					backgroundColor: colorSuccess,
					color: colorWhite
				};
				styles.content = assign({}, contentStyle, successStyle);
				break;

			case 'error':
				const errorStyle = {
					backgroundColor: colorError,
					color: colorWhite
				};
				styles.content = assign({}, contentStyle, errorStyle);
				break;

			case 'warning':
				const warningStyle = {
					backgroundColor: colorWarning,
					color: textColorWarning
				};
				styles.content = assign({}, contentStyle, warningStyle);
				break;

			case 'custom':
				const customStyle = {
					backgroundColor: this.props.color.background,
					color: this.props.color.text
				};
				styles.content = assign({}, contentStyle, customStyle);
				break;

			default:
				styles.content = assign({}, contentStyle);
				break;
		}

		styles.container = containerStyle;

		return styles;
	}

	getVisibleState(context) {
		let base = this
			.getStyles()
			.container;

		// Set direction of show transformation based on position prop
		const translationShow = this.props.position === 'bottom' ? '0' : '108px';
		// Show
		const stylesShow = {
			transform: `translateY(${translationShow})`,
			msTransform: `translateY(${translationShow})`,
			WebkitTransform: `translateY(${translationShow})`,
			OTransform: `translateY(${translationShow})`,
			MozTransform: `translateY(${translationShow})`
		};

		setTimeout(() => {
			context.updateStyle(base, stylesShow);
		}, 100); // wait 100ms after the component is called to animate toast.

		if (this.props.timeout === -1) {
			return;
		}

		// Set direction of hide transformation based on position prop
		const translationHide = this.props.position === 'bottom' ? '36px' : '-108px';
		// Hide after timeout
		const stylesHide = {
			transform: `translateY(${translationHide})`,
			msTransform: `translateY(${translationHide})`,
			WebkitTransform: `translateY(${translationHide})`,
			OTransform: `translateY(${translationHide})`,
			MozTransform: `translateY(${translationHide})`
		};

		setTimeout(function () {
			context.updateStyle(base, stylesHide);
		}, this.props.timeout);
	}

	updateStyle(base, update) {
		this.setState({styleParent: assign({}, base, update)});
	}

	getBaseStyle() {
		this.setState({
			styleParent: this
				.getStyles()
				.container
		});
	}

	componentDidMount() {
		this.getBaseStyle();
		this.getVisibleState(this);
	}

	render() {
		let {text, type} = this.props;
		let styles = this.getStyles();
		let {styleParent} = this.state;
		return (
			<div className="toast-notification" style={styleParent}>
				<span className={type} style={styles.content}>{text}</span>
			</div>
		);
	}
}

/* Private Functions */

/* Render React component */
function renderToast(text, type, timeout, color, position, zIndex) {
	ReactDOM.render(
		<Toast text={text} timeout={timeout} type={type} color={color} position={position} zIndex={zIndex} />, document.getElementById(notificationWrapperId));
}

/* Unmount React component */
function hideToast() {
	ReactDOM.unmountComponentAtNode(document.getElementById(notificationWrapperId));
}

/* Public functions */

/* Show Animated Toast Message */
function show(text, type, timeout, color, position, zIndex) {
	if (!document.getElementById(notificationWrapperId).hasChildNodes()) {
		let renderTimeout = timeout;

		// Use default timeout if not set.
		if (!renderTimeout) {
			renderTimeout = defaultTimeout;
		}

		// Render Component with Props.
		renderToast(text, type, renderTimeout, color, position, zIndex);

		if (timeout === -1) {
			return;
		}

		// Unmount react component after the animation finished.
		setTimeout(function () {
			hideToast();
		}, renderTimeout + animationDuration);
	}
}

/* Export notification container */
export default class extends React.Component {
	render() {
		return (
			<div id={notificationWrapperId}></div>
		);
	}
}

/* Export notification functions */
export let notify = {
	show
};
