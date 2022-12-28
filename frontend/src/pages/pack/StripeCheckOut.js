import React, { useEffect, useState } from "react";
import { getPackages, getPack } from "../../functions/package";
import { getUser } from "../../functions/users";
import { Alert, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { createPaymentPackageIntent } from "../../functions/stripe";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { updateSellerPackage, createSeller } from "../../functions/seller";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailLink, updatePassword,getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const StripeCheckOut = () => {

    const [pack, setPack] = useState([]);
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const [id, setId] = useState();
    const [details, setData] = useState(JSON.parse(window.localStorage.getItem("details")));
    const data = ({
        email: details.email,
        name: details.name,
        ifsc: details.ifsc,
        mobile: details.mobile,
        bank: details.bank,
        address: details.address,
        // password:details.password
    })

    const navigate = useNavigate()

    useEffect(async () => {
        loadPack();
        console.log("deta", data.name)
        try {
            const price = window.localStorage.getItem("packagePrice")
            console.log("package Price", price)
            await createPaymentPackageIntent(price).then(res => {
                console.log("create payment intent", res.data);
                setClientSecret(res.data.clientSecret);
            })
        }
        catch (err) {
            console.log("payment err", err)
        }
    }, [])

    const loadPack = async () => {
        const id = window.localStorage.getItem("package")
        await getPack(id).then((res) => {
            pack.push(res.data);
        });
        console.log("Package", pack);
        window.localStorage.removeItem("package")
    }

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


    const handleChange = async (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : '')
    }

    const creatSellerwithgoogle = async () => {
        // await createUserWithEmailAndPassword(auth,details.email,details.password).then((res)=>console.log("email",res.data));
        await signInWithEmailLink(auth, details.email, details.url);
        const user = getAuth().currentUser

        await updatePassword(user,details.password);
        createSeller(data, pack).then((res) => {
            alert("Seller is Registered Succesfully")
            signOut(auth);
    });

        window.localStorage.removeItem("details");

        navigate('/login');
    }

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

        console.log("payload", payload)
        if (payload.error) {
            // setError(`Payment failed ${payload.error.message}`);
            // setProcessing(false);
            console.log("failed", JSON.stringify(payload, null, 4));


        }
        else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            creatSellerwithgoogle();
            window.localStorage.removeItem("packagePrice")

        }



    }

    return (
        <>
            {/* {JSON.stringify(data)} */}
            {/* {console.log("sellerrrrrrr",id)} */}
            <div className="payment-screen" style={{marginBottom: "600px"}}>
                <div className="order-payment">
                    <div className="order-list">
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="mt-5 mr-5 order-address" style={{ padding: 0, border: "none" }}>
                                <div>
                                <h2>
                                    SELLER DETAILS
                                </h2>
                                </div>
                                <div>
                                <h6 className="ml-3" key={data.email}><strong>Email: </strong>{data.email}</h6>                          <br />
                                <h6 className="ml-3" key={data.name}><strong>Name: </strong>{data.name}</h6>
                                </div>


                            </ListGroup.Item>
                            {pack.map(p => (
                                <ListGroup.Item className="mt-5 mr-5 order-address" style={{ padding: 0, border: "none" }}>
                                    <div>

                                    <div>
                                    <h4>
                                        PACKAGE DETAILS
                                    </h4>
                                    </div>
                                    <div className="mt-3 ml-3">
                                        <h6><strong>Package Name: </strong>{p && p.name}</h6>
                                        <hr />
                                        <h6><strong>Price of Package: </strong>₹{p && p.price}</h6>
                                        <hr />
                                        <h6><strong>Package Duration: </strong>{p && p.duration} days</h6>
                                        <hr />
                                        {/* <h6><strong>Ads Rate: </strong>₹{p && p.adsRate} </h6> */}
                                        {/* <hr /> */}
                                        <h6><strong>Products: </strong>{p && p.products} products</h6>
                                    </div>

                                    </div>
                                </ListGroup.Item>
                            ))}


                        </ListGroup>
                    </div>
                    {pack.map(p => (

                        <div className="order-summary  mb-5">
                            <h1>Coplete Payment to get yourself registered</h1>
                            <form id="payment-form" className="stripeform" onSubmit={handleSubmit}>
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
                    ))}
                </div>

            </div>


        </>
    )
}

export default StripeCheckOut;