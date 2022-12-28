import React,{useState,useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {useNavigate} from "react-router-dom"
import { approveProduct, rejectProduct } from "../../../functions/product";
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useSelector,useDispatch} from "react-redux";
import { color, style } from "@mui/system";
import {getUnapprovedProduct} from "../../../functions/product";


const UnApprovedProduct=()=>{    
      

    const [product,setProducts]=useState([]);

    useEffect(()=>{
        loadProducts();
    },[])

    const loadProducts=()=>{
        getUnapprovedProduct().then((res)=>setProducts(res.data));
    }

    const handleApprove = (id)=>{
        try{
            console.log(id)
            approveProduct(id);
            window.location.reload();
        }
        catch(err){
            console.log("approved err",err)
        }
    }

    const handleReject= (id)=>{
        console.log("Product",id);
        try{
            rejectProduct(id);
            window.location.reload();
        }
        catch(err){
            console.log("rejected err",err);
        }
    }
      


    return(
        <>
            <div className="container-fluid">
                    { product && product.length > 0 && product.map(p=>(
                    <div className="col-md-4 pb-2 float-left">
                <Card sx={{maxHeight: 350, maxWidth: 345,marginTop:"1px" ,color:"white",bgcolor:"#aaaaaa"}}>
                    <CardContent >
                    <Typography className="typography-activated" >
                       <strong key={p._id}>
                        id:  #{p._id}
                       </strong>
                    </Typography>
                    <Typography className="typography-activated">
                        Seller:  {p.Seller}
                    </Typography>
                    <Typography className="typography-activated">
                        Product Name : {" "} {p.title.length > 50 ? p.title.substring(0, 50).concat("...") : p.title}
                        
                        {/* {p.title} */}
                    </Typography>
                    </CardContent>
                    <CardActions sx={{float:"right"}}>
                        {/* <Button
                        className="button-activated"  
                        variant="contained" 
                        sx={{bgcolor: '#a51414' }}>
                           Details
                        </Button> */}
                        
                     <Button 
                     key={p._id}
                        className="button-activated"  
                        variant="contained" 
                        sx={{bgcolor: '#a51414' }}
                        onClick={()=>handleApprove(p._id)} 
                    
                    >Approve</Button>
                     <Button 
                        key={p.Seller} 
                        className="button-activated"  
                        variant="contained" 
                        sx={{bgcolor: '#a51414' }} 
                        onClick={()=>handleReject(p._id)}
                        >Reject</Button>
                    
                    </CardActions>
                    </Card> 
                    </div>
                ))}
            </div>

        
        </>
    )
}

export default UnApprovedProduct;

// 





  

