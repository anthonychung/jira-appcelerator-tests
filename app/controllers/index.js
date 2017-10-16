/**
 * test case
 */

function runTest1(){
	Alloy.createController("test",{
		url: "iframetest/index-noiframe.html"
	}).getView().open();
}

function runTest2(){
	Alloy.createController("test",{
		// url: "iframetest/index-withiframe.html"
		url: "iframetest/index-withiframe0withscriptinchild.html"
	}).getView().open();
}


function start(){
	Ti.App.addEventListener('app:fromWebView', function(e) {
		alert(e.message);
	});
	$.index.open();
}

start();
