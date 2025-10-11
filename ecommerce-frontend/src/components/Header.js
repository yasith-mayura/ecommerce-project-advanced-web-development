import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-700 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-wide">
          My E-Shop
        </Link>
        <nav className="flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-200 transition duration-300">
            Products
          </Link>
          <Link to="/cart" className="relative hover:text-blue-200 transition duration-300">
            Cart
            {/* Optional: Add a cart item count here later */}
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs text-white rounded-full px-2 py-0.5">
              {/* Cart Item Count Here */}
            </span>
          </Link>
          {/* Optional: Add Login/Register links here if implementing authentication */}
          {/* <Link to="/login" className="hover:text-blue-200 transition duration-300">Login</Link>
          <Link to="/register" className="hover:text-blue-200 transition duration-300">Register</Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;