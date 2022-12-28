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

import "./activateduser.css"

const UserActivated=()=>{

    const {user}=useSelector((state)=>({...state}));
  const navigate=useNavigate();
    const [id,setId]=useState("");
    // console.log(user)

    

      const [users,setUsers]= useState([]);
      // const {name}=users;
  
      useEffect(()=>{
        loadUsers();
  
      },[]);

      
      const loadUsers=()=>{
        getUsers().then((u)=>{
          setUsers(u.data)
          // console.log(u.data.role)
        })
      }

      const activeuser=users.filter(item=>{
        return item.role==="subscriber" && item.activated===true;
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
                
                { activeuser && activeuser.length > 0 && activeuser.map(u=>(
                    <div className="col-md-3 pb-2 float-left">
                            <Card sx={{ maxWidth: 345,bgcolor:"#aaaaaa",marginTop:"1px" ,color:"white"}}>
                    <CardContent >
                    <Typography className="typography-user-activated">
                        <strong>
                        id:  #{u._id}
                        </strong>
                    </Typography>
                    <Typography  className="typography-user-activated">
                        User Name :  {u.name}
                    </Typography>
                    <Typography  className="typography-user-activated">
                        Active/Diactivate:  Activate
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button className="button-activated-user" onClick={()=>handleClick(u.email,u._id)} variant="contained" sx={{bgcolor: '#a51414'}} >Deactivate</Button>
                    </CardActions>
                    </Card> 
                    </div>
                ))}
            </div>

        
        </>
    )
}

export default UserActivated;

// 





  

