var express = require("express");
var router = express.Router();

// Return complete user connections information
router.get("/", (req, res) => {
  let status;
  if (req.user) {
    status = true;
  } else {
    status = false;
  }
  res.json(status);
});

module.exports = router;
