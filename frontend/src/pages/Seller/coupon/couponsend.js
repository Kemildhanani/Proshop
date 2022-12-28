import React, { useEffect, useState } from "react";
import SellerSidebar from "../../../Components/sidebar/SellerSidebar/SellerSidebar";
import { useSelector } from "react-redux";
import { getCoupon, getSellerCoupon } from "../../../functions/coupon";
import { sellergetorders } from "../../../functions/seller";
import { getUserDetails } from "../../../functions/users";
import Button from "@mui/material/Button";
import { SendCoupon } from "../../../functions/Wallet";
import { toast } from "react-toastify";
// import { SendMAilCoupon } from "../../../../../backend/controllers/mail";

const CouponSend = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [coupon, setCoupon] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState("");
  const [couponName, setCouponName] = useState("");
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    sellergetorders(user._id).then((res) => {
      let list = [];
      res.data.map((item) => {
        if (list.length === 0) {
          list.push({ ...item, total: 1 });
        } else {
          const filterList = list.filter((fitem) => {
            return fitem.orderdBy === item.orderdBy;
          });

          if (filterList && filterList.length > 0) {
            const findIndex = list.findIndex((check) => {
              return check.orderdBy === item.orderdBy;
            });

            if (findIndex >= 0) {
              list[findIndex].total = list[findIndex].total + 1;
            }
          } else {
            list.push({ ...item, total: 1 });
          }
        }
      });

      setOrders(list);
      console.log("order", list);
    });
    // console.log("eeeeeeeeee",orders.includes("zodrudurko@vusra.com"))
    getSellerCoupon(user._id).then((res) => {
      setCoupon(res.data);
    });
  }, []);

  function add(arr, name) {
    const { length } = arr;
    const id = length + 1;
    const found = arr.some((el) => el.username === name);
    if (!found) arr.push({ id, username: name });
    return arr;
  }

  const CouponSend = (email, name) => {
    try {
      getCoupon(name).then((res) => {
        SendCoupon(email, res.data);
      });
      toast.success("Coupon is Sent");
    } catch (err) {
      console.log("sending coupon", err);
    }
  };

  function onChangeHandler(value, id) {
    const index = orders.findIndex((item) => {
      return item.orderdBy === id;
    });

    // console.log("index 0",index);
    if (index >= 0) {
      const dummy = orders;
      dummy[index].SelectedValue = value;
      // setcou
      // console.log("ddddddddddddd",dummy);
      setOrders(dummy);
    }
  }

  const Data = () => {
    var selectTag = document.createElement("SELECT");
    document.body.appendChild(selectTag);
    for (var i = 0; i < coupon.length; i++) {
      var option = coupon[i];
      selectTag.options.add(new Option(option.label, option.value));
    }

    return (
      <>
        <table className="table table-dark">
          <thead>
            {/* {JSON.stringify(orders )} */}
            <tr>
              <th style={{ color: "white" }} scope="col">
                <b>User Id</b>
              </th>
              {/* <th style={{ color: "white" }} scope="col">
                                <b>Order Qty</b>
                            </th> */}
              <th style={{ color: "white" }} scope="col">
                <b>Total orders</b>
              </th>
              <th style={{ color: "white" }} scope="col">
                <b>User Email</b>
              </th>

              <th style={{ color: "white" }} scope="col">
                Select Coupon
              </th>

              <th style={{ color: "white" }} scope="col">
                Send Coupon
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <>
                <tr>
                  <td>{o.orderdBy}</td>
                  <td>{o.total}</td>
                  <td>{o.buyer}</td>
                  <td>
                    <select
                      id={o._id}
                      name="coupon"
                      value={o.SelectedValue}
                      style={{ color: "white", cursor: "pointer" }}
                      className="form-control"
                      onChange={(e) =>
                        onChangeHandler(e.target.value, o.orderdBy)
                      }
                    >
                      <option style={{ color: "black" }}>Please Select</option>
                      {coupon.map((co) => (
                        <>
                          <option
                            style={{ color: "black" }}
                            id={co.id}
                            value={co.name}
                          >
                            {co.name}
                            {setTemp(co.id)}
                          </option>
                        </>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => CouponSend(o.buyer, o.SelectedValue)}
                    >
                      Send Coupon
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <div className="poster-dashboard-home">
        <SellerSidebar />
        <div className="poster-dashboard-homeContainer">
          <div
            style={{ overflow: "auto" }}
            className="poster-dashboard-listContainer"
          >
            {/* {JSON.stringify(orders)} */}
            <h3 style={{ color: "white" }}>Send coupons to users</h3>
            <hr style={{ border: "1px solid gray" }} />
          </div>
          <div style={{ overflow: "auto", width: "80%" }} className="ml-5">
            <Data />
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponSend;
