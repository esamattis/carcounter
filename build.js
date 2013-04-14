var fs = require("fs");
var browserify = require("browserify");
var externalize = require("browserify-externalize");

// Index bundle. The application excution starts from here (index.js)
var index = browserify("./client/index");

// Main bundles contain the main application code. The index bundle
// conditionally loads one of these using the $script.js script loader. main.js
// executes soon as the bundle is added to the DOM.
var mainZepto = browserify("./client/main");
var mainJQuery = browserify("./client/main");

// Graph bundle. This is a subset of the main bundles. It does not have an
// entry point at all. It only provides code for the toggle-grap module require
// calls in in main bundles
var graph = browserify().require("./client/toggle-graph");

// Both main bundles have require calls to both jQuery and Zepto. So remove
// jQuery from the Zepto bundle and Zepto from the jQuery bundle
mainZepto.external("./client/vendor/jquery");
mainJQuery.external("./client/vendor/zepto");

// Common settings for main and graph bundles
[mainZepto, mainJQuery, graph].forEach(function(b) {
    // Rickshaw distribution is bit weird. It has a require call to "d3". We
    // need to make that work in all bundles using so that the dependency
    // graphs can be resolved. In the end only the graph bundle will have the
    // code for the d3 library.
    b.require("./client/vendor/d3.shim", { expose: "d3" });

    // Make sure that all bundles can require Handlebars templates
    b.transform(require("hbsfy"));
});

// Remove code from main bundles that is shared with the index bundle (mainly
// $script.js)
externalize(index, [mainJQuery, mainZepto], function(err) {
  if (err) throw err;

  // Remove graph code from main bundles: rickshaw.js, d3.js, moment.js and our
  // custom Backbone code using the libraries
  externalize([mainJQuery, mainZepto], graph, function(err) {
    if (err) throw err;

    index.bundle().pipe(fs.createWriteStream("bundle/index.js"));
    mainZepto.bundle().pipe(fs.createWriteStream("bundle/main-zepto.js"));
    mainJQuery.bundle().pipe(fs.createWriteStream("bundle/main-jquery.js"));
    graph.bundle().pipe(fs.createWriteStream("bundle/graph.js"));
  });
});

