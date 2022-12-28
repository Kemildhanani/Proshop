import React, { useState } from 'react';
import {Modal} from 'antd';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import {StarOutlined} from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

const RatingsModal =({children})=>{

    
    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible,setmodalVisible]=useState(false);
    let navigate = useNavigate();
    let { slug }= useParams();
    

    //console.log("slug",slug);

    const handleModal =()=>{
        if(user && user.token){
            setmodalVisible(true);
        }else{
            navigate({
               pathname:'/login',
                state:{from :`/product/${ slug}` }
            });

        }
    };

    return(
        <>
            <Tooltip  placement="top" title="Click to give rating">
            <div style={{cursor: "pointer"}} onClick={handleModal}>
                <>
                <StarOutlined style={{color: "#FFA500",fontSize: "20px"}} className='m-0 p-0'/>
                <StarOutlined style={{color: "#FFA500",fontSize: "20px"}} className='m-0 p-0'/>
                <StarOutlined style={{color: "#FFA500",fontSize: "20px"}} className='m-0 p-0'/>
                <StarOutlined style={{color: "#FFA500",fontSize: "20px"}} className='m-0 p-0'/>
                <StarOutlined style={{color: "#FFA500",fontSize: "20px"}} className='m-0 p-0'/>
                <br />
                </>
                {user ?
                <span className=''>
                    <br /> 
                    Rate this product 
                </span> : <span>
                    <br/>
                    Login to rate this product
                </span>}
            </div> 
            </Tooltip>
            <Modal
                title="Leave your ratings"
                centered
                visible={modalVisible}
                onOk={()=>{
                    setmodalVisible(false);
                  toast.success("Thanks for your review.it will apper soon");

                }}
                onCancel={()=>setmodalVisible(false) }
                
                >{children}</Modal>
        </>
    )

}
export default RatingsModal;