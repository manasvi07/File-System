const express = require('express');
const app = express();
var crypto = require("crypto-js");
const commonMiddleware = require('./middleware/common');
var appRoot = require('app-root-path');
require('dotenv').config({ path: `${appRoot}` + '/.env' });



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-disposition, Accept, Authorization, User-Role, Access-Token, Search-Key");
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
});

commonMiddleware(app);

app.use(function (err, req, res, next) {
    res.status(400);
    res.json({
        message: err.message,
        status: false
    });

});


app.listen(process.env.PORTNO || 8080, () => {
    console.log("server is up and listening on 8080...")
});

const fileSystem = require('./Controllers/fileController')
app.use(fileSystem);
