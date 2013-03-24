
var Backbone = require("backbone");
var template = require("./counter.hbs");

var CounterView = Backbone.View.extend({

  constructor: function() {
    Backbone.View.prototype.constructor.apply(this, arguments);
    this.listenTo(this.collection, "add", this.render);
  },

  events: {
    "click .add": function() {
      this.collection.add({ seen: new Date() });
    },
    "click .history": function() {
      this.trigger("display:graph");
    }
  },

  render: function() {
    this.$el.html(template({
      count: this.collection.size()
    }));
  }

});

module.exports = CounterView;
