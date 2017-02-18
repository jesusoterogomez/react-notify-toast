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
			right: '0px',
			top: '-100px',
			left: '0px',
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

		if (this.props.timeout === -1) {
			return;
		}

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
function renderToast(text, type, timeout, color) {
	ReactDOM.render(
		<Toast text={text} timeout={timeout} type={type} color={color}/>,
		document.getElementById(notificationWrapperId)
	);
}

/* Unmount React component */
function hideToast() {
	ReactDOM.unmountComponentAtNode(document.getElementById(notificationWrapperId));
}

/* Public functions */

/* Show Animated Toast Message */
/* Returns true if the toast was shown, or false if show failed due to an existing notification */
function show(text, type, timeout, color) {
	if (!document.getElementById(notificationWrapperId).hasChildNodes()) {
		let renderTimeout = timeout;

		// Use default timeout if not set.
		if (!renderTimeout) {
			renderTimeout = defaultTimeout;
		}

		// Render Component with Props.
		renderToast(text, type, renderTimeout, color);

		if (timeout === -1) {
			return false;
		}

		// Unmount react component after the animation finished.
		setTimeout(function() {
			hideToast();
		}, renderTimeout + animationDuration);

        return true;
	}
    return false;
}

/**
 * Add to Animated Toast Message Queue
 * Display immediately if no queue
 * @param  {Number} initialRecallDelay   If the call to show fails because of an existing
 *                                       notification, how long to wait until we retry (ms)
 * @param  {Number} recallDelayIncrement Each time a successive call fails, the recall delay
 *                                       will be incremented by this (ms)
 * @return {[type]}                      [description]
 */
function createShowQueue(initialRecallDelay = 500, recallDelayIncrement = 500) {
    // Array to hold queued messages
    this.msgs = [];

    // Is the showNotify function in progress - used so we can call showNotify when a
    // message is added to an empty queue.
    this.isNotifying = false;

    this.currentRecallDelay = initialRecallDelay;

    // Retrieve the next message from the queue and try to show it
    this.showNotify = () => {
        // If there are no messages in the queue
        if (this.msgs.length === 0) {
            this.isNotifying = false;
            return;
        }

        this.isNotifying = true;

        const current = this.msgs.pop();

        // show will now return true if it is able to send the message,
        // or false if there is an existing message
        if (show(current.text, current.type, current.timeout, current.color)) {
            this.currentRecallDelay = initialRecallDelay;
            if (current.timeout > 0) {
                setTimeout(() => this.showNotify(), current.timeout + animationDuration);
            }
        } else {
            // If message show failed, re-add the current message to the front of the queue
            this.msgs.unshift(current);
            setTimeout(() => this.showNotify(), this.currentRecallDelay);
            this.currentRecallDelay += recallDelayIncrement;
        }
    };

    return (text, type = '', timeout = defaultTimeout, color = colorWhite) => {
        this.msgs.push({text, type, timeout, color});
        if (!this.isNotifying) {
            this.showNotify();
        }
    };
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
	show,
    createShowQueue
};
