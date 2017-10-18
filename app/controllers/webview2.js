
var tiwebview2 = require('com.kosso.tiwebview2'); // iOS and Android

var TEST_URL = 'http://SOMEWHERE.com/remote_test.html' // see file included in repo for postMessage examples.

var APPNAME = 'mL_Jira_Test';
// UserAgent 'MY_APP_ios' and 'MY_APP_android' will be created accordingly.
// We need to know what these are to to be able to provide the appropriate JS in the remote HTML.
// see: remote_test.html 

var os = Ti.Platform.osname;

var webview2 = tiwebview2.createWebView({
      top:0,
      bottom:0,
      left:0,
      zIndex:1,
      right:0,
      userAgent:APPNAME + '_' + os,        // ios only. Set in beforeload event on Android.
      backgroundColor:'white',
      url:TEST_URL
    });

    var btn_back = Ti.UI.createButton({
      title:' < ',
      width:50,
      bottom:10,
      zIndex:10,
      left:10,
      height:50,
      borderRadius:25,
      color:'white',
      tintColor:'white',
      textAlign:'center',
      visible:false,
      backgroundColor:'#333'
    });

    var btn_fwd = Ti.UI.createButton({
      title:' > ',
      width:50,
      zIndex:10,
      bottom:10,
      right:10,
      height:50,
      borderRadius:25,
      color:'white',
      tintColor:'white',
      textAlign:'center',
      visible:false,
      backgroundColor:'#333'
    });

    btn_back.addEventListener('click', function(){
      webview2.goBack();
    });

    btn_fwd.addEventListener('click', function(){
      webview2.goForward();
    });

  
  webview2.addEventListener('messageFromWebview', function(e) {
    console.log("messageFromWebview:", e.message);
    if(typeof e.message === 'object'){
      alert(JSON.stringify(e.message));
    } else {
      alert(e.message);  
    }

	// TODO: make android module convert to JSON Object
    // Android verson still needs JSON.parse
    // console.log(JSON.parse(e.message));
  });
  

  webview2.addEventListener('beforeload', function(e) {
    console.log('webview beforeload : ');
    // Set it now on Android
    webview2.setUserAgent(APPNAME + '_' + os);

  });
  
  webview2.addEventListener('load', function(e) {
    console.log('KOSSO: webview loaded : ', e);
    
    // evalJS with callback  (iOS only for now)
    // webview2.evalJS('document.title', function(result){
    //  console.log('evalJS result: ', result);
    //});

    // with evalJSResult event.
    // webview2.evalJS('document.title');
    // console.log('evalJS : '+webview2.evalJS("document.title"));
    
    
    console.log('webview canGoBack? : ', webview2.canGoBack());
    if(webview2.canGoBack()){
      btn_back.visible = true;
    } else {
      btn_back.visible = false;      
    }
    if(webview2.canGoForward()){
      btn_fwd.visible = true;      
    } else {
      btn_fwd.visible = false;      
    }
  });
  
  /*
  webview2.addEventListener('evalJSResult', function(e) {
    //console.log('webview evalJSResult : ', e);
    if(e.success){
      console.log('webview evalJSResult : ', e.result);
    }
  });
  */