import React, { useEffect, useState } from "react";
import Chart from "../../Components/chart/Chart";
import Featured from "../../Components/featured/Featured";
import SellerSidebar from "../../Components/sidebar/SellerSidebar/SellerSidebar";
import Widget from "../../Components/widget/Widget";
import Table from "../../Components/Table/Table";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../functions/users";
import { sellergetorders } from "../../functions/seller";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../../Components/widget/widget.css";
import { PaymentHistoryies } from "../../functions/return";
import { jsonEval } from "@firebase/util";
import { getUserOrder } from "../../functions/User";

const SellerDashboard = () => {
  const user = useSelector((state) => state.user);

  const [seller, setSeller] = useState();
  const [orders, setOrders] = useState([]);
  const [packages, setPackages] = useState();
  const [remainingdays, setRemainingdays] = useState();
  const [income, SetIncomes] = useState();
  const [payMinus,setPayminus] = useState(0)
  const [remainingProd, setRemainingProd] = useState();
  const [inde,setIn] = useState([])
  var inc = 0;
  var minus=0;
  useEffect(() => {
    console.log("here", user._id);
    getUserDetails(user._id).then((res) => {
      console.log("hhgvbjnkjhghjk.jkjhg", res.data.remainingProducts);
      setRemainingdays(res.data.remainingDays);
      setRemainingProd(res.data.remainingProducts);
      setSeller(res.data);
    });
    getUserOrder(user._id,user.token).then(res=>{
      
    })
    sellergetorders(user._id).then((res) => {
      setOrders(res.data);
      
      // var t=[]

      let list = [];
      res.data.map((item) => {
        if (list.length === 0) {
          list.push({ ...item, total: 1 });
        } else {
          const filterList = list.filter((fitem) => {
            return fitem.orderID === item.orderID;
          });

          if (filterList && filterList.length > 0) {
            const findIndex = list.findIndex((check) => {
              return check.orderID === item.orderID;
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
      console.log("Kemil",list);

      for (var i = 0; i < list.length; i++) {
        if(list[i].paymentIntent == undefined){
          // t.push(list[i].orderID);

          inc = inc + list[i].payment;

        }
        else{

          inc = inc + list[i].paymentIntent.amount / 100;
        }
      }
      SetIncomes(inc);
    });
    PaymentHistoryies(user._id).then(res=>{
      // setPayminus(res.data)
      res.data.forEach(element => {
        if(element.paymentIntent == undefined){

          minus=element.amt+minus
        }
        else{
          minus=element.paymentIntent.amount/100+minus
        }
      });
      setPayminus(minus)
    })
    
  }, []);

  //

  console.log("seller", JSON.stringify(user._id));

  return (
    <>
      <div className="admin-home">
        <SellerSidebar />
        <div className="admin-homeContainer">
          <div className="admin-widgets">
            <div className="widget">
              <div className="left">
                {/* {JSON.stringify(payMinus)} */}
                <span className="title">Orders</span>
                <span className="counter">{orders.length}</span>
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
            <div className="widget">
              <div className="left">
                <span className="title">Total Income</span>
                <span className="counter">
                  {income-payMinus}
                  {/* {remainingdays} */}
                </span>
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
            <div className="widget">
              <div className="left">
                <span className="title">Remaining Products</span>
                <span className="counter">
                  {remainingProd}
                </span>
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
            <div className="widget">
              <div className="left">
                <span className="title">Remainig Days</span>
                <span className="counter">{remainingdays}</span>
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
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
          <div className="admin-listContainer">
            <div className="admin-listTitle">Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
