import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import LocalSearch from "../../../Components/Forms/LocalSearch";
import CategoryForm from "../../../Components/Forms/CategoryForms";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
import { Alert, Col, Row } from 'react-bootstrap'

import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import "./createcategory.css";
import { Tooltip } from "@mui/material";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //step1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        // console.log(res.data.name);
        loadCategories();
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
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.data === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  //filter //step 4

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <>
      <div className="poster-dashboard-home">
        <AdminSidebar />
        <div className="poster-dashboard-homeContainer">
          <div className="poster-dashboard-listContainer">
            <h3 className="text-light">Create Category</h3>
            <hr style={{ border: "1px solid gray" }} />
            <div className="ml-3">
              <label className="text-white">Enter Category Name</label>
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
              </div>
            <LocalSearch  keyword={keyword} setKeyword={setKeyword} />
              <hr style={{ border: "1px solid gray" }} />

            <Row className="mt-4">
            {categories.filter(searched(keyword)).map((c) => (
                    <Col key={c._id} md="6" xl="4" sm="6">
                        <div>
                            <Alert variant="dark" className="text-black">{c.name}
                                <span className="float-right text-center">
                                    <Tooltip className="mr-3" title="Edit" color="green">
                                      <Link to={`/admin/category/${c.slug}`}>
                                        <EditOutlined className="text-success" tooltip="Edit" />
                                      </Link>
                                    </Tooltip>
                                    <Tooltip title="Delete" color="red">
                                      <CloseOutlined  onClick={() => handleRemove(c.slug)} className="text-danger"/>
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

export default CategoryCreate;
