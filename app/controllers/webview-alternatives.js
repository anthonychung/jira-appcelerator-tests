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

function setupWebCrosswalk(_url){
	var path = _url;
	var params = getResourcePath(path);

	var options = {
		zIndex: 9,
		top: 50,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		enableJavascriptInterface:true,
		// url:""
		// html:""
		url: params.url,
		// html: params.html
	};


	var crossWalk = require('com.universalavenue.ticrosswalk');
	web = crossWalk.createWebView(options);
	// web = Ti.UI.createWebView(options);

	var loaded=false;
	var count=1;

	web.addEventListener('load',function(){
		Ti.API.info('webview load count '+count);
		count = count +1;
		if(loaded == false){
			// setTimeout(function(){
				loaded = true;
				// web.setData(params.blob,{
				// 	baseURL: "file:///android_asset/Resources/iframetest",
				// 	// baseURL: Ti.Filesystem.resourcesDirectory,
				// 	mimeType: "text/html"
				// });
				// web.setUrl(params.url);
				// web.setHtml(params.html);
			// },3000);
		}
	});


	$.window.add(web);
}

function setupWeb(_url){
	// THIS TEST IS FOR 'com.kosso.tiwebview2'
	var path = _url;
	var params = getResourcePath(path);

	var tiwebview2 = require('com.kosso.tiwebview2'); // iOS and Android
	var TEST_URL = path; // see file included in repo for postMessage examples.

	var APPNAME = 'mL_Jira_Test';
	// UserAgent 'MY_APP_ios' and 'MY_APP_android' will be created accordingly.
	// We need to know what these are to to be able to provide the appropriate JS in the remote HTML.
	// see: remote_test.html 

	var os = Ti.Platform.osname;
	var options = {
      top:0,
      bottom:0,
      left:0,
      zIndex:1,
      right:0,
      userAgent:APPNAME + '_' + os,        // ios only. Set in beforeload event on Android.
      backgroundColor:'white',
	enableJavascriptInterface:true,
      // url:TEST_URL
      // url:params.url
      html:""
	};

	web = tiwebview2.createWebView(options);
	
	var loaded=false;
	var count=1;

  	web.addEventListener('messageFromWebview', function(e) {
    Ti.API.info("messageFromWebview:", e.message);
    if(typeof e.message === 'object'){
      alert(JSON.stringify(e.message));
    } else {
      alert(e.message);  
    }

	// TODO: make android module convert to JSON Object
    // Android verson still needs JSON.parse
    // console.log(JSON.parse(e.message));
  });

  web.addEventListener('beforeload', function(e) {
    console.log('webview beforeload : ');
    // Set it now on Android
    web.setUserAgent(APPNAME + '_' + os);

  });

	web.addEventListener('load',function(e){
		Ti.API.info('webview load count '+count);
		Ti.API.info('webview load e.url '+e.url);
		Ti.API.info('webview load e.loaded '+e.loaded);
		// if(loaded == false){
			// setTimeout(function(){
				// loaded = true;
				
				if(count==1){
					// web.setData(params.blob,{
					// 	baseURL: "file:///android_asset/Resources/iframetest",
					// 	// baseURL: Ti.Filesystem.resourcesDirectory,
					// 	mimeType: "text/html"
					// });

					// setTimeout(function(){
					// 	// var code = '(function(arg){ testfn("test"); })(["<your args>"])';
					// 	// var code = 'document.title';
					// 	Ti.API.info(web.evalJS('document.body.innerHtml'));
					// 	// 
					// },6000);
					web.setUrl(params.url);
					// web.setHtml(params.html);
				}
			// },3000);
		// }
		count = count +1;
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