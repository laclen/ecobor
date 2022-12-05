const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  favorites: {
    type: Array,
    default: [],
  },
})

module.exports = mongoose.model("Customer", customerSchema)
