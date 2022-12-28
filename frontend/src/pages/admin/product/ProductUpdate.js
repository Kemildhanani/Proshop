import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../Components/Forms/ProductUpdateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../Components/Forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import { getBrands } from "../../../functions/brand";
import SellerSidebar from "../../../Components/sidebar/SellerSidebar/SellerSidebar";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black","Brown","Silver","White","Blue","Sky Blue","Yellow","Army green","Pink","Orange","Golden","Transparent","Not defined"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [br, setBr] = useState([]);

  let navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));
  // router
  const { slug } = useParams();

  useEffect(() => {
    loadProduct();
    loadBrands();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      setValues({ ...values, ...p.data });
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); //on first load , show default subs
      });
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      setArrayOfSubs((prev) => arr);
    });
  };

  const loadBrands = () => getBrands().then((b) => setBr(b.data));

  const loadCategories = () =>
    getCategories().then((c) => {
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        navigate("/seller/products");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    // console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      // console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });

    // console.log("EXISTING CATEGOORY values.category", values.category);

    //if user click back to original category
    //show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids
    setArrayOfSubs([]);
  };

  const handleBrandChange = (e) => {
    e.preventDefault();
    // console.log("CLICKED CATEGORY", e.target.value);
    // setValues({ ...values, subs: []});

    // setSelectedCategory(e.target.value);
    setValues({ ...values, brand: e.target.value });

    // console.log("EXISTING CATEGOORY values.category", values.category);

    //if user click back to original category
    //show its sub categories in default
    if (values.brand._id === e.target.value) {
      loadProduct();
    }
    // clear old sub category ids
    // setArrayOfSubs([]);
  };

  return (
    <>
      <div className="category-dashboard-home">
        <SellerSidebar />
        <div className="category-dashboard-homeContainer">
          <div className="category-dashboard-listContainer">
            <h3 style={{ color: "white" }}>Update Product</h3>
            <hr style={{ border: "1px solid gray" }} />
            <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div>
            <ProductUpdateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setValues={setValues}
              values={values}
              handleCategoryChange={handleCategoryChange}
              categories={categories}
              subOptions={subOptions}
              arrayOfSubs={arrayOfSubs}
              br={br}
              handleBrandChange={handleBrandChange}
              setArrayOfSubs={setArrayOfSubs}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>

      
    </>
  );
};

export default ProductUpdate;
