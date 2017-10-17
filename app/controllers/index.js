/**
 * test case
 */

function runTest1(){
	Alloy.createController("test",{
		url: "iframetest/index-noiframe.html"
	}).getView().open();
}

function runTest2(){
	// @rainer switch these to test
	
	Alloy.createController("test",{
		// url: "iframetest/index-withiframe.html"
		url: "iframetest/index-withiframe-tests.html"
		// url: "iframetest/index-withiframe-ondelay.html"
		// url: "iframetest/index-postmessage.html"
		// url: "iframetest/index-documentwindow.html"
		// url: "iframetest/index-loadtest.html"
		// url: "iframetest/index-withiframe-withscriptinchild.html"
	}).getView().open();
}


function start(){
	Ti.App.addEventListener('app:fromWebView', function(e) {
		alert(e.message);
	});
	$.index.open();
}

start();
