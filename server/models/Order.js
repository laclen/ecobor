const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  quantity: { type: Number, default: 1 },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
