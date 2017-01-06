const _defaultOptions = {
    timeout: 5000
};

class Message {
    constructor(content, options = _defaultOptions) {
        this.content = content;
        this.options = options;
    }

    getMessage() {
        return {
            content: this.content,
            options: this.options
        };
    }
}

export default Message;
