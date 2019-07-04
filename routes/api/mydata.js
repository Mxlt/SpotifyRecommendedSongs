const { User } = require("../../db/models");
var express = require("express");
var router = express.Router();

const to = require("await-to-js").default;

// Return complete user connections information
router.get("/", async (req, res) => {
  let data = req.user.dataValues;
  res.json(data);
});

module.exports = router;
