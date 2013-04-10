
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

counter.once("toggle:graph", function() {

  $script("bundle/graph.js", function(err) {
    if (err) throw err;
    var toggleGraphFor = require("./toggle-graph");
    var toggler = toggleGraphFor(collection, $(".graph-container"));
    toggler();
    counter.on("toggle:graph", toggler);
  });
});


