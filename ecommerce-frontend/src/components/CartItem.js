import React from 'react';
import API from '../api'; // Import API instance

const CartItem = ({ item, onRemoveItem, onUpdateQuantity }) => {
  // item prop will be populated from the backend, so it includes item.product details
  const product = item.product;

  if (!product) {
    return (
      <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
        <p className="text-red-500">Error: Product data missing for this cart item.</p>
        <button
          onClick={() => onRemoveItem(item._id)}
          className="ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm transition duration-300"
        >
          Remove
        </button>
      </div>
    );
  }

  const handleRemove = async () => {
    if (onRemoveItem) {
      onRemoveItem(item._id);
    }
  };

  // Currently, we don't have an endpoint to update quantity for a single item.
  // This would be a good addition to the backend cart routes.
  // For now, we'll keep it simple or implement it as a full cart refresh.
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0 && onUpdateQuantity) {
      onUpdateQuantity(item._id, newQuantity); // This function would update the cart on the backend
    }
  };

  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
      <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4" />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)} x {item.quantity}</p>
      </div>
      <div className="flex items-center space-x-4">
        {/* Quantity input - requires a backend update endpoint or a more complex cart state management */}
        {/* For now, simplified to display only */}
        {/* <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 p-1 border border-gray-300 rounded-md text-center"
        /> */}
        <span className="text-xl font-bold text-gray-800">${(product.price * item.quantity).toFixed(2)}</span>
        <button
          onClick={handleRemove}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;