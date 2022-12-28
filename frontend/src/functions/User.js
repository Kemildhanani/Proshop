import axios from "axios";


export const userorderProducts = async (id) =>
  await axios.get(
    `${process.env.REACT_APP_API}/user/orderProducts/${id}`);


export const userCart = async (cart, total, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart, total },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOrder = async (stripeResponse, payment, wallet, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse, payment, wallet },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOderDetail = async (stripeResponse, authtoken) => {
  await axios.post(
    `${process.env.REACT_APP_API}/user/orderdetail`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });
export const getUserOrder = async (id, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/order/${id}`, {
    headers: {
      authtoken,
    },
  });

export const uploadprofile = async (profile, user) =>
  await axios.post(`${process.env.REACT_APP_API}/profile`, { profile }
  );

export const getorderDetails = async (order, productid) =>
  await axios.post(`${process.env.REACT_APP_API}/user/get/orderdetails`, { order, productid });
  
export const getorderDetailsbyid = async (id) =>
  await axios.put(`${process.env.REACT_APP_API}/user/get/orderdetails/${id}`);


