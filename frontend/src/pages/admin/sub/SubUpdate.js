import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";

import "./subcreate.css";
import SubCreateForm from "../../../Components/Forms/SubCreateForm";
import CategoryForm from "../../../Components/Forms/CategoryForms";

const SubUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  let params = useParams();
  let navigate = useNavigate();
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () =>
    getSub(params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateSub(params.slug, { name, parent }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        navigate("/admin/sub");
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        console.log(err.response.data);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <>
      <div className="subcategory-dashboard-home">
        <AdminSidebar />
        <div className="subcategory-dashboard-homeContainer">
          <div className="subcategory-dashboard-listContainer">
            {/* <subcategoryHeader /> */}
            <h3 style={{ color: "white" }}>Update Sub-Category</h3>
            <hr style={{ border: "1px solid gray" }} />
            <label style={{ color: "white" }}>Select Category</label>
            <select
              style={{ color: "black", width: "19%" }}
              name="category"
              className="ml-3 form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
            <div className="mt-3">
              <SubCreateForm
                style={{ width: "20%" }}
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubUpdate;
