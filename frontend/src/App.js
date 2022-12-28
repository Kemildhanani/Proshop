import React, { useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import 'antd/dist/antd.css';
import Package from "./pages/pack/Package";
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./Components/routes/UserRoute"
import AdminRoute from "./Components/routes/AdminRoute"
import SellerRoute from "./Components/routes/SellerRoute"
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import BrandCreate from "./pages/admin/Brand/BrandCreate";
import SubCreate from "./pages/admin/sub/subCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import Product from "./pages/Procduct";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import AdminPasswordUpdate from "./Components/Forms/AdminPasswordUpdate";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import SellerProduct from "./pages/Seller/Product/SellerProduct";
import Sellerproducts from "./pages/Seller/Product/AllProducts.";
import PackageFinal from "./pages/pack/packagefinal";
import PricacyPolicy from "./Components/footer/Copyright"
import CopyRight from "./Components/footer/Copyright";

import PackageAdmin from "./pages/admin/Package/Pacakge";

import CreateCouponPage from "./pages/Seller/coupon/CreateCouponPage";

import {auth} from '../src/firebase';
import {useDispatch, useSelector} from "react-redux"; 
import {currentUser} from './functions/auth';
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import User from "./pages/admin/Users/Users";
import AllOrders from "./pages/admin/Orders/AllOrders";
import BrandUpdate from "./pages/admin/Brand/BrandUpdate";
import SideDrawer from "./Components/drawer/SideDrawer";
import Footer from "./Components/footer/Footer";
import Payment from "./pages/Payment";

import SellerRegistration from "./pages/Seller/SellerRegistration";
import SellerRegistrationComplete from "./pages/Seller/SellerRegistrationComplete";
import Sellers from "./pages/admin/Seller/Sellers";
import Poster from "./pages/admin/Posters/Poster"
import SellerOrders from "./pages/Seller/orders/SellerOrders"
import PasswordUpdate from "./pages/Seller/PassworUpdate"

import MainNavbar from "./Components/navbar/Main Navbar/MainNavbar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FilterSearch from "./pages/FilterPage";
import AdminProducts from "./pages/admin/product/Products.";
import UpdatePackage from "./pages/admin/Package/UpdatePackage";
import Invoice from "./pages/user/Invoice";
import UserProfile from "./pages/user/UserProfile";
import "./app.css"
import UserPaymentWallet from "./pages/user/UserWalletPayment";
import ProfileUPdate from "./pages/user/ProfileUpdate";
import SellerProfile from "./pages/Seller/profile/SellerProfile";
import AboutUs from "./Components/footer/AboutUs";
import SellerProfileUpdate from "./pages/Seller/profile/SellerProfileUpdate";
import CouponSend from "./pages/Seller/coupon/couponsend";
import AgencyRoute from "./Components/routes/AgencyRoute";
import AgencyDashboard from "./pages/Agency/AgencyDashboard";
import Couponhistory from "./pages/Seller/coupon/Couponhistory";
import OrderSuccess from "./pages/user/OrderSuccess";
import ReturnHome from "./pages/Seller/return/returnHome";
import ReturnPayment from "./pages/Seller/return/payment/ReturnPayment";
import Pay from "./pages/Seller/return/payment/Pay";
import AgencyPasswordUpdate from "./pages/Agency/AgencyPasswordUpdate";


const App = () => {

  const dispatch=useDispatch()

  const user = useSelector(state => state.user)

  // to chechk firebase auth state
  useEffect(()=>{
    const unsubscribe =auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult=await user.getIdTokenResult()
        

        currentUser(idTokenResult.token)
                .then(
                    (res) => {
                        dispatch({
                            type:'LOGGED_IN_USER',
                            payload:{
                                name:res.data.name,
                                email:user.email,
                                token:idTokenResult.token,
                                role:res.data.role,
                                _id:res.data._id,
                            },
                        });
                    }
                )
                .catch(err => console.log(err));
      }
    });
    //cleanup
    return()=> unsubscribe();
  },[dispatch]);

  return (
    <>    
      <MainNavbar />
      <SideDrawer/>
        <Routes>
          <Route  path="/" element={<Home />}/>
            <Route path="/wishlist" element={<Wishlist/>}/>
          <Route  path="/login" element={<Login />}/>
          <Route  path="/register" element={<Register />}/>
          <Route  path="/register/complete" element={<RegisterComplete />}/>
          <Route  path="/forgot/password" element={<ForgotPassword/>}/>

          <Route  path="/seller/registration" element={<SellerRegistration/>}/>
          <Route  path="/seller/registration/complete" element={<SellerRegistrationComplete />}/>
          <Route path="/payment/package" element={<PackageFinal />} />
          <Route path="/package" element={<Package/>} />

          {/* <Route path="seller/sellerDashboard" element={<SellerDashboard />} /> */}
 
         {/* Protected user  */}
          <Route element={<UserRoute/>}> 
            <Route path="/user/history" element={<History/>}/>
            <Route path="/order/invoice/" element={<Invoice/>}/>
            <Route path="/user/password" element={<Password/>}/>
            <Route path="/user/profile" element={<UserProfile/>}/>
            <Route path="/user/profile/update" element={<ProfileUPdate/>}/>
            <Route path="/user/profile/wallet/payment" element={<UserPaymentWallet/>}/>
            <Route path="/orderSuccess" element={<OrderSuccess/>}/>
          </Route>

          <Route element={<SellerRoute/>}> 
          <Route path="/seller/return" element={<ReturnHome />}/>

            <Route path="/seller/dashboard" element={<SellerDashboard/>}/>
            <Route path="/seller/coupon" element={<CreateCouponPage />} />
            <Route path="/seller/product" element={<SellerProduct />}/>
            <Route path="/seller/products" element={<Sellerproducts />}/>
            <Route path="seller/product/:slug" element={<ProductUpdate />}/>
            <Route path="/seller/orders" element={<SellerOrders />}/>
            <Route path="/seller/profile" element={<SellerProfile />}/>
            <Route path="/seller/password" element={<PasswordUpdate />}/>
            <Route path="/seller/couponsend" element={<CouponSend />}/>
            <Route path="/seller/couponhistory" element={<Couponhistory/>}/>
            <Route path="/seller/profile/update" element={<SellerProfileUpdate />}/>
            <Route path="/seller/returnPayment" element={<ReturnPayment />}/>
            <Route path="/seller/return/Payment" element={<Pay/>}/>
          </Route>

          {/* Protected Admin */}
          <Route element={<AdminRoute/>}>
            <Route path="admin/dashboard" element={<AdminDashboard/>}/>
            <Route path="admin/category" element={<CategoryCreate />}/>
            <Route path="admin/category/:slug" element={<CategoryUpdate/>}/>

            <Route path="admin/brand/:slug" element={<BrandUpdate/>}/>
            <Route path="admin/brand/" element={<BrandCreate/>}/>
            
            <Route path="admin/allOrders" element={<AllOrders/>}/>
            <Route path="/package/update/:slug" element={<UpdatePackage />}/>
            <Route path="admin/sub" element={<SubCreate />} />
            <Route path="admin/sub/:slug" element={<SubUpdate/>}/>
            <Route path="admin/product" element={<ProductCreate />}/>
            <Route path="admin/products" element={<AdminProducts />}/>
            <Route path="admin/password/" element={<AdminPasswordUpdate />}/>
            <Route path="admin/users" element={<User />}/>
            <Route path="admin/sellers" element={<Sellers/>}/>
            <Route path="admin/posters" element={<Poster/>} />
            <Route path="admin/package" element={<PackageAdmin />} />
          </Route>

          <Route element={<AgencyRoute/>}>
            <Route path="agency/dashboard" element={<AgencyDashboard/>} />
            <Route path="agency/password" element={<AgencyPasswordUpdate/>}/>
          </Route>

          {/* common routes */}
            <Route path="product/:slug" element={<Product />} />
            <Route path="category/:slug" element={<CategoryHome/>} />
            <Route path="sub/:slug" element={<SubHome/>} />
            <Route path="/shop" element={<FilterSearch />} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/Checkout" element={<Checkout/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/filter" element={<Shop  />}/>
            <Route path="/privacyPolicy" element={<PricacyPolicy  />}/>
            <Route path="/termsConditions" element={<CopyRight  />}/>
            <Route path="/aboutUs" element={<AboutUs  />}/>

        </Routes>  

        {((user && user.role === "admin") || (user && user.role === "seller") || (user && user.role === "agency") || (user && user.role === "doctor")) ? '' : <Footer />}
        {/* {<Footer/>} */}
        {/* <Footer/> */}
    </>
  );
}

export default App;


