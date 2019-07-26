var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.get('/', function(req,res) {
	res.sendFile(__dirname + "/dbLib.html");
});

app.get('/booklist', function(req,res) {
	var db = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'tiger',
		database: 'portfolio'
	});
	db.connect();

	db.query("SELECT * from lib", function(err, data) {
		if(err) throw err;
		res.send(data);
		db.end();
	})
})

app.get('/userbooks', function(req,res) {
	var db = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'tiger',
		database: 'portfolio'
	});
	db.connect();


	db.query("SELECT * from userbooks", function(err, data) {
		if(err) throw err;
		res.send(data);
		db.end();
	})
})

app.post('/userbooks', function(req,res) {
	var db = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'tiger',
		database: 'portfolio'
	});
	db.connect();

	var name = req.body.name;
	var author = req.body.author;

	var sql = "insert into userbooks values('"+name+"', '"+author+"')";

	db.query(sql, function(err) {
		if(err){

			throw err;
		}
		db.end();
	});
	console.log("Name : " + name + ", Author : " + author);
	res.end();
});

app.post('/userbooksrem', function(req,res) {
	var db = mysql.createConnection( {
		host: 'localhost',
		user: 'root',
		password: 'tiger',
		database: 'portfolio'
	});
	db.connect();

	var names = req.body.name;
	var author = req.body.author;

	var sql = "delete from userbooks where name = ?";

	db.query(sql,[names], function(err) {
		if(err) throw err;
		db.end();
	});
	res.end();
});

app.listen(3000, function() {
	console.log("Server started");
})
