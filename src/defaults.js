import assign from 'object-assign';

let defaults = {
    wrapperId: 'notification-wrapper',
    animationDuration: 300,
    timeout: 5000,
    zIndex: 1000,
    top: 0, // Controls the offset from top of viewport.
    colors: {
        error: {
            color: "#FFFFFF",
            backgroundColor: '#E85742'
        },
        success: {
            color: "#FFFFFF",
            backgroundColor: '#55CA92'
        },
        warning: {
            color: "#333333",
            backgroundColor: '#F5E273'
        },
        info: {
            color: "#FFFFFF",
            backgroundColor: '#4990E2'
        }
    }
};

function mergeOptions(options) {
    defaults = assign(defaults, options);
}

export {defaults, mergeOptions};

