import React,{useState} from "react";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
// import "../adminDashboard.css"
import "./seller.css"
import SellerHeader from "./SellerHeader";


const Sellers = () => {

    

  return (
    <>
    <div className="seller-dashboard-home">
      <AdminSidebar />
        <div className="seller-dashboard-homeContainer">
          <div className="seller-dashboard-listContainer">
            <SellerHeader />
          </div>
        </div>
    </div>
    </>
  );
};


export default Sellers;
