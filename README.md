# Toast Notifications for React.js.

## Installation

The recommended way to include this sdk into your project is by using npm. Install it into your project as a dependency with

```sh
$ npm install react-notify-toast --save
```

## How to use

To include the modules in the browser context use a bundler tool like `Browserify` or `Webpack`.

## Import into your project

To include this project you need to require the module by using CommonJS syntax or ES6 Modules Syntax (recommended).


```js
// ES6
import Notifications, {notify} from 'react-notify-toast';
/* Notifications is the default export.
   It represents the React Component that contains the notifications.

   You can give the default export any name
   but in this example it will be referenced as Notifications */

```

For best results, render the `Notifications` component in the higher DOM node possible, such as:

```js
// react's app render function
render() {
	return (
		<div className='main'>
			<Notifications />
			...
		</div>
	)
}

```

Then just call a notification with `notify.show()`

```js

notify.show('Toasty!');

```

## Queued Notifications

A notification queue can be created using the createShowQueue function, for example, in the constructor of a component:

````js
constructor() {
    super();
    this.show = notify.createShowQueue();
}
````
This queue can then be used with the same API as the notify.show function:

````js
this.show('Toasty!');
````

## Options

The toast notification function `notify.show()` supports `message`, `type` and `timeout` attributes in the following way.

`notify.show(message, type, timeout, color)`


`message` is the content of the toast notification.


`type` consists of three variants:

- `success` to render a success notification.
- `warning` to render a warning notification.
- `error` to render an error notification.
- `custom` to render user defined colors for the notification.

if `type` is not set, it will render a neutral notification.


`timeout` is the time (in milliseconds) the toast will remain on screen.
if it's not set, it will display for the default `5000ms` time.
You can also pass `-1` to cause the notification to display persistently.

`color` is for the `background` as well as the `text` of the notification. It accepts an object with the following properties

```js
let myColor = { background: '#0E1717', text: "#FFFFFF" };
notify.show("this is sample text", "custom", 5000, myColor);
```

The createShowQueue function has two optional arguments:

* `initialRecallDelay` is how long (in ms) to wait if the first attempt at showing a notification fails (because a non-queued notification was already being shown). Default: 500ms

* `recallDelayIncrement` is a time (in ms) added to the recallDelay after each failed attempt.  This is to mitigate numerous rapidly-repeated calls in the case of a non-queued notification being shown without a timeout. Default 500ms
