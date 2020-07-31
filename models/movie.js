const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { genreSchema } = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true, minlength: 3, maxlength: 255 },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, min: 0, max: 255 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
  })
);

// validation, we are validating what client is sending us
// Here we put genreId, because we want the client to send only the genre ID
const joiMovieSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  genreId: Joi.string().required(),
  numberInStock: Joi.number().min(0).max(200).required(),
  dailyRentalRate: Joi.number().min(0).max(200).required(),
});

module.exports = { Movie, joiMovieSchema };
