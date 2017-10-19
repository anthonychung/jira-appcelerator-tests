function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function runTest1() {
        Alloy.createController("test", {
            url: "iframetest/index-noiframe.html"
        }).getView().open();
    }
    function runTest2() {
        Alloy.createController("test", {
            url: "iframetest/index-withiframe-tests-setdata.html"
        }).getView().open();
    }
    function runTest3() {
        Alloy.createController("webview-alternatives", {
            url: "iframetest/index-withiframe-withscriptinchild.html"
        }).getView().open();
    }
    function start() {
        Ti.App.addEventListener("app:fromWebView", function(e) {
            alert(e.message);
        });
        $.index.open();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "black",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId0 = Ti.UI.createButton({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
        backgroundColor: "white",
        color: "black",
        width: Ti.UI.FILL,
        top: 50,
        height: 50,
        borderRadius: 5,
        borderColor: "#ccc",
        title: "TEST without iframe",
        id: "__alloyId0"
    });
    $.__views.index.add($.__views.__alloyId0);
    runTest1 ? $.addListener($.__views.__alloyId0, "click", runTest1) : __defers["$.__views.__alloyId0!click!runTest1"] = true;
    $.__views.__alloyId1 = Ti.UI.createButton({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
        backgroundColor: "white",
        color: "black",
        width: Ti.UI.FILL,
        top: 50,
        height: 50,
        borderRadius: 5,
        borderColor: "#ccc",
        title: "TEST with iframe",
        id: "__alloyId1"
    });
    $.__views.index.add($.__views.__alloyId1);
    runTest2 ? $.addListener($.__views.__alloyId1, "click", runTest2) : __defers["$.__views.__alloyId1!click!runTest2"] = true;
    $.__views.__alloyId2 = Ti.UI.createButton({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
        backgroundColor: "white",
        color: "black",
        width: Ti.UI.FILL,
        top: 50,
        height: 50,
        borderRadius: 5,
        borderColor: "#ccc",
        title: "TEST with alternatives",
        id: "__alloyId2"
    });
    $.__views.index.add($.__views.__alloyId2);
    runTest3 ? $.addListener($.__views.__alloyId2, "click", runTest3) : __defers["$.__views.__alloyId2!click!runTest3"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    start();
    __defers["$.__views.__alloyId0!click!runTest1"] && $.addListener($.__views.__alloyId0, "click", runTest1);
    __defers["$.__views.__alloyId1!click!runTest2"] && $.addListener($.__views.__alloyId1, "click", runTest2);
    __defers["$.__views.__alloyId2!click!runTest3"] && $.addListener($.__views.__alloyId2, "click", runTest3);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;