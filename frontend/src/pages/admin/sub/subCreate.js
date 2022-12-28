import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../../functions/category";
import { createSub, removeSub, getSubs } from "../../../functions/sub";
import LocalSearch from "../../../Components/Forms/LocalSearch";
import SubCreateForm from "../../../Components/Forms/SubCreateForm";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";

import "./subcreate.css";
import { Alert, Col, Row } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const SubCreate = () => {
  let navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  //step1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        // console.log(res.data.name);
        loadSubs();
        //window.location.reload();
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        console.log(err.response.data);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?")
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.data === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
      // navigate("/admin/sub");
    }
  };

  //filter //step 4

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <>
      <div className="subcategory-dashboard-home">
        <AdminSidebar />
        <div className="subcategory-dashboard-homeContainer">
          <div className="subcategory-dashboard-listContainer">
            {/* <subcategoryHeader /> */}
            <h3 className="text-light">Create Sub Category</h3>
            <hr style={{ border: "1px solid gray" }} />
              <div className="form-group">
                <label style={{color: "white"}}>Select Category</label>
                <select
                style={{width: "20%",color: "black"}}
                  name="category"
                  className="ml-3 form-control"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Please select</option>
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              <label style={{color: "white"}}>Enter Sub Category Name</label>
              <SubCreateForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
              />
              {/* ste :2 && step 3 */}
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
              <hr style={{ border: "1px solid gray" }} />
              <Row className="mt-4">
                {subs.filter(searched(keyword)).map((c) => (
                  <Col key={c._id} md="6" xl="4" sm="6">
                    <div>
                      <Alert variant="dark" className="text-black">
                        {c.name}
                        <span className="float-right text-center">
                          <Tooltip className="mr-3" title="Edit" color="green">
                            <Link to={`/admin/sub/${c.slug}`}>
                              <EditOutlined
                                className="text-success"
                                tooltip="Edit"
                              />
                            </Link>
                          </Tooltip>
                          <Tooltip title="Delete" color="red">
                            <CloseOutlined
                              onClick={() => handleRemove(c.slug)}
                              className="text-danger"
                            />
                          </Tooltip>
                        </span>
                      </Alert>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
    </>
  );
};

export default SubCreate;