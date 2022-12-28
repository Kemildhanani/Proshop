import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import PackageCreateForm from "../../../Components/Forms/PackageForm";
import { LoadingOutlined } from "@ant-design/icons";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
import { createPackage } from "../../../functions/package";
import "../../../css/CreatePackage.css";

const CreatePackage = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState({
    name: "",
    duration: "",
    products: "",
    price: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    duration: "",
    products: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = false;
    let nameMessage = "";
    let durationMessage = "";
    let productsMessage = "";
    let priceMessage = "";
    if (values.name === "") {
      nameMessage = "Title is Required!";
    }
    if (values.duration === "") {
      durationMessage = "Duration is Required!";
    }
    if (values.products === "") {
      productsMessage = "Products is Required!";
    }
    if (values.price === "") {
      priceMessage = "Price is Required!";
    }
    setErrorMessage({
      name: nameMessage,
      duration: durationMessage,
      products: productsMessage,
      price: priceMessage,
    });
    // console.log("111111111111111111111",values);
    createPackage(values, user.token)
      .then((res) => {
        console.log(res);
        window.location.reload();
        toast.success("Packages is Created");
      })
      .catch((err) => {
        console.log(err);
        // if(err.response.status===400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    // debugger
    e.preventDefault();
    let { name, value } = e.target;
    if (name === "duration" || name === "products" || name === "price") {
      value = parseInt(value) || "";
      setValues({ ...values, [name]: value });
    } else {
      let isWeatherString = /^[a-zA-Z]+$/;
      if (value.match(isWeatherString)) {
        setValues({ ...values, [name]: value });
      }
    }
  };

  return (
    <div className="container-fluid">
      <PackageCreateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        setValues={setValues}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default CreatePackage;
