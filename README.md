# action-observer

[![Version Badge][version-image]][project-url]
[![License][license-image]][license-url]
[![Build Status][build-image]][build-url]

> Declarative event handling to capture unbound action events

## Description

Action observer is a solution for capturing user triggered action events (click, submit) as they bubble up to the document element. This is most useful as a means of maintaining responsiveness pre-initialization of JavaScript heavy apps, allowing action events to be handled immediately or queued for processing once the page has finished initializing. Please refer to the [blog post](http://www.ryanmorr.com/maintain-responsiveness-by-capturing-unbound-action-events) to read more.

## Install

Download the [CJS](https://github.com/ryanmorr/action-observer/raw/master/dist/cjs/action-observer.js), [ESM](https://github.com/ryanmorr/action-observer/raw/master/dist/esm/action-observer.js), [UMD](https://github.com/ryanmorr/action-observer/raw/master/dist/umd/action-observer.js) versions or install via NPM:

``` sh
npm install @ryanmorr/action-observer
```

## Usage

First, you'll want to add the script to the `<head>` of your HTML. This is important because it must be loaded *before* the DOM has started to load and scripts have begun executing so that action events can be captured pre-initialization.

Next, add an `action-observe` attribute to any element you wish to observe events on. Adding the `action-observe` attribute to a form will automatically observe submit events for that form. Otherwise, click events will be observed for any other type of element. The value of the `action-observe` attribute is used as the reference to that element in the JavaScript API for action observer:

```html
<!-- Observe click events -->
<a href="#" action-observe="add">Add Item</a>

<!-- Observe submit events -->
<form method="GET" action="#" action-observe="search">
    <input type="search" name="search" />
    <button type="submit">Submit</button>
</form>
```

There are two different ways to approach implementation in JavaScript. The first option is to define a callback function to be called for each action event dispatched from the target element, including events dispatched before the handler was defined, allowing you to handle actions immediately:

```javascript
import { observe } from '@ryanmorr/action-observer';

// Observes the element(s) with the action-observe="add" attribute
observe('add', (event, element) => {
    // Handle the action immediately                  
});
```

The other option is to check if an action event was dispatched on a target element once your scripts have completed initializing to address the action afterwards:

```javascript
import { getActions } from '@ryanmorr/action-observer';

// Returns an array of all events dispatched from the action-observe="add" attribute
const actions = getActions('add');

actions.forEach(({event, element}) => {
    // Handle each action after the fact (better late than never)    
});
```

Once your primary JavaScript has loaded, you can choose to stop observing specific elements or stop functionality entirely for all elements:

```javascript
import { unobserve, disable } from '@ryanmorr/action-observer';

// Once the application code has initialized the link, stop observing
if (isInitialized('link')) {
    unobserve('link');
}

// Once all initializing code is complete, disable all functionality
if (isAppLoaded()){
    disable();
}
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/action-observer
[version-image]: https://img.shields.io/github/package-json/v/ryanmorr/action-observer?color=blue&style=flat-square
[build-url]: https://github.com/ryanmorr/action-observer/actions
[build-image]: https://img.shields.io/github/actions/workflow/status/ryanmorr/action-observer/node.js.yml?style=flat-square
[license-image]: https://img.shields.io/github/license/ryanmorr/action-observer?color=blue&style=flat-square
[license-url]: UNLICENSE
