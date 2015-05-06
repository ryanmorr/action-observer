# ActionObserver

Solution for capturing user triggered action events (click, submit) pre-initialization as they bubble up to the document element. Allows the event to be handled immediately or queued for processing once the page has finished initializing. Designed for JavaScript heavy pages, such as single page web applications. Please refer to the [blog post](http://www.ryanmorr.com/maintain-responsiveness-by-capturing-unbound-action-events) to read more.

## Usage

Add a `data-observe` attribute to any element you wish to observe events on:

```html
<!--Observe click events-->
<a href="#" data-observe="add">Add Item</a>

<!--Observe submit events-->
<form method="GET" action="#" data-observe="search">
    <input type="search" name="search" />
    <button type="submit">Submit</button>
</form>
```

Adding the `data-observe` attribute to a form will automatically observe submit events for that form. Otherwise, click events will be observed for any other type of element. The value of the `data-observe` attribute is used as the reference to that element in JavaScript.

There are two different ways to approach implementation. The first option is to bind a callback function to be executed as soon as an action event is dispatched from the target element, allowing you to handle the request immediately:

```javascript
ActionObserver.bind('add', function(event, element){
    // do something                    
});
```

The other option is to check if an action event was dispatched on a target element once your scripts have completed initializing to address the request afterwards:

```javascript
if(ActionObserver.isTriggered('add')){
    // do something                    
}
```

The optimal approach will depend on your specific use case.

## API

##### ActionObserver#bind(key, fn)

Bind a callback to a target element to be executed as soon as an event is dispatched from that element using the reference key (value of `data-observe` attribute) and a callback function as the first and second arguments. The callback passes the event object and the target element as the only parameters. Only one callback per target element is permitted.

```javascript
ActionObserver.bind('link', function(event, element){
    // do something                    
});
```

##### ActionObserver#unbind(key)

Remove a callback function using the reference key (value of `data-observe` attribute).

```javascript
ActionObserver.unbind('link');
```

##### ActionObserver#isTriggered(key)

Determine if an action event was triggered on the target element using the reference key (value of `data-observe` attribute).

```javascript
ActionObserver.isTriggered('link');
```

##### ActionObserver#disable()

Removes event listeners from the document element and disables all the functionality. This cannot be undone.

```javascript
ActionObserver.disable();
```

## Installation

ActionObserver is [CommonJS](http://www.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compatible with no dependencies. You can download the [development](http://github.com/ryanmorr/action-observer/raw/master/dist/action-observer.js) or [minified](http://github.com/ryanmorr/action-observer/raw/master/dist/action-observer.min.js) version, or install it using Bower:

``` sh
bower install ryanmorr/action-observer
```

You'll want to add the script in the `<head>` of your HTML. This is important because it must be loaded *before* the DOM has started to load and scripts have begun executing so that action events can be captured pre-initialization. You may also want to consider adding the script lnline to avoid the extra HTTP request.

## Browser Support

* Chrome *
* Firefox *
* Opera *
* Safari *
* Internet Explorer 9+
* Android *
* iOS *

## Tests

Open `test/runner.html` in your browser or test with PhantomJS by issuing the following commands:

``` sh
npm install
npm install -g gulp
gulp test
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).
