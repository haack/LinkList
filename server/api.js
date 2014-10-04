var express = require('express'),
    link = require('./routes.js'),
    bodyParser = require('body-parser');
 
var app = express();

// parse application/json
app.use(bodyParser.json())

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/links', link.findAll);
app.get('/link/:id', link.findById);
app.get('/link/hit/:id', link.hitLink);
app.post('/link', link.addLink);
 
app.listen(1337);
console.log('Listening on port 1337...');