const express=require("express");
const { packagePayment } = require("../controllers/stripe");

const router=express.Router();
const {authCheck, adminCheck} = require("../middlewares/auth")



module.exports=router;
