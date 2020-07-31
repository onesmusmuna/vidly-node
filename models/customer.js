const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isGold: { type: Boolean, default: false },
  phone: { type: Number, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);

const joiCustomerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(5).max(50).required(),
  isGold: Joi.boolean(),
});

module.exports = { Customer, joiCustomerSchema };
