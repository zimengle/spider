var page = require('webpage').create();
var fs = require('fs');


var list = [];

function spide(i){
	console.info("spide page:http://51h5.com/index-ajax_more-p-"+i+".html");
	page.open('http://51h5.com/index-ajax_more-p-'+i+'.html', function() {
		var jsonSource = page.plainText;
		
		var res = JSON.parse(jsonSource);
		
		if(res['status'] == 1){
			var data = res['data'];
			list = list.concat(data['list']);
			if(data['isfull'] == 1){
				spide(i+1);
			}else{
				fs.write("./output/list.json", JSON.stringify(list), 'w');
				phantom.exit();
			}
		}else{
			fs.write("./output/list.json", JSON.stringify(list), 'w');
			phantom.exit();
		}
		
		
	});
}

spide(0);





