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

function setupWeb(_url){
	var path = _url;
	var params = getResourcePath(path);

	var options = {
		zIndex: 9,
		top: 50,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		enableJavascriptInterface:true,
		// url:""
		html:""
		// url: params.url,
		// html: params.html
	};

	web = Ti.UI.createWebView(options);

	var loaded=false;
	var count=1;

	web.addEventListener('load',function(e){
		Ti.API.info('webview load count '+count);
		count = count +1;
		Ti.API.info('webview load e.url '+e.url);
		if(loaded == false){
			loaded = true;
			web.setData(params.blob,{
				baseURL: "file:///android_asset/Resources/iframetest/index-withiframe-tests-setdata.html",
				// baseURL: Ti.Filesystem.resourcesDirectory,
				mimeType: "text/html"
			});
			setTimeout(function(){
				web.evalJS("testFnParent();");
				web.evalJS("testFnChild();");
				// web.setUrl(params.url);
				// web.setHtml(params.html);
			},6000);
		}
	});


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