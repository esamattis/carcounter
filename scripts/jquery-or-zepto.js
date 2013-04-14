// In index.js we set the USE_ZEPTO global. We use that to detect in which
// bundle we are now in.
if (window.USE_ZEPTO) {
    // in Zepto bundle only the zepto require will work
    require("./vendor/zepto");
    module.exports = window.Zepto;
}
else {
    // and in jquery bundle on the jquery require
    require("./vendor/jquery");
    module.exports = window.jQuery;
}

// Both jQuery and Zepto expose only a global variable. So we have to use
// window global to get the export.
