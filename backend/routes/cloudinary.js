const express = require("express");
const router = express.Router();

//middle
const {authCheck,adminCheck}=require("../middlewares/auth");
const { upload,remove,uploadPoster,removePoster, uploadProfile, removeProfile } = require("../controllers/cloudinary");

//
router.post('/uploadimages',upload);
router.post('/removeimage',authCheck,remove);
router.post('/uploadPosters',uploadPoster)
router.post('/removePosters',removePoster);
router.post('/removeprofile',removeProfile);
router.post('/uploadprofile',uploadProfile);

module.exports = router; 