import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import womenBanner from "./Components/Assets/banner_women.png";
import menBanner from "./Components/Assets/banner_mens.png";
import kidBanner from "./Components/Assets/banner_kids.png";
import LoginSignup from "./Pages/LoginSignup";

function LoadingScreen() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Navbar />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/mens" element={<ShopCategoryWithLoading banner={menBanner} category="men" />} />
          <Route path="/womens" element={<ShopCategoryWithLoading banner={womenBanner} category="women" />} />
          <Route path="/kids" element={<ShopCategoryWithLoading banner={kidBanner} category="kid" />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<CartWithLoading />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      )}
      <Footer />
    </Router>
  );
}

function ShopCategoryWithLoading({ banner, category }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingScreen /> : <ShopCategory banner={banner} category={category} />;
}

function CartWithLoading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingScreen /> : <Cart />;
}

export default App