// Registering users
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const { User, joiUserSchema } = require("../models/user.js");
const router = express.Router();

router.post("/", async (req, res) => {
  // validate input
  const result = joiUserSchema.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  // Checking if user is already registered, so that we can not register them twice
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // using lodash pick method
  // helps you pick props of an object you are intrested with
  // _.pick(<obj>, ['<prop1>', '<prop2>'])
  // It returns a new obj with specified props

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
