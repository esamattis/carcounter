
var GraphView = require("./graph_view");

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
