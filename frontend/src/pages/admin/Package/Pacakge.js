import React,{useState} from "react";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
import PackageHeader from "./PackageHeader";


const PackageAdmin = () => {

    

  return (
    <>
    <div className="seller-dashboard-home">
      <AdminSidebar />
        <div className="seller-dashboard-homeContainer">
          <div className="seller-dashboard-listContainer">
              <PackageHeader />
          </div>
        </div>
    </div>
    </>
  );
};


export default PackageAdmin;
