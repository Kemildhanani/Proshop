const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, remove, list, findCoupon, getCouponSeller, findCouponHistory, couponHistroyDelete, findCouponAndUpdate } = require("../controllers/coupon");

// routes
router.post("/coupon", authCheck, create);
router.get("/coupons", list);
router.delete("/coupon/:couponId", authCheck, remove);
router.get("/coupon/:name",findCoupon)
router.get("/coupon/seller/:id",getCouponSeller);
router.get("/coupon/history/:id",findCouponHistory);
router.put("/coupon/history/delete/:id",couponHistroyDelete);
router.post("/coupon/update",findCouponAndUpdate)

module.exports = router;
