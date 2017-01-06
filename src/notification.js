import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

// Classes
import Message from './Message';
import Queue from './Queue';

// Components
import Toast from './components/Toast';

// Constants
import styles from './styles';

// Global References
let queue = new Queue(); // @todo: initialize queue with user configuration.
let container;

// Create container
let createContainer = () => {
    if (!container) {
        container = document.createElement('div');

        assign(container.style, styles.container);
        document.body.appendChild(container);
    }
}

// Unmount component and remove container
let unmountContainer = (target) => {
    ReactDOM.unmountComponentAtNode(target);
    document.body.removeChild(target);
    container = null;
}

// Render Toast into container
let render = (message) => {
    ReactDOM.render(
        <Toast message={message} styles={styles.toast}/>,
        container
    );
};

// Start processing queue
let processQueue = (queue) => {
    // Set queue as busy
    queue.busy = true;

    // Pull current message
    let message = queue.next;

    if (!message) {
        queue.busy = false;
        unmountContainer(container);
    }

    // Render toast
    render(queue.next);

    // Start countdown to next toast
    setTimeout(() => {
        next();
    }, message.options.timeout);
};

// Execute next action (process / terminate)
let next = () => {
    // Discard current message
    queue.shift();

    // Determine if queue still needs processing. (i.e. messages remaining)
    if (queue.stack.length > 0) {
        processQueue(queue);
    } else {
        terminateQueue();
    }
}

// Finish processing queue, clean DOM.
let terminateQueue = () => {
    queue.busy = false;
    unmountContainer(container);
}


// Display notification
function show(content, options) {
    // Create message instance
    let message = new Message(content, options);

    // Add message to queue
    queue.push(message);

    // Create a temporary React Root to mount notification components
    createContainer();

    // Start processing queue if not currently busy.
    if (!queue.busy) {
        processQueue(queue);
    }
}

export let notify = {show};
