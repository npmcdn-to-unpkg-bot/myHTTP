//faq edit
//I am in dev branch
// new change
var http = require('http');
var url = require('url');

function start(route, handle){
  function onRequest(request, response){
  	var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for "+pathname+" received.");
    route(handle, pathname, response, request);
    //request.setEncoding("utf8");

    // request.addListener("data",function(postDataChunk){
    // 	postData += postDataChunk;
    // 	console.log("Received post data chunk "+postDataChunk+" .");
    // });
    // request.addListener("end", function(){
    // 	route(handle, pathname, response, postData);
    // })

  }

  http.createServer(onRequest).listen(8888);
  console.log("server has started.");
}

//distinguish requests based on the URL path request

exports.start = start;
