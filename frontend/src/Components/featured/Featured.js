import "./featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { ordersIncome } from "../../functions/admin";
import { useEffect, useState } from "react";



const Featured = () => {

  const [orders, setOrders] = useState();
  
  useEffect(() => {
    ordersIncome().then(res => {
      setOrders(res.data)
    })
  },[])


  return (
    <>
    {/* {JSON.stringify(orders)} */}
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Turnover of current year</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={36} text={"37%"} strokeWidth={5} />
        </div>
        <p className="title">Total turnover throughout all the orders compared to last year</p>
        <p className="amount">₹{orders}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">₹12000</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">₹150000</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">₹500000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Featured;
