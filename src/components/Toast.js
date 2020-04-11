import React from 'react';
import PropTypes from 'prop-types';
import assign from 'object-assign';
import { defaults } from '../defaults';
import { default as defaultStylesheet } from '../stylesheet';

/* React Notification Component */
class Toast extends React.Component {
    static propTypes = {
        text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        timeout: PropTypes.number,
        type: PropTypes.string,
        color: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        styleObject: PropTypes.shape({
            container: PropTypes.object,
            content: PropTypes.object,
            show: PropTypes.object,
            hide: PropTypes.object
        })
    };

    constructor(props) {
        super(props);

        // overriding default styles from props
        const defaultStyles = defaultStylesheet.styles;
        Object.keys(defaultStyles).forEach(key => {
            defaultStyles[key] = Object.assign(
                defaultStyles[key],
                props.styleObject[key] || {}
            );
        });
        this.stylesheet = {
            styles: defaultStyles
        };
        this.state = {
            containerStyle: this.stylesheet.styles.container
        };
    }

    getToastStyle() {
        let { type, color } = this.props;
        let { styles } = this.stylesheet;
        let contentStyle = {};

        /* If type is set, merge toast action styles with base */
        switch (type) {
            case 'success':
            case 'error':
            case 'warning':
            case 'info':
                contentStyle = assign(
                    {},
                    styles.content,
                    defaults.colors[type]
                );
                break;
            case 'custom':
                {
                    const customStyle = {
                        backgroundColor: color.background,
                        color: color.text
                    };
                    contentStyle = assign({}, styles.content, customStyle);
                }
                break;
            default:
                contentStyle = assign({}, styles.content);
                break;
        }

        return contentStyle;
    }

    animateState() {
        let { styles } = this.stylesheet;

        // Show
        setTimeout(() => {
            this.updateStyle(styles.show);
        }, 100); // wait 100ms after the component is called to animate toast.

        // Timeout -1 displays toast as a persistent notification
        if (this.props.timeout === -1) {
            return;
        }

        // Hide after timeout
        setTimeout(() => {
            this.updateStyle(styles.hide);
        }, this.props.timeout);
    }

    // Updates the style of the container with styles for a state (hide/show).
    // This triggers animations.
    updateStyle(stateStyle) {
        let { styles } = this.stylesheet;

        this.setState({
            containerStyle: assign({}, styles.container, stateStyle)
        });
    }

    componentDidMount() {
        this.animateState();
    }

    render() {
        let { text } = this.props;
        let { containerStyle } = this.state;

        return (
            <div className='toast-notification' style={containerStyle}>
                <span style={this.getToastStyle()}>{text}</span>
            </div>
        );
    }
}

export default Toast;
