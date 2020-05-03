const express = require("express");

var router = express.Router();      //extract router module from express

router.get('/', (req, res) =>{
    res.render("index");        
});

module.exports = router;