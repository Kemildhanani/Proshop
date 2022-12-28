import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../functions/users";
import { useSelector } from "react-redux";
import { sellergetorders } from "../../functions/seller";

const Widget = ({ type }) => {
  let data;

  const user = useSelector((state) => state.user);

  const [seller, setSeller] = useState();
  const [orders, setOrders] = useState([]);
  const [packages, setPackages] = useState();

  useEffect(() => {
    console.log("here", user._id);
    getUserDetails(user._id).then((res) => {
      console.log("hhgvbjnkjhghjk.jkjhg", res.data.remainingProducts);
      setSeller(res.data);
    });
    sellergetorders(user._id).then((res) => {
      setOrders(res.data);
    });
  }, []);

 

  return (
    <>
    {JSON.stringify(seller.remainingProducts)}
    <div className="widget">
      <div className="left">
        <span className="title">
          Orders
        </span>
        <span className="counter">
          {orders.length}
        </span>
        <span className="link">
          Show orders
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          10 %
        </div>
        "icon"
      </div>
    </div>
    <div className="widget">
      <div className="left">
        <span className="title">
          Remaining Days
        </span>
        <span className="counter">
          {/* {seller.remainingDays} */}
        </span>
        <span className="link">
          Show orders
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          10 %
        </div>
        "icon"
      </div>
    </div>
    <div className="widget">
      <div className="left">
        <span className="title">
          Remaining Produts
        </span>
        <span className="counter">
          {/* {seller.remainingProducts} */}
        </span>
        <span className="link">
          Show orders
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          10 %
        </div>
        "icon"
      </div>
    </div>
    <div className="widget">
      <div className="left">
        <span className="title">
          Orders
        </span>
        <span className="counter">
          {orders.length}
        </span>
        <span className="link">
          Show orders
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          10 %
        </div>
        "icon"
      </div>
    </div>
    </>
  );
};

export default Widget;
