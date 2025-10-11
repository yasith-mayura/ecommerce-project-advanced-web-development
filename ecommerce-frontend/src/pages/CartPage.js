import React, { useState, useEffect } from 'react';
import API from '../api';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await API.get('/cart');
      setCart(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to load cart. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      await API.delete(`/cart/${itemId}`);
      fetchCart(); // Re-fetch cart after deletion
    } catch (err) {
      console.error('Error removing item from cart:', err);
      alert('Failed to remove item from cart.');
    }
  };

  // This function would be used if we had a backend endpoint to update quantity
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      // Example: await API.put(`/cart/${itemId}`, { quantity: newQuantity });
      // For now, we don't have this endpoint, so just log
      console.log(`Updating quantity for item ${itemId} to ${newQuantity}`);
      // If backend updated, then re-fetch cart: fetchCart();
    } catch (err) {
      console.error('Error updating item quantity:', err);
      alert('Failed to update item quantity.');
    }
  };


  if (loading) {
    return <div className="text-center mt-8 text-xl">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500 text-xl">{error}</div>;
  }

  const subtotal = cart?.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;

  return (
    <div className="container mx-auto p-4 my-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Shopping Cart</h1>

      {cart && cart.items.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Your cart is empty. <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Start shopping!</button>
        </div>
      ) : (
        <div>
          <div className="space-y-4 mb-6">
            {cart?.items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
          <div className="flex justify-end items-center border-t border-gray-200 pt-6">
            <span className="text-2xl font-semibold text-gray-800 mr-4">Subtotal:</span>
            <span className="text-3xl font-bold text-blue-700">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => alert('Proceed to Checkout (Not implemented yet!)')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;