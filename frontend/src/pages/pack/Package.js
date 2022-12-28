import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPackages } from "../../functions/package";
import "./pricing.css";
import "./Package.css";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    await getPackages().then((res) => setPackages(res.data));
  };

  const handleClick = (id, price) => {
    window.localStorage.setItem("package", id);
    window.localStorage.setItem("packagePrice", price);
    navigate("/payment/package");
  };

  return (
    <>
    <div  className="container">
    <h1 style={{fontSize: "40px"}}>Choose a subscription package to get registered as a seller</h1>
    </div>
          <div className="wrapper-seller-pricing-card" style={{ paddingTop: "50px", marginBottom:"250px" }}>
      {packages &&
        packages.length > 0 &&
        packages.map((p) => (
            <div className="seller-pricing-card">
              <div className="seller-pricing-card-title">
                <h3>{p.name}</h3>
              </div>
              <div className="seller-pricing-card-price">
                <h1>₹{p.price}</h1>
              </div>
              <div className="seller-pricing-card-description">
                <ul>
                  <li>{p.products} Products</li>
                  <li>{p.duration} Days Hosting of Product</li>
                  {/* <li>{p.ads ? "Advertisement" : <del>Advertisement</del>}</li> */}
                  <li>24/7 Tech Support</li>
                  <li>Daily Backups</li>
                </ul>
              </div>
              <button
                type="button"
                className="btn btn-block btn-dark p-3"
                onClick={() => handleClick(p._id, p.price)}
              >
                {" "}
                <span style={{color: "white"}}>
                Get {p.name}
                </span>
              </button>
            </div>
        ))}
          </div>
    </>
  );
};

export default Package;
