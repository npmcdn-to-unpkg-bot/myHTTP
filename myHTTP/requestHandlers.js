var querystring = require('querystring'),
	         fs = require('fs'),
	 formidable = require('formidable');

function start(response){
	console.log("Request handler 'start' was called");

	// function sleep(milliSeconds){
	// 	var startTime = new Date().getTime();
	// 	while (new Date().getTime() < startTime+milliSeconds);
	// }
	// sleep(10000);

	var body = '<html>'+
				'<head>'+
					'<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>'+
				'</head>'+
				'<body>'+
				'<form action="/upload" enctype="multipart/form-data" method="post">'+
				'<input type="file" name="upload" />'+
				'<input type="submit" value="Upload File"/>'+
				'</form>'+
				'</body>'+
				'</html>';
	response.writeHead(200,{"Content-type" : "text/html" });
    response.write(body);
    response.end();
}
function upload(response, request){
	console.log("Request handler 'upload' was called");

	// response.writeHead(200,{"Content-type" : "text/plain" });
	//response.write("You have sent postData: "+postData);
	// response.write("You have sent params: "+querystring.parse(postData).text);
 	// response.end();

 	var form = new formidable.IncomingForm();
 	console.log("about to parse");
 	form.parse(request, function(error, fields, files){
 		console.log("parsing done");

 		fs.rename(files.upload.path, "./tmp/test.jpg", function(error){
 			if(error){
 				fs.unlink("./tmp/test.jpg");
 				fs.rename(files.upload.path, "./tmp/test.jpg");
 			}
 		});
 		response.writeHead(200,{"Content-Type":"text/html"});
 		response.write("received image <br/> ");
 		response.write("<img src=\"/show\"/>");
 		response.end();
 	});
}

function show(response){
	console.log("request handle 'show' was called ");
	response.writeHead(200,{"Content-type" : "image/jpg" });
	fs.createReadStream("./tmp/test.jpg").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
