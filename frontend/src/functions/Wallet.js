import axios from "axios";


export const createWallet = async (data, pin, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/user/wallet`, { data, pin }, {
        headers: {
            authtoken,
        },
    })

export const getWallet = async (id) =>
    await axios.get(`${process.env.REACT_APP_API}/user/wallet/${id}`)

export const updateAmt = async (id, amt, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/user/wallet/update/${id}`, { amt },
        {
            headers: {

                authtoken
            }
        });


export const OrderPayment = async (id, amt, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/user/wallet/order/payment/${id}`, { amt },
        {
            headers: {

                authtoken
            }
        });

/////////////////

export const SendMail = async (email, data, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/user/mail/${email}`, { data },);

export const SendCoupon = async (email, data, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/user/couponMail/${email}`, { data },);

// /user/mail/:email

export const SendApproveReqReturn = async (email, data,) =>
    await axios.post(`${process.env.REACT_APP_API}/return/approve/mail/${email}`, { data },);

export const SendRejectReqReturn = async (email, data,) =>
    await axios.post(`${process.env.REACT_APP_API}/return/reject/mail/${email}`, { data },);

    export const SendCouriarReturn = async (email, data,) =>
    await axios.post(`${process.env.REACT_APP_API}/return/couriar/mail/${email}`, { data },);