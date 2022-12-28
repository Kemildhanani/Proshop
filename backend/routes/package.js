const express=require("express");
const router =express.Router();

//middlewares
const {authCheck, adminCheck}= require("../middlewares/auth")

//controller
const{createPackage, getPackages, getPack, removepack, updatPackage} = require("../controllers/package");

//router
router.post('/admin/package',createPackage)
router.get('/admin/getpackage',getPackages);
router.get('/getpack/:id',getPack);
router.post('/pack/remove/:id',removepack);
router.post('/pack/update/:id',updatPackage);


module.exports=router;