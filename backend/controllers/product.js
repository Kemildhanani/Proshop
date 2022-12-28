const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");

const admin =require("../firebase");
const { query } = require("express");


exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);

    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
};


exports.read = async (req, res) => {
  // console.log("id",req.params.slug)
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
    console.log("Product",product);
  res.json(product);
};

exports.getProduct = async (req,res) =>{
  const product = await Product.findById({_id:req.params.id});
  res.json(product);
}

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

//Youtube pagination
exports.getHomeProducts = async (req,res) => {
  try{
    let query = Product.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * pageSize;
    const total =await Product.countDocuments();
    const pages = Math.ceil(total / pageSize);
    query = query.skip(skip).limit(pageSize).sort([["createdAt", "desc"]]);
    if(page > pages) {
      res.status(404).json({
        status: 'fail',
        message: "No pages found"
      })
    }
    const result = await query;
    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      status:'error',
      message: "Server Error",
    })
  }
}

exports.getTopGrossing = async (req, res) => {
  try {
      Product.find({ })
      .sort({ sold: -1 })
      .limit(10)
      .exec((err, result) => {
          if (err) return console.log(err)
          res.json(result)
      })
  } catch (err) {
      console.log(err);
  }
}

exports.getTopRated = async (req, res) => {
  try{
    Product.find({ })
    .sort({ratings: -1})
    .limit(10).exec((err, result) =>{
      res.json(result)
      console.log('rest------>',result.length)
    } )
    

  }catch(err){
    console.log(err);
  }
}


exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const firebaseUser=await admin.auth()
        .verifyIdToken(req.headers.authtoken);
        req.user=firebaseUser;
    


  const user=await User.findOne({email:firebaseUser.email});
  console.log(user);
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString()=== user._id.toString()
    
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings:  { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    // console.log("kemil")
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  } 
};

//related

exports.listRelated = async (req,res)=>{
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id},
    category: product.category,
  })
  .limit(10)
  .populate('category')
  .populate('subs')
  .exec();

  res.json(related);
};

// // SERACH / FILTER


// const handleQuery = async (req, res, query) => {
//   const products = await Product.find({ $text: { $search: query } })
//     .populate("category", "_id name")
//     .populate("subs", "_id name")
//     .exec();
//   res.json(products);
// };


// const handlePrice = async (req,res,price) =>{
//   try{
//     let products= await Product.find({
//       price:{
//         $gte:price[0],
//         $lte:price[1],
//       }
//     })
//     .populate("category", "_id name")
//     .populate("subs", "_id name")

//     .exec();

//     res.json(products);
//   }
//   catch(err){
//     console.log(err);
//   }
// }





// const handleFilters = async (req,res,arg) =>{
//   try{
//     let products= await Product.find({
//       price:{
//         $lte:price,
//       },category: { $in: arg.category },subs:{$in:arg.sub}
//     })
//     .populate("category", "_id name")
//     .populate("subs", "_id name")

//     .exec();

//     res.json(products);
//   }
//   catch(err){
//     console.log(err);
//   }
// }

// const handleCategory = async (req,res,category)=>{
//   try{
//     let products=await Product.find({category})
//     .populate("category", "_id name")
//     .populate("subs", "_id name")
//     .exec();

//     res.json(products);
    
//   }
//   catch(err){
//     console.log(err);
//   }
// }


// const handleStar=async(req,res,stars)=>{
 
//   Product.aggregate([
//     {
//       $project: {
//         document: "$$ROOT",
//         // title: "$title",
//         floorAverage: {
//           $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
//         },
//       },
//     },
//     { $match: { floorAverage: stars } },
//   ])
//     .limit(12)
//     .exec((err, aggregates) => {
//       if (err) console.log("AGGREGATE ERROR", err);
//       Product.find({ _id: aggregates })
//         .populate("category", "_id name")
//         .populate("subs", "_id name")
//         .exec((err, products) => {
//           if (err) console.log("PRODUCT AGGREGATE ERROR", err);
//           res.json(products);
//         });
//     });
// }

// const handleSub=async(req,res,sub)=>{
//   const products=await Product.find({subs:sub})
//   .populate('category',"_id name")
//   .populate('subs',"_id name")
//   .exec();

// res.json(products);
// }; 




// exports.searchFilters = async (req, res) => {
//   const { query,price,category,stars,sub,shipping,color,brand} = req.body;

//   if (query) {
//     console.log("query", query);
//     await handleQuery(req, res, query);
//   }

//   //price
//   if(price !== undefined){
//     console.log('price',price);
//     await handlePrice(req,res,price);
//   }
//   if(category){
//     console.log('category',category);
//     await handleCategory(req,res,category);
//   }

