import React from "react";

const LocalSearch=({keyword,setKeyword})=>{

     //filter step :3
     const handleSearchChange =async (e) =>{
        e.preventDefault()
        setKeyword(e.target.value.toLowerCase());
    };

    return(
        
             <input 
               style={{width: "20%", color: "white"}}
                type="search" 
                placeholder='Seach here' 
                value={keyword} 
                onChange={handleSearchChange} 
                className='form-control mb-4'
             />
    
    )
}

export default LocalSearch;