/*! action-observer v2.0.0 | https://github.com/ryanmorr/action-observer */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ao = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.observe = observe;
exports.unobserve = unobserve;
exports.wasTriggered = wasTriggered;
exports.disable = disable;
/**
 * Common variables
 */
var docElement = window.document.documentElement;
var has = {}.hasOwnProperty;
var listeners = {};

/**
 * Handle action events (click, submit) on
 * the document
 *
 * @param {Event} evt
 * @api private
 */
function onEvent(evt) {
    var el = find(evt.target);
    if (el) {
        // If the element is a form and it is
        // not a submit event, return
        if (el.nodeName.toLowerCase() === 'form' && evt.type !== 'submit') {
            return;
        }
        // Get the value of the `data-ao`
        // attribute used to find the callback
        // function
        var key = el.getAttribute('data-ao');
        // Create map if it doesn't exist
        if (!has.call(listeners, key)) {
            listeners[key] = {};
        }
        // Mark the element as triggered
        listeners[key].triggered = true;
        // If a callback exists, invoke the
        // function passing the element and event
        // object
        var fn = listeners[key].fn;
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
function observe(key, fn) {
    listeners[key] = { triggered: false, fn: fn };
}

/**
 * Remove a callback function bound to an
 * element being observed
 *
 * @param {String} key
 * @api public
 */
function unobserve(key) {
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
function wasTriggered(key) {
    return has.call(listeners, key) && listeners[key].triggered;
}

/**
 * Disable Action Observer functionality and
 * remove the event listeners from the
 * document element
 *
 * @api public
 */
function disable() {
    docElement.removeEventListener('click', onEvent, false);
    docElement.removeEventListener('submit', onEvent, false);
}

/**
 * Listen for click and submit events on the
 * document when they bubble up
 */
docElement.addEventListener('click', onEvent, false);
docElement.addEventListener('submit', onEvent, false);

/**
 * Declare and export `ao` namespace
 */
var ao = { observe: observe, unobserve: unobserve, disable: disable, wasTriggered: wasTriggered };
exports.default = ao;

},{}]},{},[1])(1)
});

