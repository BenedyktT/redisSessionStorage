const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/", passport.authenticate("local"), (req, res) => {
  try {
    res.json("user logged in");
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
