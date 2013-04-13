
var $ = require("./jquery-or-zepto");
var Backbone = require("backbone");
var _ = require("underscore");
var moment = require("moment");

var Rickshaw = require("./vendor/rickshaw");


var GraphView = Backbone.View.extend({

  constructor: function() {
    Backbone.View.prototype.constructor.apply(this, arguments);
    this.listenTo(this.collection, "add", this.render);
  },


  render: function() {

    var data = [];
    var count = 0;
    this.collection.each(function(m) {
      count += 1;
      data.push({
        x: m.get("seen").getTime(),
        y: count
      });
    });

    if (!data.length) {
      this.$el.html("no data!");
      return;
    }

    this.$el.empty();

    var graph = new Rickshaw.Graph( {
      element: this.el,
      width: $(window).width() - 50,
      height: 500,
      renderer: 'line',
      series: [
        {
          color: "blue",
          data: data,
          name: 'Cars'
        }
      ]
    } );

    var yAxis = new Rickshaw.Graph.Axis.Y({
        graph: graph
    });

    var xAxis = new Rickshaw.Graph.Axis.X({
        graph: graph,
        tickFormat: function(data) {
          return moment.unix(data/1000).format("hh:mm:ss a");
        }
    });

    graph.render();
    yAxis.render();
    xAxis.render();
  },

  remove: function() {
    Backbone.View.prototype.remove.apply(this, arguments);
    $(window).off("resize", this._rerender);
  }

});


module.exports = GraphView;
