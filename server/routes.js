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
	//TODO validate url

	console.log(data.tags);

    var link = {
    	"url": data.url,
    	"path": data.path,
    	"hits": 0,
    	"user": "alex",
    	"date": Date(),
    	"tags": data.tags
    };
    db.collection('links', function(err, collection) {
        collection.insert(link, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(link);
            }
        });
    });
}

exports.hitLink = function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    db.collection('links', function(err, collection) {
    	//TODO check if legit
    	collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            item.hits++;
            collection.update({'_id':new BSON.ObjectID(id)}, item, {safe:true}, function(err, result) {
	            if (err) {
	                console.log('Error updating link: ' + err);
	                res.send({'error':'An error has occurred'});
	            } else {
	                console.log('' + result + ' document(s) updated');
	                res.send(item);
	            }
	        });
        });

        
    });
}