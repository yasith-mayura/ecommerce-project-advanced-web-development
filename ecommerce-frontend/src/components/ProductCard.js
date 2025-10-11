import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <Link to={`/products/${product._id}`}>
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
      </Link>
      <p className="text-gray-600 mb-4 flex-grow">{product.description.substring(0, 100)}...</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
        <Link
          to={`/products/${product._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;