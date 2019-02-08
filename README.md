# action-observer

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![License][license-image]][license-url]

> Declarative event handling to capture unbound action events

Action observer is a solution for capturing user triggered action events (click, submit) as they bubble up to the document element. This is most useful as a means of maintaining responsiveness pre-initialization of JavaScript heavy apps, allowing action events to be handled immediately or queued for processing once the page has finished initializing. Please refer to the [blog post](http://www.ryanmorr.com/maintain-responsiveness-by-capturing-unbound-action-events) to read more.

## Install

Download the [development](http://github.com/ryanmorr/action-observer/raw/master/dist/action-observer.js) or [minified](http://github.com/ryanmorr/action-observer/raw/master/dist/action-observer.min.js) version, or install via NPM:

``` sh
npm install @ryanmorr/action-observer
```

## Configuration

You'll want to add the script to the `<head>` of your HTML. This is important because it must be loaded *before* the DOM has started to load and scripts have begun executing so that action events can be captured pre-initialization.

To start, add a `action-observe` attribute to any element you wish to observe events on:

```html
<!-- Observe click events -->
<a href="#" action-observe="add">Add Item</a>

<!-- Observe submit events -->
<form method="GET" action="#" action-observe="search">
    <input type="search" name="search" />
    <button type="submit">Submit</button>
</form>
```

Adding the `action-observe` attribute to a form will automatically observe submit events for that form. Otherwise, click events will be observed for any other type of element. The value of the `action-observe` attribute is used as the reference to that element in the JavaScript API for action-observer.

## Usage

There are two different ways to approach implementation. The first option is to bind a callback function to be executed as soon as an action event is dispatched from the target element, allowing you to handle the request immediately:

```javascript
import { observe } from '@ryanmorr/action-observer';

// Observes the element with the action-observe="add" attribute
observe('add', (event, element) => {
    // Handle the request immediately                  
});
```

The other option is to check if an action event was dispatched on a target element once your scripts have completed initializing to address the request afterwards:

```javascript
import { wasTriggered } from '@ryanmorr/action-observer';

// Checks the element with the action-observe="add" attribute
if (wasTriggered('add')) {
    // Handle the request after the fact (better late than never)                  
}
```

Once your primary JavaScript has loaded, you can choose to stop observing specific elements or stop functionality entirely for all elements:

```javascript
import { unobserve, disable } from '@ryanmorr/action-observer';

// Once the application code has initialized the link, stop observing
if (link.isInitialized()) {
    unobserve('link');
}

// Once all initializing code is complete, disable all functionality
if (app.isLoaded()){
    disable();
}
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/action-observer
[version-image]: https://badge.fury.io/gh/ryanmorr%2Faction-observer.svg
[build-url]: https://travis-ci.org/ryanmorr/action-observer
[build-image]: https://travis-ci.org/ryanmorr/action-observer.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE
