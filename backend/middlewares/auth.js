const admin =require("../firebase")
const User = require('../models/user');

exports.authCheck=async(req,res,next)=>{
    try{
        const firebaseUser=await admin.auth()
        .verifyIdToken(req.headers.authtoken);
        console.log("Firebase user in authcheck",firebaseUser);
        req.user=firebaseUser;
        next();
    }
    catch(err){
        res.status(401).json({
            err:"invalid or expired token"
        });
    } 
}; 

exports.adminCheck = async (req, res, next) => {
    const {email} = req.user

    const adminUser = await User.findOne({email}).exec()

    if(adminUser.role !== 'admin'){
        res.status(403).json({
            err: 'Admin resource. Access Denied.',
        });
    }else{
        next();
    }
};

exports.sellerCheck = async (req, res, next) => {
    const {email} = req.user

    const sellerUser = await User.findOne({email}).exec()

    if(sellerUser.role !== 'seller'){
        res.status(403).json({
            err: 'Seller resources. Access Denied.'
        })
    }else{
        next();
    }
}

exports.agencyCheck = async (req, res, next) => {
    const {email} = req.user

    const agencyUser = await User.findOne({email}).exec()

    if(agencyUser.role !== 'agency'){
        res.status(403).json({
            err: 'Agency resources. Access Denied.'
        })
    }else{
        next();
    }
}