function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doAction() {
        Ti.API.info("firing doaction");
        Ti.App.fireEvent("app:fromTitanium", {
            message: "from native"
        });
    }
    function getResourcePath(_urlpath) {
        var outputDirectory = Ti.Filesystem.resourcesDirectory;
        var file = Ti.Filesystem.getFile(outputDirectory, _urlpath);
        Ti.API.info("fileexists " + file.exists());
        var urlpath = file.nativePath;
        var blob = file.read();
        var params = {
            blob: blob,
            html: blob.text,
            url: urlpath
        };
        file = null;
        return params;
    }
    function closeWindow() {
        $.window.close();
    }
    function setupWeb(_url) {
        var path = _url;
        var params = getResourcePath(path);
        var options = {
            zIndex: 9,
            top: 50,
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            enableJavascriptInterface: true,
            url: params.url
        };
        web = Ti.UI.createWebView(options);
        var loaded = false;
        var count = 1;
        web.addEventListener("load", function(e) {
            Ti.API.info("webview load count " + count);
            count += 1;
            Ti.API.info("webview load e.url " + e.url);
            if (false == loaded) {
                loaded = true;
                setTimeout(function() {
                    web.evalJS("testFnParent();");
                    web.evalJS("testFnChild();");
                }, 3e3);
            }
        });
        $.window.add(web);
    }
    function start() {
        cleanUp();
        setupWeb(args.url);
    }
    function cleanUp() {
        function cleanOnClose() {
            $.window.removeEventListener("close", cleanOnClose);
            $.destroy();
        }
        $.window.addEventListener("close", cleanOnClose);
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "test";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: "black",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "window"
    });
    $.__views.window && $.addTopLevelView($.__views.window);
    $.__views.__alloyId3 = Ti.UI.createView({
        top: 50,
        height: 50,
        width: Ti.UI.FILL,
        id: "__alloyId3"
    });
    $.__views.window.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createButton({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
        backgroundColor: "white",
        color: "black",
        width: 200,
        top: 10,
        height: 50,
        borderRadius: 5,
        borderColor: "#ccc",
        title: "Fire Event",
        id: "__alloyId4"
    });
    $.__views.window.add($.__views.__alloyId4);
    doAction ? $.addListener($.__views.__alloyId4, "click", doAction) : __defers["$.__views.__alloyId4!click!doAction"] = true;
    $.__views.__alloyId5 = Ti.UI.createButton({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
        backgroundColor: "white",
        color: "black",
        width: 200,
        top: 10,
        height: 50,
        borderRadius: 5,
        borderColor: "#ccc",
        title: "Close Window",
        id: "__alloyId5"
    });
    $.__views.window.add($.__views.__alloyId5);
    closeWindow ? $.addListener($.__views.__alloyId5, "click", closeWindow) : __defers["$.__views.__alloyId5!click!closeWindow"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    require("common");
    var web;
    start();
    __defers["$.__views.__alloyId4!click!doAction"] && $.addListener($.__views.__alloyId4, "click", doAction);
    __defers["$.__views.__alloyId5!click!closeWindow"] && $.addListener($.__views.__alloyId5, "click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;