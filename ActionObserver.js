(function(win){ 
    'use strict';
    
    // Shortcut for document element    
    var docElement = win.document.documentElement, 
    // Object literal that maps elements to callback functions via the data-observe attribute value
    listeners = {}, 
    // Shortcut for hasOwnProperty
    has = listeners.hasOwnProperty,
    // ActionObserver is disabled by default
    disabled = true;
    
    // Handle action events (click, submit) on the document element 
    function onEvent(e){
        var el = find(e.target), key;
        if(el){
            // If the element is a form and it is not a submit event, return
            if(el.nodeName.toLowerCase() === 'form' && e.type !== 'submit'){
                return;
            }
            // Get the value of the data-observe attribute used to bind the callback function
            key = el.getAttribute('data-observe');
            // Check that a callback function exists with the key
            if(has.call(listeners, key)){
                // Invoke the callback function passing the element and event object
                listeners[key](e, el);
            }
        }
    }
    
    // Climb up the DOM tree to find the element containing the data-observe attribute based on an event's target
    function find(el){
        while(el && el !== docElement){
            if(el.hasAttribute('data-observe')){
                return el;  
            }
            el = el.parentNode;
        }
        return null;
    }
    
    // Define ActionObserver globally   
    win.ActionObserver = {
        
        /**
         * Map a callback function to the element in which you would like to observe action events on
         * @param  {String}   key Value of the data-observe attribute for the element that is being observed
         * @param  {Function} fn  The callback function that is to be invoked when the element dispatches an action event
         * @param  {Object}   ctx The context to invoke the callback function in
         */
        bind: function(key, fn, ctx){
            listeners[key] = fn.bind(ctx || win);
        },

        /**
         * Remove a callback function bound to an element being observed
         * @param  {String} key Value of the data-observe attribute for the element that is being observed
         */
        unbind: function(key){
            if(has.call(listeners, key)){
                delete listeners[key];
            }
        },
        
        /**
         * Enable ActionObserver functionality and add the event listeners to the document element (disabled by default)
         */
        enable: function(){
            if(disabled){
                disabled = false;
                docElement.addEventListener('click', onEvent, false);
                docElement.addEventListener('submit', onEvent, false);
            }
        },
        
        /**
         * Disable ActionObserver functionality and remove the event listeners from the document element
         */
        disable: function(){
            if(!disabled){
                disabled = true;
                docElement.removeEventListener('click', onEvent, false);
                docElement.removeEventListener('submit', onEvent, false);
            }
        }
    };

})(this);