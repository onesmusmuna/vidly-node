const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ home: "home page" });
});

module.exports = router;
