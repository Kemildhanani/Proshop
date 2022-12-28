import axios from "axios";

export const ReqReturn = async (data) => {
    // console.log(data);
    return await axios.post(`http://localhost:8000/api/return`,{data});
}
export const ReqReturnFind = async (id) => {
    // console.log(data);
    return await axios.post(`http://localhost:8000/api/return/${id}`);
}
export const approveReturn = async (id) => {
    // console.log(data);
    return await axios.put(`http://localhost:8000/api/return/approve/${id}`);
}
export const rejectREturn = async (id) => {
    // console.log(data);
    return await axios.put(`http://localhost:8000/api/return/reject/${id}`);
}
export const createpaymenthistory = async (data) => {
    // console.log(data);
    return await axios.put(`http://localhost:8000/api/return/payment/history`,{data});
}
export const returnpayment = async (id) => {
    // console.log(data);
    return await axios.put(`http://localhost:8000/api/return/payment/${id}`);
}
export const PaymentHistoryies = async (id) => {
    // console.log(data);
    return await axios.put(`http://localhost:8000/api/return/paymentHistory/${id}`);
}



