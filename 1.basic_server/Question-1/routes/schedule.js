const express = require("express");
var router = express.Router(); 
router.get('/schedule', (req, res) => {
    res.render('schedule');
  });

module.exports = router;