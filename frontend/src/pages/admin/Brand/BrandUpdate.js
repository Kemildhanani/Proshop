import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getBrands, updateBrand } from "../../../functions/brand";
import { useParams, useNavigate } from "react-router-dom";
import BrandUpdateForm from "../../../Components/Forms/BrandUpdateForm";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
// import CategoryUpdateForms from '../../../Components/Forms/CategoryUpdateForms';
// import Brand

const BrandUpdate = () => {
  let params = useParams();
  let navigate = useNavigate();
  // const location = useLocation()
  // let match = useMatch()

  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBrand();
    // console.log(params.slug);
  }, []);

  const loadBrand = () =>
    getBrands(params.slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateBrand(params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        navigate("/admin/brand");
        // console.log(res.data.name);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        console.log(err.response.data);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="category-dashboard-home">
      <AdminSidebar />
      <div className="category-dashboard-homeContainer">
          <BrandUpdateForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
      </div>
    </div>
    //   </div>

    // <div className='container-fluid'>
    //         <div className="row">
    //             <div className="">
    //                 <AdminSidebar/>
    //             </div>
    //             <div className="col">
    //                 {loading? <h4 className='text-danger'>Loading...</h4> : <h4>Update brand</h4> }
    //                 <BrandUpdateForm
    //                     handleSubmit={handleSubmit}
    //                     name={name}
    //                     setName={setName}
    //                 />
    //                 <hr/>

    //             </div>
    //         </div>
    //     </div>
  );
};

export default BrandUpdate;
