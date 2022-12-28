// import React, { useEffect, useState } from 'react';
// import {useNavigate, useParams} from 'react-router-dom';
// import {useDispatch, useSelector} from 'react-redux';
// import {SearchOutlined} from '@ant-design/icons';

// const Search = () =>{

//     let dispatch=useDispatch();
//     const {search} = useSelector((state)=>({...state}));
//     const {text}=search;


//     const navigate=useNavigate();
//     const handleChange=(e)=>{
//         dispatch({
//             type:"SEARCH_QUERY",
//             payload:{text:e.target.value},
//         })
//     }

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         navigate(`/shop?${text}`)
//     }

//     return(
//         <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
//             <input type="search" 
//                 value={text} 
//                 className="form-control mr-sm-2"
//                 onChange={handleChange}
//                 autoFocus
//                 style={{color:"white"}}
//                 placeholder='Search "products"'/>
//             <SearchOutlined onClick={handleSubmit} style={{color:"white", cursor:"pointer"}} />    
//         </form>
//     )
// }

// export default Search

import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {SearchOutlined} from '@ant-design/icons';

const Search = () =>{

    let dispatch=useDispatch();
    const {search} = useSelector((state)=>({...state}));
    const {text}=search;
    

    const navigate=useNavigate();
    const handleChange=(e)=>{
        dispatch({
            type:"SEARCH_QUERY",
            payload:{text:e.target.value},
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate(`/shop?${text}`)
    }

    return(
        <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
            <input type="search" 
                value={text} 
                className="form-control mr-sm-2"
                onChange={handleChange}
                autoFocus
                style={{color:"white"}}
                placeholder='Search "products"'/>
            <SearchOutlined onClick={handleSubmit} style={{color:"white", cursor:"pointer"}} />    
        </form>
    )
}

export default Search