const express=require("express")

const router=express.Router()

//middlewares
const { authCheck } = require("../middlewares/auth");
//controllers
const { userCart , 
    getUserCart,
    emptyCart,
    saveAddress, 
    applyCouponToUserCart,
    createOrder,
    orders, 
    findorders,
    findordersDetails,
    getorderDetailsusinOrder,
    getorderDetails
} = require("../controllers/user");
const { getuser } = require("../controllers/users");
const { addToWishlist, getWishlist, removeWishlist, getuserwishlist } = require("../controllers/wishlist");
 
router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);//get cart
router.delete("/user/cart",authCheck,emptyCart);
router.post("/user/address",authCheck,saveAddress);

router.get("/user/orderProducts/:id",findordersDetails )
router.post('/user/order',authCheck,createOrder);
router.get('/user/orders', authCheck,orders)
router.get('/user/order/:id',findorders);
router.get('/user/:id',getuser);
router.put('/user/wishlist/add', authCheck, addToWishlist)
router.get('/user/getwishlistlist/:id', getuserwishlist)
router.put('/user/wishlist/:id', authCheck, removeWishlist)
router.post('/user/get/orderdetails',getorderDetailsusinOrder)
router.put('/user/get/orderdetails/:id',getorderDetails)
// getorderDetailsusinOrder

// coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);
//router.post('/user/cart ', authCheck , userCart );//save cart 

// router.get("/user",(req,res)=>{
//     res.json({
//         data:"hey you hit USER API",   
//     })
// })

module.exports=router;