import React from "react";
// import { Card } from "antd";

import laptop from "../../images/image.jpg";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// const { Meta } = Card;

// const AdminProductCard = ({ product, handleRemove }) => {
//   const { title, description, images, slug } = product;
//   return (
//     <Card
//       cover={
//         <img src={images && images.length ? images[0].url : laptop} style={{ height: "150px",maxwidth: "  "}} className="p-1" />
//       }
//       actions={[
//         <Link to={`/seller/product/${slug}`}>
//           <EditOutlined className="text-warning" />
//         </Link>,
//         <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger"/>,]}>
//       <Meta title={title} description={`${description && description.substring(0, 40)}...`}/>
//     </Card>

//   );
// };

// export default AdminProductCard;

// import React, { useState } from "react";
// import { Tooltip } from "antd";
// import {  ShoppingOutlined } from "@ant-design/icons";
// import laptop from "../../images/image.jpg"
// import { Link } from "react-router-dom";
// import _ from "lodash";
// import { useSelector, useDispatch } from "react-redux";
// import image from "../../images/image.jpg";
// import "./productCard.css";
import "../../Components/cards/productCard.css";
import { Tooltip } from "@mui/material";

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <>
      <div style={{height: "22pc"}} className="product">
        <div className="product-img">
          <img
            alt=""
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "250px", padding: "10px" }}
          />
        </div>
        <h6 className="product-heading">
          {/* {title} */}
          {title.length > 50 ? title.substring(0, 50).concat("...") : title}
        </h6>
        <div className="rating-review">
          <div></div>
        </div>

        <div className="price-qty">
          <div className="price">
            {/* <h4 >₹Price</h4> */}

          </div>
          <div className="qty">
            <div className="cartIcon">
            <button className="cartButton">
              <Tooltip title="edit">
                <Link to={`/seller/product/${slug}`}>
                  <EditOutlined className="text-warning" />
                </Link>
              </Tooltip>
            </button>
              <button className="cartButton " disabled>
                <Tooltip title="Delete">
                  <DeleteOutlined
                    className="ml-3 text-danger"
                    onClick={() => handleRemove(slug)}
                  />
                </Tooltip>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
