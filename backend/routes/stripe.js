const express = require("express");
const router = express.Router();

const { createPaymentIntent,packagePayment, WalletPayment, PaymentReturn } = require("../controllers/stripe");
const { route } = require("./user");
// middleware
const { authCheck } = require("../middlewares/auth");

router.post("/create-payment-intent", authCheck, createPaymentIntent);
router.post('/payment/package',packagePayment);
router.post('/payment/wallet',WalletPayment);
router.post('/payment/return',PaymentReturn);


module.exports = router;
