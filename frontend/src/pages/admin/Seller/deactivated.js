import React,{useState,useEffect} from "react";
import {activateUser, deactivateUser} from "../../../functions/users"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { getUsers } from "../../../functions/users";
import {useNavigate} from "react-router-dom" 
 
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useSelector,useDispatch} from "react-redux";
import { color, style } from "@mui/system";

import "./deactivateseller.css"

const SellerDeactivated=()=>{

    const {user}=useSelector((state)=>({...state}));
  const navigate=useNavigate();
    const [id,setId]=useState("");
    // console.log(user)

    

      const [seller,setSeller]= useState([]);
      // const {name}=users;
  
      useEffect(()=>{
        loadSellers();
  
      },[]);

      
      const loadSellers=()=>{
        getUsers().then((s)=>{
          setSeller(s.data)
          // console.log(u.data.role)
        })
      }

      const activeuser=seller.filter(item=>{
        return item.role==="seller" && item.activated===false;
      })

      const handleClick=(email,id)=>{
          debugger
          setId(id);
        activateUser(id,user.token);
        alert(`User Email Is:${email} Activated`);
        window.location.reload();
      }

      
      


    return(
        <>
            <div className="container-fluid">
                
                { activeuser && activeuser.length > 0 && activeuser.map(s=>(
                    <div className="col-md-4 pb-2 float-left">
                  <Card sx={{ maxWidth: 345,bgcolor:"#EEEEEE",marginTop:"1px" ,color:"white",bgcolor:"#aaaaaa"}}>
                    <CardContent >
                    <Typography className="typography-deavtivate" >
                      <strong>
                         id:  #{s._id}
                      </strong>
                    </Typography>
                    <Typography className="typography-deavtivate">
                        Seller Name :  {s.name}
                    </Typography>
                    <Typography className="typography-deavtivate">
                        Active/Deactivate:  Deactivate
                    </Typography>
                    </CardContent>
                    <CardActions className="button-action">
                    <Button onClick={()=>handleClick(s.email,s._id)} variant="contained" color="success" >Activate</Button>
                    </CardActions>
                    </Card> 
                    </div>
                ))}
            </div>

        
        </>
    )
}

export default SellerDeactivated;

// 





  

