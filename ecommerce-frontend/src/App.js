import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Optional: Add routes for Login/Register here */}
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/register" element={<RegisterPage />} /> */}
          </Routes>
        </main>
        {/* Optional: Add a Footer component here */}
        {/* <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
          &copy; {new Date().getFullYear()} My E-Shop. All rights reserved.
        </footer> */}
      </div>
    </Router>
  );
}

export default App;