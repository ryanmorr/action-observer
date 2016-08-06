# Action Observer

[![GitHub version](https://badge.fury.io/gh/ryanmorr%2Faction-observer.svg)](https://badge.fury.io/gh/ryanmorr%2Faction-observer) [![Build Status](https://travis-ci.org/ryanmorr/action-observer.svg)](https://travis-ci.org/ryanmorr/action-observer) ![Size](https://badge-size.herokuapp.com/ryanmorr/action-observer/master/dist/ao.min.js.svg?color=blue&label=file%20size)

> Declarative event handling to capture unbound action events

Action Observer is a solution for capturing user triggered action events (click, submit) as they bubble up to the document element. This is most useful as a means of maintaining responsiveness pre-initialization of JavaScript heavy apps, allowing action events to be handled immediately or queued for processing once the page has finished initializing.Please refer to the [blog post](http://www.ryanmorr.com/maintain-responsiveness-by-capturing-unbound-action-events) to read more.

## Usage

Add a `data-ao` attribute to any element you wish to observe events on:

```html
<!-- Observe click events -->
<a href="#" data-ao="add">Add Item</a>

<!-- Observe submit events -->
<form method="GET" action="#" data-ao="search">
    <input type="search" name="search" />
    <button type="submit">Submit</button>
</form>
```

Adding the `data-ao` attribute to a form will automatically observe submit events for that form. Otherwise, click events will be observed for any other type of element. The value of the `data-ao` attribute is used as the reference to that element in JavaScript.

There are two different ways to approach implementation. The first option is to bind a callback function to be executed as soon as an action event is dispatched from the target element, allowing you to handle the request immediately:

```javascript
ao.observe('add', (event, element) => {
    // Handle the request immediately                  
});
```

The other option is to check if an action event was dispatched on a target element once your scripts have completed initializing to address the request afterwards:

```javascript
if (ao.wasTriggered('add')) {
    // Handle the request after the fact (better late than never)                  
}
```

The optimal approach will depend on your specific use case.

## API

### ao.observe(key, fn)

Bind a callback to a target element to be executed as soon as an event is dispatched from that element using the reference key (value of `data-ao` attribute) and a callback function as the first and second arguments. The callback is passed the event object and the target element as the only two parameters.

```javascript
// Acknowledge the request
ao.observe('link', (event, element) => {
    loadingIndicator.show();
});
```

### ao.unobserve(key)

Remove a callback function from the target element using the reference key (value of `data-ao` attribute).

```javascript
// Once the app code has initialized the link, stop observing
if (link.isInitialized()) {
    ao.unobserve('link');
}
```

### ao.wasTriggered(key)

Determine if an action event was triggered on the target element using the reference key (value of `data-ao` attribute).

```javascript
// Check to see if an action event was triggered on the link
if (ao.wasTriggered('link')) {
    link.trigger();
}
```

### ao.disable()

Remove event listeners from the document element and disables all the functionality. This cannot be undone.

```javascript
// Once all initializing code is complete, disable all functionality
if (app.isLoaded()){
    ao.disable();
}
```

## Installation

Action Observer is [CommonJS](http://www.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compatible with no dependencies. You can download the [development](http://github.com/ryanmorr/action-observer/raw/master/dist/ao.js) or [minified](http://github.com/ryanmorr/action-observer/raw/master/dist/ao.min.js) version, or install it in one of the following ways:

``` sh
npm install ryanmorr/action-observer

bower install ryanmorr/action-observer
```

You'll want to add the script in the `<head>` of your HTML. This is important because it must be loaded *before* the DOM has started to load and scripts have begun executing so that action events can be captured pre-initialization. You may also want to consider adding the script lnline to avoid the extra HTTP request.

## Tests

Open `test/runner.html` in your browser or test with PhantomJS by issuing the following commands:

``` sh
npm install
npm install -g gulp
gulp test
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).
