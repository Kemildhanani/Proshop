import React from "react";
import { Card } from "antd";
import laptop from "../../images/image.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard2 = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
    style={{width: "350px", marginRight : "20px"}}
      cover={
        <img alt="" src={images && images.length ? images[0].url : laptop} style={{ height: "250px", width: "250px" }} className="p-1" /> }
      actions={[]}>
      <Meta title={title} description={`${description && description.substring(0, 50)}...`}/>
    </Card>
  );
};

export default AdminProductCard2;
