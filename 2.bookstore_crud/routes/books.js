const express = require("express");
var Book = require("../models/book");
var router = express.Router();      //extract router module from express


//All books page

router.get("/", (req, res, next) =>{
    console.log('All here');
    
    Book.find({}, (err, listBooks) =>{
        if(err)
            return next(err);
        console.log(listBooks);
        return res.render("allBook",{books: listBooks });
    });
});

//Add book page
router.get("/new", (req, res, next) =>{
    console.log('Addbook');
    res.render("newBook")
});


router.post("/new", (req, res, next) =>{
    console.log('POSTBOOK')
    Book.create(req.body, (err, data) => {
        if(err) return next(err);
        console.log(req.body);
        return res.redirect('/books');
    });
});


//view books

module.exports = router;