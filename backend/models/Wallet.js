const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;



const WalletSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
    },
    status: {
        type: String,
        default:"activated"
    },
    amt: {
        type: Number,
        default: 0
    },
    pin:{
        type:Number,
        // required
    },
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Wallet', WalletSchema);  
// user_id,status,AMT