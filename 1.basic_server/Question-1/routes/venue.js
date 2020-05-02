const express = require("express");
var router = express.Router(); 
router.get('/venue', (req, res) => {
    res.render('venue');
  });

module.exports = router;