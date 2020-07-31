const express = require("express");
const router = express.Router();

const { Genre } = require("../models/genre.js");
const { Movie, joiMovieSchema } = require("../models/movie.js");

// get all movies
router.get("/", async (req, res) => {
  const movie = await Movie.find();
  res.send(movie);
});

// get one movie
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.send("The movie with the given ID was not found.");

  res.send(movie);
});

// create a movie
router.post("/", async (req, res) => {
  // validate input
  const result = joiMovieSchema.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  // find genre
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.send("Invalid Genre");

  const movie = await new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  await movie.save();
  res.send(`successfully SAVED: ${movie.title}`);
});

// update a movie
router.put("/:id", async (req, res) => {
  // validate input
  const result = joiMovieSchema.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  // find genre
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.send("Invalid Genre");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie) return res.send("The movie with the given ID was not found.");

  res.send(`successfully UPDATED: ${movie.title}`);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) return res.send("The movie with the given ID was not found.");

  res.send(`successfully DELETED: ${movie.title}`);
});

module.exports = router;
