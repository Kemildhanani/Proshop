import React, { useState } from "react";
import { Tooltip } from "antd";
import {  ShoppingOutlined } from "@ant-design/icons";
// import laptop from "../../images/image.jpg"
import { Link } from "react-router-dom";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import image from "../../images/image.jpg";
import "./productCard.css";
import showAverageRatings from "./showAvarageRatings";
import { toast } from "react-toastify";

// const {Meta} = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click To Add To Cart");

  const [outOfStockToolTip, setOutOfStockToolTip] = useState("Out of Stock");
  //redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = (id) => {
    //create cart array
    if (JSON.parse(localStorage.getItem("cart")) == undefined) {
      AddCart();
    } else {
      const car = JSON.parse(window.localStorage.getItem("cart"));
      var c;
      car.filter((items) => {
        if (items._id == id) {
          c = id;
        }
      });
      if (c == id) {
        toast.success("Product is alredy Exist in cart");
      } else {
        AddCart();
      }
    }
  };

  const AddCart = async () => {
    if (product.quantity < 1) {
      // setOutOfStockToolTip("Out Of Stock");
    } else {
      let cart = [];
      if (typeof window !== "undefined") {
        // if cart is in localstorage GET it
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }
        // push new product to cart
        cart.push({
          ...product,
          count: 1,
        });
        //remove duplicate
        let unique = _.uniqWith(cart, _.isEqual);
        //save to local storage
        localStorage.setItem("cart", JSON.stringify(unique));
        // show tooltip
        setTooltip("Added");

        //add to redux state
        dispatch({
          type: "ADD_TO_CART",
          payload: unique,
        });
        //show cart items inside drawer
        dispatch({
          type: "SET_VISIBLE",
          payload: true,
        });
      }
    }
  };

  //destructure
  const { images, title, description, slug, price } = product;
  return (
    <>
      <div className="product">
        {/* <Link to={`/product/${slug }`}> */}
        <div className="product-img">
          <Link to={`/product/${slug}`}>
            <img
              alt=""
              src={images && images.length ? images[0].url : image}
              style={{ height: "250px", padding: "10px" }}
            />
          </Link>
        </div>
        <h6 className="product-heading">
          {title.length > 50 ? title.substring(0, 50).concat("...") : title}
        </h6>
        <div className="rating-review">
          <div className="rating px-2">
            <p>
              {product && product.ratings && product.ratings.length > 0
                ? showAverageRatings(product)
                : 0}{" "}
              <i className="fas fa-star"></i>
              <span></span>{" "}
            </p>

            <p className="float-right pl-1"></p>
          </div>
          <div>
            <p className="text-dark pt-2">
            {product && product.ratings && product.ratings.length >=0 ? <span>Rated By {product.ratings.length}</span>:<span>No Rating</span>}
                
               <i className="fa-solid fa-circle-exclamation"></i>
            </p>
          </div>
        </div>

        <div className="price-qty">
          <div className="price">
            <h4 style={{ fontFamily: "Arial", color: "#B22222" }}>₹{price}</h4>
          </div>
          <div className="qty">
            <div className="cartIcon">
              <button
                className="cartButton"
                onClick={() => handleAddToCart(product._id)}
                disabled={product.quantity < 1}
              >
                {product.quantity < 1 ? (
                  <Tooltip title={outOfStockToolTip}>
                    <ShoppingOutlined className="" style={{ color: "gray" }} />
                  </Tooltip>
                ) : (
                  <Tooltip title={tooltip}>
                    <ShoppingOutlined className="" style={{ color: "red" }} />
                  </Tooltip>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
