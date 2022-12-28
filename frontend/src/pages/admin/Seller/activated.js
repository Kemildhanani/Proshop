import React,{useState,useEffect} from "react";
import {deactivateUser} from "../../../functions/users"
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

import "./activeseller.css"

const SellerActivated=()=>{

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
        return item.role==="seller" && item.activated===true;
      })

      const handleClick=(email,id)=>{
          debugger
          setId(id);
        deactivateUser(id,user.token);
        alert(`User Email Is:${email} Diactivated`);
        window.location.reload();
      }

      
      


    return(
        <>
            <div className="container-fluid">
                
                { activeuser && activeuser.length > 0 && activeuser.map(s=>(
                    <div className="col-md-3   pb-2 float-left">
                <Card sx={{ maxWidth: 345,marginTop:"1px" ,color:"white",bgcolor:"#aaaaaa"}}>
                    <CardContent >
                    <Typography className="typography-activated" >
                       <strong>
                        id:  #{s._id}
                       </strong>
                    </Typography>
                    <Typography className="typography-activated">
                        Seller Name :  {s.name}
                    </Typography>
                    <Typography className="typography-activated">
                        Email: {s.email}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button className="button-activated" onClick={()=>handleClick(s.email,s._id)} variant="contained" sx={{bgcolor: '#a51414'}} >Deactivate</Button>
                    </CardActions>
                    </Card> 
                    </div>
                ))}
            </div>

        
        </>
    )
}

export default SellerActivated;

// 





  

