import axios from 'axios'

export const createSeller = async (data, pack,authtoken) => {
    console.log(data);
    return await axios.post('http://localhost:8000/api/seller/verify',{data,pack})
}

export const updateSellerPackage = async (id, pack, authtoken) => {
    return await axios.put(`http://localhost:8000/api/seller/renew/${id}`, {pack}, {
        headers: {
            authtoken: authtoken
        }
    })
}


export const Sellerremaining = async (id,count) => {
    // console.log(data);
    return await axios.put(`http://localhost:8000/api/seller/product/${id}`,{count})
}


export const sellergetorders = async (id) => {
    // console.log(data);
    return await axios.get(`http://localhost:8000/api/seller/orders/${id}`);
}

export const updateStatus = async (id, status) => {
    return await axios.put(`http://localhost:8000/api/seller/updateStatus/${id}`,{status})
}
export const updateSchedule = async (id, schedule) => {
    return await axios.put(`http://localhost:8000/api/seller/updateSchedule/${id}`,{schedule})
}

