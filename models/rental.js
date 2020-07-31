const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: { type: String, required: true },
        isGold: { type: Boolean, default: false },
        phone: { type: String, required: true },
      }),
      required: true,
    },

    movie: {
      type: new mongoose.Schema({
        title: { type: String, required: true, trim: true },
        dailyRentalRate: { type: Number, required: true, min: 0 },
      }),
      required: true,
    },

    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },

    dateReturned: {
      type: Date,
    },

    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

const joiRentalSchema = Joi.object({
  customerId: Joi.string().required(),
  movieId: Joi.string().required(),
});

module.exports = { Rental, joiRentalSchema };

// ======================= KEY NOTES =======================

/* SETTING THE MONGOOSE SCHEMA PROPERTY, TO A CUSTOME SCHEMA
1.a_ We have a customer property, which we have set it, to a schema,
     We are NOT RE-USING the customer Shema, that we defined in customer module 
  
     The REASON for this:
    > Its because our customer can have a lot of properties, and we do not what that, inside this obj.
    > We only need these 3 properties in Displaying the list of Rentals, These are the essential properties.
      name - we need there name
      isGold - It can be used to calculate the rental fee. eg: if they are royal customers, the get a discount.
      phone - We need contact information.

1.b_ Same applies to the movie property, having a type of schema.


2_ USER INPUT
   The client should send only 2 values:
    1. customer Id,
    2. movie Id. 
*/
