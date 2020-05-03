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
    var id = req.params.id;
    // console.log('ID', id);
    Book.findById(id, (err, book) =>{
        // console.log(book);
        if(err)
            return next(err);
        // console.log(book);
        return res.render("viewBook", {book})
    });
});


//Delete single book


router.get("/:id/delete", (req, res, next) =>{
    var id = req.params.id;
    // console.log('ID', id);
    Book.findByIdAndDelete(id, (err, updatedBook) =>{
        if(err)
            return next(err);
        res.redirect('/books');

    });  //defaults to $set fields missing from {} object are not updated
});


//Edit book

router.get("/:id/update", (req, res, next) =>{
    var id = req.params.id;
    // console.log('1ID', id);
    Book.findById(id, (err, book) =>{
        if(err)
            return next(err);
        res.render("editBook",  {book});

    });  //defaults to $set fields missing from {} object are not updated
});


router.post("/:id/update", (req, res, next) =>{
    var id = req.params.id;
    console.log('2ID', id);
    console.log('Sunny');
    Book.findByIdAndUpdate(id, req.body, (err, updatedBook) =>{
        if(err)
            return next(err);
        res.redirect('/books');

    });  //defaults to $set fields missing from {} object are not updated
});
module.exports = router;