const Brands = require("../models/brand");
const Product = require('../models/product')
// const Sub =require("../models/sub");
const slugify = require('slugify');

exports.create=async(req,res)=>{
    try{
        const {name}=req.body
        // const category= ;
        res.json(await new Brands({name, slug: slugify(name) }).save());
    }catch(err){
        console.log(err)
        res.status(400).send('Create category failed')
    }
};

//list
exports.list=async(req,res)=>{
    res.json(await Brands.find({}).sort({ createdAt: -1}).exec());
};

//read
// 
exports.read = async(req,res)=>{   
    let brand = await Brands.findById({_id: req.params.slug}).exec();
//    const products = await Product.find({ brand  })
//    .populate("brand")
//    .exec();
   res.json({
       brand,
    //    products,
   });
};

//update
exports.update=async (req,res)=>{
    try{
        const {name} = req.body;//change packeg name
        const updated = await Brands.findOneAndUpdate(
            { slug: req.params.slug},
            {name, slug: slugify(name)},
            { new : true}
        );
        res.json(updated);
    }catch (err)
    {
        console.log(err)
        res.status(400).send('catagory update failed')
    }
};



//remove
exports.remove=async (req,res)=>{
    try{
        const deleted = await Brands.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    }
    catch(err){
        console.log(err)
        res.status(400).send('Create delete failed')
    }
};


// exports.getSubs=(req,res)=>{
//     Sub.find({parent:req.params._id}).exec((err,subs) =>{
//         if(err) console.log(err);
//         res.json(subs);
//     });
// };
