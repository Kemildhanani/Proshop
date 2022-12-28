import React, { useEffect, useState } from "react";
import { Card, Alert } from "react-bootstrap";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import image from "../../images/image.jpg";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import "./singleProduct.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import { Tooltip } from "antd";
import showAverage from "../../functions/rating";
import { getBrands } from "../../functions/brand";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import RatingsModal from "../modal/RatingsModal";
import StarRatings from "react-star-ratings";
import { addToWishlist } from "../../functions/whishlist";
import { Image } from "antd";

const SingleProduct = ({ product, onStarClick, star }) => {
  // const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [wishlistRedirection, setWishlistRedirection] = useState(false);
  const [errorWishlist, setErrorWishlist] = useState(null);
  const [errorCart, setErrorCart] = useState(null);
  const { user } = useSelector((state) => ({ ...state }));

  const {
    title,
    brand,
    subs,
    description,
    images,
    price,
    _id,
    quantity,
    category,
  } = product;

  const [tooltip, setTooltip] = useState("Click To Add");

  const [name, setName] = useState([]);
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    loadBrands();
  }, []);

  const loadBrands = () => {
    getBrands().then((b) => {
      setName(b.data);
    });
  };

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
        // toast.success("Product is alredy Exist in cart")
        alert("product is exist");
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

  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  const handleWishlist = async () => {
    await addToWishlist(user && user._id, _id, user && user.token)
      .then((res) => {
        if (res.data.alreadyAdded) {
          setErrorWishlist(res.data.alreadyAdded);
          toast.success(res.data.alreadyAdded);
          setTimeout(() => {
            setErrorWishlist(null);
          }, 5000);
        } else {
          setWishlistRedirection(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="product-page">
        {/* ------------Product Page Grid------------- */}

        <div className="product-page-grid">
          {/* -------------Section-1-----------------         */}
          <div className="section-1 mt-5">
            {images && images.length ? (
              <Slider {...settings}>
                {images &&
                  images.map((i) => (
                    <Image key={i.public_id} alt="" src={i.url} />
                  ))}
              </Slider>
            ) : (
              <img alt="" src={image} />
            )}
          </div>
          {/* ---------------Section-2-------------- */}
          <div className="section-2">
            {/* <ListGroup className='ml-5'> */}

            <MDBContainer>
              <MDBListGroup style={{ width: "30rem" }}>
                <MDBListGroupItem className="mdbitems">
                  <h3 className="mdb-h5-name">
                    {title}

                    {
                      product &&
                      product.ratings &&
                      product.ratings.length > 0 ? (
                        // <div>
                        showAverage(product)
                      ) : (
                        <div
                          style={{ fontSize: "20px" }}
                          className="text-center"
                        ></div>
                      )
                      // </div>
                    }

                    {/* Apple Watch Series 7 (GPS, 45mm) - Blue Aluminium Case with Abyss Blue Sport Band - Regular */}
                  </h3>
                  <hr className="div-hr" />
                </MDBListGroupItem>

                {name.map((b) => {
                  if (b._id === brand) {
                    window.localStorage.setItem(
                      "Brand for product list Item",
                      b.name.toString()
                    );
                  }
                })}
                <MDBListGroupItem className="d-flex justify-content-between align-items-center mdbitems">
                  <h5 className="mdb-h5-name">
                    <strong>Brand</strong>
                  </h5>
                  <h5 key={_id} className="mdb-h6-content" color="primary">
                    {window.localStorage.getItem("Brand for product list Item")}
                    {window.localStorage.removeItem(
                      "Brand for product list Item"
                    )}
                  </h5>{" "}
                  <hr className="div-hr" />
                </MDBListGroupItem>

                <MDBListGroupItem className="mdbitems">
                  <h5 className="mdb-h5-name">
                    <strong>Decription</strong>
                  </h5>
                  <span
                    className="mt-1 span-description"
                    style={{ fontSize: "17px", color: "black" }}
                  >
                    {description && description}
                  </span>
                  <hr className="div-hr" />
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center mdbitems">
                  <h5 className="mdb-h5-name">
                    <strong>Category</strong>
                  </h5>
                  {category && (
                    <h5 className="mdb-h6-content" color="primary">
                      {category.name}
                    </h5>
                  )}
                  <hr className="div-hr" />
                </MDBListGroupItem>

                <MDBListGroupItem className="mdbitems">
                  <h5 className="mdb-h5-name">
                    <strong>Sub Category</strong>
                  </h5>
                </MDBListGroupItem>
                <MDBListGroupItem className="mdbitems">
                  <span
                    className="label span-subs"
                    style={{ display: "flex", float: "right" }}
                  >
                    {subs &&
                      subs.map((s) => (
                        <Link
                          key={s._id}
                          style={{}}
                          to={"/"}
                          className="sub-link"
                        >
                          <h6
                            key={s.name}
                            className="sub-label-hs"
                            style={{ color: "white" }}
                          >
                            {s.name}
                          </h6>
                        </Link>
                      ))}
                  </span>
                  <hr className="div-hr" />
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBContainer>

            <MDBListGroupItem className=" align-items-center mdbitems">
              <h6 className="ml-5">
                <RatingsModal>
                  <StarRatings
                    name={_id}
                    numberOfStars={5}
                    rating={star}
                    changeRating={onStarClick}
                    isSelectable={true}
                    starRatedColor="red"
                  />
                </RatingsModal>
              </h6>
            </MDBListGroupItem>
          </div>
          {/* ---------------Section-3------------ */}
          <div className="section-3">
            <Card>
              <MDBContainer>
                <MDBListGroup>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                    <h5 className="h5-price h5-price-left">
                      <strong>Price :</strong>
                    </h5>
                    <h5 className="h5-price h5-price-right" color="primary">
                      ₹ {price}
                    </h5>{" "}
                    <hr className="div-hr-sec3" />
                  </MDBListGroupItem>
                </MDBListGroup>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center mdbitems">
                  <h5 className="h5-price h5-price-left">
                    <strong>Status :</strong>
                  </h5>
                  <h5 className="h5-price h5-price-right" color="primary">
                    {quantity && quantity > 0 ?
                    <span>
                      In Stock
                    </span>
                     :
                     <span style={{marginLeft: "50px", float:"right",color: "#CD1818"}} className="mt-3">
                       <strong>
                       Out of Stock
                       </strong>
                     </span> 
                       }
                  </h5>{" "}
                  <hr className="div-hr-sec3" />
                </MDBListGroupItem>

                <MDBListGroupItem className="d-flex justify-content-between align-items-center mdbitems">
                  <div className="d-grid gap-2">
                    {quantity > 0 ? (
                      <Tooltip>
                      <button
                      // disabled={quantity === 0}
                      onClick={() => handleAddToCart(_id)}
                      className="btn btn-dark btn-add-to-cart"
                      style={{ color: "white", width: "100%" }}
                      variant="dark"
                      size="md"
                      >
                        Add to cart
                      </button>
                    </Tooltip>
                        ) : ( ""
                        )}

                    {wishlistRedirection === false ? (
                      <button
                        className="btn btn-outline-dark btn-add-to-wishlist"
                        onClick={handleWishlist}
                        style={{ color: "black", width: "100%" }}
                        variant="secondary"
                        size="md"
                      >
                        Add to wishlist
                      </button>
                    ) : (
                      <Link to="/user/wishlist">
                        <button
                          className="btn btn-outline-dark btn-add-to-wishlist"
                          style={{ color: "black", width: "100%" }}
                          variant="secondary"
                          size="md"
                        >
                          Go to wishlist
                        </button>
                      </Link>
                    )}
                    {errorCart && <Alert variant="light">{errorCart}</Alert>}
                  </div>
                </MDBListGroupItem>
              </MDBContainer>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
