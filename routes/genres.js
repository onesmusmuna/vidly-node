const express = require("express");
const { v4: uuidv4 } = require("uuid");

const schema = require("../helpers/validation-schema.js");

const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Comedy" },
];

router.get("/", (req, res) => {
  res.json({ genres });
});

router.post("/", (req, res) => {
  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  genres.push({
    _id: uuidv4(),
    name: result.value.name,
  });

  console.log(genres);
  res.send(result);
});

module.exports = router;
