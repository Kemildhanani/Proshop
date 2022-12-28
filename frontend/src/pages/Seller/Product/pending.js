import React,{useState,useEffect} from "react";
import {deactivateUser} from "../../../functions/users"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {useNavigate} from "react-router-dom"
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useSelector,useDispatch} from "react-redux";
import { color, style } from "@mui/system";
import { activateProduct, SellerProduct} from "../../../functions/product";


const ForApprovel=()=>{

    const [sellerProducts,setSellerProducts]=useState([]);
    
    useEffect(()=>{
        loadAllProducts()
    },[])


 const loadAllProducts=()=>{
     try {
        const userId = window.localStorage.getItem("User Id")
         SellerProduct(userId).then((res)=>{
             setSellerProducts(res.data);
         })

     }
     catch(err){
        console.log("Error",err);
     }
 }

 const activeproduct=sellerProducts.filter(item=>{
    return item.approved === false && item.rejected===false;
  })

    return(
        <>
            <div className="container-fluid">
                { activeproduct && activeproduct.length > 0 && activeproduct.map(u=>(
                    <div className="col-md-3  pb-2 float-left">
                            <Card sx={{ maxWidth: 345,bgcolor:"#aaaaaa",marginTop:"1px" ,color:"white"}}>
                    <CardContent >
                    <Typography className="typography-user-activated">
                        <strong>
                        id:  #{u._id}
                        </strong>
                    </Typography>
                    <Typography  className="typography-user-activated">
                         Name :  {u.title}
                    </Typography>
                    <Typography  className="typography-user-activated">
                        Stock : {u.quantity}
                    </Typography>
                    <Typography>
                        Approval is being in Proccess
                    </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                    </Card> 
                    </div>
                ))}
            </div>

        
        </>
    )
}

export default ForApprovel;

// 





  

