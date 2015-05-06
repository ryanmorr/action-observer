(function(win){ 
    'use strict';
    
    var ActionObserver = {}, 
    docElement = win.document.documentElement, 
    has = {}.hasOwnProperty,
    listeners = {};

    /**
     * Map a callback function to the element 
     * in which you would like to observe action 
     * events on
     * 
     * @param {String} key
     * @param {Function} fn
     * @api public
     */
    ActionObserver.bind = function(key, fn){
        listeners[key] = {
            triggered: false,
            fn: fn
        };
    };

    /**
     * Remove a callback function bound to an 
     * element being observed
     * 
     * @param {String} key
     * @api public
     */
    ActionObserver.unbind = function(key){
        if(has.call(listeners, key)){
            delete listeners[key];
        }
    };

    /**
     * Was an action event triggered on the 
     * element corresponding to the provided key
     * 
     * @param {String} key
     * @return {Boolean}
     * @api public
     */
    ActionObserver.isTriggered = function(key){
        return has.call(listeners, key) && listeners[key].triggered;
    };
    
    /**
     * Disable ActionObserver functionality and 
     * remove the event listeners from the 
     * document element
     *
     * @api public
     */
    ActionObserver.disable = function(){
        docElement.removeEventListener('click', onEvent, false);
        docElement.removeEventListener('submit', onEvent, false);
    };
    
    /**
     * Handle action events (click, submit) on 
     * the document
     *
     * @param {Event} evt
     * @api private
     */
    function onEvent(evt){
        var el = find(evt.target), key, fn;
        if(el){
            // If the element is a form and it is 
            // not a submit event, return
            if(el.nodeName.toLowerCase() === 'form' && evt.type !== 'submit'){
                return;
            }
            // Get the value of the data-observe 
            // attribute used to find the callback 
            // function
            key = el.getAttribute('data-observe');
            // Create map if it doesn't exist
            if(!has.call(listeners, key)){
                listeners[key] = {};
            }
            // Mark the element as triggered
            listeners[key].triggered = true;
            // If a callback exists, invoke the 
            // function passing the element and event 
            // object
            fn = listeners[key].fn;
            if(fn){
                fn.call(el, evt, el);
            }
        }
    }
    
    /**
     * Climb up the DOM tree to find the element 
     * containing the `data-observe` attribute 
     * based on an event's target
     *
     * @param {Element} el
     * @return {Element|Null}
     * @api private
     */
    function find(el){
        if('closest' in el){
            return el.closest('[data-observe]');
        }
        while(el && el !== docElement){
            if(el.hasAttribute('data-observe')){
                return el;  
            }
            el = el.parentNode;
        }
        return null;
    }

    // Listen for click and submit events on the 
    // document when they bubble up
    docElement.addEventListener('click', onEvent, false);
    docElement.addEventListener('submit', onEvent, false);

    /**
     * Expose 'ActionObserver'
     */
    if(typeof module !== 'undefined' && module.exports){
        module.exports = ActionObserver;
    }else if(typeof define === 'function' && define.amd){
        define(function(){ return ActionObserver; });
    }else{
        win['ActionObserver'] = ActionObserver;
    }
    
})(this);