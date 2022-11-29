const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// tum siparisleri cek
router.get("/", (req, res) => {
  Order.find()
    .then((orders) => {
      res.send(orders);
    })
    .catch((err) => console.log(err));
});

// siparis ekle
router.post("/ekle", (req, res) => {
  // today's date and order time
  const today = new Date().toLocaleString()

  // siparis olustur
  const order = new Order({
    product: req.body.productId,
    customer: req.body.customerId,
    quantity: req.body.quantity,
    date: today,
  });

  order
    .save()
    .then((result) => {
      res.send({
        success: true,
        message: "Siparis basariyla olusuturuldu",
        data: result,
      });
    })
    .catch((error) => console.log(error));
});

// siparis cek
router.get("/:id", (req, res) => {
  const orderId = req.params.id;

  Order.findById(orderId)
    .then((order) => {
      res.send(order);
    })
    .catch((err) => console.log(err));
});

// siparis kaldir
router.delete("/:id", (req, res) => {
  const orderId = req.params.id;

  Product.findByIdAndRemove(orderId)
    .then((order) => {
      res.send({
        success: true,
        message: "Siparis basariyla kaldirildi",
        product: order,
      });
    })
    .catch((err) => console.log(err));
});
module.exports = router;
