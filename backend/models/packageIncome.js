const mongoose = require("mongoose")

const { ObjectId } = mongoose.Schema.Types

const packageIncomeSchema = mongoose.Schema({
    seller: {
        type: ObjectId,
        ref: 'user'
    },
    packageName: {
        type: String
    },
    duration: {
        type: Number
    },
    products: {
        type: Number
    },
    amountPaid: {
        type: Number,
    }
}, { timestamps: true })

module.exports= mongoose.model('packageIncome', packageIncomeSchema)
