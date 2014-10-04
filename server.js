var express = require('express');
 
var app = express();
 
app.get('/links', function(req, res) {
    res.send([{name:'link1'}, {name:'link2'}]);
});
app.get('/link/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});
 
app.listen(1337);
console.log('Listening on port 1337...');