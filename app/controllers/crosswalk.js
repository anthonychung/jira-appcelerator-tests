// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
// var common = require("common");
var web;

Ti.App.addEventListener("scorm",function(e){
	console.log(e);
});

function doAction(){
	Ti.API.info("firing doaction");
	Ti.App.fireEvent("app:fromTitanium",{message:"from native"});
    web.evalJS('document.getElementById("scorm").contentWindow.document.location.href="./c2.html"');
}

function getResourcePath(_urlpath){
	var outputDirectory = Ti.Filesystem.resourcesDirectory; 
    var file = Ti.Filesystem.getFile(outputDirectory,_urlpath); 
    Ti.API.info('fileexists '+file.exists());
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

function closeWindow(){
	$.window.close();
}

function setupWebCrosswalk(_url){
	var path = _url;
	// var params = getResourcePath(path);

	var options = {
		top:50,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		enableJavascriptInterface:true,
		url: "./parent.html"
		// url: params.url		
		// url: params.url	
	};

	var web = require('com.universalavenue.ticrosswalk').createWebView(options);
	
	var loaded=false;
	var count=1;

	$.window.add(web);
}


function start(){
	cleanUp();
	setupWebCrosswalk(args.url);
	// setupWeb(args.url);
}

function cleanUp(){
	function cleanOnClose(){
		$.window.removeEventListener('close',cleanOnClose);
		$.destroy();		
	}

	$.window.addEventListener('close',cleanOnClose);
}
start();