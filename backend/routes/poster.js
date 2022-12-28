const express=require("express");
const router =express.Router();

const { authCheck,adminCheck } = require("../middlewares/auth");

const {
    createPoster,
     getPosters,
     removePoster,
} = require("../controllers/poster")

router.post("/poster",createPoster);
router.get("/posters",getPosters);
router.delete("/posters",removePoster )

module.exports = router;