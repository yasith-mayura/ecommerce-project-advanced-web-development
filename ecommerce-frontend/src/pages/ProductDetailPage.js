import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setCartMessage('Adding to cart...');
      await API.post('/cart', { productId: product._id, quantity });
      setCartMessage('Item added to cart!');
      setTimeout(() => setCartMessage(''), 2000); // Clear message after 2 seconds
    } catch (err) {
      console.error('Error adding to cart:', err);
      setCartMessage('Failed to add to cart.');
      setTimeout(() => setCartMessage(''), 2000);
    }
  };

  if (loading) {
    return <div className="text-center mt-8 text-xl">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500 text-xl">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-8 text-gray-600 text-xl">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 my-8 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate('/')}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mb-6 transition duration-300"
      >
        &larr; Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>
          <p className="text-blue-600 text-5xl font-extrabold mb-8">${product.price.toFixed(2)}</p>

          <div className="flex items-center mb-6 space-x-4">
            <label htmlFor="quantity" className="text-lg font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 p-2 border border-gray-300 rounded-md text-center text-lg"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition duration-300"
          >
            Add to Cart
          </button>
          {cartMessage && (
            <p className={`mt-4 text-lg ${cartMessage.includes('Failed') ? 'text-red-500' : 'text-green-600'}`}>
              {cartMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;