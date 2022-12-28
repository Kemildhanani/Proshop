const mongoose = require("mongoose");
const{ObjectId}=mongoose.Schema;

const profileSchema = new mongoose.Schema(
    {
    user:{
        type:ObjectId
    },
     public_id:{
            type:Number,
        },
    url:{
        type:String,
    },
    
},
{timestamps:true}
);

module.exports = mongoose.model("Profile", profileSchema);