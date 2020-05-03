const express = require("express");

var router = express.Router();      //extract router module from express

router.get('/books', (req, res, next) =>{
    res.render("index");        
});

router.get('/books/new', (req, res, next) =>{
    res.render('')
});
module.exports = router;