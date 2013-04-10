
if (window.USE_ZEPTO) {
    require("./vendor/zepto.js");
    module.exports = window.Zepto;
}
else {
    require("./vendor/jquery.js");
    module.exports = window.jQuery;
}
