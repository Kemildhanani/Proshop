const express=require("express");
const router =express.Router();

//middlewares
const {authCheck, adminCheck,sellerCheck}= require("../middlewares/auth")

//controller
const {
    create, 
    listAll, 
    remove,
    read, 
    update,
    list,
    productsCount,
    productStar,
    listRelated,
    searchFilters,
    listusers,
    getHomeProducts,
    getTopGrossing,
    getUnapprovedProduct,
    approvedProduct,
    RejectProduct,
    activateProduct,
    deactivateProduct,
    SellerProducts,
    getProduct,
    getProductbyid,
    getTopRated,
    searchFiltersProducts
} = require("../controllers/product");


//routes
router.get("/products",getHomeProducts)
router.get("/products/top/grossing",getTopGrossing)
router.get("/products/top/rated", getTopRated)

router.post("/product",authCheck,create);
router.get('/products/total', productsCount);

router.get("/products/:count", listAll);//products/100
router.delete('/product/:slug', authCheck, remove)
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck,update)
router.get('/admin/product/approve',getUnapprovedProduct);
router.put('/admin/product/approve/:id',approvedProduct);
router.put('/admin/product/reject/:id',RejectProduct);
//Seler products
router.put('/seller/product/activate/:id',activateProduct);
router.put('/seller/product/deactivate/:id',deactivateProduct);
router.get('/seller/product/:id',SellerProducts)
router.get('/getproduct/:id',getProductbyid);

router.post('/products',listAll)

router.get("/order/product/:id",getProduct)
//rating
router.put('/product/star/:productId',productStar);
//related
router.get("/product/related/:productId",listRelated)

//search
router.post("/search/filters",searchFilters)




module.exports=router;