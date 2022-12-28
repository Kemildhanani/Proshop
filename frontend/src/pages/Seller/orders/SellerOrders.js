import React,{useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { changeStatus } from '../../../functions/admin';
import SellerSidebar from '../../../Components/sidebar/SellerSidebar/SellerSidebar';
import Orders from './Orders';

import { getProductsByCount } from '../../../functions/product';
import { sellergetorders } from '../../../functions/seller';

const SellerOrders = () => {

  const [orders, setOrders] = useState([]);
  const {user} = useSelector((state) => ({...state}))
  var arr=[]

  useEffect(() => {
    loadOrders()
  }, [])

  const [prod, setProducts] = useState([])
const [loading, setLoading] = useState(false);

// redux

const userId = window.localStorage.getItem("User Id")

useEffect(() => {
    loadAllProducts()
}, [])
var arr=[]

const loadAllProducts = () => {
  setLoading(true)
  getProductsByCount(100)
  .then((res) => {
    setProducts(res.data)
    setLoading(false)
  })
  .catch(err => {
    setLoading(false)
    console.log(err)
  })
}

const loadOrders =  async () => await sellergetorders(user._id).then((res) => {
  // console.log(JSON.stringify(res.data, null, 4));
  setOrders(res.data);
})

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then(res => {
    loadOrders()
    })
  };

  


  return (

    <div className="poster-dashboard-home">
    <SellerSidebar/>
    <div className="poster-dashboard-homeContainer">
      <div style={{overflow:"auto"}} className="poster-dashboard-listContainer">
        {/* {JSON.stringify(orders)} */}
          <h3 style={{color: "white"}}>
            All Orders
          </h3>
        <hr style={{ border: "1px solid gray" }} />

      </div>
      <div style={{overflow:"auto", width: "80%" }} className="ml-5">
        {orders && orders.map(o=>(
        <Orders orders={o} handelStatusChange={handleStatusChange}  />
        ))}
      </div>
    </div>
  </div>
  );
};

export default SellerOrders;
