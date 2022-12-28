import SingleProduct from "../Components/cards/SingleProduct";
import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRelated } from "../functions/product";
import { getBrand } from "../functions/brand";
import ProductCard from "../Components/cards/ProductCard";

const Product = () => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState();
  const [related,setRelated] = useState();
  
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = useParams();



  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  useEffect(()=>{
    // console.log(product);
    try{
      if(product.ratings && user){
        let existingRatingObject = product.ratings.find(
          (ele) => ele.postedBy.toString()=== user._id.toString()
  
        );
        const temp=existingRatingObject.star;
        setStar(temp);
      }
    }
    catch{}
    
  });

  const loadSingleProduct = () =>{

    getProduct(slug).then((res) => {
      setProduct(res.data);
      // console.log(setProduct);
      //load related
      getRelated(res.data._id).then(res=> setRelated(res.data))
    });
    
    console.log(getProduct);

  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name,newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct(); // if you want to show updated rating in real time
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
          {related ? related.map((r)=><div key={r._id} className="m-5" style={{display: "flex",flexDirection: "row"}}>
            <ProductCard 
              product={r}
            />
          </div>): <div className="text-center col">No Products Found</div>}
      </div>
    </div>
  );
};

export default Product;
 