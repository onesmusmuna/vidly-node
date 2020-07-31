const express = require("express");

const { Genre, joiGenreSchema } = require("../models/genre.js");
const { route } = require("./home.js");
const router = express.Router();

// get all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

// get one genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  res.send(genre.name);
});

// post a genre
router.post("/", async (req, res) => {
  // validate input
  const result = joiGenreSchema.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  const genre = await new Genre({
    name: req.body.name,
  });

  await genre.save();
  res.send(`Successfully SAVED: ${genre.name}`);
});

// update genre
router.put("/:id", async (req, res) => {
  // validate input
  const result = joiGenreSchema.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  // update genre
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name } },
    { new: true }
  );

  res.send(`Successfully UPDATED: ${genre.name}`);
});

// delete genre
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  res.send(`Successfully DELETED: ${genre.name}`);
});

module.exports = router;
