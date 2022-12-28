// import User from '../models/user.js'
const User =require("../models/user");

exports.addToWishlist = async (req, res) => {

    const { id, productId } = req.body
    try {
        User.find({ _id: id, wishlist: productId }).exec((err, result) => {
            if (result) {
                if (result.length === 0) {
                    console.log("In")
                    User.findOneAndUpdate({ _id: id }, {
                        $addToSet: { wishlist: productId }
                    }).exec((err, result) => {
                        if (result) {
                            res.json(result)
                            console.log(result)
                        } else {
                            console.log(err)
                        }
                    })
                } else {
                    res.json({ alreadyAdded: "Product was already added!" })
                }
            } else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log('Error in adding product in wishlist at Controller', error);
    }
}


exports.removeWishlist = async (req, res) => {
    const productId = req.params.id
    const { userId } = req.body
    console.log(productId, userId)

    try {
        const wishlist = await User.findByIdAndUpdate({ _id: userId }, {
            $pull: { wishlist: productId }
        }).exec()
        res.json(wishlist)
    }
    catch (error) {
        console.log('error while delete wishlist', error);
    }
}


exports.getuserwishlist= async (req,res)=>{
    try{
        const user = await User.find({_id:req.params.id}).exec();
        res.json(user)
    }
    catch(err){
        console.log("user id detail",err);
    }
}