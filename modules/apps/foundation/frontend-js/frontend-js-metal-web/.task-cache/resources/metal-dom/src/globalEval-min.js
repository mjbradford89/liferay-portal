define("frontend-js-metal-web@1.0.6/metal-dom/src/globalEval-min", ["exports","metal/src/metal","./dom"], function(n,t,e){"use strict";function r(n){return n&&n.__esModule?n:{"default":n}}function c(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var u=r(e),i=function(){function n(){c(this,n)}return (n.run=function(n,t){var e=document.createElement("script");return (e.text=n, t?t(e):document.head.appendChild(e), u["default"].exitDocument(e), e)}, n.runFile=function(n,t,e){var r=document.createElement("script");r.src=n;var c=function(){u["default"].exitDocument(r),t&&t()};return (u["default"].once(r,"load",c), u["default"].once(r,"error",c), e?e(r):document.head.appendChild(r), r)}, n.runScript=function(e,r,c){var i=function(){r&&r()};return e.type&&"text/javascript"!==e.type?void t.async.nextTick(i):(u["default"].exitDocument(e),e.src?n.runFile(e.src,r,c):(t.async.nextTick(i),n.run(e.text,c)))}, n.runScriptsInElement=function(e,r,c){var u=e.querySelectorAll("script");u.length?n.runScriptsInOrder(u,0,r,c):r&&t.async.nextTick(r)}, n.runScriptsInOrder=function(e,r,c,u){n.runScript(e.item(r),function(){r<e.length-1?n.runScriptsInOrder(e,r+1,c,u):c&&t.async.nextTick(c)},u)}, n)}();n["default"]=i});