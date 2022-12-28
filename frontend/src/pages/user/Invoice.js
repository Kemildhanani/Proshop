import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import "./invoice.css";
import { useParams } from "react-router-dom";
import { getOrderProduct } from "../../functions/product";
import ps5black from "../../images/ps5black.png";

const Invoice = () => {
  const order = JSON.parse(window.localStorage.getItem("order"));
  const user = JSON.parse(window.localStorage.getItem("user"));

  const [product, setProduct] = useState([]);
  var q = 0;

  var s = 0;
  useEffect(() => {
    for (var i = 0; i < order.products.length; i++) {
      getOrderProduct(order.products[i].product).then((res) => {
        setProduct((oldarr) => [...oldarr, res.data]);
      });
    }
  }, []);

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <>
          {/* {JSON.stringify(order)} */}
          <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
              <div className="col-md-10">
                <div className="receipt bg-white p-3 rounded">
                  <h1 style={{ fontSize: "50px" }}>
                    <img style={{width: "90px", height: "74px"}} src={ps5black} alt="" />
                    Proshop
                    </h1>
                  <h4 className="mt-2 mb-3">Your order is confirmed!</h4>
                  <h6 className="name">Hello {user.name}</h6>
                  <span className="fs-12 text-black-50">
                    your order has been confirmed and will be shipped in two
                    days
                  </span>
                  <hr />
                  <div className="d-flex flex-row justify-content-between align-items-center order-details">
                    <div>
                      <span className="d-block fs-12">Order date</span>
                      <span className="font-weight-bold">
                        {order.createdAt.substring(0, 10)}
                      </span>
                    </div>
                    <div>
                      <span className="d-block fs-12">Order number</span>
                      <span className="font-weight-bold">{order._id}</span>
                    </div>
                    <div>
                      <span className="d-block fs-12">Payment method</span>
                      <span className="font-weight-bold">
                        {order.paymentIntent == undefined ? "Wallet" : "Cart"}
                      </span>
                      <img
                        alt=""
                        className="ml-1 mb-1"
                        src="https://i.imgur.com/ZZr3Yqj.png"
                        width="20"
                      />
                    </div>
                    <div>
                      <span className="d-block fs-12">Shipping Address</span>
                      <span className="font-weight-bold text-success">
                        {user.address}
                        {/* New Delhi */}
                      </span>
                    </div>
                  </div>
                  <hr />

                  {product &&
                    product.map((p) => (
                      <div className="d-flex justify-content-between align-items-center product-details">
                        <div className="d-flex flex-row product-name-image">
                          {/* <>
                            <img
                              alt=""
                              className="rounded"
                              src={p.url && p.url : }
                              width="80"
                              />
                          </> */}
                          <div className="d-flex flex-column justify-content-between ml-2">
                            <div>
                              {/* {product &&
                                product.map((p) => ( */}
                              <>
                                <span className="d-block font-weight-bold p-name">
                                  {p.title.substring(0, 40)}...
                                </span>
                              </>
                              {/* ))} */}

                              <span className="fs-12">Electronics</span>
                            </div>

                            <span className="fs-12">
                              Qty: {order.products[q].count} pcs
                              <span style={{ visibility: "hidden" }}>
                                {(s = s + order.products[q].count * p.price)}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="product-price">
                          {/* {product && product.map(p=>( */}
                          <>
                            <h5>₹{p.price}.00</h5>
                          </>
                          <span style={{ visibility: "hidden" }}>
                            {(q = q + 1)}
                          </span>

                          {/* ))} */}
                        </div>
                      </div>
                    ))}

                  <div className="mt-5 amount row">
                    <div className="d-flex justify-content-center col-md-6">
                      <img
                        alt=""
                        src="https://i.imgur.com/AXdWCWr.gif"
                        width="250"
                        height="100"
                      />
                    </div>
                    {/* {product.filter((items) => {
                      s = items.price + s;
                    })} */}
                    <div className="col-md-6">
                      <div className="billing">
                        <div className="d-flex justify-content-between">
                          <span>Sub Total :</span>
                          <span className="font-weight-bold">₹{s}.00</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <span>Shipping fee</span>
                          <span className="font-weight-bold">+ ₹400.00</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <span>Tax</span>
                          <span className="font-weight-bold">+ ₹200.00</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <span>Discount</span>
                          <span className="font-weight-bold">
                            {order.paymentIntent === undefined
                              ? s - order.payment
                              : s -
                                Math.floor(order.paymentIntent.amount / 100)+600}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          {/* <span className="text-success">Discount</span>
                          <span className="font-weight-bold text-success">{order.paymentIntent.amount/100}</span> */}
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-1">
                          <span className="font-weight-bold">Total</span>
                          <span className="font-weight-bold text-success">
                            {order.paymentIntent === undefined
                              ? order.payment
                              : Math.floor(order.paymentIntent.amount / 100)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="d-block">Expected delivery date</span>
                  <span className="font-weight-bold text-success">
                    12 April 2022
                  </span>
                  <span className="d-block mt-3 text-black-50 fs-15">
                    We will be sending a shipping confirmation email when the
                    item is shipped!
                  </span>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center footer">
                    <div className="thanks">
                      <span className="d-block font-weight-bold">
                        Thanks for shopping
                      </span>
                      <span>Proshop team</span>
                    </div>
                    <div className="d-flex flex-column justify-content-end align-items-end">
                      <span className="d-block font-weight-bold">Need Help?</span>
                      <span>Call - 974493933</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="container container-header">
        <div>
          <h1 style={{fontSize: "40px"}} className="h2-header">Order Invoice</h1>
        </div>
        <div>
          <button
            className="btn btn-lg btn-dark button-download"
            style={{ color: "white", alignItems: "center" }}
            onClick={handlePrint}
          >
            Download invoice
          </button>
        </div>
      </div>
      <ComponentToPrint ref={componentRef} />
    </>
  );
};

export default Invoice;
