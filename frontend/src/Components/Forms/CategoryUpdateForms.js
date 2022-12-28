import React from "react";
import { useParams } from "react-router-dom";


const CategoryUpdateForms=({name,setName,handleSubmit})=>{
    const params=useParams()
    return(
        <form style={{width: "20%"}} onSubmit={handleSubmit}>
            <div className="ml-3 form-group">
                <label style={{color: "white"}}>Enter new name</label>
                <input style={{color: "white"}} type="text" className='form-control' onChange={e =>  setName(e.target.value)}  placeholder={params.slug} autoFocus required/>
                <br />
                <button style={{color: "white"}} className='btn btn-dark'>Save</button>
            </div>
        </form>
    )
}

export default CategoryUpdateForms;