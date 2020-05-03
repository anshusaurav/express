const express = require("express");
var Book = require("../models/book");
var router = express.Router();      //extract router module from express


//All books page

router.get("/", (req, res, next) =>{
    
    Book.find({}, (err, listBooks) =>{
        if(err)
            return next(err);
        return res.render("allBook",{books: listBooks });
    });
});

//Add book
router.get("/new", (req, res, next) =>{
    res.render("newBook")
});


router.post("/new", (req, res, next) =>{
    Book.create(req.body, (err, data) => {
        if(err) return next(err);
        return res.redirect('/books');
    });
});


//view Single book

router.get("/:id", (req, res, next) =>{
    var _id = req.params.id;
    console.log('ID', id);
    Book.findById(_id, (err, book) =>{
        console.log(book);
        if(err)
            return next(err);
        console.log(book);
        return res.render('viewBook', {book})
    });
});

module.exports = router;