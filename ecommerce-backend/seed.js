const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust path as needed
const connectDB = require('./config/db'); // Adjust path as needed
require('dotenv').config();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality sound with noise cancellation and comfortable earcups. Up to 20 hours of battery life.',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones',
    category: 'Electronics',
  },
  {
    name: 'Smartwatch with Heart Rate Monitor',
    description: 'Track your fitness, receive notifications, and monitor your heart rate. Water-resistant design.',
    price: 149.99,
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch',
    category: 'Electronics',
  },
  {
    name: 'Portable Power Bank 20000mAh',
    description: 'Keep your devices charged on the go with this high-capacity power bank. Dual USB output.',
    price: 35.50,
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Power+Bank',
    category: 'Accessories',
  },
  {
    name: 'Gaming Mechanical Keyboard',
    description: 'Responsive mechanical keys with customizable RGB backlighting. Durable aluminum build.',
    price: 120.00,
    imageUrl: 'https://via.placeholder.com/150/00FF00/000000?text=Keyboard',
    category: 'Electronics',
  },
  {
    name: 'USB-C to HDMI Adapter',
    description: 'Connect your USB-C device to an HDMI display. Supports 4K resolution at 60Hz.',
    price: 19.99,
    imageUrl: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Adapter',
    category: 'Accessories',
  },
];

const seedDB = async () => {
  await connectDB();
  try {
    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(products); // Insert new products
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();