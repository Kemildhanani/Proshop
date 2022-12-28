// import { Link, useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import UserSidebar from "../sidebar/UserSidebar/UserSidebar";
// import "./PaymentWallet.css";
// import { getWallet, updateAmt } from "../../functions/Wallet";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { createPaymentReturnIntent, createPaymentWalletIntent } from "../../functions/stripe";
// import { useSelector } from "react-redux";
// import SellerSidebar from "../sidebar/SellerSidebar/SellerSidebar";
// import { createpaymenthistory, returnpayment } from "../../functions/return";
// import { getUserDetails } from "../../functions/users";


// const PaymentReturn = () => {
//     // debugger
//     const [succeeded, setSucceeded] = useState(false);
//     const [error, setError] = useState(null);
//     const [clientSecret, setClientSecret] = useState("");
//     const [processing, setProcessing] = useState("");
//     const [disabled, setDisabled] = useState(true);
//     const [walletAmt,setWalletAmt] = useState(0);
//     const [id, setId] = useState(window.localStorage.getItem("User Id"))
//     const [price, setPrice] = useState(localStorage.getItem("returnamt"));
//     console.log("price", price);
//     const { user } = useSelector((state) => ({ ...state }));
//     const navigate = useNavigate()


//     const stripe = useStripe();
//     const elements = useElements();
//     useEffect(() => {
//         createPaymentReturnIntent(price).then((res) => {
//             console.log("create payment intent", res.data);
//             setClientSecret(res.data.clientSecret);
//             // localStorage.removeItem("walletpayment")
//             // additional response received on successful payment
//         });

//         getWallet(id).then((res)=>{
//             setWalletAmt(res.data.amt);
//         });

//     }, [])

//     const cartStyle = {
//         style: {
//             base: {
//                 color: "#32325d",
//                 fontFamily: "Arial, sans-serif",
//                 fontSmoothing: "antialiased",

//                 fontSize: "16px",
//                 "::placeholder": {
//                     color: "#32325d",
//                 },
//             },
//             invalid: {
//                 color: "#fa755a",
//                 iconColor: "#fa755a",
//             },
//         },
//     };

    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setProcessing(true);

//         const payload = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//                 billing_details: {
//                     name: e.target.name.value,
//                 },
//             },
//         });

//         if (payload.error) {
//             setError(`Payment failed ${payload.error.message}`);
//             setProcessing(false);
//         } else {
//             console.log("qqq",payload);
//             // const odid = window.localStorage.getItem("orderdetails")
//             // const odid  =window.local
            
//             const id=localStorage.getItem("buyer")
//             getUserDetails(id).then(res=>{
                
//                 const data={
//                     paymentIntent:payload.paymentIntent,
//                     seller:user._id,
//                     user:id,
//                     orderDetails:window.localStorage.getItem("orderdetails"),
//                     buyer_email:res.data.email
//                 }
//                 createpaymenthistory(data)
//                 // alert(localStorage.getItem("return"))
//                 returnpayment(localStorage.getItem("return"))
//             })
//             setPrice(walletAmt+price);
//             console.log("amt",walletAmt);
//             var p=Number(price)
//             var pr=walletAmt + p;
//             try {   
                
//                 await updateAmt(id, pr, user.token);

//             }
//             catch (err) {
//                 console.log("err walletpaymetn", err)
//             }

//             console.log(JSON.stringify(payload, null, 4));
//             setError(null);
//             setProcessing(false);
//             setSucceeded(true);
//             window.localStorage.removeItem("returnamt");
//             window.localStorage.removeItem("buyer");
//             window.localStorage.removeItem("return");
//             window.localStorage.removeItem("orderdetails");
//             navigate("/seller/returnPayment");

//         }
//     };


//     const handleChange = async (e) => {
//         // listen for changes in the card element
//         // and display any errors as the custoemr types their card details
//         setDisabled(e.empty); // disable pay button if errors
//         setError(e.error ? e.error.message : ""); // show error message
//     };


