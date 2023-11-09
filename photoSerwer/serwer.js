const express = require("express")
const app = express()
const PORT = 3000;
const path = require("path")
const formidable = require('formidable');
app.use(express.json());

app.get("/exists", function (req, res) {
    res.end(JSON.stringify("yes"));
})

app.post("/upload", function (req, res) {
    let form = formidable({});

    form.keepExtensions = true
    form.multiples = true
    form.uploadDir = __dirname + '/upload/'

    form.parse(req, function (err, fields, files) {
        res.end(JSON.stringify("uploaded successfully"));
    });
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})