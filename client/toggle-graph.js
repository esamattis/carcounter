
var GraphView = require("./graph-view");

/**
 * @param {Backbone.Collection} collection Data to render
 * @param {jQuery/Zepto element} container Container to render graph on
 **/
function toggleGraphFor(collection, container) {
  var graph = null;
  return function () {
    if (!graph) {
      graph = new GraphView({
        collection: collection
      });
      container.html(graph.el);
      graph.render();
    }
    else {
      graph.remove();
      graph = null;
    }
  };
}

module.exports = toggleGraphFor;
