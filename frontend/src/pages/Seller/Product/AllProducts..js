import React, {useEffect, useState} from 'react';
import SellerSidebar from "../../../Components/sidebar/SellerSidebar/SellerSidebar";
import { ToastContainer,toast } from "react-toastify";
import { getProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../Components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import {useSelector} from 'react-redux'

const SellerAllproducts = () => {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(false);

// redux
const {user} = useSelector((state) => ({...state}));

const userId = window.localStorage.getItem("User Id")

useEffect(() => {
    loadAllProducts()
}, [])

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

const handleRemove = (slug) => {
  let answer = window.confirm('Delete');
  if(answer) {
    // console.log("Send Delete request", slug);
    removeProduct(slug, user.token)
    .then(res => {
        loadAllProducts()
        toast.error(`${res.data.title} is deleted`)
    })
    .catch(err => {
      if(err.response.status === 4000) toast.error(err.response.data)
      console.log(err);
    })
  }
}

const activeProduct=products.filter(item=>{
  return item.Seller === userId
})

  return (
    <div className='container-fluid'>
            <div className="row">
                <div className="">
                </div>
                <div className='col-md-10'>
                <div className="col">
                 <div className='row' >
                 {activeProduct && activeProduct.length > 0 && activeProduct.map((product) => (
                  <div key={product._id} className='col-md-4 pb-3'>
                <AdminProductCard 
                  product={product} 
                  handleRemove={handleRemove}/>
                </div>
                  ))}
                 </div>
                  </div>
                  </div>
            </div>
        </div>

  );
};

export default SellerAllproducts;
