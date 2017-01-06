import assign from 'object-assign';

class Queue {
    constructor() {
        this._stack = [];
        this._busy = false;
    }

    get stack() {
        return this._stack;
    }

    get busy() {
        return this._busy;
    }

    set busy(isBusy) {
        this._busy = isBusy;
    }

    get next() {
        return this._stack[0];
    }

    shift() {
        return this._stack.shift();
    }

    clear() {
        this.constructor();
    }

    push(message) {
        this._stack.push(message);
    }
}

export default Queue;
