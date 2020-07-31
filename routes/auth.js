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

  // we need to return a json web token
  // generating a token, private key should be in an environmental variable
  const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_PRIVATE_KEY);

  res.send(token);
});

module.exports = router;
