const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
