const express = require("express");
var router = express.Router(); 
router.get('speakers', (req, res) => {
  console.log('sadahere');
    res.render('speakers');
  });

module.exports = router;