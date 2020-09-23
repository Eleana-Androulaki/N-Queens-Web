var express 			  = require('express');
var app  				  = express();
var path 				  = require('path');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({});
app.set('views', "./");
app.use(express.static('./'));


app.get("/", function(req,res){
	res.sendFile(path.join(__dirname+'/queens.html'));
});

app.get("/QueensManual", function(req,res){
	res.sendFile(path.join(__dirname+'/queensManual.html'));
});


var server = app.listen(8080 , function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Server started...");
});
