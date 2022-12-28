import React from "react";
import { useParams } from "react-router-dom";


const BrandForm =({handleSubmit,name,setName})=>{

const params = useParams()

  return(  <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className='form-control'
                placeholder={params.slug}
                onChange={e => setName(e.target.value)}  autoFocus required/>
                <br />
                <button className='btn btn-outline-primary'>Save</button>
            </div>
        </form>
        )
}

export default BrandForm;