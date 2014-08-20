var __fs = require('fs');

var filelist = [];


function findFile(folder){
	__fs.readdirSync(folder).forEach(function(f){
		f = folder+"/"+f;
		if(__fs.lstatSync(f).isDirectory()){
			findFile(f);
		}else{
			if(/\.js|css|html$/.test(f)){
				filelist.push(f);	
			}
			
		}
	});
}





module.exports = function(output, diffList){
	findFile(output);
	
	filelist.forEach(function(file){
		var content = __fs.readFileSync(file,{
			encoding:"utf8"
		});
		diffList.forEach(function(diff){
			console.info(diff);
			content = content.replace(new RegExp("[a-zA-Z|\/|\.|\:|0-9]+"+diff['filename'].replace(/\./g,"\\."),"g"),diff['replace']);
		});
		
		__fs.writeFileSync(file,content);
	
	});
}








