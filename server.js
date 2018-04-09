"use strict";

var express = require("express"),
    app = express();

app
    .use(express.static("public"))
    .listen(parseInt(process.argv[2]) || "9999", function() {
        console.log("Listening on %d.", this.address().port);
    });
