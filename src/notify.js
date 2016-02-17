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
		style: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.bool
		])
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

		const contentStyle = {
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

			default:
				styles.content = assign({}, contentStyle);
				break;
		}

		styles.container = containerStyle;

		return styles;
	}

	getVisibleState(context) {
		let base = this.getStyles().container;

		// Show
		const stylesShow = {
			transform: 'translateY(108px)',
			msTransform: 'translateY(108px)',
			WebkitTransform: 'translateY(108px)',
			OTransform: 'translateY(108px)',
			MozTransform: 'translateY(108px)'
		};

		setTimeout(function() {
			context.updateStyle(base, stylesShow);
		}, 100); // wait 100ms after the component is called to animate toast.

		// Hide after timeout
		const stylesHide = {
			transform: 'translateY(-108px)',
			msTransform: 'translateY(-108px)',
			WebkitTransform: 'translateY(-108px)',
			OTransform: 'translateY(-108px)',
			MozTransform: 'translateY(-108px)'
		};

		setTimeout(function() {
			context.updateStyle(base, stylesHide);
		}, this.props.timeout);
	}

	updateStyle(base, update) {
		this.setState({styleParent: assign({}, base, update)});
	}

	getBaseStyle() {
		this.setState({styleParent: this.getStyles().container});
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
function renderToast(text, type, timeout) {
	ReactDOM.render(
		<Toast text={text} timeout={timeout} type={type}/>,
		document.getElementById(notificationWrapperId)
	);
}

/* Unmount React component */
function hideToast() {
	ReactDOM.unmountComponentAtNode(document.getElementById(notificationWrapperId));
}

/* Public functions */

/* Show Animated Toast Message */
function show(text, type, timeout) {
	if (!document.getElementById(notificationWrapperId).hasChildNodes()) {
		let renderTimeout = timeout;

		// Use default timeout if not set.
		if (!renderTimeout) {
			renderTimeout = defaultTimeout;
		}

		// Render Component with Props.
		renderToast(text, type, renderTimeout);

		// Unmount react component after the animation finished.
		setTimeout(function() {
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
