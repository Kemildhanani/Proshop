import React from "react";
import { useParams } from "react-router-dom";


const BrandUpdateForm=({name,setName,handleSubmit})=>{
    const params=useParams()
    return(


        <div className="poster-dashboard-home">
        <div className="poster-dashboard-homeContainer">
          <div className="poster-dashboard-listContainer">
            <h3 style={{color: "white"}}>Update Brand Name</h3>
            <hr style={{ border: "1px solid gray" }} />
            <form style={{width: "20%"}} className="ml-3" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-light">Brand Name</label>
                <input type="text" className='form-control' onChange={e => 
                    setName(e.target.value)} 
                    placeholder={params.slug}
                    autoFocus 
                    required
                    style={{color: "white"}}
                />
                <br />
                <button style={{width: "100%", color: "white"}} className='btn btn-dark'>Save</button>
            </div>
        </form>
          </div>
        </div>
      </div>

       
    )
}

export default BrandUpdateForm;