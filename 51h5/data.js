var fs = require('fs');
var pinyin = require("pinyin");

function formatPinyin(arr) {
	var r = [];
	arr.forEach(function(n) {
		r.push(n[0]);
	});
	return "'" + r.join("") + "'";
}

var merge = JSON.parse(fs.readFileSync("./output/merge.json",{
	encoding:"utf8"
})); 
var endgame = JSON.parse(fs.readFileSync("./output/endgame.json",{
	encoding:"utf8"
})); 
var arr = [];
merge.concat(endgame).forEach(function(row){
	

	
		var values = [];

		var attrs = [];

		for (var key in row) {
			var str = "";
			attrs.push(key);
			if (key == "thumbnails") {
				str = "'" + row[key].join(",") + "'";
			} else if (key == "updateDate") {
				str = new Date(row[key]).getTime();
			} else {
				str = "'" + row[key] + "'";
			}
			values.push(str);
		}
		attrs.push("fullname");
		attrs.push("initialname");
		values.push(formatPinyin(pinyin(row['name'], {
			style : pinyin.STYLE_NORMAL
		})));
		values.push(formatPinyin(pinyin(row['name'], {
			style : pinyin.STYLE_FIRST_LETTER
		})));
		arr.push("delete from endgame where id='"+row['id']+"';");
		arr.push("insert into endgame (" + attrs.join(',') + ") values (" + values.join(',') + ");");

		// console.info(arr);

	
	
	
});
fs.writeFile("./output/out.sql", arr.join("\n"));