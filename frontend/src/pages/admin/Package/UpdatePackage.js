import React,{useState,useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../Components/sidebar/AdminSidebar/AdminSidebar";
import { getPack, updatePack } from "../../../functions/package";
import '../../../css/CreatePackage.css'
import { Alert, Col, Row } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";


const UpdatePackage = () => {
    
    const navigate=useNavigate();
    const id=useParams();
    const [pack,setPack] = useState([]);

    useEffect(()=>{
        loadPackDetails();
        // console.log("dataataa",pack)
    },[])

    const loadPackDetails = async () =>{
        await getPack(id.slug).then((res)=>{
            setPack(res.data);
        })
    }
    
    const [values, setValues] = useState({
        name: '',
        duration: '',
        products: '',
        price: '',
    });
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        duration: '',
        products: '',
        price: '',
    });
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        let flag = false;
        let nameMessage = ''
        let durationMessage = ''
        let productsMessage = ''
        let priceMessage = ''
        if( values.name === ''){
            nameMessage = 'Title is Required!'
        }
        if( values.duration === ''){
            durationMessage = 'Duration is Required!'
        }
        if( values.products === ''){
            productsMessage = 'Products is Required!'
        }
        if( values.price === ''){
            priceMessage = 'Price is Required!'
        }
        setErrorMessage({ name: nameMessage, duration: durationMessage, products: productsMessage, price: priceMessage})
        // console.log("111111111111111111111",values);
        try{
            updatePack(id.slug,values);
            alert("update Succesfull");
            navigate("/admin/package");

        }
        catch(err){
            console.log("err updatpackage",err);
        }
        
    } 

    const handleChange = (e) => {
        // debugger
        e.preventDefault();
        let { name, value } = e.target;
        if( name === 'duration' || name === 'products' || name === 'price' ){
            value = parseInt(value) || ''
            setValues({ ...values, [name]: value });
        }
        else{
            setValues({ ...values, [name]: value });
        }
    }


    return (
        <>


<div className="poster-dashboard-home">
        <AdminSidebar />
        <div className="poster-dashboard-homeContainer">
          <div className="poster-dashboard-listContainer">
            <h3 className="text-light">Package Update</h3>
            <hr style={{ border: "1px solid gray" }} />
            <form className="ml-3" style={{width: "20%"}} onSubmit={handleSubmit}>
                        <div className='form-group m-0'>
                            <label className="text-light">Package Title</label>
                            <input 
                                style={{color: "white"}}
                                type="text" 
                                name="name" 
                                placeholder={pack.name}
                                className='ml-3 form-control m-0' 
                                value={values.name} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.name !== '' && <div className="errorMessage">{errorMessage.name}</div>}
                            </div>
                        </div>
                        <div className='form-group m-0'>
                            <label className="text-light">Products limit</label>
                            <input 
                                type="text" 
                                placeholder={pack.products}
                                name="products" 
                                className='ml-3 form-control m-0 text-light' 
                                value={values.products} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.products !== '' && <div className="errorMessage">{errorMessage.products}</div>}
                            </div>
                        </div>
                        <div className='form-group m-0'>
                            <label className="text-light">Package Price</label>
                            <input 
                                type="text" 
                                name="price" 
                                className='ml-3 form-control m-0 text-light' 
                                placeholder={pack.price}
                                value={values.price} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.price !== '' && <div className="errorMessage">{errorMessage.price}</div>}
                            </div>
                        </div>
                        
                        <div className='form-group m-0'>
                            <label className="text-light">Package Duration</label>
                            <input 
                                type="text" 
                                name="duration" 
                                className='ml-3 form-control m-0 text-light' 
                                placeholder={pack.duration}
                                value={values.duration} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.duration !== '' && <div className="errorMessage">{errorMessage.duration}</div>}
                            </div>
                        </div>
                        
                    <br/>
                        <button 
                            style={{width: "100%",color: "white"}}
                            className='btn btn-dark' 
                            disabled={values.duration== '' || values.price=='' || values.products=='' || values.name == '' }

                        >Update Package</button>
                    </form>

            {/* <Row className="mt-4">
                    <Col md="6" xl="4" sm="6">
                        <div>
                            <Alert variant="dark" className="text-black">Category Name
                                <span className="float-right text-center">
                                    <Tooltip className="mr-3" title="Edit" color="green">
                                      <Link to="/">
                                        <EditOutlined className="text-success" tooltip="Edit" />
                                      </Link>
                                    </Tooltip>
                                    <Tooltip title="Delete" color="red">
                                      <CloseOutlined   className="text-danger"/>
                                    </Tooltip>
                                </span>
                            </Alert>
                        </div>
                    </Col>
            </Row> */}
        </div>
      </div>
    </div>


            <div className="seller-dashboard-home">
                <AdminSidebar />
                <div className="seller-dashboard-homeContainer">
                    <div className="seller-dashboard-listContainer">
                        <h1 style={{color:"white"}}>Package Update</h1>

                        <form onSubmit={handleSubmit}>
                        <div className='form-group m-0'>
                            <label>Title</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder={pack.name}
                                className='form-control m-0' 
                                value={values.name} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.name !== '' && <div className="errorMessage">{errorMessage.name}</div>}
                            </div>
                        </div>
                        <div className='form-group m-0'>
                            <label>Products</label>
                            <input 
                                type="text" 
                                placeholder={pack.products}
                                name="products" 
                                className='form-control m-0' 
                                value={values.products} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.products !== '' && <div className="errorMessage">{errorMessage.products}</div>}
                            </div>
                        </div>
                        <div className='form-group m-0'>
                            <label>Price</label>
                            <input 
                                type="text" 
                                name="price" 
                                className='form-control m-0' 
                                placeholder={pack.price}
                                value={values.price} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.price !== '' && <div className="errorMessage">{errorMessage.price}</div>}
                            </div>
                        </div>
                        
                        <div className='form-group m-0'>
                            <label>Package Duration</label>
                            <input 
                                type="text" 
                                name="duration" 
                                className='form-control m-0' 
                                placeholder={pack.duration}
                                value={values.duration} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.duration !== '' && <div className="errorMessage">{errorMessage.duration}</div>}
                            </div>
                        </div>
                        
                    <br/>
                        <button 
                            className='btn btn-outline-info' 
                            disabled={values.duration== '' || values.price=='' || values.products=='' || values.name == '' }

                        >Save</button>
                    </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePackage;