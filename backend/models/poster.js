const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema(
    {
     public_id:{
            type:Number,
        },
    url:{
        type:String,
    },
    
},
{timestamps:true}
);

module.exports = mongoose.model("Poster", posterSchema);