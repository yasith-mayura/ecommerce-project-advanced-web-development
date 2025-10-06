const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const CartSchema = new mongoose.Schema({
  // If you implement authentication, you'd add a user field here:
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  items: [CartItemSchema], // Array of cart items
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Cart', CartSchema);