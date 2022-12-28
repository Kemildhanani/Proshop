import React from "react";
import {Select} from "antd"
// import '../'

const {Option} =Select;

const PackageCreateForm = (props) => {
    const { handleSubmit, handleChange, values, errorMessage } = props
return(
        <form style={{width: "20%"}} onSubmit={handleSubmit}>
                        <div className='form-group m-0'>
                            <label className="text-light">Package Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                className='ml-3 form-control m-0 text-light' 
                                value={values.name} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.name !== '' && <div className="errorMessage">{errorMessage.name}</div>}
                            </div>
                        </div>
                        <div className='form-group m-0'>
                            <label className="text-light">Product Upload Limit</label>
                            <input 
                                type="text" 
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
                                value={values.duration} 
                                onChange={handleChange} 
                            />
                            <div className="errorMain">
                                {errorMessage.duration !== '' && <div className="errorMessage">{errorMessage.duration}</div>}
                            </div>
                        </div>
                        
                    <br/>
                        <button 
                            style={{width: "100%", color: "white"}}
                            className='btn btn-dark' 
                            disabled={values.duration== '' || values.price=='' || values.products=='' || values.name == '' }
                        >
                            Create Package
                            </button>
                    </form>
        )

};
export default PackageCreateForm;