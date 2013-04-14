// Here it is important that jQuery or Zepto is required before Backbone is
// required because Backbone requires a global of one or the other
var $ = require("./jquery-or-zepto");
var Backbone = require("backbone");
var $script = require("scriptjs").$script;

var CounterView = require("./counter-view");

var collection = new Backbone.Collection();
var counter = new CounterView({
  collection: collection
});

$(".counter-container").html(counter.el);
counter.render();


// When graph is asked for the first time use $script.js the load the graph
// bundle.
var graphContainer = $(".graph-container");
counter.once("toggle:graph", function() {
  // Display loading indicator while the graph bundle is being downloaded.
  graphContainer.text("loading...");

  // The toggle-graph require will work only after the bundle is loaded. Use
  // the callback to detect when the loading has finished.
  $script("bundle/graph.js", function(err) {
    if (err) throw err;
    var toggleGraphFor = require("./toggle-graph");

    // Create graph toggler for the "toggle:graph" event after we have loaded
    // it
    var toggler = toggleGraphFor(collection, graphContainer);
    counter.on("toggle:graph", toggler);

    // Display graph on the first request too
    toggler();
  });
});


