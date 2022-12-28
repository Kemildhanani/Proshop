const express=require("express")

const router=express.Router()

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");



const {
    orders, 
    orderStatus,
    listusers, 
    deactivateUser,
    activateUser,
    finduser,
    orderschedule,
    ordersIncome,
    ordersLatest,} = require('../controllers/admin')
    //controller
    const {
        
        
    } = require("../controllers/admin");
    const { getuserDashboard,getsellerDashboard } = require("../controllers/users");
const { PackageIncomes } = require("../controllers/package");

//routes
router.get('/admin/orders',authCheck, orders);
router.put('/admin/order-status', orderStatus);
router.put('/admin/order-schedule', orderschedule);
router.put('/admin/sellercount', getsellerDashboard);
router.put('/admin/usercount', getuserDashboard);
router.put('/admin/packageIncome', PackageIncomes);
router.put('/admin/OrdersIncome',ordersIncome)
router.put('/admin/ordersLatest',ordersLatest)
//users
router.get('/users',listusers);
router.put('/admin/deactivate/:id',authCheck,adminCheck,deactivateUser);
router.put('/admin/activate/:id',authCheck,adminCheck,activateUser);
router.get('/admin/user/:email',finduser);



module.exports = router;