import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../Components/Forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../Components/Forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { getBrands } from "../../../functions/brand";

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  //redux

  const userId = user?._id || window.localStorage.getItem("User Id");

  // console.log('@@@@',userId);

  const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black","Brown","Silver","White","Blue","Sky Blue","Yellow","Army green","Pink","Orange","Golden","Transparent","Not defined"],
    color: "",
    brand: "",
    User: userId,
  };

  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);
  const [br, setBr] = useState([]);

  //redux

  useEffect(() => {
    loadCategories();
    console.log("User Id", values.User);
  }, []);

  const loadCategories = () => {
    getBrands().then((b) => setBr(b.data));

    getCategories().then((c) => setValues({ ...values, categories: c.data })); // res.json({categories:res.data})
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
        toast.success("Product is Created");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  const handleBrandChange = (e) => {
    e.preventDefault();
    setValues({ ...values, brand: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Package Create</h4>
          )}
          <hr />

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            values={values}
            br={br}
            handleBrandChange={handleBrandChange}
            setValues={setValues}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
