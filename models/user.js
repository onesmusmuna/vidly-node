const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// for validating user in user route
const joiUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(255).required(),
});

// for validating auth in auth route, we only need email and password since user will be loging in from here
const joiAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(255).required(),
});

module.exports = { User, joiUserSchema, joiAuthSchema };
