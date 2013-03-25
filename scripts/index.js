
var loadScript = require("./load_script");

window.USE_ZEPTO = !!document.querySelectorAll;

if (window.USE_ZEPTO) loadScript("bundle/main-zepto.js", start);
else loadScript("bundle/main-jquery.js", start);

function start() {
  setTimeout(function() {
    var main = require("./main");
    main();
  
  }, 1000);
}

