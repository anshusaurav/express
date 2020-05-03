const express = require("express");
const path = require("path");
const qs = require("qs");
const ejs = require('ejs');
const mongoose = require('mongoose');


var indexRouter = require("./routes/index");
var bookRouter = require("./routes/books")
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/bookstore_crud', 
{useNewUrlParser: true, useUnifiedTopology: true},
(err) =>{
    console.log(err);
});


var app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//setup view engine
app.set("view engine", "ejs");          //use ejs and view engine
app.set("views", path.join(__dirname, "/views"));   //


app.use('/static', express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/books", bookRouter);

//create a error handler middleware with 4 arguments that sends 'server error' in response when 
//error is passed as argument to next function.

app.use((err,req, res, next) =>{
    res.statusCode = 404;
    res.send('Page not found');
    //same as res.status(404).send('Page not found');
});

app.use((err, req, res, next) =>{
    if(err.name === "ValidationError"){
        res.json({err});
    }
    return res.json({err});
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});