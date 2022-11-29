// import express, init router
const express = require("express");
const router = express.Router();
// import the Customer model
const Customer = require("../models/Customer");
// import express validator for validation
const { check, validationResult } = require("express-validator");
// TO DO: implement token system
// import jsonwebtoken
const jwt = require("jsonwebtoken");
// get the secret key for token generation from the environment variables
require("dotenv").config();
const key = process.env.KEY;
// console.log(key)
// sifreleme icin bcrypt
const bcrypt = require("bcryptjs");
// Cart model to generate a default cart when a new customer created
const Cart = require("../models/Cart");

// token generator function for both registering and logging in
const generateToken = (customer, key) => {
  return jwt.sign(
    {
      _id: customer._id,
      fullName: customer.fullName,
      email: customer.email,
      password: customer.password,
      phoneNumber: customer.phoneNumber,
      address: customer.address,
    },
    key
  );
};
// validation criterias for register and login
const registerValidation = [
  check("fullName").isLength({ min: 5 }).withMessage("We need your fullname!"),
  check("email").isEmail().withMessage("Please provide a valid email."),
  check("password")
    .isLength({ min: 8 })
    .withMessage("A strong password should be atleast 8 characters"),
  check("phoneNumber")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number."),
  check("address")
    .isLength({ min: 20 })
    .withMessage("More explanation helps us deliver your items faster!"),
];
const loginValidation = [
  check("email").isEmail().withMessage("Please provide a valid email."),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
];

// register route
router.post("/register", registerValidation, async (req, res) => {
  // get validation results, display errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // check if the customer exists, else display error
  const customerExists = await Customer.findOne({ email: req.body.email });
  if (customerExists) {
    return res.status(400).send({
      success: false,
      message: "This email has been already registered.",
    });
  }

  // bcrypt ile sifreleme, once salt olustur
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // get the customer from body request
  const customer = new Customer({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  });

  // create a default cart for the customer
  const cart = new Cart({
    products: [],
    customer: customer._id,
  });

  await cart.save();

  try {
    // save the customer
    const savedCustomer = await customer.save();

    // generate a unique token for this user
    const token = generateToken(customer, key);

    res.send({
      success: true,
      message: "Customer has been created!",
      data: {
        _id: savedCustomer._id,
        fullName: savedCustomer.fullName,
        email: savedCustomer.email,
        password: savedCustomer.password,
        phoneNumber: savedCustomer.phoneNumber,
        address: savedCustomer.address,
        cart: cart,
      },
      token,
    });
  } catch (error) {
    res.send(error);
  }
});

// login route
router.post("/login", loginValidation, async (req, res) => {
  // get validation results, display errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // check if user exists
  const customer = await Customer.findOne({ email: req.body.email });
  if (!customer) {
    return res.status(400).send({
      success: false,
      message: "This email is not registered.",
    });
  }

  // check if password is true
  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    customer.password
  );
  if (isPasswordValid) {
    try {
      const token = generateToken(customer, key);

      res.send({
        success: true,
        message: "Logged in!",
        data: {
          _id: customer._id,
          fullName: customer.fullName,
          email: customer.email,
        },
        token,
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send("Password is invalid");
  }
});

// tum kullanicilari cek
router.get("/", (req, res) => {
  Customer.find()
    .then((customers) => {
      res.send(customers);
    })
    .catch((err) => console.log(err));
});

// TODO: delete customer route,
// take token, find the user, ask for pw, delete user
router.delete("/:id", (req, res) => {
  const productId = req.params.id;

  Customer.findByIdAndRemove(productId)
    .then((product) => {
      res.send({
        success: true,
        message: "Urun basariyla silindi",
        product: product,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
