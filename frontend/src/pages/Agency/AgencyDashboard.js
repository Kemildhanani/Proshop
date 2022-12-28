import React, { useEffect, useState } from 'react'
import AgencySidebar from '../../Components/sidebar/AgencySidebar/AgencySidebar'
import Orders from '../../Components/order/Orders'
import AgencyOrders from "./AgencyOrders"
import { getOrders, changeStatus } from '../../functions/admin'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'

const AgencyDashboard = () => {


  const [order, setOrders] = useState([]);
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

  const orders = order.filter(items=>{
    return items.orderSchedule === "Schedule";
  })

  return (
    <div className="poster-dashboard-home">
    <AgencySidebar />
    <div className="poster-dashboard-homeContainer">
      <div className="poster-dashboard-listContainer">
          <h3 style={{color: "white"}}>
            Manage Shipment
          </h3>
        <hr style={{ border: "1px solid gray" }} />

      </div>
      <div style={{ width: "80%" }} className="ml-5">
      <AgencyOrders orders={orders} handelStatusChange={handleStatusChange}  />
      </div>
    </div>
  </div>
  )
}

export default AgencyDashboard