const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ReturnPaymentHistorySchema = new mongoose.Schema(
    {
    
      
      seller:{
        type:ObjectId,
      },
      user:{
        type:ObjectId,
      },
      buyer_email:{
          type:String
      },
      // couriar:{
        
      // },
      amt:{
        type:Number
      },
    //   product:{
    //     type:String
    //   },
      paymentIntent:{},
      
      orderDetails:{
        type:ObjectId,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("ReturnPaymentHistory", ReturnPaymentHistorySchema);