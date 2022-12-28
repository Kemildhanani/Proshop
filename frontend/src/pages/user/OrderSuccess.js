import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div>
      <div className="empty-cart">
        <img
          style={{ width: "450px", height: "325px", marginBottom: "30px"}}
          src="https://cdn.dribbble.com/users/147386/screenshots/5315437/success-tick-dribbble.gif"
          alt="empty-cart"
        />
        <h2 className="empty-text">your order has been placed successfully! </h2>
        <Link
          to="/user/history"
          style={{ color: "white" }}
          className="btn btn-dark btn-lg form-button my-3"
        >
          Check your orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
