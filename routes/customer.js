const express = require("express");

const { Customer, joiCustomerSchema } = require("../models/customer.js");

const router = express.Router();

// get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

// get one customer
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.send(customer.name);
});

// create a customer
router.post("/", async (req, res) => {
  // validate input
  const result = joiCustomerSchema.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  const customer = await new Customer({
    name: req.body.name,
    phone: req.body.phone,
  });

  await customer.save();
  res.send(`Successfully SAVED: ${customer.name}`);
});

// update a customer
router.put("/:id", async (req, res) => {
  // validate input
  const result = joiCustomerSchema.validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  // update customer
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { $set: { name: req.body.name, phone: req.body.phone } },
    { new: true }
  );

  res.send(`Successfully UPDATED: ${customer.name}`);
});

// delete customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  res.send(`Successfully DELETED: ${customer.name}`);
});

module.exports = router;
