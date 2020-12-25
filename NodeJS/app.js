const express = require('express');
const app = express();
var crypto = require("crypto-js");
const commonMiddleware = require('./middleware/common');
var appRoot = require('app-root-path');
require('dotenv').config({ path: `${appRoot}` + '/.env' });

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
