var express = require('express'),
	fs = require('fs'),
	csv = require('csv');

var app = express();
var storage;

fs.readFile('./data1.csv', function(err, data) {
	if (err) return console.log(err);
	csv.parse(data.toString(), function(err, data) {
		if (err) return console.log(err);
		storage = data;
		console.log(storage);
		convertToJSArrayAndSaveToFile(storage, 3);
	});
});

app.get('/', function(req, res) {
	if (!req.query.website || !req.query.companyName || !req.query.jobTitle || !req.query.ccText) {
		console.log('ERROR! NOT ENOUGH PARAMS:');
		console.log(req.query);
		console.log('ERROR! NOT ENOUGH PARAMS:');
		return res.end();
	}

	for (var i = 0; i < storage.length; i++) {
		if (storage[i][3] == req.query.companyName) {
			console.log("WARNING! COMPANY NAME IS ALREADY SERVED");
			console.log("Storage:"); console.log(storage[i]);
			console.log("Query:");   console.log(req.query)
			console.log("WARNING! COMPANY NAME IS ALREADY SERVED");
			return res.end();
		}
	}

	var today = new Date();
	var date = (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes();

	storage.push(
		[
			date, 
			time,
			req.query.website,
			req.query.companyName,
			req.query.jobTitle,
			0,
			req.query.contactInfo,
			req.query.ccText.replace(/\n/g, '\\n')
		]);

	convertToJSArrayAndSaveToFile(storage, 3);

	csv.stringify(storage, function(err, strdata) {
		if (err) return console.log(err);
		fs.writeFile('./data.csv', strdata, function(err) {
			if (err) return console.log(err);
		});
	});

	console.log("--------------------------------------------------")
	console.log(req.query);
	res.send('Hello, world!');
});

app.listen(3000);

function convertToJSArrayAndSaveToFile(array, index) {
	var strData = "var companyNames = [\n";

	for (var i = 0; i < array.length; i++)
		strData += "\t\"" + array[i][index] + "\"" + ",\n";

	strData += "];";

	fs.writeFile('../companynames.js', strData, function(err) {
		if (err) return console.log(err);
	});
}