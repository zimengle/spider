
var page = require('webpage').create();
function call() {

	

	page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36";
	page.onLoadFinished = function() {
		var currentReferrer = page.evaluate(function() {
			return location.href;
		});
		if (currentReferrer != "http://apk.91.com/Soft/Android/com.duapp.endgame-1-1.0.html") {
			setTimeout(function() {
				// call();
			}, 5 * 1000);
		}
		page.evaluate(function() {
			var btn = document.querySelector(".s_btn.s_btn4");
			
			return btn;
		});
		
		
	}
	
	page.open('http://apk.91.com/Soft/Android/com.duapp.endgame-1-1.0.html', function() {
		dd.sd
		console.info("h")

	});
}

call();
