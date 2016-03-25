var express = require('express')
,	mongoClient = require('mongodb').MongoClient
, http = require('http')
, path = require('path')
, url = require('url')
, bodyParser = require('body-parser');

var app = express();

app.set('port', 3000);

app.use(express.static(__dirname + '/views'));
app.use(express.static('./public'));
app.use('/public', express.static(path.resolve('./public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var db;

mongoClient.connect("mongodb://myuser:mypassword@ds025239.mlab.com:25239/registration_form_cmpe280", function(err, database) {
	if(err) {
        console.log(("Error Connection"));
		throw err;  
	}
	db = database;
});

app.get("/", function(req, res) {
	res.render("index");
});

app.post("/saveData", function(req, res) {
	console.log(" In Save Data : ");
	db.collection("user_details").save(req.body , function(err, data) {
		if (err) {
		    console.log(err);
		} else {
			console.log("Successfully added the information to the database.");
			var response = {
				    status  : 200,
				    success : 'Updated Successfully'
			};
			res.end(JSON.stringify(response));
		}
	});
	
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
