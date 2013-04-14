// Preloading entry point for our app

// Simple script loader from npm
// https://npmjs.org/package/scriptjs
var $script = require("scriptjs").$script;

// Scripts to load
var scripts = [];

// If Function.prototype.bind is missing load es5-shim
if (!Function.prototype.bind) scripts.push("client/vendor/es5-shim.js");

// if we have querySelectorAll we can safely use Zepto version of the bundle
window.USE_ZEPTO = !!document.querySelectorAll;
if (window.USE_ZEPTO) scripts.push("bundle/main-zepto.js");
else scripts.push("bundle/main-jquery.js");

// Load both scripts in parallel. We don't need to use the callback here
// because the main bundles are entry points. They will be executed soon as
// they are loaded or after adding the es5-shim.
$script(scripts);
