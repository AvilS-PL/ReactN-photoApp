const express = require("express")
const app = express()
const PORT = 3000;
const fs = require("fs");
const path = require("path")
const formidable = require('formidable');
const fsPromises = require("fs").promises

app.use(express.json());

const cors = require('cors')
app.use(cors())

app.get('/files', async (req, res) => {
    res.json(await list())
})

const list = async () => {
    try {
        let data = await fsPromises.readdir(__dirname + '/static/photos/')
        return (data)
    } catch (error) {
        return (error)
    }
}

app.patch('/rename', async (req, res) => {
    let form = formidable({})

    try {
        let data
        await form.parse(req, function (err, fields, files) {
            data = { name: fields.name, newName: fields.newName }
        });
        await rename(data.name, data.newName)
        res.end(JSON.stringify("gut"))
    } catch (error) {
        res.end(JSON.stringify(error))
    }
})

const rename = async (x, p) => {
    try {
        await fsPromises.rename(__dirname + '/static/photos/' + x, __dirname + '/static/photos/' + p + "." + x.split(".").slice(-1))
        console.log("renamed")
    } catch (error) {
        console.log(error)
    }
}

app.patch('/del', async (req, res) => {
    let form = formidable({})

    try {
        let data = []
        await form.parse(req, function (err, fields, files) {
            data = fields.tab.split(",")
        });
        for (let i = 0; i < data.length; i++) {
            await del(data[i])
            console.log(data[i])
        }
        res.end(JSON.stringify("gut"))
    } catch (error) {
        res.end(JSON.stringify(error))
    }
})

const del = async (x) => {
    try {
        await fsPromises.unlink(__dirname + '/static/photos/' + x)
        console.log("deleted")
    } catch (error) {
        console.log(error)
    }
}


app.post("/upload", function (req, res) {
    let form = formidable({})

    form.keepExtensions = true
    form.multiples = true
    form.uploadDir = __dirname + '/static/photos/'

    try {
        form.parse(req, function (err, fields, files) {
            res.end(JSON.stringify("uploaded successfully"));
        });
    } catch (error) {
        res.end(JSON.stringify(error))
    }

})

app.use(express.static(__dirname + '/static/'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})