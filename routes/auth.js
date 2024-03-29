// authenticating / loging in users
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User, joiAuthSchema } = require("../models/user.js");

const router = express.Router();

router.post("/", async (req, res) => {
  // validate input
  const result = joiAuthSchema.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  //Checking if user is already registered, So that they can log In
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Invalid user or password");

  // validate the password with bcrypt to check if it match with the password in DB
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.send("Invalid user or password");

  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;
