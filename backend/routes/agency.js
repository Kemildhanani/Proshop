const express=require("express")
const {orders, statusUpdate} = require("../controllers/agency")

const router=express.Router()

router.get('/agency/orders', orders);
router.put('/seller/updateStatus/:id',statusUpdate)

module.exports=router;