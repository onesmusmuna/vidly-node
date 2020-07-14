const express = require("express");
const { v4: uuidv4 } = require("uuid");

const Genre = require("../models/genre.js");
const schema = require("../helpers/validation-schema.js");

const router = express.Router();

// get all genres
router.get("/", async (req, res) => {
  const genre = await Genre.find();
  res.send(genre);
});

// post genre
router.post("/", async (req, res) => {
  // Joi Validator
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  // use let, so that we can re-assign genre and return it to client
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(`successfully SAVED: ${genre.name}`);
});

// update genre
router.put("/:id", async (req, res) => {
  // Joi Validator
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  // Find genre and Update it, we are using the update first Approach
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  // if we do not have that genre
  if (!genre) {
    return res.status(400).send("Genre with the given ID does not exist in our Database");
  }

  // @ this point, our genre exist. we make the user know that
  res.send(`successfully UPDATED: ${genre.name}`);
});

// delete genre
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);

  // if we do not have that genre
  if (!genre) {
    return res.status(400).send("Genre with the given ID does not exist in our Database");
  }

  res.send(`Successfully Deleted: ${genre.name}`);
});

// get one genre with given ID
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  // if we do not have that genre
  if (!genre) {
    return res.status(400).send("Genre with the given ID does not exist in our Database");
  }

  res.json({ genre });
});

module.exports = router;
