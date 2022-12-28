import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ProductCardInCheckout from "../Components/cards/ProductCardInCheckout";
import { useNavigate } from "react-router-dom";
import { userCart } from "../functions/User";
import { toast } from "react-toastify";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import image from "../images/image.jpg";

// import {
//   applyCoupon,
// } from "../functions/user";
import { getCoupon, getCouponandupdate } from "../functions/coupon";
import { applyCoupon } from "../functions/User";

import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Form,
  ListGroupItem,
  Alert,
} from "react-bootstrap";

import "./cart.css";
import { IoMdTrash } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import Loader from "../Components/Loader";
import { round } from "lodash";

const Cart = () => {
  const navigate = useNavigate();
  const [totalAmt, setTotalAmt] = useState(0);
  var couponData = [];
  const [items, setItem] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );
  const [coupon, setCoupon] = useState("");

  const { cart, user } = useSelector((state) => ({ ...state }));
  const [couponDatas, setCouponData] = useState();
  const dispatch = useDispatch();
  const location = useLocation;
  const [error, setError] = useState(false);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState();
  const [finalAmt, setFinalAmt] = useState();
  const [qtyError, setQtyError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usage, setUsage] = useState();

  var co;
  useEffect(() => {
    totalamt();
    if (couponDiscount > 0) {
      co = (totalAmt * couponDiscount) / 100;
      // alert(co)
      setFinalAmt(totalAmt - co);
    } else {
      setFinalAmt(totalAmt);
    }

    // console.log("total cart",totalCart)
  });

  const totalamt = () => {
    var total = 0;
    if (JSON.parse(localStorage.getItem("cart")) == undefined) {
    } else {
      const cart = JSON.parse(localStorage.getItem("cart"));

      // console.log("cart", cart.length);
      cart.filter((items) => {
        var countcart = items.count * items.price;
        total = total + countcart;
      });
    }

    // console.log("total bhai", total);
    setTotalAmt(total);

    // return total;
  };

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = async () => {
    if (totalAfterDiscount !== 0) {
      setTotalAfterDiscount(finalAmt + 600);
      getCouponandupdate(couponDatas);
      CartSave();
    } else {
      CartSave();
    }
  };

  function CartSave() {
    if (error === false) {
      const final = Math.round(finalAmt + 600);
      userCart(cart, final, user.token)
        .then((res) => {
          console.log("CART POST RES", res);
          if (res.data.ok) navigate("/Checkout");
        })
        .catch((err) => console.log("cart  save err", err));
    }
  }

  const handleQuantityChange = (e, id, qty) => {
    if (e > qty) {
      setQtyError(true);
    } else {
      if (e > 0) {
        setError(false);
        setQtyError(false);
        let cart = [];

        cart = JSON.parse(localStorage.getItem("cart"));

        cart.filter((item) => {
          if (item._id == id) {
            item.count = e;
          }
        });

        console.log("id", id);

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch({
          type: "ADD_TO_CART",
          payload: cart,
        });
      } else {
        setError(true);
      }
    }
  };

  const handleRemove = (id) => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
    window.location.reload();
  };

  const applyDiscountCoupon = () => {
    // console.log("send coupon to backend", coupon);
    getCoupon(coupon).then((res) => {
      // console.log("RES ON COUPON APPLIED", res.data);
      couponData = res.data;

      // console.log("co",res.data[0].usage)
      // setCouponId(res.data[0]._id);
      if (couponData !== null || (undefined && couponData[0].usage > 0)) {
        setCouponData(res.data[0]);
        setUsage(res.data[0].usage);
        // console.log("assssssssssssss",cou)
        couponData.filter((items) => {
          setCouponDiscount(items.discount);
          setTotalAfterDiscount(
            600 + (totalAmt - (totalAmt * items.discount) / 100)
          );
        });
      } else {
        toast.success("Invalid Coupon");
      }
    });
  };

  const showApplyCoupon = () => (
    <>
      <div className="container">
        <input
          onChange={(e) => {
            setCoupon(e.target.value);
            // setDiscountError("");
          }}
          value={coupon}
          type="text"
          placeholder="Enter Coupon Code"
          className="form-control"
        />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
          Apply
        </button>
      </div>
    </>
  );

  {
    cart.map((p) => <ProductCardInCheckout key={p._id} p={p} />);
  }
  //   </table>
  // );

  return (
    <>
      <div className="cart-container">
        {loading ? (
          <Loader />
        ) : cart && cart.length <= 0 ? (
          <div className="empty-cart">
            <img
              style={{ width: "300px", height: "300px" }}
              src="https://media.giphy.com/media/f6K4vMvXywg7NeZ1Ap/giphy.gif"
              alt="empty-cart"
            />
            <h2 className="empty-text">Your Cart is Empty!</h2>
            <Link
              to="/"
              style={{ color: "white" }}
              className="btn btn-dark btn-lg form-button my-3"
            >
              Go Back
            </Link>
          </div>
        ) : (
          <Row>
            <Col md={8}>
              <ListGroup variant="flush" style={{ "margin-top": "30px" }}>
                <p style={{ fontSize: "50px" }}>Shopping Cart</p>
                {cart.map((c, i) => (
                  <ListGroup.Item className="shipping-form cart-section-1">
                    <Row>
                      <Col md={2}>
                        <Image
                          src={
                            c.images && c.images.length
                              ? c.images[0].url
                              : image
                          }
                          className="cart-image"
                        />
                      </Col>
                      <Col md={4}>
                        <div key={i}>
                          <p key={i}>
                            <strong>
                              {c.title.substr(0, 100).concat("...")}
                            </strong>
                          </p>
                        </div>
                        {/* Apple Watch Series 7 (GPS, 45mm) - Blue Aluminium Case with Abyss Blue Sport Band - Regular  */}
                      </Col>
                      <Col style={{ fontSize: "18px" }} md={2}>
                        &#8377;{c.price}
                      </Col>
                      <Col>
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={1}
                          min={1}
                          id={c._id}
                          key={c._id}
                          max={c.quantity}
                          value={i.count}
                          onChange={(e) =>
                            handleQuantityChange(
                              e.target.value,
                              c._id,
                              c.quantity
                            )
                          }

                          // onChange={(e, c.quantity) => {
                          //   handleQuantityChange(e.target.value, c._id)
                          // }}
                        />
                      </Col>
                      <Col>
                        <IoMdTrash
                          style={{
                            cursor: "pointer",
                            fontSize: "25px",
                            margin: "7px",
                          }}
                          onClick={() => handleRemove(c._id)}
                        />
                      </Col>
                      <hr className="div-hr" style={{ width: "100%" }} />
                    </Row>
                  </ListGroup.Item>
                ))}
                {error === false ? (
                  ""
                ) : (
                  <Alert
                    style={{
                      marginLeft: "350px",
                      float: "right",
                      width: "100%",
                    }}
                  >
                    Enter Valid Quantitity
                  </Alert>
                )}
                {qtyError === false ? (
                  ""
                ) : (
                  <Alert
                    style={{
                      marginLeft: "350px",
                      float: "right",
                      width: "100%",
                    }}
                  >
                    Quantity not available
                  </Alert>
                )}
              </ListGroup>
            </Col>

            <Col md={4} style={{ marginTop: "100px" }}>
              <MDBContainer className="cart-section-2">
                <MDBListGroup
                  className="cart-section-2-col"
                  style={{ width: "30rem" }}
                >
                  <MDBListGroupItem className="mdbitems">
                    <h3 className="mdb-h5-name">
                      {/* {title} */}
                      Items ({items ? items.length : 0})
                    </h3>
                    {/* <hr className="hr-cart"/> */}
                    <hr className="div-hr" />
                  </MDBListGroupItem>

                  <MDBListGroupItem className="mdbitems">
                    <h6 className="mdb-h5-name">
                      {/* <strong> */}
                      Total Amount: {totalAmt}
                      {/* </strong> */}
                    </h6>
                    <hr className="div-hr" />
                  </MDBListGroupItem>

                  <MDBListGroupItem className="mdbitems">
                    <h6 className="mdb-h5-name">
                      {/* <strong> */}+ Shipping Charges : 200
                      {/* </strong> */}
                    </h6>
                    <hr className="div-hr" />
                  </MDBListGroupItem>

                  <MDBListGroupItem className="mdbitems">
                    <h6 className="mdb-h5-name">+ Tax Amount : 400</h6>
                    <hr className="div-hr" />
                  </MDBListGroupItem>

                  <MDBListGroupItem className="mdbitems">
                    <h6 className="mdb-h5-name">
                      - Coupon Discount :{" "}
                      {couponDiscount > 0
                        ? (totalAmt * couponDiscount) / 100
                        : 0}
                    </h6>
                    {couponDiscount > 0
                      ? window.localStorage.setItem(
                          "coupon",
                          600 + (totalAmt - (totalAmt * couponDiscount) / 100)
                        )
                      : ""}
                    <hr className="div-hr" />
                  </MDBListGroupItem>

                  <MDBListGroupItem className="mdbitems">
                    <h6 style={{ fontWeight: "600" }} className="mdb-h5-name">
                      Payable Amount: {finalAmt > 0 ? finalAmt + 600 : 0}
                    </h6>
                    <hr className="div-hr" />
                  </MDBListGroupItem>

                  <MDBListGroupItem className="mdbitems">
                    {showApplyCoupon()}
                    {/* <hr className="div-hr" /> */}
                  </MDBListGroupItem>

                  {user ? (
                    <button
                      onClick={saveOrderToDb}
                      className="btn btn-sm btn-primary mt-2"
                      disabled={!cart.length}
                    >
                      Proceed to Checkout
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-primary mt-2">
                      <Link
                        to={{
                          pathname: "/login",
                          state: { from: "cart" },
                        }}
                      >
                        Login to Checkout
                      </Link>
                    </button>
                  )}
                </MDBListGroup>
              </MDBContainer>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default Cart;

// https://media.giphy.com/media/f6K4vMvXywg7NeZ1Ap/giphy.gif

// https://media.giphy.com/media/L40qwPexZfBJLqSBaA/giphy.gif
