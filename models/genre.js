const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const joiGenreSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
});

module.exports = { genreSchema, Genre, joiGenreSchema };
