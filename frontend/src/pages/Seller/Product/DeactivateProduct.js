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


const DeActivateProduct=()=>{

    const [sellerProducts,setSellerProducts]=useState([]);
    
    useEffect(()=>{
        loadAllProducts()
    },[])

 const handleClick = async (id,seller)=>{
    await activateProduct(id,seller)
    window.location.reload()

    
 }

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
    return item.activated===false && item.approved === true && item.rejected === false;
  })

    return(
        <>
            <div className="container-fluid">
                {/* {JSON.stringify()} */}
                { activeproduct && activeproduct.length > 0 && activeproduct.map(u=>(
                    <div className="col-md-3 pb-2 float-left">
                            <Card sx={{ maxWidth: 345,bgcolor:"#aaaaaa",marginTop:"1px" ,color:"white"}}>
                    <CardContent >
                    <Typography className="typography-user-activated">
                        <strong>
                        id:  #{u._id}
                        </strong>
                    </Typography>
                    <Typography  className="typography-user-activated">
                    Name :  {u.title.substring(0, 50).concat("...") }
                    </Typography>
                    <Typography  className="typography-user-activated">
                        Stock : {u.quantity}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button className="button-activated-user" onClick={()=>handleClick(u.email,u._id)} variant="contained" color="success" >Activate</Button>
                    </CardActions>
                    </Card> 
                    </div>
                ))}
            </div>

        
        </>
    )
}

export default DeActivateProduct;

// 





  