//     return (
//         <>
//             <div className="category-dashboard-home">
//                 <SellerSidebar />
//                 <div className="category-dashboard-homeContainer">
//                     <div className="category-dashboard-listContainer">
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col-lg-4 mb-lg-0 mb-3">
//                                     <div className="card p-3">
//                                         <div className="img-box"> <img src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt="" /> </div>
//                                         <div className="number"> <label className="fw-bold" for="">**** **** **** 1060</label> </div>
//                                         <div className="d-flex align-items-center justify-content-between"> <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small> <small><span className="fw-bold">Name:</span><span>Kumar</span></small> </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 mb-lg-0 mb-3">
//                                     <div className="card p-3">
//                                         <div className="img-box"> <img src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png" alt="" /> </div>
//                                         <div className="number"> <label className="fw-bold">**** **** **** 1060</label> </div>
//                                         <div className="d-flex align-items-center justify-content-between"> <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small> <small><span className="fw-bold">Name:</span><span>Kumar</span></small> </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4 mb-lg-0 mb-3">
//                                     <div className="card p-3">
//                                         <div className="img-box"> <img src="https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png" alt="" /> </div>
//                                         <div className="number"> <label className="fw-bold">**** **** **** 1060</label> </div>
//                                         <div className="d-flex align-items-center justify-content-between"> <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small> <small><span className="fw-bold">Name:</span><span>Kumar</span></small> </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-12 mt-4">
//                                     <div className="card p-3">
//                                         <p className="mb-0 fw-bold h4">Payment Methods</p>
//                                         <br/>
//                                         <p className="mb-0 fw-bold h4">Total Payable : {price}</p>
                                        
//                                     </div>
//                                 </div>
//                                 <div className="col-12">
//                                     <div className="card p-3">
//                                         <div className="card-body border p-0">
//                                             <p> <a className="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" ls="collapseExample"> <span className="fw-bold">Debit Card</span> <span className="fab fa-cc-paypal"> </span> </a> </p>
//                                             <div className="collapse p-3 pt-0" id="collapseExample">

//                                             </div>
//                                         </div>
//                                         <div className="card-body border p-0">
//                                             <p> <a className="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample"> <span className="fw-bold">Credit Card</span> <span className=""> <span className="fab fa-cc-amex"></span> <span className="fab fa-cc-mastercard"></span> <span className="fab fa-cc-discover"></span> </span> </a> </p>
//                                             <div className="collapse show p-3 pt-0" id="collapseExample">


//                                                 <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
//                                                     <CardElement
//                                                         id="card-element"

//                                                         options={cartStyle}
//                                                         onChange={handleChange}
//                                                     />
//                                                     <button
//                                                         className="stripe-button "
//                                                         disabled={processing || disabled || succeeded}
//                                                     >
//                                                         <span id="button-text">
//                                                             {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
//                                                         </span>
//                                                     </button>
//                                                     <br />
//                                                     {error && (
//                                                         <div className="card-error" role="alert">
//                                                             {error}
//                                                         </div>
//                                                     )}
//                                                     <br />
//                                                     <p className={succeeded ? "result-message" : "result-message hidden"}>
//                                                         Payment Successful.{" "}
//                                                     </p>
//                                                 </form>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default PaymentReturn;

import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UserSidebar from "../sidebar/UserSidebar/UserSidebar";
import "./PaymentWallet.css";
import { getWallet, updateAmt } from "../../functions/Wallet";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentReturnIntent, createPaymentWalletIntent } from "../../functions/stripe";
import { useSelector } from "react-redux";
import SellerSidebar from "../sidebar/SellerSidebar/SellerSidebar";
import { createpaymenthistory, returnpayment } from "../../functions/return";
import { getUserDetails } from "../../functions/users";


