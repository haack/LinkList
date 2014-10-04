var express = require('express'),
    links = require('./routes.js');
 
var app = express();

app.all('*', function(req, res, next) {
	console.log("adding cors");
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/links', links.findAll);
app.get('/link/:id', links.findById);
 
app.listen(1337);
console.log('Listening on port 1337...');