import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import {createCategory, getCategories, removeCategory} from '../../../functions/category';
import { createBrand, getBrands, removeBrand } from "../../../functions/brand";
import LocalSearch from "../../../Components/Forms/LocalSearch";
import CategoryForm from "../../../Components/Forms/CategoryForms";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
import { Alert, Col, Row } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const BrandCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [brands, setBrand] = useState([]);

  //step1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = () => getBrands().then((c) => setBrand(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createBrand({ name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        // console.log(res.data.name);
        loadBrands();
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
      removeBrand(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadBrands();
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
    <div className="category-dashboard-home">
      <AdminSidebar />
      <div className="category-dashboard-homeContainer">
        <div className="category-dashboard-listContainer">
          {/* <SellerHeader /> */}
              <h3 style={{color: "white"}}>Create Brand</h3>
              <hr style={{ border: "1px solid gray" }} />
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            {/* ste :2 && step 3 */}
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

              <hr style={{ border: "1px solid gray" }} />
            {/* filter Step :5 */}
            <Row className="mt-4">
            {brands.filter(searched(keyword)).map((c) => (
                    <Col key={c._id} md="6" xl="4" sm="6">
                        <div>
                            <Alert variant="dark" className="text-black">{c.name}
                                <span className="float-right text-center">
                                    <Tooltip className="mr-3" title="Edit" color="green">
                                      <Link to={`/admin/brand/${c.slug}`}>
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

    // <div className='container-fluid'>
    //         <div className="row">
    //             <div className="">
    //                 <AdminSidebar/>
    //             </div>
    //             <div className="col">
    //                 {loading? <h4 className='text-danger'>Loading...</h4> : <h4>Create Brand</h4> }
    //                 <CategoryForm
    //                     handleSubmit={handleSubmit}
    //                     name={name}
    //                     setName={setName}
    //                 />

    //                   {/* ste :2 && step 3 */}
    //                     <LocalSearch
    //                         keyword={keyword}
    //                         setKeyword={setKeyword}
    //                     />

    //                 {/* filter Step :5 */}
    //                 {brands.filter(searched(keyword)).map((c) => (
    //                 <div className='alert alert-secondary' key={c._id} >
    //                     {c.name}
    //                     <span onClick={() => handleRemove(c.slug)} className='btn btn-sml float-right text-danger'>
    //                         Delete
    //                     </span>
    //                      <Link to={`/admin/brand/${c.slug}`}>
    //                          <span className='btn btn-sml float-right text-warning editspan'>
    //                          Edit
    //                          </span>
    //                     </Link>
    //                 </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
  );
};

export default BrandCreate;
