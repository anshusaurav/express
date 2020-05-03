//requires
//connect to db
//instantiate express app
//middleware required
//routes
//error handler middleware
//listener

const express = require("express");
const mongoose = require("mongoose");
const ejs = require('ejs');
const path = require('path');



//REquire router files
var indexRouter = require("./routes/index");
var bookRouter = require("./routes/books")
const PORT = process.env.PORT||3000;

mongoose.connect('mongodb://localhost:27017/bookstore-crud', 
{useNewUrlParser: true, useUnifiedTopology: true},
(err) =>{
    console.log(err);
});

var app = express();

//connect to db
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//setup view engine
app.set("view engine", "ejs");          //use ejs and view engine
app.set("views", path.join(__dirname, "/views"));   //



app.use("/", indexRouter);
app.use("/books", bookRouter);

app.use(express.static(path.join(__dirname +"/public")));




app.use((err,req, res, next) =>{
    res.statusCode = 404;
    res.send('Page not found');
    //same as res.status(404).send('Page not found');
});

//client or sever error
app.use((err, req, res, next) =>{
    if(err.name === "ValidationError"){
        res.json({err});
    }
    return res.json({err});
});
//listen port
app.listen(PORT, ()=> {
    console.log('server started on port', PORT);
});