const PaymentReturn = () => {
    // debugger
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [walletAmt, setWalletAmt] = useState(0);
    const [id, setId] = useState(window.localStorage.getItem("User Id"))
    const [price, setPrice] = useState(localStorage.getItem("returnamt"));
    console.log("price", price);
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate()


    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        createPaymentReturnIntent(price).then((res) => {
            console.log("create payment intent", res.data);
            setClientSecret(res.data.clientSecret);
            // localStorage.removeItem("walletpayment")
            // additional response received on successful payment
        });

        getWallet(localStorage.getItem("buyer")).then((res) => {
            setWalletAmt(res.data.amt);
            console.log("1111111111111111111111111111111",res.data.amt);
        });

    }, [])

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
            console.log("qqq", payload);
            // const odid = window.localStorage.getItem("orderdetails")
            // const odid  =window.local

            const id = localStorage.getItem("buyer")
            getUserDetails(id).then(res => {

                const data = {
                    paymentIntent: payload.paymentIntent,
                    seller: user._id,
                    user: id,
                    orderDetails: window.localStorage.getItem("orderdetails"),
                    buyer_email: res.data.email
                }
                createpaymenthistory(data)
                // alert(localStorage.getItem("return"))
                returnpayment(localStorage.getItem("return"))
            })

            try {

               
                setPrice(walletAmt + price);
                console.log("amhhjht", walletAmt);
                var p = Number(price)
                var pr = walletAmt + p;
                // console.log("pssssssssssss",pr)
                await updateAmt(id, pr, user.token);

            }
            catch (err) {
                console.log("err walletpaymetn", err)
            }

            console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            window.localStorage.removeItem("returnamt");
            window.localStorage.removeItem("buyer");
            window.localStorage.removeItem("return");
            window.localStorage.removeItem("orderdetails");
            navigate("/seller/returnPayment");

        }
    };


    const handleChange = async (e) => {
        // listen for changes in the card element
        // and display any errors as the custoemr types their card details
        setDisabled(e.empty); // disable pay button if errors
        setError(e.error ? e.error.message : ""); // show error message
    };


    return (
        <>
            <div className="category-dashboard-home">
                <SellerSidebar />
                <div className="category-dashboard-homeContainer">
                    <div className="category-dashboard-listContainer">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 mb-lg-0 mb-3">
                                    <div className="card p-3">
                                        <div className="img-box"> <img src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt="" /> </div>
                                        <div className="number"> <label className="fw-bold" for="">**** **** **** 1060</label> </div>
                                        <div className="d-flex align-items-center justify-content-between"> <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small> <small><span className="fw-bold">Name:</span><span>Kumar</span></small> </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-lg-0 mb-3">
                                    <div className="card p-3">
                                        <div className="img-box"> <img src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png" alt="" /> </div>
                                        <div className="number"> <label className="fw-bold">**** **** **** 1060</label> </div>
                                        <div className="d-flex align-items-center justify-content-between"> <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small> <small><span className="fw-bold">Name:</span><span>Kumar</span></small> </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-lg-0 mb-3">
                                    <div className="card p-3">
                                        <div className="img-box"> <img src="https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png" alt="" /> </div>
                                        <div className="number"> <label className="fw-bold">**** **** **** 1060</label> </div>
                                        <div className="d-flex align-items-center justify-content-between"> <small><span className="fw-bold">Expiry date:</span><span>10/16</span></small> <small><span className="fw-bold">Name:</span><span>Kumar</span></small> </div>
                                    </div>
                                </div>
                                <div className="col-12 mt-4">
                                    <div className="card p-3">
                                        <p className="mb-0 fw-bold h4">Payment Methods</p>
                                        <br />
                                        <p className="mb-0 fw-bold h4">Total Payable : {price}</p>

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card p-3">
                                        <div className="card-body border p-0">
                                            <p> <a className="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" ls="collapseExample"> <span className="fw-bold">Debit Card</span> <span className="fab fa-cc-paypal"> </span> </a> </p>
                                            <div className="collapse p-3 pt-0" id="collapseExample">

                                            </div>
                                        </div>
                                        <div className="card-body border p-0">
                                            <p> <a className="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample"> <span className="fw-bold">Credit Card</span> <span className=""> <span className="fab fa-cc-amex"></span> <span className="fab fa-cc-mastercard"></span> <span className="fab fa-cc-discover"></span> </span> </a> </p>
                                            <div className="collapse show p-3 pt-0" id="collapseExample">


                                                <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                                                    <CardElement
                                                        id="card-element"

                                                        options={cartStyle}
                                                        onChange={handleChange}
                                                    />
                                                    <button
                                                        className="stripe-button "
                                                        disabled={processing || disabled || succeeded}
                                                    >
                                                        <span id="button-text">
                                                            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
                                                        </span>
                                                    </button>
                                                    <br />
                                                    {error && (
                                                        <div className="card-error" role="alert">
                                                            {error}
                                                        </div>
                                                    )}
                                                    <br />
                                                    <p className={succeeded ? "result-message" : "result-message hidden"}>
                                                        Payment Successful.{" "}
                                                    </p>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentReturn;