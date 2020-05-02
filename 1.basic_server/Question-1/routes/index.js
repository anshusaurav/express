const express = require("express");
var router = express.Router(); 
router.get('/', (req, res) => {
    // console.log('here');
    res.render('index');
  });

module.exports = router;