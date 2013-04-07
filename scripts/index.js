
var $script = require("scriptjs").$script;

window.USE_ZEPTO = !!document.querySelectorAll;

if (window.USE_ZEPTO) $script("bundle/main-zepto.js");
else $script("bundle/main-jquery.js");
