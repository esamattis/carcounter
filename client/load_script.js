
/**
 * Super simple script loader
 *
 **/
function loadScript(src, cb) {
  var script = document.createElement('script');
  script.async = "async";
  script.src = src;

  if (cb) {
    var timer = setTimeout(function() {
      cb(new Error("Timeout when loading " + src));
    }, 15000);

    script.onerror = function() {
      clearTimeout(timer);
      cb(new Error("Failed to load" + src));
    };

    script.onload = function() {
      clearTimeout(timer);
      cb();
    };
  }

  document.getElementsByTagName("head")[0].appendChild( script );
}

module.exports = loadScript;
