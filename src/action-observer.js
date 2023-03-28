const listeners = new Map();
const docElement = window.document.documentElement;
docElement.addEventListener('click', onEvent, false);
docElement.addEventListener('submit', onEvent, false);

function onEvent(evt) {
    const el = evt.target.closest('[action-observe]');
    if (el) {
        if (el.nodeName.toLowerCase() === 'form' && evt.type !== 'submit') {
            return;
        }
        const key = el.getAttribute('action-observe');
        let listener = listeners.get(key);
        if (!listener) {
            listener = {};
            listeners.set(key, listener);
        }
        listener.triggered = true;
        const callback = listener.callback;
        if (callback) {
            callback.call(el, evt, el);
        }
    }
}

export function observe(key, callback) {
    listeners.set(key, {triggered: false, callback});
}

export function unobserve(key) {
    if (listeners.has(key)) {
        listeners.delete(key);
    }
}

export function wasTriggered(key) {
    const listener = listeners.get(key);
    return listener && listener.triggered;
}

export function disable() {
    listeners.clear();
    docElement.removeEventListener('click', onEvent, false);
    docElement.removeEventListener('submit', onEvent, false);
}
