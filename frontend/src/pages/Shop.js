import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../Components/cards/ProductCard";
import { Menu, Radio, Slider } from "antd";
import {getSubs} from "../functions/sub";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import {getCategories} from "../functions/category";
import {getBrands} from "../functions/brand"
import SubMenu from "antd/lib/menu/SubMenu";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Star from '../Components/Forms/Star'
import './shop.css';



const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [brandIds, setBrandIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black","Brown","Silver","White","Blue","Sky Blue","Yellow","Army green","Pink","Orange","Golden","Transparent","Not defined"
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    //fetch categories
    getCategories().then((res)=>setCategories(res.data));
    getSubs().then(res=> setSubs(res.data));
    getBrands().then(res=>setBrands(res.data));
  }, []);

  const fetchProducts = (arg) => {
    
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

//2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if(!text){
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

//3. load products based on price range  
  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    //reset
    // setCategoryIds([])
    setPrice(value);
    // setStar("");
    
    setTimeout(() => {
      setOk(!ok);
      fetchProducts({ price });
    }, 300);
  };

//4. load products based on catgory
  // Show Categories in  list of checkbox
  const showCategories = () => 
  categories.map((c) => (
  <div key={c._id}>
    <Checkbox 
    onChange={handleCheck} 
    className="pb-2 pl-4 pr-4" 
    value={c._id} 
    name="category"
    checked={categoryIds.includes(c._id)}
    >
      {c.name}
    </Checkbox>
    <br/>
  </div>
  ))
  // handelCheck for categories
    const handleCheck = (e) => {
      //reset
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      }); 

      // setPrice([0,0]);
      // setStar("");
      // setSub([])
      
      let inTheState = [...categoryIds];
      let justChecked = e.target.value
      let foundInTheState = inTheState.indexOf(justChecked); // true or -1
      
      // indexOf method ??  if found returns -1 else return idex
      if(foundInTheState === -1){
        inTheState.push(justChecked)
      }else{
        //if found pull out one item from index
        inTheState.splice(foundInTheState, 1)
      }
      loadAllProducts()
    setCategoryIds(inTheState)
    // console.log(inTheState);
      fetchProducts({ category : inTheState})
    }


//5. Show Products by star ratings
    const handleStarClick = (num) => {
     console.log(num);
     dispatch({
      type: "SEARCH_QUERY",
      payload: { num: "" },
    }); 

    // setPrice([0,0]);
    // setCategoryIds([])
    // setStar(num)

    // setSub([])

    fetchProducts({ stars: num })
    }
    const showStars = () => (
      <div className="pr-4 pl-4 pb-2">
        <Star starClick={handleStarClick} numberOfStars={5}/>
        <Star starClick={handleStarClick} numberOfStars={4}/>
        <Star starClick={handleStarClick} numberOfStars={3}/>
        <Star starClick={handleStarClick} numberOfStars={2}/>
        <Star starClick={handleStarClick} numberOfStars={1}/>
      </div>
    );

  // 6. show products by sub category
  const showSubs = () =>
      subs.map((s)=>(

        <div
          key={s._id}
          className="p-1 m-1 badge badge-secondary"
          onClick={()=>handleSub(s)}
          style={{cursor:"pointer"}}
        >
            {s.name}
        </div>
      ));

    const handleSub=(s)=>{
      console.log("sub",s);
      setSub(s)
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      }); 
      
      // setPrice([0,0]);
      // setCategories([]);
      // setStar('');
      fetchProducts({sub:s})
    }  

    //7. show product by brand name
    const showBrands = () => 
  brands.map((c) => (
  <div key={c._id}>
    <Checkbox 
    key={c}
    onChange={handleBrand} 
    className="pb-1 pl-1 mt-3  pr-7" 
    value={c._id} 
    name="brand"
    checked={brandIds.includes(c._id)}
    >
      {c.name}
    </Checkbox>
    <br/>
  </div>
  ))
  // handelCheck for categories
    const handleBrand = (e) => {
      //reset
      console.log(e)
      dispatch({
        type: "SEARCH_QUERY",
        payload: { text: "" },
      }); 

      // setPrice([0,0]);
      // setStar("");
      // setSub([])
      
      let inTheState = [...brandIds];
      let justChecked = e.target.value
      let foundInTheState = inTheState.indexOf(justChecked); // true or -1
      
      // indexOf method ??  if found returns -1 else return idex
      if(foundInTheState === -1){
        inTheState.push(justChecked)
      }else{
        //if found pull out one item from index
        inTheState.splice(foundInTheState, 1)
      }
      loadAllProducts()
      setBrandIds(inTheState)
    // console.log(inTheState);
      fetchProducts({ brand : inTheState})
    }
    
    //show product based on color

    const showColors = () =>
    colors.map((c) => (
      <Radio
      // key={c}
        value={c}
        name={c}
        key={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4 pt-3"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // setPrice([0, 0]);
    // setCategoryIds([]);
    // setStar("");
    // setBrand("");
    setColor(e.target.value);
    // setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pt-3 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        key={"yes"}
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4 pt-3"
        onChange={handleShippingchange}
        key={"no"}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    // setPrice([0, 0]);
    // setCategoryIds([]);
    // setStar("");
    // setBrand("");
    // setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2" style={{width: "50%"}}>
          <h4>Search/Filter</h4>
          <hr/>
                <span className="h6 spanPrice">
                  <DollarOutlined /> Price
                </span>
       
                <div>
                <Slider key="2" className="ml-4 mr-4" tipFormatter={(v) => `$${v}`} range value={price} 
                onChange={handleSlider} max="49990"/>
                </div>   
            
            <div className="categories">
              {/* categories */}
                  <span className="h6" >
                    <DownSquareOutlined/> Categories
                  </span>
            </div>
              <div style={{marginTop:"-10px"}}>{showCategories()}</div> 
              
              <div  className="rating">
              {/* rating */}
                <span className="h6">
                  <StarOutlined  /> Rating
                </span>
              </div>
    
              <div style={{ marginTop:"-10px" }}>
                {showStars()}
                </div>
                
                {/* subs */}
              
               <div className="categories">
                  <span className="h6" >
                    <DownSquareOutlined/>Sub 
                  </span>
            </div>
            <div style={{marginTop:"-10px"}}>{showSubs()}</div> 
        {/* // */}

      {/* brands */}
              
          <div className="sub mt-3">
                  <span className=" h6 mt" >
                    <DownSquareOutlined/> Brands
                  </span>
             </div>
            <div style={{marginTop:"-10px"}}>{showBrands()}</div> 
        {/* // */}

         {/* colors */}
              
         <div className="sub mt-3">
                  <span className=" h6 mt" >
                    <DownSquareOutlined/> Colors
                  </span>
             </div>
            <div style={{marginTop:"-10px"}}>{showColors()}</div> 
        {/* // */}

         {/* Shipping */}
              
         <div className="sub mt-3">
                  <span className=" h6 mt" >
                    <DownSquareOutlined/> Shipping
                  </span>
             </div>
            <div style={{marginTop:"-10px"}}>{showShipping()}</div> 
        {/* // */}

        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}
          {/* col-md-4 mt-3 */}
          <div className="row pb-5">
          {products.map((product)=> (
                <div key={product._id} className='col-md-4 mt-3' >
                    <ProductCard product={product} />
                </div>
            ))} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

