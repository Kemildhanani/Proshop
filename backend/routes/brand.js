const express=require("express");
const router =express.Router();

//middlewares
const {authCheck, adminCheck}= require("../middlewares/auth")

//controller
const {create,update,remove,list,read} = require("../controllers/brand");

//routes
router.post("/brand",authCheck,adminCheck,create);
router.get("/brands",list );
router.get("/brand/:slug",read);
// router.get("/category/:slug",read);
router.put("/brand/:slug",authCheck,adminCheck,update);
router.delete("/brand/:slug",authCheck,adminCheck,remove);
// router.get('/category/subs/:_id',getSubs);

module.exports=router;