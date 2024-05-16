import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

const Shop = () => {
  const [popular, setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);

  const fetchInfo = () => { 
    fetch('https://ecommerce-back-end-2.onrender.com/popularinwomen') 
      .then((res) => res.json()) 
      .then((data) => setPopular(data));
    
    fetch('https://ecommerce-back-end-2.onrender.com/newcollections') 
      .then((res) => res.json()) 
      .then((data) => setNewCollection(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="shop-container">
      <Hero />
      <div className="shop-content">
        <section className="popular-section">
          <h2>Popular in Women</h2>
          <Popular data={popular} />
        </section>
        <section className="offers-section">
          <h2>Offers</h2>
          <Offers />
        </section>
        <section className="new-collections-section">
          <h2>New Collections</h2>
          <NewCollections data={newcollection} />
        </section>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Shop;
