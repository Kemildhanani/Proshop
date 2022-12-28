// import React, { useState, useEffect } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useSelector, useDispatch } from "react-redux";
// import { createPaymentIntent } from "../functions/stripe";
// import { Link, useNavigate } from "react-router-dom";
// import { Card } from "antd";
// import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
// import image from "../images/image.jpg";
// import {createOderDetail,createOrder,emptyUserCart,} from "../functions/User";
// import "./stripeChecout.css";
// import FormControl from "@mui/material/FormControl";
// import Radio from "@mui/material/Radio";
// import { getWallet, OrderPayment } from "../functions/Wallet";

// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import { Alert, Button } from "react-bootstrap";
// import { toast } from "react-toastify";

// const StripeCheckout = ({ history }) => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => ({ ...state }));

//   const navigate = useNavigate();
//   const [coupon, setCoupon] = useState();
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState("");
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState("");
//   const [checkBal, setCheckBal] = useState(true);
//   const [cartTotal, setCartTotal] = useState(0);
//   const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
//   const [payable, setPayable] = useState(0);
//   const [wallet, setWallet] = useState();
//   const stripe = useStripe();
//   const elements = useElements();

//   const [selectedValue, setSelectedValue] = React.useState("a");

//   const handleChange123 = (event) => {
//     setSelectedValue(event.target.value);
//   };

//   useEffect(() => {
//     getWallet(user._id).then((res) => {
//       setWallet(res.data);
//     });

//     createPaymentIntent(user.token, payable).then((res) => {
//       console.log("create payment intent", res.data);
//       setClientSecret(res.data.clientSecret);
//       // additional response received on successful payment
//       setCartTotal(res.data.cartTotal);
//       setTotalAfterDiscount(res.data.totalAfterDiscount);
//       setPayable(res.data.payable);
//     });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);

//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: e.target.name.value,
//         },
//       },
//     });

//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       // here you get result after successful payment
//       // create order and save in database for admin to process
//       createOrder(payload, "", "", user.token).then((res) => {
//         if (res.data.ok) {
//           // empty cart from local storage
//           if (typeof window !== "undefined") localStorage.removeItem("cart");
//           // empty cart from redux
//           dispatch({
//             type: "ADD_TO_CART",
//             payload: [],
//           });
//           // reset coupon to false

//           // empty cart from database
//           emptyUserCart(user.token);
//         }
//       });
//       // empty user cart from redux store and local storage
//       console.log(JSON.stringify(payload, null, 4));
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//       navigate("/orderSuccess");
//     }
//   };

//   const handleChange = async (e) => {
//     // listen for changes in the card element
//     // and display any errors as the custoemr types their card details
//     setDisabled(e.empty); // disable pay button if errors
//     setError(e.error ? e.error.message : ""); // show error message
//   };

//   const cartStyle = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: "Arial, sans-serif",
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#32325d",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//   };

//   const ACt = () => {
//     return <>{/* {JSON.stringify(payload)} */}</>;
//   };

//   const ACt2 = () => {
//     var p;

//     if (wallet.amt < cartTotal) {
//       setCheckBal(false);
//     }

//     const handlepinChange = (e) => {
//       p = e;
//     };
//     const payFRomWallet = () => {
//       if (wallet.pin == p) {
//         // alert("yes")

//         var amoun = wallet.amt - cartTotal;
//         OrderPayment(user._id, amoun);

//         // create order and save in database for admin to process
//         createOrder("", cartTotal, wallet._id, user.token).then((res) => {
//           if (res.data.ok) {
//             // empty cart from local storage
//             if (typeof window !== "undefined") localStorage.removeItem("cart");
//             // empty cart from redux
//             dispatch({
//               type: "ADD_TO_CART",
//               payload: [],
//             });
//             // reset coupon to false

//             // empty cart from database
//             emptyUserCart(user.token);
//           }
//         });
//         // empty user cart from redux store and local storage
//         // console.log(JSON.stringify(payload, null, 4));
//         setError(null);
//         setProcessing(false);
//         setSucceeded(true);
//         navigate("/user/history");
//       } else {
//         alert("Enter valid pin");
//       }
//     };

//     // console.log("total",cartTotal)
//     return (
//       <>
//         <div className="row">
//           <label className="mr-1">Wallet Balance : </label>{" "}
//           <p>
//             <strong>{wallet.amt}</strong>
//           </p>
//         </div>
//         <FormControl fullWidth sx={{ m: 1 }} variant="standard">
//           <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
//           <Input
//             id="standard-adornment-amount"
//             disabled
//             value={cartTotal}
//             startAdornment={<InputAdornment position="start">₹</InputAdornment>}
//           />
//         </FormControl>
//         <FormControl fullWidth sx={{ m: 1 }} variant="standard">
//           <InputLabel htmlFor="standard-adornment-amount">
//             Enter Your Wallet Pin
//           </InputLabel>
//           <Input
//             id="standard-adornment-amount"
//             type="password"
//             onChange={(e) => handlepinChange(e.target.value)}
//           />
//         </FormControl>

//         <Button
//           variant="contained"
//           color="success"
//           disabled={checkBal == false}
//           onClick={payFRomWallet}
//         >
//           {" "}
//           Pay
//         </Button>
//         {checkBal == false ? (
//           <Alert>Insufficient Balance In Your Wallet</Alert>
//         ) : (
//           ""
//         )}
//       </>
//     );
//   };

