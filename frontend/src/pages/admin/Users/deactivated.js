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

import "./deactivateuser.css"

const UserDeactivated=()=>{

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
        getUsers().then((s)=>{
          setUsers(s.data)
          // console.log(u.data.role)
        })
      }

      const activeuser=users.filter(item=>{
        return item.role==="subscriber" && item.activated===false;
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
                
                { activeuser && activeuser.length > 0 && activeuser.map(u=>(
                    <div className="col-md-3 pb-2 float-left">
                  <Card sx={{ maxWidth: 345,bgcolor:"#EEEEEE",marginTop:"1px" ,color:"white",bgcolor:"#aaaaaa"}}>
                    <CardContent >
                    <Typography className="typography-deavtivate" >
                      <strong>
                         id:  #{u._id}
                      </strong>
                    </Typography>
                    <Typography className="typography-deavtivate">
                         Name :  {u.name}
                    </Typography>
                    <Typography className="typography-deavtivate">
                        Active/Deactivate:  Deactivate
                    </Typography>
                    </CardContent>
                    <CardActions className="button-action">
                    <Button onClick={()=>handleClick(u.email,u._id)} variant="contained" color="success" >Activate</Button>
                    </CardActions>
                    </Card> 
                    </div>
                ))}
            </div>

            {/* <div className="container-fluid">
                
                { activeuser && activeuser.length > 0 && activeuser.map(s=>(
                    <div className="col-md-4 pb-2 float-left">
                  <Card sx={{ maxWidth: 345,bgcolor:"#EEEEEE",marginTop:"1px" ,color:"#051367"}}>
                    <CardContent >
                      <Typography className="typography-user-deavtivate">
                          User Id:  {s._id}
                      </Typography>
                      <Typography className="typography-user-deavtivate">
                          User Name :  {s.name}
                      </Typography>
                      <Typography className="typography-user-deavtivate">
                          Active/Deactivate:  Deactivate
                      </Typography>
                      </CardContent>
                      <CardActions>
                      <Button onClick={()=>handleClick(s.email,s._id)} variant="contained" color="success" >Activate</Button>
                    </CardActions>
                  </Card> 
                    </div>
                ))}
            </div> */}

        
        </>
    )
}

export default UserDeactivated;

// 





  

