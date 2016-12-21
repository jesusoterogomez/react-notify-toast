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

## Options

The toast notification function `notify.show()` supports `message`, `type`, `timeout`, `color`, `position` and `zIndex` attributes in the following way.

`notify.show(message, type, timeout, color, position, zIndex)`


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
```

`position` is for where the notification should show up. Can be one of `'top'` (default) and `'bottom'`.

`zIndex` is for setting the z-index rule for the notification. This can be useful if you have some other fixed or absolute positioned elements you need it to be displayed above. 
Defaults to `'999'`.

#### Complete example would look something like this:

```js
let myColor = { background: '#0E1717', text: "#FFFFFF" };
notify.show("this is sample text", "custom", 5000, myColor, "top", "999");
```