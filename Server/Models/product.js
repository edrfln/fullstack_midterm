const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productID: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: true,
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
