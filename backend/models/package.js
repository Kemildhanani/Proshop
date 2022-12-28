const mongoose = require('mongoose')

const packageSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price: {
        type: Number,
    },
    previousPrice: {
        type: Number,
        default: null
    },
    duration: {
        type: Number,
    },
    ads: {
        type: Boolean,
        default: false
    },
    adsRate: {
        type: Number,
        default: 10
    },
    products: {
        type: Number,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Package', packageSchema);  
