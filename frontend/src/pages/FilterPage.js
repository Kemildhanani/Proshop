import { Slider } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "../Components/cards/ProductCard";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import { getSubs } from "../functions/sub";
import { getCategories } from "../functions/category";
import { getBrands } from "../functions/brand";
import Star from "../Components/Forms/Star";
import Checkbox from "antd/lib/checkbox/Checkbox";
import "./filterpage.css";

const FilterSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([]);

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const [subid, setSubid] = useState();

  // useEffect(() => {}, []);

  // 1. load products by default on page load
  useEffect(() => {
    let url = window.location.href;
    let len = url.length;
  
    const myUrl = url.slice(27, len);

    if (myUrl.length == 0) {
      getCategories().then((res) => setCategories(res.data));
      getSubs().then((res) => setSubs(res.data));
      getBrands().then((res) => setBrands(res.data));
      loadAllProducts();
    }
     else if(myUrl.length >= 20 ) {
      getCategories().then((res) => setCategories(res.data));
      getSubs().then((res) => setSubs(res.data));
      getBrands().then((res) => setBrands(res.data));

      fetchProducts({ sub: myUrl });
    }
    else{
      const delayed = setTimeout(() => {
            fetchProducts({ query: text });
            if (!text) {
              loadAllProducts();
            }
          }, 300);
          getCategories().then((res) => setCategories(res.data));
      getSubs().then((res) => setSubs(res.data));
      getBrands().then((res) => setBrands(res.data));
          return () => clearTimeout(delayed);
    }

    //fetch categories
  }, [text]);

  const fetchProducts = (arg) => {
    if (arg.length !== null) {
      fetchProductsByFilter(arg).then((res) => {
        setProducts(res.data);
      });
    }
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  //2. load products on user search input
  // useEffect(() => {
  //   const delayed = setTimeout(() => {
  //     fetchProducts({ query: text });
  //     if (!text) {
  //       // loadAllProducts();
  //     }
  //   }, 300);
  //   return () => clearTimeout(delayed);
  // }, [text]);

  //3. load products based on price range
  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    //reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");

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
          <span style={{ color: "white", marginBottom: "10 px" }}>
            {c.name}
          </span>
        </Checkbox>
        <br />
      </div>
    ));
  // handelCheck for categories
  const handleCheck = (e) => {
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setStar("");
    setSub([]);

    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // true or -1

    // indexOf method ??  if found returns -1 else return idex
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      //if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }
    loadAllProducts();
    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  //5. Show Products by star ratings
  const handleStarClick = (num) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { num: "" },
    });

    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);

    setSub([]);

    fetchProducts({ stars: num });
  };
  const showStars = () => (
    <div className="ml-3">
      <span style={{ marginBottom: "10px", display: "block" }}>
        <Star starClick={handleStarClick} numberOfStars={5} />
      </span>
      <span style={{ marginBottom: "10px", display: "block" }}>
        <Star starClick={handleStarClick} numberOfStars={4} />
      </span>

      <span style={{ marginBottom: "10px", display: "block" }}>
        <Star starClick={handleStarClick} numberOfStars={3} />
      </span>
      <span style={{ marginBottom: "10px", display: "block" }}>
        <Star starClick={handleStarClick} numberOfStars={2} />
      </span>
      <span style={{ marginBottom: "10px", display: "block" }}>
        <Star starClick={handleStarClick} numberOfStars={1} />
      </span>
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="p-1 m-1 badge badge-secondary"
        onClick={() => handleSub(s)}
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (s) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    console.log("sub", s);
    setSub(s);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    console.log("sssssssssssssssssssss", s);
    setPrice([0, 0]);
    setCategories([]);
    setStar("");
    fetchProducts({ sub: s });
  };

  return (
    <>
      <div className="filter-page" style={{ background: "#e7e7e7" }}>
        <div className="side-nav">
          <h4 style={{ color: "#fff" }}>Price</h4>
          <Slider
            range
            max={200000}
            min={0}
            defaultValue={[0, 2000]}
            onChange={handleSlider}
          />
          <h4 className="filter-heading">Category</h4>
          <div>
            <label className="check-label">{showCategories()}</label>
          </div>

          <h4 className="filter-heading">Rating</h4>
          <span>{showStars()}</span>
          <div>
            <h4 className="filter-heading">Sub-Category</h4>
            <label className="check-label">{showSubs()}</label>
          </div>
        </div>

        <div className="filter-content filter-container">
          <div style={{ display: "flex" }}></div>
          {products.length < 1 && 
          <div className="row center mx-2">
            <h1>No products found please try other filter</h1>
            </div>
            }

            <div className="row center mx-2">
              {products &&
                products.map((product) => (
                  <div key={product._id} className="m-2">
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>

        </div>
      </div>
    </>
  );
};

export default FilterSearch;
