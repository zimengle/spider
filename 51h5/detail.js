pjs.config({
	// options: 'stdout', 'file' (set in config.logFile) or 'none'
	log : 'stdout',
	// options: 'json' or 'csv'
	format : 'json',
	// options: 'stdout' or 'file' (set in config.outFile)
	writer : 'file',
	outFile : './output/detail.json'
});

var fs = require('fs');

JSON.parse(fs.read("./output/list.json")).forEach(function(page) {
	pjs.addSuite({
		// single URL or array
		url : 'http://51h5.com'+page.purl+"?from="+page.id,
		// single function or array, evaluated in the client
		scraper : function() {
			var id = /\?from=(.*)/.exec(location.href)[1];
			var star = $("dl.meta i").attr("class");
			star = star.charAt(star.length - 1);
			var thumbnails = (function() {
				var arr = [];
				$("ul[data-role='wrapper'] img").each(function() {
					arr.push($(this).data("src"));
				});

				return arr;
			})();
			return {
				id:id,
				url:$(".ui-btn.play").attr("href"),
				name : $("h3.title").text(),
				icon : $("figure.cover img").data("src"),
				star : star,
				count : /[0-9]+/.exec($("span.count").text())[0],
				thumbnails : thumbnails,
				desc : $(".mod.detail .inner").remove("img").text()

			}
		}
	});
});
