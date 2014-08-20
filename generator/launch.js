var args = {
	url : "",
	har : "",
	delay:5,
	output:"./output/"+new Date().getTime()
}
process.argv.forEach(function(val, index, array) {
	var pair = val.split("=");
	if(pair.length==2){
		args[pair[0]]=pair[1];
	}
});

var __analyze = require("./analyze.js");
var __fs = require('fs');
if(args.har != null){
	start(__fs.readFileSync(args.har,{
		"encoding":"utf8"
	}));
}else{
	var exec = require('child_process').exec;
	exec('phantomjs ./lib/netsniff.js '+args.url+' '+args.delay, function(error, stdout, stderr) {
		start(stdout);
	});
}

function start(har){
	__analyze(JSON.parse(har),args.output);
}


