const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports = schema;
