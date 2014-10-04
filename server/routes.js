var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('linkdb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'linkdb' database");
        db.collection('links', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'links' collection doesn't exist, sorry bro...");
            }
        });
    }
});

exports.findById = function(req, res, next) {
    var id = req.params.id;
    db.collection('links', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res, next) {
    db.collection('links', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addLink = function(req, res, next) {
	data = req.body;
    var link = {
    	"url": data.url,
    	"rating": 0,
    	"user": "alex",
    	"date": Date()
    };
    db.collection('links', function(err, collection) {
        collection.insert(link, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}