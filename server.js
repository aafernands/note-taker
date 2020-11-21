// Dependencies
const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express();

// Set our port to 8080
const PORT = process.env.PORT || 8080;

// expose the static  asset folder
app.use(express.static("public"));

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

// wild card
// match any url
app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "./index.html"));
});

// Starts our server
app.listen(PORT, function () {
	console.log("Server is listening on PORT: " + PORT);
});
