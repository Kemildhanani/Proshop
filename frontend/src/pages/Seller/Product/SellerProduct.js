import SellerSidebar from "../../../Components/sidebar/SellerSidebar/SellerSidebar";
import React, {useState, useEffect} from 'react';
import "./Seller.css"
import SellerHeader from "./SellerHeader";


const SellerProduct=()=>{
    

    return(
        <>
      <div style={{width: "100%"}} className="seller-dashboard-home">
      <SellerSidebar />
        <div className="seller-dashboard-homeContainer">
          <div className="seller-dashboard-listContainer">
            <SellerHeader />
          </div>
        </div>
    </div>
        </>
    )
}

export default SellerProduct;