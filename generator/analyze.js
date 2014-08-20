var __fs = require('fs');
var __request = require("request").defaults({
	jar : true
});

var mkdirp = require('mkdirp');

var diff = {
	
};

function getFilePath(contentType,url){
	
	var filename = url.substring(url.lastIndexOf("/")+1);
	return ({
		"application/javascript":"/js/",
		"text/javascript":"/js/",
		"text/css":"/css/",
		"image/png":"/images/",
		"image/jpg":"/images/",
		"image/jpeg":"/images/",
		"image/gif":"/images/",
	})[contentType]+filename;
}

module.exports = function(har, output) {
	var index = 0;
	var fetchUrl = har['log']['pages'][0]['id'];
	var urlPath = fetchUrl.substring(0,fetchUrl.lastIndexOf("/"));
	
	var entries = har['log']['entries'];
	entries.forEach(function(entry) {
		
		var request = entry['request'];
		var response = entry['response'];
		var headers = {};
		var url = request.url.replace(/\?.*/g, "");
		var contentType = response['content']['mimeType'];
		var filepath;
		
		if(url.indexOf(urlPath) !== -1){
			filepath = url.replace(urlPath, "");
			
		}else{
			filepath = getFilePath(contentType,url);
		}
		if(filepath == "/" && contentType =="text/html"){
			filepath = "/index.html"
		}
		
		var outpath = output + filepath;
		mkdirp.sync(outpath.substring(0, outpath.lastIndexOf("/")));
		request.headers.forEach(function(h) {
			if (['Last-Modified', 'ETag', 'Expires', 'Cache-Control'].indexOf(h['name']) !== -1) {
				headers[h['name']] = h['value'];
			}

		});
		if(response['content']['text']){
			__fs.writeFileSync(outpath,response['content']['text']);
			checkDone();
		}else{
			__request({
				url : url,
				headers : headers
			}, function() {
				checkDone();
			}).pipe(__fs.createWriteStream(outpath));

		}
		
	});

	function checkDone() {
		index++;
		if (index == entries.length) {
			end();
		}

	}

	function end() {
		var __exec = require('child_process').exec;
		var __open = require("open");

		__exec("http-server " + output + " -c-1 -i -p 8887");
		setTimeout(function() {
			__open("http://127.0.0.1:8887");
		}, 1000);

	}

}

