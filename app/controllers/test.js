// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var common = require("common");
var web;

function doAction(){
	Ti.API.info("firing doaction");
	Ti.App.fireEvent("app:fromTitanium",{message:"from native"});
}

function getResourcePath(_urlpath){
	var outputDirectory = Ti.Filesystem.resourcesDirectory; 
    var file = Ti.Filesystem.getFile(outputDirectory,_urlpath); 
    Ti.API.info('fileexists '+file.exists());
    var urlpath = file.nativePath;
    return urlpath;
}

function closeWindow(){
	$.window.close();
}

function setupWeb(_url){
	var path = _url;
	var url = getResourcePath(path);

	var options = {
		zIndex: 9,
		top: 50,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		enableJavascriptInterface:true,
		url: url
	};
	web = Ti.UI.createWebView(options);

	$.window.add(web);
}

function start(){
	cleanUp();
	// setupWeb2("iframetest/index-withiframe.html");
	setupWeb(args.url);
}

function cleanUp(){
	function cleanOnClose(){
		$.window.removeEventListener('close',cleanOnClose);
		$.destroy();		
	}

	$.window.addEventListener('close',cleanOnClose);
}
start();