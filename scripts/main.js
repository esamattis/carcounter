var $ = require("./jquery-or-zepto");
var Backbone = require("backbone");
var CounterView = require("./counter-view");
var $script = require("scriptjs").$script;

var collection = new Backbone.Collection();
var counter = new CounterView({
  collection: collection
});

$(".counter-container").html(counter.el);
counter.render();

// When graph is asked for the first time use $script the load the graph
// bundle.  The toggle-graph require will work only after the bundle is loaded.
counter.once("toggle:graph", function() {
  $script("bundle/graph.js", function(err) {
    if (err) throw err;
    var toggleGraphFor = require("./toggle-graph");
    // Create graph toggler for the "toggle:graph" event after we have loaded
    // it
    var toggler = toggleGraphFor(collection, $(".graph-container"));
    counter.on("toggle:graph", toggler);
    // Display graph on the first request too
    toggler();
  });
});


