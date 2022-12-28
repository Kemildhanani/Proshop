const Sub=require("../models/sub");
const Product = require('../models/product')
const slugify=require('slugify')
 
exports.create=async(req,res)=>{
    try{
        const {name,parent}=req.body
        // const category= ;
        res.json(await new Sub({name,parent,slug: slugify(name) }).save());
    }catch(err){
        console.log("Sub create failed",err)
        res.status(400).send('Create sub failed')
    }
};

//list
exports.list=async(req,res)=>{
    res.json(await Sub.find({}).sort({ createdAt: -1}).exec());
};

//read
exports.read=async(req,res)=>{
     let sub= await Sub.findOne({ slug: req.params.slug }).exec();

     const products = await Product.find({ subs: sub })
     .populate("category")
     .exec();
     res.json({
         sub,
         products,
     });

    };

//update
exports.update=async (req,res)=>{
    try{
        const {name,parent} = req.body;
        const updated = await Sub.findOneAndUpdate(
            { slug: req.params.slug},
            {name,parent, slug: slugify(name)},
            { new : true}
        );
        res.json(updated);
    }catch (err)
    {
        console.log(err)
        res.status(400).send('Sub update failed')
    }
};



//remove
exports.remove=async (req,res)=>{
    try{
        const deleted = await Sub.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    }
    catch(err){
        console.log(err)
        res.status(400).send('Sub delete failed')
    }
};

