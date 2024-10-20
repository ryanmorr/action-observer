/*! @ryanmorr/action-observer v4.0.1 | https://github.com/ryanmorr/action-observer */
"use strict";const e=new Map,t=window.document.documentElement;function n(t){const n=t.target.closest("[action-observe]");if(n){if("form"===n.nodeName.toLowerCase()&&"submit"!==t.type)return;const o=n.getAttribute("action-observe");let s=e.get(o);s||(s={actions:[]},e.set(o,s)),s.actions.push({element:n,event:t});const c=s.callback;c&&c(t,n)}}t.addEventListener("click",n,!1),t.addEventListener("submit",n,!1),exports.disable=function(){e.clear(),t.removeEventListener("click",n,!1),t.removeEventListener("submit",n,!1)},exports.getActions=function(t){let n=e.get(t);return n||(n={actions:[]},e.set(t,n)),n.actions},exports.observe=function(t,n){let o=e.get(t);o?o.callback=n:(o={callback:n,actions:[]},e.set(t,o));const s=o.actions;s.length>0&&s.forEach((e=>n(e.event,e.element)))},exports.unobserve=function(t){e.has(t)&&e.delete(t)};
