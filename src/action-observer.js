const listeners = new Map();
const docElement = window.document.documentElement;
docElement.addEventListener('click', onEvent, false);
docElement.addEventListener('submit', onEvent, false);

function onEvent(event) {
    const element = event.target.closest('[action-observe]');
    if (element) {
        if (element.nodeName.toLowerCase() === 'form' && event.type !== 'submit') {
            return;
        }
        const key = element.getAttribute('action-observe');
        let listener = listeners.get(key);
        if (!listener) {
            listener = {
                actions: []
            };
            listeners.set(key, listener);
        }
        listener.actions.push({
            element,
            event
        });
        const callback = listener.callback;
        if (callback) {
            callback(event, element);
        }
    }
}

export function observe(key, callback) {
    let listener = listeners.get(key);
    if (!listener) {
        listener = {callback, actions: []};
        listeners.set(key, listener);
    } else {
        listener.callback = callback;
    }
    const actions = listener.actions;
    if (actions.length > 0) {
        actions.forEach((action) => callback(action.event, action.element));
    }
}

export function unobserve(key) {
    if (listeners.has(key)) {
        listeners.delete(key);
    }
}

export function getActions(key) {
    let listener = listeners.get(key);
    if (!listener) {
        listener = {
            actions: []
        };
        listeners.set(key, listener);
    }
    return listener.actions;
}

export function disable() {
    listeners.clear();
    docElement.removeEventListener('click', onEvent, false);
    docElement.removeEventListener('submit', onEvent, false);
}
