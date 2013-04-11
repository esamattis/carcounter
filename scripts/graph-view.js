
var Backbone = require("backbone");

var Rickshaw = require("./vendor/rickshaw");


var GraphView = Backbone.View.extend({

  constructor: function() {
    Backbone.View.prototype.constructor.apply(this, arguments);
    this.listenTo(this.collection, "add", this.render);
  },


  render: function() {
    // this.$el.width(800);
    // this.$el.height(200);

    var data = [];
    var count = 0;
    this.collection.each(function(m) {
      count += 1;
      data.push({
        x: m.get("seen").getTime(),
        y: count
      });
    });

    if (!data.length) return;
    this.$el.empty();

    var graph = new Rickshaw.Graph( {
      element: this.el,
      width: 960,
      height: 500,
      renderer: 'line',
      series: [
        {
          color: "#c05020",
          data: data,
          name: 'Cars'
        }
      ]
    } );

    graph.render();

    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
      graph: graph
    } );

    var axes = new Rickshaw.Graph.Axis.Time( {
      graph: graph
    } );
    axes.render();

  }

});


module.exports = GraphView;
