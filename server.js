var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var path = require("path");
app.set("views", path.join(__dirname, "./client/views"));
app.set("view engine", "ejs");

var session = require("express-session");
const flash = require("express-flash");
app.use(session({
    secret: "secretlogin",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));
app.use(flash());

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

app.listen(3333, function() {
    console.log("listening on port 3333");
});

/*
purplesmart@eq.net; twily123
20cooler@eq.net; dashie20
nightprincess@eq.net; lunamoon
sunprincess@eq.net; sunny
*/