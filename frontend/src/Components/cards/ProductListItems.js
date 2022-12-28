import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getBrand, getBrands} from "../../functions/brand";

const ProductListItems = ({product}) =>{
   
    const {price,category,subs,shipping,brand,color,sold,quantity}=product;
  
       const [name,setName]=useState([]);
    //    const [br,setBr]=useState("");
       useEffect(()=>{
        loadBrands();
       },[])

       const loadBrands=()=>{
           getBrands().then((b)=>{
               setName(b.data);
           })
       }
//    console.log(name)

    return(
        <>

        {/* brands checking */}

                 

        {/* {JSON.stringify(name)} */}
        <ul className="list-group">
            <li className="list-group-item">
                Price <span className="label label-default label-pill pull-xs-right">
                        ${price}
                </span>
            </li>

            { category &&(<li className="list-group-item">
                category{""} 
                <Link  to={`/category/${category.slug}`} 
                 className="label label-default label-pill pull-xs-right">
                        {category.name}
                </Link>
            </li>)}

            {/* { brand &&(<li className="list-group-item">
                Brand{""} 
                <Link  to={`/brand/${brand.slug}`} 
                 className="label label-default label-pill pull-xs-right">
                        {brand.name}
                </Link>
            </li>)} */}

            { subs &&(<li className="list-group-item">
                Sub Categories
                {subs.map((s)=>(
                    <Link  to={`/sub/${s.slug}`} 
                    key={s._id}
                    className="label label-default label-pill pull-xs-right">
                           {s.name}
                   </Link>
                ))}
                
            </li>)}

            


            <li className="list-group-item">
                shipping{""} <span className="label label-default label-pill pull-xs-right">
                        {shipping}
                </span>
            </li>

            <li className="list-group-item">
                Color{""} <span className="label label-default label-pill pull-xs-right">
                        {color}
                </span>
            </li>

                {name.map((b)=>{
                    if(b._id===brand){
                        // console.log("matched",b.name);
                        window.localStorage.setItem("Brand for product list Item",b.name.toString())
                        }
                        else{
                            // console.log("doesnot match",b.name);
                        }
                    })

                    }
            
           
            <li className="list-group-item">
                Brand 
                <span className="label label-default label-pill pull-xs-right">
                        {window.localStorage.getItem("Brand for product list Item")}
                        {window.localStorage.removeItem("Brand for product list Item")}
                </span>
            </li>

            <li className="list-group-item">
                Available <span className="label label-default label-pill pull-xs-right">
                        {quantity}
                </span>
            </li>

            <li className="list-group-item">
                Sold{""} <span className="label label-default label-pill pull-xs-right">
                        {sold}
                </span>
            </li>
        </ul>
        </>
    )
}

export default ProductListItems;