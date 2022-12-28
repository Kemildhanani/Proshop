import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { getOrders, changeStatus } from '../../../functions/admin';
import Orders from '../../../Components/order/Orders';
import AdminSidebar from '../../../Components/sidebar/AdminSidebar/AdminSidebar';
import "./allorders.css"

const AllOrders = () => {

  const [orders, setOrders] = useState([]);
  const {user} = useSelector((state) => ({...state}))

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => getOrders(user.token).then((res) => {
    // console.log(JSON.stringify(res.data, null, 4));
    setOrders(res.data);
  })

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then(res => {
      toast.success('Status updated')
    loadOrders()

    })
  }

  return (

    <div className="poster-dashboard-home">
    <AdminSidebar />
    <div className="poster-dashboard-homeContainer">
      <div className="poster-dashboard-listContainer">
          <h3 style={{color: "white"}}>
            All Orders
          </h3>
        <hr style={{ border: "1px solid gray" }} />

      </div>
      <div style={{ width: "80%" }} className="ml-5">
      <Orders orders={orders} handelStatusChange={handleStatusChange}  />
      </div>
    </div>
  </div>
  );
};

export default AllOrders;
