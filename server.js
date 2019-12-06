const express = require("express");
const fs = require("fs");
const path = require("path");
const dbH = require("./lib/dbHandler"); // will use custom written DB handler to read and write to a json db
const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");

var app = express();
var PORT = process.env.PORT || 3000; //to be changed later


// Sets up the Express app to handle data parsing (do I really need this?)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// functions to handle the routes

// api routes
app.get('/api/notes', function(request, response) {
    let db = new dbH.dbHandler(path.join(__dirname,'db', 'db.json')); 
    let dataArray = JSON.parse(db.read());
    response.send(dataArray);
})

app.post('/api/notes', function(request, response) {
    let db = new dbH.dbHandler(path.join(__dirname, 'db', 'db.json'));
    let dataArray = JSON.parse(db.read());
    let newNote = request.body;
    newNote.id = uuidv1();
    dataArray.push(newNote);
    db.write(JSON.stringify(dataArray));
    response.send('200');
})

app.delete('/api/notes/:id', function(request, response) {
    let db = new dbH.dbHandler(path.join(__dirname,'db', 'db.json'));
    let dataArray = JSON.parse(db.read());
    let id = request.params.id;
    dataArray = dataArray.filter(value => value.id != id);
    db.write(JSON.stringify(dataArray));
    response.send('200');
})

// html routes
app.get('/notes', function(request, response) {
    response.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
