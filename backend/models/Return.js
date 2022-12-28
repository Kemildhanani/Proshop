const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ReturnSchema = new mongoose.Schema(
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
      orderDetail_id:{
          type:ObjectId,
      },
      order_id:{
          type:ObjectId
      },
      product:{
        type:String
      },
      returnPayment:{
        type:Boolean,
        default:false
      },

      approve:{
          type:Boolean,
          // default:false
      }

    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Return", ReturnSchema);