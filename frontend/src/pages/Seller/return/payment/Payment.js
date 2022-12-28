import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { createpaymenthistory, ReqReturnFind, returnpayment } from '../../../../functions/return';
import { getWallet, SendCouriarReturn } from '../../../../functions/Wallet';
import { useNavigate } from 'react-router-dom';
import { getorderDetails, getorderDetailsbyid } from '../../../../functions/User';
import { getproductbyid } from '../../../../functions/product';
import { getUserDetails } from '../../../../functions/users';
// import { SendCouriarpaymentEmail } from '../../../../functions/Wallet'

function Payment() {

  const [returnproduct, setReturn] = useState([])
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    loadReturn();
  }, [])

  function loadReturn() {
    ReqReturnFind(user._id).then(res => {
      setReturn(res.data)
    });

  }

  const retu = returnproduct.filter(items => {
    return items.approve === true && items.returnPayment === false;
  })

  const HandleCheck = (rid, id, oid, pid) => {
    // alert(id)
    getWallet(id).then(res => {
      if (res.data == undefined) {
        alert("User Wallet is not activate")
      }
      else {
        // alert("sent")
        // alert(id)
        getorderDetailsbyid(oid).then(re => {
          // console.log("1111111111111111111111111111111",re.data)
          if (re.data.paymentIntent == undefined) {
            getproductbyid(re.data.product).then(r => {
              const temp = r.data.price * re.data.qty
              window.localStorage.setItem("returnamt", temp)
              localStorage.setItem("buyer", id)
              localStorage.setItem("orderdetails", oid)
              localStorage.setItem("return", rid)

            })
          }
          else {

            getproductbyid(re.data.product).then(r => {
              const temp = r.data.price * re.data.qty
              // window.localStorage.setItem("returnamt",temp)
              window.localStorage.setItem("returnamt", temp);
              localStorage.setItem("buyer", id)
              localStorage.setItem("orderdetails", oid)
              localStorage.setItem("return", rid)


            });

          }
        })
        setTimeout(function () {
          // ...
          navigate("/seller/return/Payment")

        }, 1000);
        // setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](3000)
      }
    })
  }

  const HandleCouriar = async (rid, id, oid, pid) => {
    getorderDetailsbyid(oid).then(res=>{
      // if(res.data.paymentIntent == undefined){
        getUserDetails(id).then(re=>{
          getproductbyid(res.data.product).then(r=>{

            const Data = {
              amt: r.data.price*res.data.qty,
              seller: user._id,
              user: id,
              orderDetails:oid,
              buyer_email: re.data.email,
              rid
            }
            createpaymenthistory(Data)
            // returnPayment()
            returnpayment(rid);
            loadReturn()
            SendCouriarReturn(re.data.email,Data);
          })
        });
      // }
      // else{
      //   getUserDetails(id).then(re=>{
          
      //     const Data = {
      //       paymentIntent:res.data.paymentIntent,
      //       seller: user._id,
      //       user: id,
      //       orderDetails:oid,
      //       buyer_email: re.data.email
      //     }
      //     createpaymenthistory(Data);
      //     returnpayment(rid);
      //     loadReturn();
      //   })
      // }
    })
  }
  return (
    <>
      {retu && retu.map((p) => (
        <>

          <Card sx={{ maxWidth: 345, height: 210, float: "left", marginLeft: 5, marginTop: 3 }}>



            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Return-Id:{p._id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order-Details-id:{p.orderDetail_id}
                <br>
                </br>
                Buyer_Email:{p.buyer_email}
                {/* User-Id:{} */}
                <br></br>
                Product :{p.product.slice(0, 20)}...<br></br>

              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant='contained' onClick={() => HandleCheck(p._id, p.user, p.orderDetail_id, p.product)}>Send To Wallet</Button>
              <Button size="small" onClick={() => HandleCouriar(p._id, p.user, p.orderDetail_id, p.product)}>Couriar Payment</Button>
            </CardActions>
          </Card>

        </>
      ))}

    </>
  )
}

export default Payment