const express = require("express");
const path = require("path");
const qs = require("qs");
const ejs = require('ejs');

var app = express();
var port = process.env.PORT || 3000;

// templates
// - add view engine as ejs to the express application
// - set views directory for all ejs templates
// - add a get request on '/about' and render  'about.ejs' from views directory.
// - create a partial called 'header.ejs' and include it in multiple templates.

//setup view engine
app.set("view engine", "ejs");          //use ejs and view engine
app.set("views", path.join(__dirname, "/views"));   //


app.use('/static', express.static(path.join(__dirname, 'public')))
//create a middleware that console logs current date on each request.
app.use("/", (req, res, next) =>{
    console.log(new Date().toDateString());
    next();
});

//create a middleware that console logs url of each request.
app.use("/", (req, res, next) =>{
    console.log(req.url);
    next();
});


//create a middleware that logs 'welcome user' when request is made on /users.
app.use("/users", (req, res, next) =>{
    console.log('welcome user');
    next();
});


//create a middleware that logs 'page not found' when request is made on '/404'
app.use("/404", (req, res, next) =>{
    console.log('page not found');
    next();
});


app.use("/", (req, res, next) =>{
    if(req.header('Content-Type') === 'application/json') {
        console.log(req);
        var store= '';
        req.on('data', (chunk) => {
            store += chunk.toString();
        });
        req.on('end', () => {
           req.body = JSON.parse(store);
           console.log(req.body);
        })
    }
    next();
});

//Middleware for json
app.use("/", (req, res, next) =>{
    if(req.header('Content-Type') === 'application/json') {
        console.log(req);
        var store= '';
        req.on('data', (chunk) => {
            store += chunk.toString();
        });
        req.on('end', () => {
           let obj  = JSON.parse(store);
           console.log(obj);
           req.body = obj;
        })
    }
    next();
});


//Middleware for urlencoded
app.use("/", (req, res, next) =>{
    if(req.header('Content-Type') === 'application/x-www-form-urlencoded') {
        console.log(req);
        var store= '';
        req.on('data', (chunk) => {
            store += chunk.toString();
        });
        req.on('end', () => {
           let obj = qs.parse(store);
           console.log(obj);
           res.body = obj;
        })
    }
    next();
});

//logger middleware
app.use('/', (req, res, next)=>{
    console.log('URL: ' + req.url);
    console.log('Method: ' + req.method);
    console.log('Host: ' + req.hostname);
    next();
});


// routing
// - handle get request on '/' route with sending 'hello Express' in response.
// - handle get request on '/contact' route with an HTML contact form
// - handle POST request on '/contact' route
//   - send some data as POST on '/contact' from postman
//   - capture data and send it in response as res.json()

app.get('/', (req, res, next) =>{
    res.send('Hello Express');
})
app.get('/contact', (req, res, next) =>{
    res.send(`<html>
        <form action="/contact" method="POST">
        <label for="name">Name</label>
        <input type="text" name="name">
        <label for="email">Email</label>
        <input type="text" name="email">
        <label for="phone">Phone</label>
        <input type="text" name="phone">
        <input type="submit" value="Submit">
        </form>
    </html>`)
})

app.post('/contact', (req, res, next) =>{
    let obj = res.body;
    res.json(obj);
})

app.get('/about', (req, res, next) =>{
    res.render('about');
});
//create a error handler middleware with 4 arguments that sends 'server error' in response when 
//error is passed as argument to next function.
app.use((err, req, res, next) =>{
    if(err)
        console.log('server error');
    return res.json({err});
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});