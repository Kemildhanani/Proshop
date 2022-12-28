import axios from "axios";

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getCoupon = async (name) =>
  await axios.get(`${process.env.REACT_APP_API}/coupon/${name}`);


export const getSellerCoupon = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/coupon/seller/${id}`);

  export const findCouponHistory = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/coupon/history/${id}`);

  export const findCouponHistoryDelete = async (id) =>
  await axios.put(`${process.env.REACT_APP_API}/coupon/history/delete/${id}`);

export const getCouponandupdate = async (data) =>
  await axios.post(`${process.env.REACT_APP_API}/coupon/update`,{data});
