import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { getCoupons,getSellerCoupon, removeCoupon, createCoupon } from "../../../functions/coupon";

import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import AdminSidebar from "../../Components/sidebar/AdminSidebar/AdminSidebar";
import SellerSidebar from "../../../Components/sidebar/SellerSidebar/SellerSidebar";


import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { Alert, Col, Row } from "react-bootstrap";
import { Tooltip } from "@mui/material";

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [usage,setUsage] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getSellerCoupon(user._id).then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
     const seller=user._id
    // console.table(name, expiry, discount);
    createCoupon({ name , expiry , discount , seller , usage }, user.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        setName("");
        setDiscount("");
        setExpiry("");
        if(res.data == 213){
          toast.error("CouponName is Exist")
        }
        else{
          
          toast.success(`"${res.data.name}" is created`);
          
        }
        window.location.reload()
      })
      .catch((err) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="poster-dashboard-home">
        <SellerSidebar />
        <div className="poster-dashboard-homeContainer">
          <div className="poster-dashboard-listContainer mb-0 pb-0">
            <h3 style={{ color: "white" }}>Create Coupon</h3>
            <hr style={{ border: "1px solid gray" }} />
          </div>
          <div className="ml-5">
            <form style={{ width: "20%" }} onSubmit={handleSubmit}>
              <div className="form-group">
                <label style={{ color: "white" }}>Coupon Name</label>
                <input
                  type="text"
                  className="ml-3 form-control text-light"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  autoFocus
                  required
                  placeholder="Enter Coupon Name"
                />
              </div>

              <div className="mt-4 form-group">
                <label style={{ color: "white" }}>Discount In Percentage</label>
                <input
                  type="number"
                  // pattern="[0-100]"
                  min={1}
                  max={99}

                  step="1"
                  className="ml-3 form-control text-light"
                  onChange={(e) => setDiscount(e.target.value)}
                  value={discount}
                  required
                  placeholder="Enter Discount in %"
                />
              </div><div className="mt-4 form-group">
                <label style={{ color: "white" }}>Set Usage Time</label>
                <input
                  type="text"
                  // pattern="[0-100]"
                  min="1"
                  step="1"
                  className="ml-3 form-control text-light"
                  onChange={(e) => setUsage(e.target.value)}
                  value={usage}
                  required
                  placeholder="Enter Usage Time"
                />
              </div>

              <div className="mt-4 form-group">
                <label className="text-light">Expiry</label>
                <br />
                <div className="mt-2 ml-3">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/dd/yyyy"
                        value={expiry}
                        onChange={(date) => setExpiry(date)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
              </div>

              <button
                style={{ color: "white", width: "100%" }}
                className="btn btn-dark"
              >
                Save Coupon
              </button>
            </form>

            <hr style={{ border: "1px solid gray" }} />

            <Row className="mt-4">
              {coupons.map((c) => (
                <Col key={c._id} md="6" xl="4" sm="6">
                  <div style={{ cursor: "pointer" }}>
                    <Alert variant="dark" className="text-black">
                      <Tooltip title="Coupon Name">
                        <span>
                          {c.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                      </Tooltip>
                      <Tooltip title="Coupon expiry date">
                        <span>
                          {new Date(c.expiry).toLocaleDateString()}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                      </Tooltip>
                      <Tooltip title="Coupon Discount">
                        <span>{c.discount}%</span>
                      </Tooltip>
                      <span className="float-right text-center">
                        <Tooltip title="Delete" color="red">
                          <CloseOutlined
                            onClick={() => handleRemove(c._id)}
                            className="text-danger"
                          />
                        </Tooltip>
                      </span>
                    </Alert>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCouponPage;
