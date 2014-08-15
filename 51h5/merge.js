var fs = require('fs');
var gList = JSON.parse(fs.readFileSync("./output/list.json",{
	encoding:"utf8"
}));
var detailList = JSON.parse(fs.readFileSync("./output/detail.json",{
	encoding:"utf8"
})); 

var categoryObj = JSON.parse(fs.readFileSync("./output/category.json",{
	encoding:"utf8"
})); 

var sizeObj = JSON.parse(fs.readFileSync("./output/size.json",{
	encoding:"utf8"
})); 



var resultList = [];

gList.forEach(function(row){
	var id = row['id'];
	var detail = getDetailById(id);
	var category = categoryObj[id];
	var type = category.name;
	var name = row['title'];
	var version = "1.0";
	var size = getSize(sizeObj[id]);
	
	var rating = parseFloat(row['rates']);
	var hot = Math.min((20*rating),100);
	var language = "中文";
	var count = detail['count'];
	var update = new Date().getTime();
	var comment = row['intro'].replace(/\s/g,"");
	var desc = detail['desc'].replace(/\s/g,"");
	var icon = row['img'];
	var thumbnails = detail['thumbnails'];
	var url = detail['url'];
	
	resultList.push({
		id:id,
		name:name,
		type:type,
		version:version,
		size:size,
		rating:rating,
		hot:hot,
		language:language,
		count:count,
		updateDate:"2014-08-11",
		comment:comment,
		description:desc,
		icon:icon,
		thumbnails:thumbnails,
		url:url
	})
	
});

fs.writeFileSync("./output/merge.json",JSON.stringify(resultList),{
	encoding:"utf8"
});

function getSize(s){
	if(s <=0){
		s = Math.random()*10000;
	}

	var k = parseInt(s/1024);
	if(k>1024){
		return parseInt(k/1024)+"M";
	}else{
		return k+"K";
	}
}

function getDetailById(id){
	for(var i = 0;i<detailList.length;i++){
		var detail = detailList[i];
		if(detail.id == id){
			return detail;
		}
	}
	return null;
}

