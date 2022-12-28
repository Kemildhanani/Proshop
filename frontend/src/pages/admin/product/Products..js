import React, {useEffect, useState} from 'react';
import AdminSidebar from '../../../Components/sidebar/AdminSidebar/AdminSidebar';
import ProductHeader from './productHeader';


const AdminProducts = () => {


  return (

<>
    <div className="seller-dashboard-home">
      <AdminSidebar />
        <div className="seller-dashboard-homeContainer">
          <div className="seller-dashboard-listContainer">
            <ProductHeader />
          </div>
        </div>
    </div>
    </>

// </>
  );
};

export default AdminProducts;
