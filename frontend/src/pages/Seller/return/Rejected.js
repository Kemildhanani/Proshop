import React, { useEffect, useState } from 'react'
import SellerSidebar from '../../../Components/sidebar/SellerSidebar/SellerSidebar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { approveReturn, rejectREturn, ReqReturnFind } from '../../../functions/return';
// import { SendApproveRequestReturn } from '../../../../../backend/controllers/mail';
import { SendApproveReqReturn, SendRejectReqReturn } from '../../../functions/Wallet';


const Rejected =()=>{

    const [returnproduct,setReturn] = useState([])
    const user = useSelector((state) => state.user);
  
    useEffect(()=>{
      loadReturn();
    },[])
  
      function loadReturn () {
          ReqReturnFind(user._id).then(res=>{
              setReturn(res.data)
          });
  
      }

      const handleClick= async (id,buyer)=>{
        await approveReturn(id);
        // SendApproveRequestReturn(buyer)
        SendApproveReqReturn(buyer,id)
        loadReturn()    }

    const retu = returnproduct.filter(items=>{
        return items.approve == false
    })


    return (<>
        {retu && retu.map((p)=>(
            <>

        <Card sx={{ maxWidth: 345,height:210,float:"left",marginLeft:5,marginTop:3}}>

        
            
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    Return-Id:{p._id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Order-Details-id:{p.orderDetail_id }
                  <br>
                  </br>
                  Buyer_Email:{p.buyer_email}
                  {/* User-Id:{} */}
                  <br></br>
                  Product :{p.product.slice(0,20)}...<br></br>

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant='contained' onClick={()=>handleClick(p._id,p.buyer_email)}>Approve</Button>
                {/* <Button size="small" onClick={()=>rejectHanlde(p._id,p.buyer_email)}>Reject</Button> */}
            </CardActions>
        </Card>

            </>
        ))}
    </>)

}

export default Rejected;