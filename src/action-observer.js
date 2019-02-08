/**
 * Common variables
 */
const docElement = window.document.documentElement;
const has = {}.hasOwnProperty;
const listeners = {};

/**
 * Handle action events (click, submit) on
 * the document
 *
 * @param {Event} evt
 * @api private
 */
function onEvent(evt) {
    const el = find(evt.target);
    if (el) {
        // If the element is a form and it is
        // not a submit event, return
        if (el.nodeName.toLowerCase() === 'form' && evt.type !== 'submit') {
            return;
        }
        // Get the value of the `data-ao`
        // attribute used to find the callback
        // function
        const key = el.getAttribute('data-ao');
        // Create map if it doesn't exist
        if (!has.call(listeners, key)) {
            listeners[key] = {};
        }
        // Mark the element as triggered
        listeners[key].triggered = true;
        // If a callback exists, invoke the
        // function passing the element and event
        // object
        const fn = listeners[key].fn;
        if (fn) {
            fn.call(el, evt, el);
        }
    }
}

/**
 * Climb up the DOM tree to find the element
 * containing the `data-ao` attribute
 * based on an event's target
 *
 * @param {Element} el
 * @return {Element|Null}
 * @api private
 */
function find(el) {
    if ('closest' in el) {
        return el.closest('[data-ao]');
    }
    while (el && el !== docElement) {
        if (el.hasAttribute('data-ao')) {
            return el;
        }
        el = el.parentNode;
    }
    return null;
}

/**
 * Map a callback function to the element
 * in which you would like to observe action
 * events on
 *
 * @param {String} key
 * @param {Function} fn
 * @api public
 */
export function observe(key, fn) {
    listeners[key] = {triggered: false, fn};
}

/**
 * Remove a callback function bound to an
 * element being observed
 *
 * @param {String} key
 * @api public
 */
export function unobserve(key) {
    if (has.call(listeners, key)) {
        delete listeners[key];
    }
}

/**
 * Was an action event triggered on the
 * element corresponding to the provided key
 *
 * @param {String} key
 * @return {Boolean}
 * @api public
 */
export function wasTriggered(key) {
    return has.call(listeners, key) && listeners[key].triggered;
}

/**
 * Disable Action Observer functionality and
 * remove the event listeners from the
 * document element
 *
 * @api public
 */
export function disable() {
    docElement.removeEventListener('click', onEvent, false);
    docElement.removeEventListener('submit', onEvent, false);
}

/**
 * Listen for click and submit events on the
 * document when they bubble up
 */
docElement.addEventListener('click', onEvent, false);
docElement.addEventListener('submit', onEvent, false);
