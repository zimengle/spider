var exec = require('child_process').exec;
var fs = require('fs');


function getTotalSize(har){
	har = har.substring(har.indexOf("{"));
	har = JSON.parse(har);

	var size  = 0;
	har['log']['entries'].forEach(function(entry){
		 size += entry.response.bodySize;
	});
	return size;
}



var obj = {};


var gList = JSON.parse(fs.readFileSync("./output/list.json",{
	encoding:"utf8"
}));




function call(i){
	if(i<gList.length){
		var item = gList[i];
		exec("phantomjs ./lib/netsniff.js "+item['url'],function (error, stdout, stderr) {
			var id = item['id'];
			try{
				var size = getTotalSize(stdout);
				obj[id] = size;
				console.info(id+":"+size);
				call(i+1);
			}catch(e){
				obj[id] = 0;
				console.info("error:"+id+":msg:"+e);
				call(i+1);
			}
			
		});
	}else{
		fs.writeFileSync("./output/size.json",JSON.stringify(obj),{
			encoding:"utf8"
		});
	}
	
}
call(0);



