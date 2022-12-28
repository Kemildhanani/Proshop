import axios from 'axios'

export const getOrders = async (authtoken) => 
    await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
        headers: {
            authtoken,
        },
    })

    
export const changeStatus = async (orderId, orderStatus, authtoken) => 
await axios.put(`${process.env.REACT_APP_API}/admin/order-status`,
    {orderId, orderStatus},
    {
        headers: {
            authtoken,
        },
});

export const changeSchedule = async (orderId, orderSchedule, authtoken) => 
await axios.put(`${process.env.REACT_APP_API}/admin/order-schedule`,
    {orderId, orderSchedule},
    {
        headers: {
            authtoken,
        },
})

export const getsellercount = async (authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/admin/sellercount`)


export const getusercount = async (authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/admin/usercount`)

export const packageIncome = async (authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/admin/packageIncome`)

export const ordersIncome = async (authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/admin/OrdersIncome`)
    
export const ordersLatest = async (authtoken) => 
    await axios.put(`${process.env.REACT_APP_API}/admin/ordersLatest`)
    // /admin/ordersLatest