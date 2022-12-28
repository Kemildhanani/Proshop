import React, { useEffect, useState } from "react";
import { listWishlist, removeWishlist } from "../../functions/whishlist";
import { useSelector } from "react-redux";
import {  getProducts } from "../../functions/product";
import Image from "../../images/image.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { RiHeartFill } from "react-icons/ri";
import "./wishlist.css"
import Loader from "../../Components/Loader";

function Wishlist() {
  const [pro, setPro] = useState([]);
  const [wishlistUser, setWishlistuser] = useState();
  const [product, setProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  // const { user} = useSelector((state) => ({ ...state }));
  var temp = [];

  useEffect(() => {
    getWishlist();
    getProducts().then((res) => {
      // console.log("user",res.data)
      setPro(res.data);
    });
  }, []);

  const showAverageRatings = (p) => {
    let ratingsArray = p;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    // console.log("total reduced",totalReduced);

    let highest = length * 5;
    // console.log("highets",highest);

    let result = (totalReduced * 5) / highest;
    // console.log("result",result);
    return <>{result}</>;
  };

  const getWishlist = async () => {
    setLoading(true);
    // console.log("user", user._id);
    await listWishlist(localStorage.getItem("User Id"))
      .then((res) => {
        setWishlistuser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeProduct = async (id) => {
    await removeWishlist(id, user && user._id, user && user.token)
      .then((res) => {
        if (res) {
          getWishlist();
          setProduct(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const products = pro.filter((items) => {
    // console.log("123", wishlistUser[0].wishlist.length);
    var pid;

    for (var i = 0; i < wishlistUser[0].wishlist.length; i++) {
      if (items._id == wishlistUser[0].wishlist[i]) {
        pid = items._id;
        // localStorage.setItem(items._id,items.images[0].url);
      }
    }
    return items._id == pid;
  });

  return (
    <>
  {loading ? (
          <Loader />
        ) : products && products.length <= 0 ? (
          <div className="empty-cart">
          <img
            style={{ width: "600px", height: "400px" }}
            src="https://i.pinimg.com/originals/eb/f1/f5/ebf1f51f2269e50c7707deccf1a16444.gif"
            alt="empty-cart"
          />
          <h2 className="empty-text">Your Wishlist is Empty!</h2>
          <Link
            to="/"
            style={{ color: "white" }}
            className="btn btn-dark btn-lg form-button my-3"
          >
            Add some items
          </Link>
        </div>
      ) : (
      <div style={{backgroundColor:"white"}} className="category-dashboard-home">
        {/* <UserSidebar /> */}
        <div className="category-dashboard-homeContainer">
          <div className="category-dashboard-listContainer">
            {/* {JSON.stringify(products)} */}
            <h3 style={{ color: "grey" }}>Wishlist Products</h3>
            <hr />
            <div className="product-wishlist-main" style={{marginBottom: "500px"}}>
            {products &&
              products.map((p) => (
                  <div className="product m-4">
                    {/* <Link to={`/product/${slug }`}> */}
                    <div className="product-img">
                      <img
                        alt=""
                        onClick={() => {
                          navigate(`/product/${p.slug}`);
                        }}
                        src={
                          p.images && p.images.length ? p.images[0].url : Image
                        }
                        style={{
                          cursor: "pointer",
                          height: "250px",
                          padding: "10px",
                        }}
                      />
                    </div>
                    <h6 className="product-heading">
                      {p.title.substr(0, 30)}...
                    </h6>
                    <div className="rating-review">
                      <div className="rating px-2">
                        <p>
                          {/* {JSON.stringify(p.ratings[])} */}
                          {p && p.ratings
                            ? showAverageRatings(p.ratings)
                            : "0"}{" "}
                          <i className="fas fa-star"></i>
                          <span></span>{" "}
                        </p>

                        <p className="float-right pl-1"></p>
                      </div>
                      <div>
                        <p className="text-dark">
                          {" "}
                          Sponsered{" "}
                          <i className="fa-solid fa-circle-exclamation"></i>
                        </p>
                      </div>
                    </div>

                    <div className="price-qty">
                      <div className="price">
                        <h4 style={{ fontFamily: "Arial", color: "#B22222" }}>
                          ₹ {p.price}
                        </h4>
                      </div>
                      <div className="qty">
                        <div className="cartIcon">
                          <Tooltip title="Remove Item">
                            <button className="cartButton">
                              <RiHeartFill
                                style={{ color: "red", fontSize: "25" }}
                                onClick={() => removeProduct(p._id)}
                              />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
                </div>
          </div>
        </div>
      </div>
        )}
    </>
  );
}

export default Wishlist;
