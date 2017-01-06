import React, {PropTypes} from 'react';

export default React.createClass({
    propTypes: {
        message: PropTypes.object,
        styles: PropTypes.object
    },

    render() {
        let {message, styles} = this.props;

        if (!message) {
            return false;
        }

        return (
            <div className="react-notify-toast-content">
                <div className={"message"} style={styles}>
                        {message.content} - {message.options.timeout}
                    <br/>
                </div>
            </div>
        );
    }
});
