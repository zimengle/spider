var page = require('webpage').create();



function generate() {

	var scriptUrls = page.evaluate(function() {
		var scripts = document.querySelectorAll("script[src]");
		var urls = [];
		for (var i = 0; i < scripts.length; i++) {
			var script = scripts[i];
			var rel = script.getAttribute("src");
			var abs = getAbsoluteUrl(rel);
			urls.push({
				rel : rel,
				abs : abs
			})
		}
		return urls;
	});
	
	
	
	console.info(JSON.stringify(scriptUrls));
}

function start(url) {

	page.settings.userAgent = "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19";

	page.onLoadFinished = function() {
		page.injectJs("lib.js");
		setTimeout(generate, 5*1000);
	}

	page.open(url);
}

start("http://g.wanh5.com/sc/daxiong/");
