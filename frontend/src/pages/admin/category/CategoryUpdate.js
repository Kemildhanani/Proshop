import React, {useState, useEffect} from 'react';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import {getCategory,updateCategory} from '../../../functions/category'
import { useParams, useNavigate } from 'react-router-dom';
import CategoryUpdateForms from '../../../Components/Forms/CategoryUpdateForms';
import AdminSidebar from '../../../Components/sidebar/AdminSidebar/AdminSidebar';
// import {useMatch} from 'react-router-dom'
import  "./createcategory.css";

const CategoryUpdate = () => {

    let params = useParams()
    let navigate = useNavigate();
    // const location = useLocation()
    // let match = useMatch()

    const {user} = useSelector(state => ({...state}));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadCategory();
        // console.log(params.slug);
    }, []);

    const loadCategory = () => 
    getCategory(params.slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault(); 
        // console.log(name);
        setLoading(true)
        updateCategory(params.slug, {name}, user.token)
        .then((res) => {
            // console.log(res);
            setLoading(false);
            setName("");
            toast.success(`"${res.data.name}" is updated`);
            navigate('/admin/category')
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
    <>
    <div className="poster-dashboard-home">
    <AdminSidebar />
    <div className="poster-dashboard-homeContainer">
      <div className="poster-dashboard-listContainer">
        <h3 style={{color: "white"}}>Update Category</h3>
        <hr style={{ border: "1px solid gray" }} />
        <CategoryUpdateForms handleSubmit={handleSubmit} name={name} setName={setName} />
      </div>
    </div>
  </div>
</>
  );
};

export default CategoryUpdate;
