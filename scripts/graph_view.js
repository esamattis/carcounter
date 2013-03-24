
var Backbone = require("backbone");

require("./vendor/flotr2");
var Flotr = window.Flotr;

console.log("WE HAVE FLOTR", Flotr);

var GraphView = Backbone.View.extend({

  constructor: function() {
    Backbone.View.prototype.constructor.apply(this, arguments);
    this.listenTo(this.collection, "add", this.render);
  },


  render: function() {
    this.$el.width(800);
    this.$el.height(200);

    var data = [];
    var count = 0;
    this.collection.each(function(m) {
      count += 1;
      data.push([
        m.get("seen"),
        count
      ]);
    });

    Flotr.draw(this.el, [data], {
      yaxis: {
        title: "Count",
        tickDecimals: 0
      },
      xaxis: {
        title: "Time",
        mode: "time"
      }

    });

  }



});


module.exports = GraphView;
