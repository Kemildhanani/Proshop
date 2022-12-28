import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/User";
import "suneditor/dist/css/suneditor.min.css";
import { Form, Alert } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import Radio from '@mui/material/Radio';


import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessIcon from "@mui/icons-material/Business";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Payment from "./Payment";
import { getUserDetails } from "../functions/users";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [act, setAct] = useState(1);

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [pinerr, setPinerr] = useState(false);

  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [flatNo, setFlatNo] = useState(null);
  const [apartmentName, setApartmentName] = useState(null);
  const [landMark, setLandmark] = useState(null);
  const [pinCode, setPinCode] = useState(null);
  const [error, setError] = useState(false);
  const [temp,setTemp] = useState()

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
    getUserDetails(user._id).then(res=>{
      setTemp(res.data);
    })
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  const saveAddressToDb = (add) => {
    console.log(add);
    saveUserAddress(user.token, add).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        // toast.success("Address saved");
      }
    });
  };

  const handlePinChange = (e) => {
    if (e.length == 6 && e > 0) {
      setPinerr(false);
      setPinCode(e);
    } else {
      setPinerr(true);
    }
  };
  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const handleSubmit = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if (
      flatNo !== null &&
      apartmentName !== null &&
      landMark !== null &&
      city !== null &&
      state !== null &&
      pinCode !== null
    ) {
      let address = "".concat(
        flatNo,
        "-",
        apartmentName,
        ",",
        landMark,
        ",",
        city,
        ",",
        state,
        "-",
        pinCode
      );
      console.log(address);
      setAct(act + 1);
      saveAddressToDb(address);
    } else {
      toast.success("All Field is required");
    }
    // localStorage.setItem('shippingAddress',JSON.stringify({flatNo, apartmentName,landMark, city, state, pinCode}))
  };
  const HandleSubmit1 = ()=>{
    if(temp.address == null || ""){
      toast.error("Default Address is not availible ")
    }
    else{

      setAct(act+1);
    }
  }

  const showAddress = () => (
    <>
      <textarea
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Write Your Address Here..."
        rows={3}
        style={{
          border: "2px inset #765942",
          height: "60px",
          width: "330px",
        }}
      />

      <br />
      <button
        className="btn btn-primary mt-2"
        onClick={(e) => {
          setAct(act + 1);
          saveAddressToDb(e);
        }}
      >
        Save
      </button>
    </>
  );

  const showProductSummary = () => (
    <>
      {products.map((p, i) => (
        <div key={i}>
          <p>
            {p.product.title} ({p.color}) x {p.count} ={" "}
            {p.product.price * p.count}
          </p>
        </div>
      ))}
    </>
  );

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  }));

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <ShoppingCartIcon />,
      2: <BusinessIcon />,
      3: <CreditCardIcon />,
      4: <ReceiptIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  const steps = ["Cart", "Address", "Payment", "Show Order"];

  return (
    <div className="container">
      <div>
        <Stack
          sx={{ marginTop: "50px", width: "100%", marginBottom: "50px" }}
          spacing={4}
        >
          <Stepper
            alternativeLabel
            activeStep={act}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>

        {act == 1 ? (
          <>
            {/* <div
            style={{ marginLeft: "100px", paddingLeft: "100px" }}
            className="address-main"
            >
            <h4>Delivery Address</h4>
            <br />
            <br />
            <textarea
            placeholder="Write Your Address Here..."
            rows={3}
            style={{
              border: "2px inset #765942",
              height: "60px",
              width: "330px",
            }}
            />
            <br />
            <button className="btn btn-primary mt-2">Save</button>
          </div> */}

            <div className="doctor-login-container">
              <div className="container shipping-form ">
                <div
                  style={{
                    height: "100vh",
                    width: "40%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >

                  <h1>Choose Address</h1>
                  <div>
                    <Radio
                      checked={selectedValue === 'a'}
                      onChange={handleChange}
                      value="a"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'A' }}
                    /> Write Address
                    <Radio
                      checked={selectedValue === 'b'}
                      onChange={handleChange}
                      value="b"
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'B' }}
                    />
                    show Default addres
                  </div>
                  {selectedValue == "a" ?
                    <>
                      <h1>Shipping</h1>
                      <p>House No./Flat No.</p>
                      <div className="first">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            // min={1}
                            required
                            key="house"
                            size="large"
                            placeholder={`"B/230"`}
                            value={flatNo}
                            onChange={(e) => setFlatNo(e.target.value)}
                          />
                        </Form.Group>
                        {/* <input name="txtEmail" key="email" size='large' value={email} className='mb-3' disabled /> */}
                      </div>
                      <p>Society/Apartment Name</p>
                      <div className="first">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            key="society"
                            required
                            size="large"
                            placeholder={`"Abc society"`}
                            value={apartmentName}
                            onChange={(e) => setApartmentName(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <p>Land mark</p>
                      <div className="first">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            size="large"
                            required
                            placeholder={`"Near pqr"`}
                            value={landMark}
                            onChange={(e) => setLandmark(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <p>State</p>
                      <div className="first">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            required
                            key="state"
                            size="large"
                            placeholder={`"Maharashtra"`}
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <p>City</p>
                      <div className="first">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="text"
                            key="city"
                            required
                            size="large"
                            placeholder={`"Mumbai"`}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <p>Pin Code</p>
                      <div className="first">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            type="number"
                            key="pincode"
                            required
                            // max={6}
                            size="large"
                            placeholder={`"395872"`}
                            // value={pinCode}
                            onChange={(e) => handlePinChange(e.target.value)}
                          />
                          {pinerr == true ? <Alert>Enter Proper Pin</Alert> : ""}
                        </Form.Group>
                      </div>
                      <br />
                      <button onClick={() => handleSubmit()} className="button-31">
                        Proceed To Pay
                      </button>
                    </>
                    :<>
                      <h1>Shipping</h1>
                    <br/>
                      <h4>{temp.address == null ? "Address not found": temp.address}</h4>
                      <br/>
                      <button
                      // disabled={temp.address == null}
                      onClick={() => HandleSubmit1()} className="button-31">
                        Proceed To Pay
                      </button>
                    </>}

                </div>
              </div>
            </div>
            {/* <Container>
                        <Row className="justify-content-md-center shipping-form">
                        <Col xs={12} md={6}>
                        <h2 className="mt-4">SHIPPING</h2>
                        <div className="mt-4">
                        <label className="float-left mt-2">House No./ Flat No.</label>
                        <input type='text' placeholder='Enter Flat No.'/>
                        <label className=" float-left mt-2">Society/Apartment Name</label>
                        <input type='text' placeholder='Enter Society/Apartment Name' />
                        <label className=" float-left mt-2">Land mark</label>
                        <input type='text' placeholder='Enter Landmark' />
                        <label className="float-left mt-2">State</label>
                        <select >
                        <option>Select State</option>
                        <option>New gujarat</option>
                        </select>
                        <>
                        <label className="float-left mt-2">City</label>
                        <select >
                        <option>Select City</option>
                        <option>New City</option>
                        </select>
                        </>
                        <label className="float-left mt-2">Pin Code</label>
                        <input type='number' placeholder='Enter PinCode' />
                        <button className="form-button my-3">PROCEED TO PAY</button>
                        </div>
                        </Col>
                        
                        </Row>
                      </Container> */}
          </>
        ) : act == 2 ? (
          <Payment />
        ) : (
          "no"
        )}
      </div>
    </div>
  );
};

export default Checkout;
