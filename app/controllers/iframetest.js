var win = Ti.UI.createWindow();
var webview = Ti.UI.createWebView({
	url: 'index-withiframe.html' // switch to test
	// url: 'index-noiframe.html'
});
var button = Ti.UI.createButton({
	title: 'fromTitanium',
	height: '50dp',
	width: '130dp'
});
button.addEventListener('click', function(e) {
	Ti.App.fireEvent('app:fromTitanium', { message: 'event fired from Titanium, handled in WebView' });
});
Ti.App.addEventListener('app:fromWebView', function(e) {
	alert(e.message);
});
 
win.add(webview);
win.add(button);
win.open();