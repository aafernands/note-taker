// Dependencies
const path = require("path");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

// Set our port to 8080
const PORT = process.env.PORT || 8080;

// expose the static  asset folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded()); // parse body for form data type
app.use(bodyParser.json()); // parse body for json data type

// Routes
app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/notes", function (req, res) {
	res.sendFile(path.join(__dirname, "./notes.html"));
});

app.get("/api/notes", function (req, res) {
	const notes = fs.readFileSync(path.join(__dirname, "./data/db.json"));

	console.log(JSON.parse(notes));

	res.json(JSON.parse(notes));
});

app.post("/api/notes", function (req, res) {
	const notes = fs.readFileSync(path.join(__dirname, "./data/db.json"));

	console.log("body", req.body);
	const newNote = req.body;

	// create id using unix timestamp
	newNote.id = Date.now() + ""; // use + to convert number to string

	const parseData = JSON.parse(notes);

	parseData.push(newNote);

	console.log("New note", newNote);

	fs.writeFileSync(
		path.join(__dirname, "./data/db.json"),
		JSON.stringify(parseData)
	);

	res.json(newNote); // send http status 200 with json data
	// res.status(201).json(newNote); // set http status 201 (Created) and send json data
});

// match DELETE:
// /api/notes/1234
// /api/notes/4321
app.delete("/api/notes/:id", function (req, res) {
	const notes = fs.readFileSync(path.join(__dirname, "./data/db.json"));

	console.log("DELETE ID", req.params.id);

	const parseData = JSON.parse(notes);

	const filteredData = parseData.filter(function (data) {
		return data.id !== req.params.id;
	});

	console.log("Filtered result", filteredData);

	fs.writeFileSync(
		path.join(__dirname, "./data/db.json"),
		JSON.stringify(filteredData)
	);

	res.sendStatus(200); // http status 200 Ok
});

// wild card
// match any url
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./index.html"));
});

// Starts our server
app.listen(PORT, function () {
	console.log("Server is listening on PORT: " + PORT);
});
