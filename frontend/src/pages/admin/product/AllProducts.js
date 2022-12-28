import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard2 from "../../../Components/cards/AdminProductCard2";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import "./allProducts.css";

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (slug) => {
    let answer = window.confirm("Delete");
    if (answer) {
      // console.log("Send Delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 4000) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="dashboard-admin-home">
        {/* <div className="dashboard-admin-homeContainer"> */}
          <div className="dashboard-admin-listContainer">
            {/* <div className="container"> */}
              <div className="row">
              {products.map((product) => (
                <div key={product._id} className="col-md-3 pb-3">
                  <AdminProductCard2
                    product={product}
                    handleRemove={handleRemove}
                    />
                </div>
              ))}
              </div>
            {/* </div> */}
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default Allproducts;
