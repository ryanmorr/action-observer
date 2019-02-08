/**
 * Common variables
 */
const docElement = window.document.documentElement;
const listeners = Object.create(null);

/**
 * Handle action events (click, submit) on
 * the document
 *
 * @param {Event} evt
 * @api private
 */
function onEvent(evt) {
    const el = evt.target.closest('[action-observe]');
    if (el) {
        if (el.nodeName.toLowerCase() === 'form' && evt.type !== 'submit') {
            return;
        }
        const key = el.getAttribute('action-observe');
        if (!(key in listeners)) {
            listeners[key] = {};
        }
        listeners[key].triggered = true;
        const callback = listeners[key].callback;
        if (callback) {
            callback.call(el, evt, el);
        }
    }
}

/**
 * Map a callback function to the element
 * in which you would like to observe action
 * events on
 *
 * @param {String} key
 * @param {Function} callback
 * @api public
 */
export function observe(key, callback) {
    listeners[key] = {triggered: false, callback};
}

/**
 * Remove a callback function bound to an
 * element being observed
 *
 * @param {String} key
 * @api public
 */
export function unobserve(key) {
    if (key in listeners) {
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
    return key in listeners && listeners[key].triggered;
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
