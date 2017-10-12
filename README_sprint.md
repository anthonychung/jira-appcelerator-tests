Sprint Goals

Use following repo as base
https://github.com/anthonychung/jira-appcelerator-tests/tree/issues/test-android-iframe-fireevent

# Goal for Android iframe sprint:
- change the iframe.src url, based on an event fired from titanium. (based on evalJS or Ti.App.addEventListener )
- also need to pass a json object to a function in the local.js script inside the html for execution.
- also needs Ti.App.fireEvent from the html jscript, which is then handled in native titanium.

# Problem
- iframe.src is not accessible in android webview. 
- sometimes Ti.App object is not accessible because of jscontext, or onload delay, or iframe onPageStarted (which can be helped if body onload function also has setTimeout delay before trying to access Ti.App. object to addevent listener or also fireevent )

# Current Structure of iFrame
- sitting in assets/iframetest/ folder
- index-withiframe.html (parent) has html iframe (with id=myiframe) points to blank.html (child)
- one of included local javascript script has Ti.App.addEventListener (can be on parent or child)
- the eventListener has a callback which has to change the iframe src.

```
document.getElementById(“myiframe”).src=e.url
```

# Requirements
## Titanium to webview local js
- native titanium needs to be able fire the event.
- or use evalJS to pass params or the url so that the iframe src can change.
- I also have another function that requires the passing of a json object to load_defaults for scorm.

```
// git/MobileLearningApp/app/lib/service/scorm/player/handler.js

exports.triggerIframeChange=function(_url){
	Ti.API.info('LOG triggerIframeChange _url',_url);

		Ti.App.fireEvent('app:fromTitanium:scorm',{
			eventname:'change_iframe_src',
			url: _url
		});

}
```
## The javascript script inside the html also needs to fireEvents
- call Ti.App.fireEvent from within the script js.
- The app has already set up a native titanium event listener that handles the communication from inside the webview to the app.
- this event handler is in the index.js file

```
	Ti.App.addEventListener('app:fromWebView', function(e) {
		alert(e.message);
	});
```
