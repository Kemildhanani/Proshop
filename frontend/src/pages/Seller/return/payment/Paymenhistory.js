import React,{useEffect,useState} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { PaymentHistoryies, ReqReturnFind } from '../../../../functions/return';
import { getWallet } from '../../../../functions/Wallet';
import { useNavigate } from 'react-router-dom';
import { getorderDetails, getorderDetailsbyid } from '../../../../functions/User';
import { getproductbyid } from '../../../../functions/product';


const PaymentHistory = () => {

    const [returnproduct, setReturn] = useState([])
   const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate()

    useEffect(()=>{
        load();
    },[])

    function load(){
        PaymentHistoryies(user._id).then(res=>{
            setReturn(res.data)
        })
    }

    
    return (
    <>
            {/* {JSON.stringify(returnproduct)} */}
        {returnproduct && returnproduct.map((p) => (
            <>

                <Card sx={{ maxWidth: 345, height: 210, float: "left", marginLeft: 5, marginTop: 3 }}>



                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Return-Id:{p._id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Order-Details-id:{p.orderDetails}
                            <br>
                            </br>
                            Buyer_Email:{p.buyer_email}
                            <br></br>
                            Amount :{p.paymentIntent !== undefined  ? p.paymentIntent.amount/100:p.amt}<br></br>

                        </Typography>
                    </CardContent>
                    <CardActions>
                       
                    </CardActions>
                </Card>

            </>
        ))}

    </>
    )
}

export default PaymentHistory;