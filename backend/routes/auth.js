const express=require("express")
//imoprt controller
const {createOrUpdateUser, currentUser}=require("../controllers/auth");
const { createSeller } = require("../controllers/seller");

//middlewares
const {authCheck, adminCheck, sellerCheck, agencyCheck}= require("../middlewares/auth")

const router=express.Router()
router.post("/create-or-update-user",authCheck  ,createOrUpdateUser);
router.post("/create-or-update-seller",createSeller)
router.post("/current-user",authCheck  ,currentUser);
router.post("/current-admin",authCheck ,adminCheck ,currentUser);
router.post("/current-seller",authCheck,sellerCheck,currentUser)
router.post("/current-agency",authCheck,agencyCheck, currentUser)

module.exports=router;