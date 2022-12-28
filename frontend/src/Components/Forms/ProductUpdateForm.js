import React, { useState } from "react";
import { Select } from "antd";
import { Alert } from "react-bootstrap";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
  br,
  handleBrandChange,

  // selectedCategory,
}) => {
  const [input, setInput] = useState();
  const [error, setError] = useState(false);
  const [errorPrice, serErrorPrice] = useState(false);

  function inputQtyChange(e) {
    if (e  >= 0 && e.length > 0) {
      setError(false);
    } else {
      setError(true);
    }
  }

  function inputPriceChange(e) {
    if (e > 0 && e.length > 0) {
      serErrorPrice(false);
    } else {
      serErrorPrice(true);
    }
  }
  // destructure
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <>
      <div className="ml-3">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control text-light"
              value={title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              className="form-control text-light"
              value={description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control text-light"
              value={price}
              onChange={(e) => {
                handleChange(e);
                inputPriceChange(e.target.value);
              }}
            />
            {errorPrice === false ? (
              ""
            ) : (
              <Alert
                style={{
                  marginLeft: "350px",
                  float: "right",
                  width: "100%",
                }}
              >
                Enter Valid Price
              </Alert>
            )}
          </div>

          <div className="form-group">
            <label>Shipping</label>
            <select
              style={{ color: "black" }}
              value={shipping === "Yes" ? "Yes" : "No"}
              name="shipping"
              className="form-control"
              onChange={handleChange}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control text-light"
              value={quantity}
              onChange={(e) => {
                handleChange(e);
                inputQtyChange(e.target.value);
              }}
            />
        {error === false ? (
                      ""
                    ) : (
                      <Alert
                        style={{
                          marginLeft: "350px",
                          float: "right",
                          width: "100%",
                        }}
                      >
                        Enter Valid Quantitity
                      </Alert>
                    )}
          </div>

          <div className="form-group">
            <label>Color</label>
            <select
              style={{ color: "black" }}
              value={color}
              name="color"
              className="form-control"
              onChange={handleChange}
            >
              {colors.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Brand</label>
            <select
              style={{ color: "black" }}
              value={brand}
              name="brand"
              className="form-control"
              onChange={handleChange}
            >
              {br.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              style={{ color: "black" }}
              name="category"
              className="form-control"
              onChange={handleCategoryChange}
              value={selectedCategory ? selectedCategory : category._id}
            >
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label> Sub Categories</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please Select"
              value={arrayOfSubs}
              onChange={(value) => setArrayOfSubs(value)}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>

          <br />
          <button className="btn btn-outline-info">Save</button>
        </form>
      </div>
    </>
  );
};

export default ProductUpdateForm;
