import React from "react";
import { useParams } from "react-router-dom";


const CategoryForm =({handleSubmit,name,setName})=>{

const params = useParams()

  return(  
    <form style={{width: "20%"}} onSubmit={handleSubmit}>
            <div className="ml-3 form-group">
                <input type="text" style={{ color : "white"}} className='form-control'
                placeholder="Enter Name"
                onChange={e => setName(e.target.value)}  autoFocus required/>
                <br />
                <button style={{width: "100%",color: "white"}} className='btn btn-dark'>Save</button>
            </div>
        </form>
        )
}

export default CategoryForm;