import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Chart from "../../Components/chart/Chart";
import Featured from "../../Components/featured/Featured";
import AdminSidebar from "../../Components/sidebar/AdminSidebar/AdminSidebar";
// import Widget from "../../Components/widget/Widget";
import Widget1 from "../../Components/widget1/Widget1"
import "./adminDashboard.css";
import Table from "../../Components/Table/Table";
import { getUsers } from "../../functions/users";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../../Components/widget/widget.css"
import { packageIncome,getusercount,getsellercount, getOrders } from "../../functions/admin";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import ChartsEmbedSdk  from "@mongodb-js/charts-embed-dom"

// const data = [
//   { name: "January", Total: 1200 },
//   { name: "February", Total: 2100 },
//   { name: "March", Total: 800 },
//   { name: "April", Total: 1600 },
//   { name: "May", Total: 900 },
//   { name: "June", Total: 1700 },
// ];

const AdminDashboard = () => {

  const [user, setUser] = useState()
  const [seller, setSeller] = useState()
  const [orders, setOrders] = useState()
  const [packageis, setPackage] = useState()
  const users = useSelector(state => state.user)

  const navigate = useNavigate();
  useEffect(()=>{
    getsellercount().then(res=>{
      setSeller(res.data)
    })
    getusercount().then(res => {
      setUser(res.data)
    })
    getOrders(users.token).then(res => {
      setOrders(res.data.length)
    })
    packageIncome().then(res=>{
      setPackage(res.data)
    })
  },[])

  
  
  // document.getElementById("user").addEventListener("click",navigate("/admin/users"))
  return (
    <div className="admin-home">
      <AdminSidebar />
      <div className="admin-homeContainer">
        <div className="admin-widgets">
            <div className="widget">
              <div className="left">
                {/* {JSON.stringify(orders.length)} */}
                <span className="title">USERS</span>
                <span className="counter">{user}</span>
                <span className="link">
                    <Link className="usersLink-dashboard" to="/admin/users" >
                  Show Users
                    </Link>
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
                <span className="title">SELLERS</span>
                <span className="counter">
                  {seller}
                </span>
                <span className="link">
                    <Link className="usersLink-dashboard" to="/admin/sellers" >
                  Show Sellers
                    </Link>
                  </span>
              </div>
              <div className="right">
                <div className="percentage positive">
                  <KeyboardArrowUpIcon />
                  10 %
                </div>
                {/* "icon" */}
              </div>
            </div>
            <div className="widget">
              <div className="left">
                <span className="title">ORDERS</span>
                <span className="counter">
                  {orders}
                </span>
                <span className="link">
                    <Link className="usersLink-dashboard" to="/admin/allOrders" >
                  Show Orders
                    </Link>
                  </span>
              </div>
              <div className="right">
                <div className="percentage positive">
                  <KeyboardArrowUpIcon />
                  10 %
                </div>
                {/* "icon" */}
              </div>
            </div>
            <div className="widget">
              <div className="left">
                <span className="title">EARNINGS</span>
                <span className="counter">{packageis}</span>
                {/* <span className="link">Show orders</span> */}
              </div>
              <div className="right">
                <div className="percentage positive">
                  <KeyboardArrowUpIcon />
                  10 %
                </div>
                {/* "icon" */}
              </div>
          </div>
        </div>
        <div className="admin-charts">
          <Featured />
          <Chart title="Produucts sold on based of some famouse catrgories" aspect={2 / 1} />
        </div>
        <div className="admin-listContainer">
          <div className="admin-listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
