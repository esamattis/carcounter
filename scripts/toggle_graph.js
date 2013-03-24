
var Graph = require("./graph");

function toggleGraphFor(collection, container) {
  var graph = null;
  return function () {
    if (!graph) {
      graph = new Graph({
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
