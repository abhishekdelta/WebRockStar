//var cwd = process.cwd();
//process.chdir(__dirname);
var MongoClient = require(__dirname + '/node_modules/mongodb').MongoClient;
var client = require('webdriverjs').remote({
  desiredCapabilities:{
    cssSelectorsEnabled: true,
    browserName: 'phantomjs'
  }
});
client.init();

//get all the test values from mongo db
//this file will be called by the python script hence we need to accept arguments as server name and port
//get all the test values from mongo db
//this file will be called by the python script hence we need to accept arguments as server name and port

//it should be called like this nodejs testSubmission.js <server> <port> <ansId> <quesId> <testSet>
var server_name = process.argv[2], //provides which server it is listening to
        server_port = process.argv[3], //provides the info about open port
        answerId = process.argv[4], //provides the info about answer location
        questionId = process.argv[5], //question information
        testSet = process.argv[6]; //this gives info about whith testsuite to run small/big/custom


//the below set will come from mongodb
var testSet = [{'tcid':'123','#username':'<asd',
'#password':'password',
'output': 'false',
'weight':10,
'testUrl' : '/',
}];
//start the APP
//Fetch the testcases
process.env.PORT = server_port;
//process.chdir(cwd);
var app = require('/tmp/'+answerId+'/app.js');
//this will start the application
//fetch the testcases for the application
console.log('will call'+server_name+':'+server_port);
var testStatus = new Array();
testSet.forEach(function(v,i){

client.url('http://'+server_name+":"+server_port+ v.testUrl)
	var weight =  v.weight;
	var expRes = v.output;
	var tcid = v.tcid;
	try{
	delete v.tcid;
	delete v.weight;
	delete v.output;
	delete v.testUrl;
	for(var x in v){
		client.setValue(x,v[x]);
	}
	client.submitForm('form',function(){
	client.getText('#output',function(err,val){
	if(val == expRes){
		//give marks according to the weightage.. :)
		console.log('giving expected result');
		testStatus.push({'tcid':tcid,'result':weight})
	}else{
		testStatus.push({'tcid':tcid,'result':'WA'});
		console.log('giving unexpected result');
	}
	});
});}catch (e){
	testStatus.push({'tcid':tcid,'result':'Runtime Error..:\'('})
	process.exit(1);
	}
});
//save data
//need to store answer as AnswerID
process.exit(0);