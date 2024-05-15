import React, { useContext, useState } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const { products, cartItems, removeFromCart, getTotalCartAmount, incrementQuantity, decrementQuantity, clearCart } = useContext(ShopContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "", phone: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setTimeout(() => {
      setOrderPlaced(true);
      // Clear the cart items after the order is placed
      clearCart();
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format-main cartitems-format">
                <img className="cartitems-product-icon" src={e.image} alt="" />
                <p cartitems-product-title>{e.name}</p>
                <p>${e.new_price}</p>
                <div className="cartitems-quantity-control">
                  <button onClick={() => decrementQuantity(e.id)}>-</button>
                  <button className="cartitems-quantity">{cartItems[e.id]}</button>
                  <button onClick={() => incrementQuantity(e.id)}>+</button>
                </div>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img onClick={() => { removeFromCart(e.id) }} className="cartitems-remove-icon" src={cross_icon} alt="" />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          {!isCheckingOut ? (
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="checkout-form">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <button type="submit">Place Order</button>
            </form>
          )}
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>

      {orderPlaced && (
        <div className="order-placed-message">
          <p>Your order was placed successfully!</p>
        </div>
      )}
    </div>
  );
};

export default CartItems;
