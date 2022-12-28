const express=require("express");
const router=express.Router();
const {ReqReturn, findesellerReturn, Approvedupdate, Rejectdupdate, createpaymentHistory, findpaymentHistory, returnpayment, PaymentHistroy} = require("../controllers/Return");

const {authCheck, adminCheck} = require("../middlewares/auth")

router.post("/return",ReqReturn);
router.post("/return/:id",findesellerReturn);
router.put("/return/approve/:id",Approvedupdate);
router.put("/return/reject/:id",Rejectdupdate);
router.put("/return/payment/history",createpaymentHistory);
router.put("/return/payment/history/:id",findpaymentHistory);
router.put("/return/payment/:id",returnpayment);
router.put("/return/paymentHistory/:id",PaymentHistroy);


module.exports=router;