//   if(stars){
//     console.log(('stars',stars));
//     await handleStar(req,res,stars)
//   }
//   if(sub){
//     console.log('sub',sub)
//     await handleSub(req,res,sub);
//   }
//   if(shipping){
//     console.log("shipping",shipping);
//     await handleShipping(req,res,shipping);
//   }
//   if(color){
//     console.log("color",color);
//     await handleColor(req,res,color);
//   }
//   if(brand){
//     console.log("brand",brand);
//     await handleBrand(req,res,shipping);
//   }
// };


const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();

  res.json(products);
};

const handlePrice = async (req,res,price) =>{
  try{
    let products= await Product.find({
      price:{
        $gte:price[0],
        $lte:price[1],
      }
    })
    .populate("category", "_id name")
    .populate("subs", "_id name")

    .exec();

    res.json(products);
  }
  catch(err){
    console.log(err);
  }
}

const handleCategory = async (req,res,category)=>{
  try{
    let products=await Product.find({category})
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .exec();

    res.json(products);
    
  }
  catch(err){
    console.log(err);
  }
}

const handleStar=async(req,res,stars)=>{
 
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        // title: "$title",
        floorAverage: {
          $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json(products);
        });
    });
}

const handleSub=async(req,res,sub)=>{
    const products=await Product.find({subs:sub})
    .populate('category',"_id name")
    .populate('subs',"_id name")
    .exec();

  res.json(products);
}; 

const handleShipping = async (req,res,shipping) =>{ 
  const products=await Product.find({shipping})
  .populate('category',"_id name")
  .populate('subs',"_id name")
  .exec();

 res.json(products);
}

const handleColor = async (req,res,color)=>{

  const products=await Product.find({color})
  .populate('category',"_id name")
  .populate('subs',"_id name")
  .exec();

res.json(products);
}


const handleBrand = async (req,res,brand)=>{

  const products=await Product.find({brand})
  .populate('category',"_id name")
  .populate('subs',"_id name")
  .exec();

res.json(products);
}


exports.searchFilters = async (req, res) => {
  const { query,price,category,stars,sub,shipping,color,brand} = req.body;

  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }

  //price
  if(price !== undefined){
    console.log('price',price);
    await handlePrice(req,res,price);
  }
  if(category){
    console.log('category',category);
    await handleCategory(req,res,category);
  }

  if(stars){
    console.log(('stars',stars));
    await handleStar(req,res,stars)
  }
  if(sub){
    console.log('sub',sub)
    await handleSub(req,res,sub);
  }
  if(shipping){
    console.log("shipping",shipping);
    await handleShipping(req,res,shipping);
  }
  if(color){
    console.log("color",color);
    await handleColor(req,res,color);
  }
  if(brand){
    console.log("brand",brand);
    await handleBrand(req,res,shipping);
  }
};


//unapproved
exports.getUnapprovedProduct = async (req, res) => {
  console.log(" unapproved product")  
  try {
      await Product.find({ approved: false, rejected: false }).then(result => {
        res.json(result)
      }).catch(err => {
          console.log(err)
      })
  } catch (error) {
      console.log('Error in Approve product at Controller', error);
  }
}

//Approved products

exports.approvedProduct = async (req,res)=>{
  console.log("id",req.params.id)
  try{
    await Product.findByIdAndUpdate({_id:req.params.id},{approved:true}).then(result=>{
      res.json(result);
    }).catch(err=>{
      console.log(err)
    })
  }
  catch(err){
    console.log("approve err",err)
  }
}

exports.RejectProduct = async (req,res)=>{
  console.log("id",req.params.id)
  try{
    await Product.findByIdAndUpdate({_id:req.params.id},{rejected:true}).then(result=>{
      res.json(result);
    }).catch(err=>{
      console.log(err)
    })
  }
  catch(err){
    console.log("approve err",err)
  }
}

//active product by seller

exports.activateProduct= async(req,res)=>{
  console.log("id",req.params.id)

  try{
    await Product.findByIdAndUpdate({_id:req.params.id},{activated:true}).then(result=>{
      res.json(result);
    })
  }
  catch(err){
    console.log("activate product by seller",err)
  }
}

//deactivate product by seller
exports.deactivateProduct=async(req,res)=>{
  console.log("id",req.params.id)

  try{
    await Product.findByIdAndUpdate({_id:req.params.id},{activated:false}).then(result=>{
      res.json(result);
    })
  }
  catch(err){
    console.log("activate product by seller",err)
  }
}

//get product for seller indivisually

exports.SellerProducts=async(req,res)=>{
  console.log("id",req.params.id)

  try{
    await Product.find({Seller:req.params.id}).then(result=>{
      res.json(result);
    })
  }
  catch(err){
    console.log("activate product by seller",err)
  }
}
exports.getProductbyid=async(req,res)=>{
  console.log("id",req.params.id)

  try{
    await Product.findById({_id:req.params.id}).then(result=>{
      res.json(result);
    })
  }
  catch(err){
    console.log("activate product by seller",err)
  }
}
