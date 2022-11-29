// init express
const express = require("express");
const app = express();

// import dotenv
require("dotenv").config();

// import mongoose
const { default: mongoose } = require("mongoose");

// to pass the body of requests
app.use(express.json());

// welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the ShoeBuy's server!");
});

const verifyToken = require("./routes/verifyToken");
// home page route -- protected area -- token verification needed --
app.get("/home", verifyToken ,async(req, res) => {
  res.send({
    success: true,
    data:req.customer
  })
})

// AUTH
// import the auth route
const authRoute = require("./routes/auth");
// create a middleware for the auth route
app.use("/api/customer", authRoute);

// PRODUCTS
const productRoute = require("./routes/products")
app.use("/api/urunler", productRoute)

// ORDERS
const orderRoute = require("./routes/orders")
app.use("/api/siparis", orderRoute)

// CART
const cartRoute = require("./routes/cart")
app.use("/api/sepet", cartRoute)

const mongoPassword = process.env.MONGO_PASSWORD
mongoose
  .connect(
    `mongodb+srv://admin:${mongoPassword}@ecommercecluster.i7k6rxy.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    // derive the environment variable
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));