//   return (
//     <>
//       <h5>Choose Payment Method</h5>

//       <div>
//         <Radio
//           checked={selectedValue === "a"}
//           onChange={handleChange123}
//           value="a"
//           name="radio-buttons"
//           inputProps={{ "aria-label": "A" }}
//         />
//         <strong>Credit Card Or Debit Card</strong>
//         <Radio
//           checked={selectedValue === "b"}
//           onChange={handleChange123}
//           value="b"
//           name="radio-buttons"
//           inputProps={{ "aria-label": "B" }}
//         />
//         <strong>Wallet</strong>
//       </div>
//       {selectedValue === "a" ? (
//         <>
//           <form
//             id="payment-form"
//             className="stripe-form"
//             onSubmit={handleSubmit}
//           >
//             <CardElement
//               id="card-element"
//               options={cartStyle}
//               onChange={handleChange}
//             />
//             <button
//               className="stripe-button"
//               disabled={processing || disabled || succeeded}
//             >
//               <span id="button-text">
//                 {processing ? (
//                   <div className="spinner" id="spinner"></div>
//                 ) : (
//                   "Pay"
//                 )}
//               </span>
//             </button>
//             <br />
//             {error && (
//               <div className="card-error" role="alert">
//                 {error}
//               </div>
//             )}
//             <br />
//           </form>
//         </>
//       ) : (
//         <ACt2 />
//       )}
//     </>
//   );
// };

// export default StripeCheckout;

import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import image from "../images/image.jpg";
import { createOderDetail, createOrder, emptyUserCart, } from "../functions/User";
import "./stripeChecout.css";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import { getWallet, OrderPayment } from "../functions/Wallet";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Alert, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const navigate = useNavigate();
  const [coupon, setCoupon] = useState();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [checkBal, setCheckBal] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const [wallet, setWallet] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange123 = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    getWallet(user._id).then((res) => {
      setWallet(res.data);
    });

    createPaymentIntent(user.token, payable).then((res) => {
      console.log("create payment intent", res.data);
      setClientSecret(res.data.clientSecret);
      // additional response received on successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, "", "", user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false

          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      navigate("/orderSuccess");
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const ACt = () => {
    return <>{/* {JSON.stringify(payload)} */}</>;
  };

  const ACt2 = () => {
    var p;

    if (wallet == null || undefined && wallet.amt < cartTotal) {
      setCheckBal(false);
    }

    const handlepinChange = (e) => {
      p = e;
    };
    const payFRomWallet = () => {
      if (wallet.pin == p) {
        // alert("yes")

        var amoun = wallet.amt - cartTotal;
        OrderPayment(user._id, amoun);

        // create order and save in database for admin to process
        createOrder("", cartTotal, wallet._id, user.token).then((res) => {
          if (res.data.ok) {
            // empty cart from local storage
            if (typeof window !== "undefined") localStorage.removeItem("cart");
            // empty cart from redux
            dispatch({
              type: "ADD_TO_CART",
              payload: [],
            });
            // reset coupon to false

            // empty cart from database
            emptyUserCart(user.token);
          }
        });
        // empty user cart from redux store and local storage
        // console.log(JSON.stringify(payload, null, 4));
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        navigate("/user/history");
      } else {
        alert("Enter valid pin");
      }
    };

    // console.log("total",cartTotal)
    return (
      <>
        {wallet == null || undefined ?
          <h1>Wallet Is not activated</h1> :
          <>
            <div className="row">
              <label className="mr-1">Wallet Balance : </label>{" "}
              <p>
                <strong>{wallet.amt}</strong>
              </p>
            </div>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
              <Input
                id="standard-adornment-amount"
                disabled
                value={cartTotal}
                startAdornment={<InputAdornment position="start">₹</InputAdornment>}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Enter Your Wallet Pin
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                type="password"
                onChange={(e) => handlepinChange(e.target.value)}
              />
            </FormControl>

            <Button
              variant="contained"
              color="success"
              disabled={checkBal == false}
              onClick={payFRomWallet}
            >
              {" "}
              Pay
            </Button>
            {checkBal == false ? (
              <Alert>Insufficient Balance In Your Wallet</Alert>
            ) : (
              ""
            )}
          </>}

      </>
    );
  };

  return (
    <>
      <h5>Choose Payment Method</h5>

      <div>
        <Radio
          checked={selectedValue === "a"}
          onChange={handleChange123}
          value="a"
          name="radio-buttons"
          inputProps={{ "aria-label": "A" }}
        />
        <strong>Credit Card Or Debit Card</strong>
        <Radio
          checked={selectedValue === "b"}
          onChange={handleChange123}
          value="b"
          name="radio-buttons"
          inputProps={{ "aria-label": "B" }}
        />
        <strong>Wallet</strong>
      </div>
      {selectedValue === "a" ? (
        <>
          <form
            id="payment-form"
            className="stripe-form"
            onSubmit={handleSubmit}
          >
            <CardElement
              id="card-element"
              options={cartStyle}
              onChange={handleChange}
            />
            <button
              className="stripe-button"
              disabled={processing || disabled || succeeded}
            >
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Pay"
                )}
              </span>
            </button>
            <br />
            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}
            <br />
          </form>
        </>
      ) : (
        <ACt2 />
      )}
    </>
  );
};

export default StripeCheckout;
