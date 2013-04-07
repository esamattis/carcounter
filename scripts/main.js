
var $ = require("./zepto_or_jquery");
var Backbone = require("backbone");
var CounterView = require("./counter_view");
var $script = require("scriptjs").$script;

var collection = new Backbone.Collection();
var counter = new CounterView({
  collection: collection
});

$(".counter-container").html(counter.el);
counter.render();

counter.once("display:graph", function() {

  $script("bundle/graph.js", function(err) {
    if (err) throw err;
    var toggleGraphFor = require("./toggle_graph");
    var toggler = toggleGraphFor(collection, $(".graph-container"));
    toggler();
    counter.on("display:graph", toggler);
  });
});


