const express=require("express")
const {createSeller, packagePayment, updateSellerPackage, sellerProduct, findorder, statusUpdate, scheduleUpdate} = require("../controllers/seller")
const {authCheck, adminCheck} = require("../middlewares/auth")

const router=express.Router();



router.post('/seller/verify', createSeller)
router.post('/package/payment',packagePayment)
router.put('/seller/renew/:id',updateSellerPackage);
router.put('/seller/product/:id',sellerProduct);
router.get('/seller/orders/:id',findorder);
router.put('/seller/updateStatus/:id',statusUpdate)
router.put('/seller/updateSchedule/:id',scheduleUpdate)


module.exports=router;
