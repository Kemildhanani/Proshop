const express=require("express");
const { SendMAil, SendMAilCoupon, SendApproveRequestReturn, SendRejectedRequestReturn, SendCouriarpaymentEmail } = require("../controllers/mail");
const { CreateWallet, getWallet, updateAmt, orderPayment } = require("../controllers/wallet");
const router =express.Router();

//middlewares
const {authCheck, adminCheck}= require("../middlewares/auth")

//controller
router.put('/user/wallet',authCheck,CreateWallet);
router.get('/user/wallet/:id',getWallet);
router.put('/user/wallet/update/:id',updateAmt);
router.put('/user/wallet/order/payment/:id',orderPayment);
/////mail
router.post("/user/couponMail/:email",SendMAilCoupon);
router.post("/user/mail/:email",SendMAil);
router.post("/return/approve/mail/:email",SendApproveRequestReturn)
router.post("/return/reject/mail/:email",SendRejectedRequestReturn)
router.post("/return/couriar/mail/:email",SendCouriarpaymentEmail)

module.exports=router;