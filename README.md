# ActionObserver

Solution for capturing user triggered action events (click, submit) pre-initialization as they bubble up to the document element. Allows the event to be handled immediately or queued for processing once the page has finished initializing while still acknowledging the user’s actions. Please refer to [http://www.ryanmorr.com/maintain-responsiveness-by-capturing-unbound-action-events](http://www.ryanmorr.com/maintain-responsiveness-by-capturing-unbound-action-events) to read more.

## Usage

To start, add a `data-observe` attribute to any element you wish to observe events on:

```html
<!--Observe click events-->
<a href="#" data-observe="add">Add Item</a>

<!--Observe submit events-->
<form method="GET" action="#" data-observe="search">
    <input type="search" name="search" />
    <button type="submit">Submit</button>
</form>
```

Adding the `data-observe` attribute to a form will automatically observe and capture submit events for that form. You are not required to add the `data-observe` attribute to the submit button of a form. Any other type of element will observe and capture click events.

The value of the `data-observe` attribute is the reference point in JavaScript to that element. The `ActionObserver.bind` method is used to attach a callback function that will be invoked when an action event is dispatched from the source element, passing the event object and the element as arguments:

```javascript
ActionObserver.bind('add', function(event, element){
    // do something                    
});

ActionObserver.bind('search', function(event, element){
    // do something                    
});
```

Invoking the `ActionObserver.unbind` method with the value of a `data-observe` attribute will remove the associated callback function.  Once you have established all your callback methods, invoke the `ActionObserver.enable` method to start listening for events. To stop listening for events, invoke the `ActionObserver.disable` method.

## Tests

Included is a test file that demonstrates how both click events and form submissions are captured by ActionObserver. Open `test.html` in your browser to view. See a working example at [http://ryanmorr.com/demos/action-observer/](http://ryanmorr.com/demos/action-observer/).

## Browser Support

Chrome, Firefox, Opera, Safari, Internet Explorer 9+

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).
