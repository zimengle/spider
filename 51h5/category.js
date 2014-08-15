var webpage = require('webpage').create();
var fs = require('fs');

var categories = [{
	"name" : "休闲娱乐",
	"cid" : 333
}, {
	"name" : "角色扮演",
	"cid" : 339
}, {
	"name" : "益智游戏",
	"cid" : 340
}, {
	"name" : "棋牌天地",
	"cid" : 337
}, {
	"name" : "体育竞技",
	"cid" : 335
}, {
	"name" : "射击游戏",
	"cid" : 338
}, {
	"name" : "敏捷游戏",
	"cid" : 336
}, {
	"name" : "动作游戏",
	"cid" : 334
}, {
	"name" : "冒险游戏",
	"cid" : 341
}, {
	"name" : "策略闯关",
	"cid" : 342
}, {
	"name" : "儿童教育",
	"cid" : 343
}, {
	"name" : "漫画游戏",
	"cid" : 344
}];

var obj = {};

function call(k) {

	if (k < categories.length) {
		var category = categories[k];
		function spide(i) {
			var page = 'http://51h5.com/cate-ajax_more-cid-' + category.cid + '-sort-hot-p-' + i + '.html';
			console.info("open:"+page);
			webpage.open(page, function() {
				var jsonSource = webpage.plainText;
				var res = JSON.parse(jsonSource);

				if (res['status'] == 1) {
					var data = res['data'];
					data['list'].forEach(function(row) {
						obj[row['id']] = category
					});

					if (data['isfull'] == 1) {
						spide(i + 1);
					} else {
						call(k + 1);
					}
				} else {
					call(k + 1);
				}

			});
		}
		spide(0);
	}else{
		fs.write("./output/category.json", JSON.stringify(obj), 'w');
		phantom.exit();
	}

}

call(0);

