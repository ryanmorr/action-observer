/*! @ryanmorr/action-observer v3.0.0 | https://github.com/ryanmorr/action-observer */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ao = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

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
var listeners = Object.create(null);
/**
 * Handle action events (click, submit) on
 * the document
 *
 * @param {Event} evt
 * @api private
 */

function onEvent(evt) {
  var el = evt.target.closest('[action-observe]');

  if (el) {
    if (el.nodeName.toLowerCase() === 'form' && evt.type !== 'submit') {
      return;
    }

    var key = el.getAttribute('action-observe');

    if (!(key in listeners)) {
      listeners[key] = {};
    }

    listeners[key].triggered = true;
    var callback = listeners[key].callback;

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


function observe(key, callback) {
  listeners[key] = {
    triggered: false,
    callback: callback
  };
}
/**
 * Remove a callback function bound to an
 * element being observed
 *
 * @param {String} key
 * @api public
 */


function unobserve(key) {
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


function wasTriggered(key) {
  return key in listeners && listeners[key].triggered;
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

},{}]},{},[1])(1)
});

