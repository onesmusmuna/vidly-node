// Registering users
const express = require("express");
const bcrypt = require("bcrypt");

const auth = require("../middleware/auth.js");
const { User, joiUserSchema } = require("../models/user.js");
const router = express.Router();

// getting current user, this is more secure than adding an :id
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -__v");

  res.send(user);
});

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

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(`Successfully Registered: ${user.name}`);
});

module.exports = router;
