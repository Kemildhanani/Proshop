import React, { useEffect, useState } from "react";
import SellerSidebar from "../../../Components/sidebar/SellerSidebar/SellerSidebar";
import {
  findCouponHistory,
  findCouponHistoryDelete,
} from "../../../functions/coupon";
import { useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Couponhistory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadhistory();
  }, []);

  function loadhistory() {
    findCouponHistory(user._id).then((res) => {
      setHistory(res.data);
      // console.log("Ssssssssssssssssssssssssss", res.data)
    });
  }

  const Deletehistrory = async (id) => {
    try {
      await findCouponHistoryDelete(id);
      loadhistory();
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <>
      {history ? (
        <div className="poster-dashboard-home">
          <SellerSidebar />
          <div className="poster-dashboard-homeContainer">
            <div
              style={{ overflow: "auto" }}
              className="poster-dashboard-listContainer"
            >
              {/* {JSON.stringify(orders)} */}
              <h3 style={{ color: "white" }}>Total coupons sent</h3>
              <hr style={{ border: "1px solid gray" }} />
            </div>
            <div style={{ overflow: "auto", width: "80%" }} className="ml-5">
              {history &&
                history.map((h) => (
                  <>
                    <Card
                      sx={{
                        width: 400,
                        height: 250,
                        float: "left",
                        marginLeft: 3,
                        bgcolor: "#aaaaaa",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Coupon Id :<span className="ml-2">{h.coupon_id}</span>
                        </Typography>
                        <br></br>
                        <Typography gutterBottom component="div">
                          Coupon Name:
                          <span className="ml-2">{h.coupon_name}</span>
                          <br></br>
                          Discount:
                          <span className="ml-2">{h.discount}%</span>
                          <br></br>
                          User_Email:
                          <span className="ml-2">{h.buyer_email}</span>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => Deletehistrory(h._id)}
                        >
                          {" "}
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <h1>No coupon history</h1>
      )}

      <div className="poster-dashboard-home">
        <SellerSidebar />
        <div className="poster-dashboard-homeContainer">
          <div className="poster-dashboard-listContainer mb-0 pb-0"></div>
        </div>
      </div>
    </>
  );
};

export default Couponhistory;
