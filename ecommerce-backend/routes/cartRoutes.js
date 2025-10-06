const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // To check if product exists

// NOTE: This cart implementation is simplified for a non-authenticated user.
// In a real app with auth, you'd get the user's ID from req.user.id
// and either create a new cart for them or find their existing one.

// @route   GET /api/cart
// @desc    Get user's cart (simplified to a single cart for now)
// @access  Public (should be private in real app)
router.get('/', async (req, res) => {
  try {
    // For simplicity, we'll find the first cart if one exists.
    // In a real app, you'd find a cart associated with the authenticated user.
    let cart = await Cart.findOne().populate('items.product');
    if (!cart) {
      cart = await Cart.create({}); // Create an empty cart if none exists
    }
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Public (should be private in real app)
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne();

    // If no cart exists, create a new one
    if (!cart) {
      cart = await Cart.create({ items: [] });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check if item already in cart
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      // Item exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item does not exist, add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    // Populate the product details before sending response
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/cart/:itemId
// @desc    Remove item from cart
// @access  Public (should be private in real app)
router.delete('/:itemId', async (req, res) => {
  try {
    let cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }

    cart.items.splice(itemIndex, 1); // Remove the item
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;