const express=require("express");
const router =express.Router();

const { authCheck,adminCheck } = require("../middlewares/auth");


const {createProfile, updateUserProfile, getProfile} = require("../controllers/Profile");
const { updateOne } = require("../models/user");

router.post("/profile",createProfile);
router.put('/profile/update/:id',updateUserProfile);
router.get('/profile/:id',getProfile);


module.exports = router;