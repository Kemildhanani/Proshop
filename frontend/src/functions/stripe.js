import axios from 'axios';

export const createPaymentIntent = (authtoken,coupon) =>
axios.post(
  `${process.env.REACT_APP_API}/create-payment-intent`,
  {couponApplied: coupon},
  {
    headers: {
      authtoken,
    },
  }
  );
  
  
export const createPaymentPackageIntent = async (price) => {
  return await axios.post(`http://localhost:8000/api/payment/package`, { price })
}

export const createPaymentWalletIntent = async (price) => {
  return await axios.post(`http://localhost:8000/api/payment/wallet`, { price })
}

export const createPaymentReturnIntent = async (price) => {
  return await axios.post(`http://localhost:8000/api/payment/return`, { price })
}


  