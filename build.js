
var fs = require("fs");
var browserify = require("browserify");
var externalize = require("browserify-externalize");

var index = browserify("./scripts/index");
var mainZepto = browserify("./scripts/main");
var mainJQuery = browserify("./scripts/main");
var graph = browserify().require("./scripts/toggle_graph");

[mainZepto, mainJQuery].forEach(function(b) {
  b.transform(require("hbsfy"));
});

mainZepto.external("./scripts/vendor/jquery");
mainJQuery.external("./scripts/vendor/zepto");

externalize(index, [mainZepto, mainJQuery], function(err) {
  if (err) throw err;
  externalize(mainZepto, graph, function(err) {
    if (err) throw err;
    externalize(mainJQuery, graph, function(err) {
      if (err) throw err;
      index.bundle().pipe(fs.createWriteStream("bundle/index.js"));
      mainZepto.bundle().pipe(fs.createWriteStream("bundle/main-zepto.js"));
      mainJQuery.bundle().pipe(fs.createWriteStream("bundle/main-jquery.js"));
      graph.bundle().pipe(fs.createWriteStream("bundle/graph.js"));
    });
  });
});

