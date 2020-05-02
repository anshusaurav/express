const express = require("express");
const path = require("path");

var indexRouter = require('index');
var registerRouter = require('register');
var scheduleRouter = require('schedule');
var speakerRouter = require('speakers');
var venueRouter = require('venue');
const PORT = process.env.PORT||3000;

var app = express();

//setup view engine
app.set("view engine", "ejs");          //use ejs and view engine
app.set("views", path.join(__dirname, "/views"));   //

app.use(express.static(__dirname +"/public"));


app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/schedule", scheduleRouter);
app.use("/speakers", speakerRouter);
app.use("/venue", venueRouter);

app.use((err,req, res, next) =>{
    res.statusCode = 404;
    res.send('Page not found');
    //same as res.status(404).send('Page not found');
});


//listen port
app.listen(PORT, ()=> {
    console.log('server started on port', PORT);
});