import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchInfo = () => { 
    fetch('https://ecommerce-back-end-2.onrender.com/allproducts') 
      .then((res) => res.json()) 
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const sortProducts = (criteria, order) => {
    const sortedProducts = [...allproducts].sort((a, b) => {
      if (order === "asc") {
        return a[criteria] > b[criteria] ? 1 : -1;
      } else {
        return a[criteria] < b[criteria] ? 1 : -1;
      }
    });
    setAllProducts(sortedProducts);
  };

  const handleSortChange = (event) => {
    const criteria = event.target.value;
    setSortCriteria(criteria);
    sortProducts(criteria, sortOrder);
  };

  const handleOrderChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortProducts(sortCriteria, newOrder);
  };

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p><span>Showing 1 - 12</span> out of {allproducts.length} Products</p>
        <div className="shopcategory-sort">
          <label htmlFor="sort-select" className="sort-label">Sort by : </label>
          <select id="sort-select" onChange={handleSortChange} value={sortCriteria} className="sort-select">
            <option value="name">Name</option>
            <option value="new_price">Price</option>
          </select>
          <button className={`sort-order-btn ${sortOrder}`} onClick={handleOrderChange}>
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
          <img src={dropdown_icon} alt="" className="dropdown-icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {allproducts
          .filter((item) => props.category === item.category)
          .map((item, i) => (
            <Item
              id={item.id}
              key={i}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
      </div>
      <div className="shopcategory-loadmore">
        <Link to="/" style={{ textDecoration: 'none' }}>Explore More</Link>
      </div>
    </div>
  );
};

export default ShopCategory;
