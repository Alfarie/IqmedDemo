var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser')
var mongojs = require('./db');
var db = mongojs.connect;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var config = require('./config');



// db.data.insert({ data: "hello" }, function(err, docs) {
//     // insert completed 
// });

// db.data.find({}, function(err, docs) {
//     // Ahoy!
//     console.log(docs);
// });

app.get("/", function(req, res) {
    res.json({ "status": "OK" })
});

app.get("/iqmed/api/portal/:userid", function(req, res) {
    var userid = req.params.userid

    db.data.find({ user: userid }, function(err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        res.json(docs);
    });
})

app.post("/iqmed/api/outlet", function(req, res) {
    var data = req.body;
    if (data == undefined && data.user == undefined) {
        res.json({ status: "insert fail." });
        return;
    }

    db.data.insert(data, function(err, docs) {
        if (err) {
            console.log(err);
            res.json({ status: "insert fail." });
            return;
        }
        res.json({ status: "successfull" });
    })
})

http.listen(config.port, function() {
    console.log('listening *:' + config.port);
});