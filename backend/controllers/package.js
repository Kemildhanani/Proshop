const Package =require("../models/package");
const slugify = require('slugify');
const PackageIncomes = require("../models/packageIncome")

exports.createPackage = async(req,res)=>{
    try{
        const {pack} = req.body;
        console.log("package",pack)
        console.log("name",req.body.name);
        const newpackage = await new Package(req.body).save();
        res.json(newpackage);
    }
    catch(err){
        console.log("pacakge",err);
    }
}

exports.getPackages= async(req,res)=>{
    try{
        const packages = await Package.find({}).exec();
        res.json(packages);
    }
    catch(err){
        console.log("get package",err);
    }
}

exports.getPack= async(req,res) =>{
    try{
        const package = await Package.findById({_id:req.params.id}).exec()
        console.log("get package",package)
        res.json(package);
    }
    catch(err){
        console.log("get package",err);
    }
}

exports.removepack= async (req,res) =>{
    const id= req.params.id

    console.log("Id remove Pack");

    try{
        const pack = Package.findByIdAndRemove(id).exec();
        res.json(pack);
    }
    catch(err){
        console.log("Remove Package",err)
    }

}

exports.updatPackage= async (req,res) =>{
    console.log("pack",req.body.name);
    console.log("idddd",req.params.id);
    const id = req.params.id;
    try{
        const pack = Package.findByIdAndUpdate({_id:id},req.body,{new:true}).exec();
        res.json(pack);
    }
    catch(err){
            console.log("err pack update",err);
    }
}
exports.PackageIncomes= async (req,res) =>{
    // console.log("pack",req.body.name);
    // console.log("idddd",req.params.id);
    // const id = req.params.id;
    try{
        const pack = await PackageIncomes.find().exec();
        // const pac = await PackageIncomes.find().exec()
        const len = pack.length;
        var amt=0
        for (var i=0;i<len;i++){
            amt=pack[i].amountPaid+amt;
        }
        console.log("111111111111111111111111111111111111111111111111111111111111111",amt)
        // console.log("111111111111111111111111111111111111111111111111111111111111111",pack)
        res.json(amt);
    }
    catch(err){
            console.log("err pack update",err);
    }
}
