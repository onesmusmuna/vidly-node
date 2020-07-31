const express = require("express");
const router = express.Router();

const { Rental, joiRentalSchema } = require("../models/rental.js");
const { Customer } = require("../models/customer.js");
const { Movie } = require("../models/movie.js");

// get all rentals
router.get("/", async (req, res) => {
  const rental = await Rental.find();
  res.send(rental);
});

// create a rental
router.post("/", async (req, res) => {
  // validate input
  const result = joiRentalSchema.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  // checking if customerId is a valid customer
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.send("Invalid Customer Id");

  // checking if movieId is a valid movie
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.send("Invalid Movie Id");

  // check if the movie we are renting out, If its in the stock
  if (movie.numberInStock === 0) return res.send("Movie not in stock");

  // create rental obj
  const rental = new Rental({
    customer: {
      _id: req.body.customerId,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: req.body.movieId,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // we need a transaction here, I did not put one

  // save rental
  await rental.save();

  // decrease number in stock
  movie.numberInStock--;

  res.send(`successfully SAVED: ${rental}`);
});

module.exports = router;
