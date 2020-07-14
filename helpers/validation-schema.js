const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
});

module.exports = schema;

// alphanum = only letters and numbers, NO spaces
